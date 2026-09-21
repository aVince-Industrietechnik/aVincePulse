/*
 * aVincePulse
 * Applet – Panel-Symbol und zentrale Hover-Anzeige
 *
 * Copyright (C) 2026 Angelo Vincenti - aVince Industrietechnik
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License,
 * version 3, as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/>.
 *
 * Entwicklungsstand: 0.1.0-dev
 *
 * Das Applet ist eigenständig lauffähig und benötigt weder ein
 * installiertes noch ein aktives aVincePulse Desklet.
 *
 * Die Anzeigezeilen werden zentral aus metrics.js erzeugt,
 * die Messwerte über measurement.js erfasst und die Sensoren
 * über hardwareDetection.js erkannt.
 *
 * metrics.js, measurement.js und hardwareDetection.js sind mit den
 * Dateien des Desklets identisch. Cinnamon Spices verlangt für Applet
 * und Desklet getrennte Pakete, deshalb liegt hier jeweils eine Kopie.
 */

const Applet = imports.ui.applet;
const Settings = imports.ui.settings;
const ModalDialog = imports.ui.modalDialog;
const Dialog = imports.ui.dialog;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const PopupMenu = imports.ui.popupMenu;

const Metrics = imports.applets['avincepulse-applet@avince'].metrics;
const Measurement = imports.applets['avincepulse-applet@avince'].measurement;
const HardwareDetection = imports.applets['avincepulse-applet@avince'].hardwareDetection;
const Speedtest = imports.applets['avincepulse-applet@avince'].speedtest;

const MeasurementProvider = Measurement.MeasurementProvider;
const HardwareDetector = HardwareDetection.HardwareDetector;
const SpeedtestRunner = Speedtest.SpeedtestRunner;
const StatusAnzeige = Speedtest.StatusAnzeige;

const METRICS = Metrics.METRICS;
const METRIC_ORDER = Metrics.METRIC_ORDER;
const standardMesswertListe = Metrics.standardMesswertListe;
const ordneMesswerte = Metrics.ordneMesswerte;
const SCHRIFTSCHATTEN = Metrics.SCHRIFTSCHATTEN;
const WARNFARBEN_VORGABE = Metrics.WARNFARBEN_VORGABE;
const warnfarbeFuer = Metrics.warnfarbeFuer;
const standardWarnListe = Metrics.standardWarnListe;
const ordneWarnschwellen = Metrics.ordneWarnschwellen;
const bewerteStufe = Metrics.bewerteStufe;
const UNTERSTUETZEN_URL = Metrics.UNTERSTUETZEN_URL;
const unterstuetzenUrlFehlt = Metrics.unterstuetzenUrlFehlt;

// Einstellungsschluessel der Sensorauswahl je Sensorart
// (siehe SENSOR_ARTEN in hardwareDetection.js).
const SENSOR_SCHLUESSEL = {
    cpu: "sensor-cpu",
    storage: "sensor-storage",
    fan: "sensor-fan"
};

// Fensterklasse des Cinnamon-Einstellungsfensters fuer Applets und Desklets.
// Cinnamon meldet sie ueber get_wm_class() als "Xlet-settings.py" mit
// grossem X; verglichen wird deshalb ohne Ruecksicht auf die Schreibweise.
const EINSTELLUNGEN_FENSTERKLASSE = "xlet-settings.py";

/*
 * Vorgabewerte.
 *
 * Sie greifen nur, solange die Einstellungen noch nicht geladen
 * sind oder ein Wert ungueltig ist. Massgeblich sind sonst die
 * Werte aus settings-schema.json.
 *
 * Zum Aktualisierungsintervall: Applet und Desklet messen
 * eigenstaendig, richten ihren Takt aber an der Systemuhr aus
 * (msBisZumNaechstenTakt in measurement.js). Bei gleichem Intervall
 * messen beide dadurch im selben Moment. Bei unterschiedlichen
 * Intervallen treffen sie sich nur auf gemeinsamen Vielfachen.
 */
const DEFAULT_REFRESH_INTERVAL_SECONDS = 3;

/*
 * Anteil der Bildschirmhoehe, den die Hover-Anzeige hoechstens
 * einnehmen soll. Aus diesem Wert und der Anzahl der tatsaechlich
 * angezeigten Messwerte wird die Schriftgroesse berechnet.
 *
 * Dadurch passt sich die Anzeige an unterschiedliche Bildschirme an
 * und bleibt auch dann vollstaendig sichtbar, wenn spaeter weitere
 * Messwerte hinzukommen.
 */
const DEFAULT_POPUP_HEIGHT_RATIO = 0.70;

// Grenzen der berechneten Schriftgroesse in Pixeln.
const POPUP_MIN_FONT_SIZE = 14;
const POPUP_MAX_FONT_SIZE = 48;

/*
 * Deckkraft der abgedunkelten Flaeche hinter der Hover-Anzeige.
 *
 * Die Flaeche haelt die weisse Schrift auf jedem Bildschirminhalt
 * lesbar, ohne dass Schrift- und Schattenfarbe je nach Hintergrund
 * umgeschaltet werden muessen.
 *
 * Geprueft wurde der unguenstigste Fall, ein reinweisser Inhalt
 * hinter der Anzeige:
 *
 *   0.72  Kontrast 9.3 : 1
 *   0.55  Kontrast 4.7 : 1   <- Standard
 *   0.50  Kontrast 3.9 : 1
 *   0.45  Kontrast 3.4 : 1   unterste sinnvolle Grenze
 *   0.40  Kontrast 2.8 : 1   zu schwach
 *
 * Fuer grosse, fette Schrift gilt 3.0 : 1 als Mindestkontrast.
 *
 * Seit AP20 sind 0 bis 55 Prozent einstellbar, Vorgabe 35 Prozent.
 * Die Festlegung aus AP09 ("nicht unter 45 Prozent") ist damit
 * bewusst aufgehoben (Entscheidung des Nutzers vom 19./20.09.2026):
 * Die Lesbarkeit traegt nun der Schriftschatten aus metrics.js, dazu
 * der waehlbare Warnfarbensatz.
 *
 * Das Applet reicht bewusst weiter als das Desklet, das bei 35
 * Prozent endet (Nachtrag vom 20.09.2026). Die Hover-Anzeige deckt
 * einen grossen Teil des Bildschirms ab und soll den Inhalt dahinter
 * auch verdecken duerfen; das Desklet liegt dagegen dauerhaft auf
 * dem Schreibtisch, wo eine kraeftige Flaeche stoert.
 *
 * Zu bedenken bleibt: Ueber hellem Bildschirminhalt wird die Flaeche
 * mit steigender Deckkraft mittelgrau, und gerade die Warnfarben
 * verlieren darauf an Kontrast. Wer die Anzeige staerker abdunkelt,
 * waehlt dafuer sinnvollerweise den gedaempften Warnfarbensatz.
 */
const DEFAULT_POPUP_OPACITY = 0.35;
const MAX_POPUP_OPACITY = 55;

/*
 * Aktion beim Linksklick auf das Panel-Symbol (AP21).
 *
 * Der Linksklick ist seit AP19 frei: Bis dahin startete er den
 * Internet-Speedtest, was versehentlich geschah (Befund H14).
 *
 * Vorgabe ist "anzeige". Grund: Die grosse Messwert-Anzeige erscheint
 * sonst nur, solange der Mauszeiger ueber dem Symbol steht. Auf einem
 * Geraet mit Touchscreen gibt es kein Ueberfahren - ein Finger tippt
 * und ist wieder weg -, die Anzeige waere dort gar nicht erreichbar.
 */
const DEFAULT_LINKSKLICK = "anzeige";
const LINKSKLICK_AKTIONEN = ["anzeige", "systemueberwachung", "nichts"];

/*
 * Systemueberwachung, in dieser Reihenfolge gesucht.
 *
 * Bewusst nicht auf gnome-system-monitor festgelegt: aVincePulse soll
 * auf unterschiedlichen Arbeitsumgebungen laufen. Zuerst werden die
 * Programmeintraege der Arbeitsumgebungen gesucht, danach die Befehle
 * selbst. Wird nichts gefunden, erscheint eine Meldung; ein Hinweis,
 * etwas nachzuinstallieren, waere bei Cinnamon Spices unerwuenscht.
 */
const SYSTEMUEBERWACHUNG_EINTRAEGE = [
    "org.gnome.SystemMonitor.desktop",
    "gnome-system-monitor.desktop",
    "mate-system-monitor.desktop",
    "xfce4-taskmanager.desktop",
    "org.kde.plasma-systemmonitor.desktop",
    "org.kde.ksysguard.desktop",
    "lxtask.desktop"
];

const SYSTEMUEBERWACHUNG_BEFEHLE = [
    "gnome-system-monitor",
    "mate-system-monitor",
    "xfce4-taskmanager",
    "plasma-systemmonitor",
    "ksysguard",
    "lxtask"
];


class AVincePulseApplet extends Applet.TextIconApplet {
    constructor(metadata, orientation, panel_height, instance_id) {
        super(orientation, panel_height, instance_id);

        // Titel des eigenen Einstellungsfensters, siehe configureApplet().
        this._einstellungsTitel = metadata.name;

        this.set_applet_tooltip("aVincePulse");

        this._metadataPath = metadata.path;
        this._timeout = null;

        // Wird beim Entfernen gesetzt; danach keine Messung mehr.
        this._entfernt = false;
        this._symbolischAktiv = false;

        // Angeheftete Anzeige (AP21): bleibt stehen, bis sie
        // geschlossen wird, statt beim Verlassen des Symbols zu
        // verschwinden.
        this._istAngeheftet = false;
        this._modalAktiv = false;
        this._klickfaenger = null;

        // Vorgabewerte, bis die Einstellungen geladen sind.
        this.refreshInterval = DEFAULT_REFRESH_INTERVAL_SECONDS;
        this.popupHeightRatio = DEFAULT_POPUP_HEIGHT_RATIO * 100;
        this.popupOpacity = DEFAULT_POPUP_OPACITY * 100;
        this.panelSymbol = "icon";

        this.settings = new Settings.AppletSettings(
            this,
            metadata.uuid,
            instance_id
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "refresh-interval",
            "refreshInterval",
            this._onRefreshIntervalChanged.bind(this)
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "popup-height-ratio",
            "popupHeightRatio",
            this._applyPopupScale.bind(this)
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "popup-opacity",
            "popupOpacity",
            this._applyPopupStyle.bind(this)
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "panel-symbol",
            "panelSymbol",
            this._applyPanelSymbol.bind(this)
        );

        // Aktion beim Linksklick (AP21). Eine Aenderung wirkt sofort;
        // eine angeheftete Anzeige wird dabei geloest, damit der
        // Benutzer nicht mit einer stehenden Anzeige zurueckbleibt,
        // die er ueber den Klick nicht mehr schliessen kann.
        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "linksklick-aktion",
            "linksklickAktion",
            this._loeseAnzeige.bind(this)
        );


        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "messwert-liste",
            "messwertListe",
            this._baueZeilenNeu.bind(this)
        );

        // Warnschwellen (AP18). Eine Aenderung baut die Zeilen neu auf
        // und loest damit sofort eine neue Bewertung aus.
        // Welcher Farbsatz passt, haengt vom Hintergrundbild ab und
        // wird deshalb vom Benutzer gewaehlt (AP20).
        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "warnfarben-satz",
            "warnfarbenSatz",
            this._applyPopupScale.bind(this)
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "warnschwellen-aktiv",
            "warnAktiv",
            this._baueZeilenNeu.bind(this)
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "warnschwellen-liste",
            "warnListe",
            this._baueZeilenNeu.bind(this)
        );

        // Fehlende Zeilen in den gespeicherten Listen ergaenzen, damit
        // jeder Messwert in den Einstellungen einstellbar ist.
        this._vervollstaendigeListen();

        this._applyPanelSymbol();

        // Zuordnung Messwert-ID -> Anzeigezeile.
        this._rows = {};

        this._speedtest = new SpeedtestRunner();
        this._speedtest.setzeQuelle("aVincePulse Applet");
        this._statusAnzeige = new StatusAnzeige();

        this._detector = new HardwareDetector();

        this._measurement = new MeasurementProvider(
            this._detector,
            this._speedtest
        );

        this._bindeSensorAuswahl();

        this._popup = new St.BoxLayout({
            vertical: true,
            reactive: false,
            visible: false
        });

        this._applyPopupStyle();
        this._buildRows();
        this._applyPopupScale();

        Main.uiGroup.add_child(this._popup);

        this._erzeugeKlickfaenger();

        // Signal-IDs merken, damit sie beim Entfernen getrennt werden.
        // Sonst reagierte eine entfernte Instanz noch auf die Maus
        // (Befund G8).
        this._enterId = this.actor.connect("enter-event", () => {
            this._showPopup();
        });

        this._leaveId = this.actor.connect("leave-event", () => {
            this._hidePopup();
        });

        // Speedtest ueber das Rechtsklick-Menue, wie beim Desklet
        // (Befund H14). Eintraege, die vor dem Abschluss des Menues
        // hinzukommen, stellt Cinnamon oberhalb seiner eigenen an.
        this._menuEintragSpeedtest =
            new PopupMenu.PopupMenuItem("Internet-Speedtest starten");

        this._menuEintragSpeedtest.connect("activate", () => {
            this.starteSpeedtest();
        });

        this._applet_context_menu.addMenuItem(this._menuEintragSpeedtest);

        // Ohne Speedtest-Programm bleibt der Eintrag verborgen
        // (AP22). Der Aufruf in _aktualisiereSensorOptionen() kam
        // dafuer zu frueh: Das Menue entsteht erst hier.
        this._aktualisiereSpeedtestVerfuegbarkeit();

        this._update();
    }

    /*
     * Erzeugt für jeden Messwert der Messwertliste genau eine
     * Anzeigezeile, in der vom Benutzer gewählten Reihenfolge.
     *
     * ordneMesswerte() stellt sicher, dass jeder Messwert aus
     * metrics.js genau einmal vorkommt, auch wenn die Liste in den
     * Einstellungen beschädigt oder unvollständig ist.
     *
     * Messwerte, für die auf diesem Gerät kein Sensor gefunden
     * wurde, erhalten keine Zeile.
     */
    _buildRows() {
        const availability =
            this._measurement.getMetricAvailability();

        for (const eintrag of ordneMesswerte(this.messwertListe)) {
            const id = eintrag.id;
            const metric = METRICS[id];

            // Vom Benutzer abgewaehlte Messwerte erhalten keine Zeile.
            if (!eintrag.sichtbar)
                continue;

            // Ohne Sensor keine Zeile, unabhaengig von der Einstellung.
            if (availability[id] === false) {
                global.log(
                    "aVincePulse AP08: metric hidden, no sensor -> " + id
                );
                continue;
            }

            // Eine eigene Bezeichnung ersetzt nur den Text. Das Symbol
            // bleibt erhalten, da es getrennt gefuehrt wird.
            const row = this._makeRow(
                eintrag.bezeichnung || metric.label,
                metric.defaultValue,
                metric.unit,
                metric.symbol,
                metric.symbolAnhebung
            );

            this._rows[id] = row;
            this._popup.add_child(row.row);
        }
    }

    /*
     * Setzt das Panel-Symbol entsprechend der Einstellung.
     *
     * Die Dateinamen sind bewusst nicht "icon.png": diesen Namen
     * verwendet die Cinnamon-Verwaltung fuer die Darstellung in der
     * Applet-Liste. Die Liste hat einen hellen Hintergrund, auf dem
     * ein weisses Logo mit transparentem Grund nicht zu erkennen
     * waere. Dort liegt deshalb die Fassung mit dunklem Hintergrund.
     */
    _applyPanelSymbol() {
        const variante = this.panelSymbol || "icon";

        if (variante === "text") {
            this._zeigeTextkuerzel();
            return;
        }

        const einfarbig =
            variante === "symbolic" ||
            variante === "symbolic-status";

        // Nur die Variante "symbolic" wird auf die Groesse des
        // farbigen Logos angehoben. "symbolic-status" behaelt
        // bewusst die kleinere Cinnamon-Groesse fuer Statusanzeigen.
        this._symbolischAktiv = (variante === "symbolic");

        const datei =
            einfarbig
                ? "panel-icon-symbolic.png"
                : "panel-icon.png";

        const pfad =
            GLib.build_filenamev([this._metadataPath, datei]);

        // Cinnamon faengt Fehler beim Setzen des Symbols selbst ab, und
        // eine fehlende Datei fuehrt zu keinem Fehler, sondern zu einem
        // leeren Panel-Platz. Deshalb vorher pruefen (Befund G5).
        if (!GLib.file_test(pfad, GLib.FileTest.EXISTS)) {
            global.logError("aVincePulse: Icondatei fehlt: " + pfad);
            this._zeigeTextkuerzel();
            return;
        }

        try {
            if (einfarbig)
                this.set_applet_icon_symbolic_path(pfad);
            else
                this.set_applet_icon_path(pfad);

            // Ein zuvor gesetztes Textkuerzel wuerde sonst
            // neben dem Symbol stehen bleiben.
            this.set_applet_label("");
            this.hide_applet_label(true);

            this._angleicheIconGroesse();

        } catch (e) {
            // Fehlt die Icondatei, bleibt das Applet ueber ein
            // Textkuerzel bedienbar.
            global.logError(e);
            this._zeigeTextkuerzel();
        }
    }

    /*
     * Gleicht die Groesse des symbolischen Logos an die des
     * farbigen an.
     *
     * Cinnamon stellt symbolische Symbole absichtlich kleiner dar
     * als farbige, weil dort ueblicherweise Statusanzeigen wie
     * WLAN oder Lautstaerke sitzen. In der rechten Panelzone sind
     * das 16 statt 24 Pixel. Fuer ein Produktlogo ist das zu klein,
     * und beide Varianten sollen gleich gross erscheinen.
     */
    _angleicheIconGroesse() {
        if (!this._symbolischAktiv)
            return;

        try {
            if (this._applet_icon) {
                this._applet_icon.set_icon_size(
                    this.getPanelIconSize(St.IconType.FULLCOLOR)
                );
            }
        } catch (e) {
            global.logError(e);
        }
    }

    /*
     * Wird von Cinnamon gerufen, wenn sich die Panelhoehe oder die
     * eingestellte Symbolgroesse aendert. Die Angleichung muss danach
     * erneut erfolgen, da Cinnamon die Groesse dabei zuruecksetzt.
     */
    on_panel_icon_size_changed(size) {
        this._angleicheIconGroesse();
    }

    /*
     * Setzt alle Einstellungen auf die Auslieferungswerte zurueck.
     * Wird ueber die Schaltflaeche im Einstellungsfenster gerufen.
     */

    /*
     * Bindet die Sensorauswahl der Einstellungen und uebergibt sie
     * der Hardwareerkennung. Anschliessend werden die Auswahlfelder
     * mit den auf diesem Geraet gefundenen Sensoren gefuellt.
     */
    _bindeSensorAuswahl() {
        for (const art in SENSOR_SCHLUESSEL) {
            this.settings.bindProperty(
                Settings.BindingDirection.IN,
                SENSOR_SCHLUESSEL[art],
                "sensorwahl_" + art,
                this._sensorAuswahlGeaendert.bind(this)
            );
        }

        // Netzwerkschnittstelle und Laufwerk fuer FREE (AP16).
        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "netz-schnittstelle",
            "netzWahl",
            this._quellenAuswahlGeaendert.bind(this)
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "laufwerk-free",
            "laufwerkWahl",
            this._quellenAuswahlGeaendert.bind(this)
        );

        // Speedtest-Programm (AP22). Die Wahl wirkt beim naechsten
        // Test; ein laufender Test wird nicht umgeschaltet.
        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "speedtest-programm",
            "speedtestProgramm",
            this._speedtestProgrammGeaendert.bind(this)
        );

        this._uebernehmeQuellenAuswahl();
        this._uebernehmeSpeedtestProgramm();
        this._detector.setzeAuswahl(this._sensorAuswahl());
        this._aktualisiereSensorOptionen();
    }

    /*
     * Uebergibt die Programmwahl an den Speedtest (AP22).
     */
    _uebernehmeSpeedtestProgramm() {
        if (this._speedtest)
            this._speedtest.setzeProgramm(this.speedtestProgramm);
    }

    /*
     * Eine geaenderte Programmwahl wirkt beim naechsten Test. Die
     * Anzeige bleibt unberuehrt: Gespeicherte Werte eines anderen
     * Programms behalten ihre Gueltigkeit (AP22, Kriterium 7).
     */
    _speedtestProgrammGeaendert() {
        this._uebernehmeSpeedtestProgramm();
    }

    _uebernehmeQuellenAuswahl() {
        this._measurement.setzeNetzwerkAuswahl(this.netzWahl);
        this._measurement.setzeLaufwerkAuswahl(this.laufwerkWahl);
    }

    /*
     * Eine geaenderte Schnittstelle oder ein anderes Laufwerk wirkt
     * sofort. Die erste Netzwerkmessung danach zeigt 0, da fuer die
     * neue Schnittstelle noch kein Vergleichswert vorliegt.
     */
    _quellenAuswahlGeaendert() {
        if (!this._measurement)
            return;

        this._uebernehmeQuellenAuswahl();
        this._baueZeilenNeu();
    }

    _sensorAuswahl() {
        const auswahl = {};

        for (const art in SENSOR_SCHLUESSEL)
            auswahl[art] = this["sensorwahl_" + art];

        return auswahl;
    }

    /*
     * Die Auswahlfelder koennen nicht im Schema stehen, da die
     * Sensoren von Geraet zu Geraet verschieden sind. setOptions()
     * schreibt sie in die Einstellungsdatei. Ein bereits geoeffnetes
     * Einstellungsfenster zeigt sie erst nach erneutem Oeffnen.
     */
    _aktualisiereSensorOptionen() {
        const angebote = {};

        for (const art in SENSOR_SCHLUESSEL) {
            angebote[SENSOR_SCHLUESSEL[art]] = () =>
                this._detector.getSensorOptionen(
                    art,
                    this["sensorwahl_" + art]
                );
        }

        angebote["netz-schnittstelle"] = () =>
            this._measurement.getNetzwerkOptionen(this.netzWahl);

        angebote["laufwerk-free"] = () =>
            this._measurement.getLaufwerkOptionen(this.laufwerkWahl);

        // Welche Speedtest-Programme auf diesem Rechner liegen, steht
        // ebenso wenig im Schema fest wie die Sensoren (AP22).
        angebote["speedtest-programm"] = () =>
            this._speedtest.getProgrammOptionen(this.speedtestProgramm);

        const geschrieben = {};

        for (const schluessel in angebote) {
            try {
                geschrieben[schluessel] = angebote[schluessel]();
                this.settings.setOptions(schluessel, geschrieben[schluessel]);
            } catch (e) {
                global.logError(e);
            }
        }

        this._aktualisiereSpeedtestVerfuegbarkeit();

        // Merkt sich, was das Einstellungsfenster jetzt anbietet.
        this._geschriebeneAuswahl = this._auswahlKennzeichen(geschrieben);
    }

    /*
     * Haelt fest, ob ueberhaupt ein Speedtest-Programm vorhanden ist
     * (AP22, Kriterien 8 und 9).
     *
     * Der Wert steuert ueber "dependency" im Schema, was das
     * Einstellungsfenster zeigt: mit Programm die Programmwahl, den
     * Bedienhinweis und die Schaltflaeche "Speedtest jetzt starten",
     * ohne Programm stattdessen einen erklaerenden Hinweis. Die
     * Schaltflaeche zum Oeffnen der Berichte bleibt in beiden Faellen
     * sichtbar, da aeltere Berichte weiterhin lesbar sein sollen.
     *
     * Warum eine Einstellung und keine Abfrage im Fenster: Cinnamon
     * bietet keine Moeglichkeit, ein Bedienelement zur Laufzeit
     * auszublenden. "dependency" wertet ausschliesslich gespeicherte
     * Einstellungswerte aus. Der Schluessel ist deshalb vom Typ
     * "generic" und hat kein eigenes Bedienelement.
     *
     * Ebenso wird der Menueeintrag ein- und ausgeblendet, damit ein
     * Klick nicht ins Leere laeuft.
     */
    _aktualisiereSpeedtestVerfuegbarkeit() {
        if (!this._speedtest)
            return;

        const vorhanden = this._speedtest.istVerfuegbar();

        try {
            if (this.settings.getValue("speedtest-vorhanden") !== vorhanden)
                this.settings.setValue("speedtest-vorhanden", vorhanden);
        } catch (e) {
            global.logError(e);
        }

        if (this._menuEintragSpeedtest) {
            try {
                this._menuEintragSpeedtest.actor.visible = vorhanden;
            } catch (e) {
                global.logError(e);
            }
        }
    }

    /*
     * Eine geaenderte Sensorauswahl wirkt sofort. Ein Neuaufbau der
     * Zeilen loest die naechste Messung ohne Wartezeit aus.
     */
    _sensorAuswahlGeaendert() {
        if (!this._detector)
            return;

        this._detector.setzeAuswahl(this._sensorAuswahl());
        this._baueZeilenNeu();
    }

    /*
     * Oeffnet die Einstellungen. Ist das Einstellungsfenster bereits
     * offen, wird es nach vorne geholt, statt ein weiteres zu starten.
     *
     * Cinnamon startet bei jedem Aufruf von "Konfigurieren ..." ein
     * neues Fenster. Erkannt wird das eigene Fenster an der
     * Fensterklasse von xlet-settings und am Titel, den xlet-settings
     * aus dem Namen in metadata.json bildet. Der Titel unterscheidet
     * das Fenster des Applets von dem des Desklets.
     *
     * Oeffnet der Benutzer die Einstellungen ueber die Systemeinstellungen,
     * startet Cinnamon das Fenster selbst; dieser Weg laesst sich von
     * hier aus nicht beeinflussen.
     */
    configureApplet(tab = 0) {
        if (this._holeEinstellungsfensterNachVorne())
            return;

        super.configureApplet(tab);
    }

    _holeEinstellungsfensterNachVorne() {
        try {
            const fenster = this._findeEinstellungsfenster();

            if (!fenster)
                return false;

            // Liegt das Fenster auf einem anderen Arbeitsbereich,
            // wird dorthin gewechselt. Minimierte Fenster werden
            // dabei wiederhergestellt.
            const bereich = fenster.get_workspace();

            Main.activateWindow(
                fenster,
                global.get_current_time(),
                bereich ? bereich.index() : undefined
            );

            return true;

        } catch (e) {
            global.logError(e);
        }

        return false;
    }

    /*
     * Das eigene, derzeit offene Einstellungsfenster oder null.
     * ausser: ein Fenster, das dabei nicht in Frage kommt, etwa das
     * gerade geschlossene.
     */
    _findeEinstellungsfenster(ausser) {
        for (const actor of global.get_window_actors()) {
            const fenster = actor.get_meta_window();

            if (
                fenster &&
                fenster !== ausser &&
                String(fenster.get_wm_class()).toLowerCase() ===
                    EINSTELLUNGEN_FENSTERKLASSE &&
                fenster.get_title() === this._einstellungsTitel
            )
                return fenster;
        }

        return null;
    }

    /*
     * Kennzeichen einer geschriebenen Auswahl: alle Sensoren,
     * Schnittstellen und Laufwerke, ohne die mitangezeigten Werte.
     *
     * Verglichen wird mit dem zuletzt in die Einstellungen
     * geschriebenen Stand, also mit dem, was ein offenes
     * Einstellungsfenster anzeigt. Ein Vergleich mit einer frischen
     * Abfrage vor der Erkennung genuegt nicht: Laufwerke und
     * Schnittstellen werden live gelesen, ein eingesteckter
     * USB-Stick waere dann schon im Vorher enthalten.
     *
     * Eintraege "Nicht gefunden" zaehlen nicht mit; kehrt ein
     * gewaehlter Sensor zurueck, aendert sich dadurch das Kennzeichen.
     */
    _auswahlKennzeichen(geschrieben) {
        return Object.keys(geschrieben).sort().map(schluessel => {
            const optionen = geschrieben[schluessel];

            const werte = Object.keys(optionen)
                .filter(text => !text.startsWith("Nicht "))
                .map(text => optionen[text])
                .sort();

            return schluessel + ":" + werte.join(",");
        }).join("|");
    }

    /*
     * Fragt, ob das offene Einstellungsfenster neu geoeffnet werden
     * soll, damit seine Auswahlfelder die neu erkannte Hardware zeigen.
     *
     * Grundsatz: aVincePulse oeffnet oder schliesst Fenster nur nach
     * einer Benutzeraktion und nur mit vorherigem Hinweis bzw. mit
     * Rueckfrage. Bis zur Antwort bleibt das Fenster unveraendert.
     * Esc wirkt wie "Nicht jetzt".
     */
    _frageNeuOeffnen(meldung) {
        if (this._rueckfrage)
            this._rueckfrage.close();

        const dialog = new ModalDialog.ModalDialog();

        dialog.contentLayout.add_child(new Dialog.MessageDialogContent({
            title: this._einstellungsTitel + " \u2013 Hardware neu erkannt",
            description:
                "Es wurden neue oder entfernte Sensoren, Schnittstellen " +
                "oder Laufwerke gefunden. Die Anzeige ist bereits aktuell.\n\n" +
                "Damit auch die Auswahlfelder im Einstellungsfenster sie " +
                "zeigen, muss das Fenster kurz geschlossen und an derselben " +
                "Stelle neu geöffnet werden."
        }));

        let beantwortet = false;

        const antworte = neuOeffnen => {
            if (beantwortet)
                return;

            beantwortet = true;
            this._rueckfrage = null;

            // Erst weitermachen, wenn der Dialog ganz ausgeblendet ist.
            // Sonst lagen Rueckfrage und Meldung kurz uebereinander in
            // der Bildschirmmitte und waren beide nicht lesbar.
            dialog.connect("closed", () => this._nachRueckfrage(neuOeffnen, meldung));
            dialog.close();
        };

        dialog.setButtons([
            {
                label: "Nicht jetzt",
                key: Clutter.KEY_Escape,
                action: () => antworte(false)
            },
            {
                label: "Jetzt neu öffnen",
                action: () => antworte(true)
            }
        ]);

        this._rueckfrage = dialog;
        dialog.open();
    }

    /*
     * Fuehrt die Antwort auf die Rueckfrage aus, nachdem der Dialog
     * ausgeblendet ist.
     */
    _nachRueckfrage(neuOeffnen, meldung) {
        if (!this._statusAnzeige)
            return;

        const zeigeMeldung = geoeffnet => {
            if (!this._statusAnzeige || this._entfernt)
                return;

            this._statusAnzeige.zeige(
                meldung +
                (geoeffnet
                    ? "\n\nDas Einstellungsfenster wurde dafür neu geöffnet."
                    : "\n\nDie neuen Einträge erscheinen in der Auswahl, " +
                      "sobald du das Einstellungsfenster schließt und " +
                      "wieder öffnest.")
            );
            this._statusAnzeige.verbergeNachLesezeit();
        };

        // Beim Neu-Oeffnen erscheint die Meldung erst, wenn das neue
        // Fenster an seinem Platz steht. Zuvor schien fuer gut eine
        // halbe Sekunde das Fenster dahinter durch die halbtransparente
        // Meldung (Befund H15).
        if (neuOeffnen && this._oeffneEinstellungenNeu(() => zeigeMeldung(true)))
            return;

        zeigeMeldung(false);
    }

    /*
     * Schliesst das offene Einstellungsfenster und oeffnet es an
     * derselben Bildschirmposition neu, damit es die gerade neu
     * geschriebene Auswahl zeigt. Ein bereits geoeffnetes Fenster
     * liest die Optionen sonst nicht erneut ein.
     *
     * fertig wird gerufen, sobald das neue Fenster steht, spaetestens
     * nach fuenf Sekunden (Befund H15).
     *
     * Rueckgabe: true, wenn ein Fenster offen war.
     */
    _oeffneEinstellungenNeu(fertig) {
        const altesFenster = this._findeEinstellungsfenster();

        if (!altesFenster)
            return false;

        const rahmen = altesFenster.get_frame_rect();
        const x = rahmen.x;
        const y = rahmen.y;

        let geoeffnet = false;

        const oeffnen = () => {
            if (geoeffnet)
                return;

            geoeffnet = true;
            this._trenneFensterSignal();

            // Wurde das Applet inzwischen entfernt, kein Fenster mehr
            // oeffnen (Befund G6).
            if (this._entfernt)
                return;

            // Direkt die Cinnamon-Funktion, damit nicht das noch
            // verschwindende alte Fenster nach vorne geholt wird.
            super.configureApplet();
            this._setzeFensterPosition(x, y, altesFenster, fertig);
        };

        // Erst oeffnen, wenn das alte Fenster geschlossen ist.
        // Die Zeitgrenze sichert ab, falls das Signal ausbleibt.
        // Signal und Zeitgeber werden gemerkt, damit sie beim Entfernen
        // des Applets aufgeraeumt werden koennen (Befund G6).
        this._trenneFensterSignal();
        this._fensterSignal = {
            fenster: altesFenster,
            id: altesFenster.connect("unmanaged", () => oeffnen())
        };

        if (this._fensterZeitgeber)
            Mainloop.source_remove(this._fensterZeitgeber);

        this._fensterZeitgeber = Mainloop.timeout_add(2000, () => {
            this._fensterZeitgeber = null;
            oeffnen();
            return false;
        });

        altesFenster.delete(global.get_current_time());

        return true;
    }

    /*
     * Trennt das Signal "unmanaged" des alten Einstellungsfensters,
     * sofern noch verbunden.
     */
    _trenneFensterSignal() {
        if (!this._fensterSignal)
            return;

        try {
            this._fensterSignal.fenster.disconnect(this._fensterSignal.id);
        } catch (e) {
            // Fenster bereits verschwunden: nichts mehr zu trennen.
        }

        this._fensterSignal = null;
    }

    /*
     * Wartet bis zu fuenf Sekunden auf das neue Einstellungsfenster
     * und setzt es an die Position des alten.
     *
     * Die Fensterverwaltung legt die Position erst beim Anzeigen fest
     * und ueberschreibt dabei eine zu frueh gesetzte. Die Position wird
     * deshalb so lange nachgesetzt, bis sie bei drei aufeinander
     * folgenden Pruefungen stimmt.
     */
    _setzeFensterPosition(x, y, altesFenster, fertig) {
        let versuche = 50;
        let stabil = 0;

        const ende = () => {
            this._fensterZeitgeber = null;

            if (fertig && !this._entfernt)
                fertig();
        };

        if (this._fensterZeitgeber)
            Mainloop.source_remove(this._fensterZeitgeber);

        this._fensterZeitgeber = Mainloop.timeout_add(100, () => {
            const fenster = this._findeEinstellungsfenster(altesFenster);

            if (fenster) {
                const rahmen = fenster.get_frame_rect();

                if (rahmen.x === x && rahmen.y === y) {
                    if (++stabil >= 3) {
                        ende();
                        return false;
                    }
                } else {
                    stabil = 0;
                    fenster.move_frame(true, x, y);
                }
            }

            if (--versuche <= 0) {
                ende();
                return false;
            }

            return true;
        });
    }

    /*
     * Fuehrt die Hardware- und Sensorerkennung erneut durch und
     * baut die Anzeige danach neu auf.
     *
     * Die Erkennung laeuft sonst nur einmal beim Laden. Nach einem
     * Hardwarewechsel oder bei einem verzoegert geladenen Treiber
     * waere ein Messwert bis zum naechsten Cinnamon-Neustart nicht
     * verfuegbar.
     */
    on_hardware_neu_erkennen() {
        // Keine Meldung "Hardware wird neu erkannt ...": Die Erkennung
        // dauert rund 115 ms und laeuft ohne Pause, die Meldung wurde
        // dadurch nie gezeichnet (seit AP12, in AP17 nachgemessen).
        try {
            const kennzeichenVorher = this._geschriebeneAuswahl;

            // Die Sensorauswahl des Benutzers bleibt erhalten.
            const detector = new HardwareDetector(this._sensorAuswahl());

            this._detector = detector;
            this._measurement.setHardwareDetector(detector);
            this._aktualisiereSensorOptionen();

            // Nur wenn Sensoren, Schnittstellen oder Laufwerke
            // hinzugekommen oder weggefallen sind und das
            // Einstellungsfenster offen ist, muss es neu geoeffnet
            // werden. Das geschieht nie ohne Rueckfrage.
            const auswahlNeu =
                this._geschriebeneAuswahl !== kennzeichenVorher;

            const fensterOffen =
                auswahlNeu && this._findeEinstellungsfenster() !== null;

            const verfuegbar = detector.getAvailability();

            const gefunden = Object.keys(verfuegbar)
                .filter(id => verfuegbar[id] === true);

            const fehlend = Object.keys(verfuegbar)
                .filter(id => verfuegbar[id] === false);

            global.log(
                "aVincePulse AP12: hardware rescan - available: " +
                (gefunden.join(", ") || "none") +
                " | missing: " + (fehlend.join(", ") || "none")
            );

            // Bericht ablegen, damit das Ergebnis nachlesbar ist,
            // ohne das Systemprotokoll durchsuchen zu muessen.
            const pfad = this._schreibeHardwareBericht(detector);

            // Die Verfuegbarkeit kann sich geaendert haben, deshalb
            // werden die Anzeigezeilen vollstaendig neu aufgebaut.
            this._baueZeilenNeu();

            const meldung =
                "Hardware neu erkannt\n\n" +
                gefunden.length + " von " +
                Object.keys(verfuegbar).length +
                " sensorabhängigen Messwerten verfügbar" +
                (fehlend.length
                    ? "\nNicht gefunden: " + fehlend.join(", ")
                    : "") +
                (pfad
                    ? "\n\nBericht abgelegt \u2013 zu finden über die " +
                      "Einstellungen unter „Hardware-Berichte öffnen“"
                    : "") +
                (auswahlNeu
                    ? "\n\nNeue oder entfernte Sensoren, Schnittstellen " +
                      "oder Laufwerke gefunden \u2013 die Anzeige ist " +
                      "aktualisiert."
                    : "\n\nDie Auswahl an Sensoren, Schnittstellen und " +
                      "Laufwerken ist unverändert.");

            if (fensterOffen) {
                // Erst fragen, dann melden: Meldung und Rueckfrage
                // stuenden sonst uebereinander in der Bildschirmmitte.
                this._statusAnzeige.verberge();
                this._frageNeuOeffnen(meldung);
                return;
            }

            this._statusAnzeige.zeige(meldung);
            this._statusAnzeige.verbergeNachLesezeit();

        } catch (e) {
            global.logError(e);
            this._statusAnzeige.zeige("Die Hardwareerkennung ist fehlgeschlagen.");
            this._statusAnzeige.verbergeNach(8);
        }
    }

    /*
     * Schreibt den Hardwarebericht als Textdatei.
     *
     * Jeder Bericht bleibt erhalten und traegt Datum und Uhrzeit im
     * Dateinamen, wodurch sich die Dateien von selbst chronologisch
     * sortieren. Das Kuerzel am Anfang zeigt, welche Komponente den
     * Bericht erstellt hat.
     *
     * Rueckgabe: Pfad oder null.
     */
    _schreibeHardwareBericht(detector) {
        try {
            const verzeichnis = this._berichtsVerzeichnis("Hardware");

            GLib.mkdir_with_parents(verzeichnis, 0o755);

            const jetzt = new Date();
            const zwei = zahl => String(zahl).padStart(2, "0");

            const stempel =
                jetzt.getFullYear() + "-" +
                zwei(jetzt.getMonth() + 1) + "-" +
                zwei(jetzt.getDate()) + "_" +
                zwei(jetzt.getHours()) + "-" +
                zwei(jetzt.getMinutes()) + "-" +
                zwei(jetzt.getSeconds());

            const pfad = GLib.build_filenamev([
                verzeichnis,
                "aVP-applet" + "-hardware-bericht_" + stempel + ".txt"
            ]);

            GLib.file_set_contents(
                pfad,
                detector.berichtText("aVincePulse Applet") +
                    this._measurement.berichtText()
            );

            return pfad;

        } catch (e) {
            global.logError(e);
            return null;
        }
    }

    /*
     * Verzeichnis der Berichte.
     *
     * Hardwareerkennung und Speedtest legen in getrennten
     * Unterordnern ab, damit die Uebersicht erhalten bleibt.
     */
    _berichtsVerzeichnis(unterordner) {
        const teile = [
            GLib.get_user_data_dir(),
            "avincepulse",
            "berichte"
        ];

        if (unterordner)
            teile.push(unterordner);

        return GLib.build_filenamev(teile);
    }

    /*
     * Oeffnet einen Berichtsordner im Dateimanager.
     *
     * Hardwareerkennung und Speedtest legen in getrennten
     * Unterordnern ab. Die Schaltflaechen fuehren deshalb direkt
     * zum jeweils passenden Ordner, statt beide in den
     * gemeinsamen Elternordner zu fuehren.
     */
    _oeffneBerichte(unterordner) {
        try {
            const verzeichnis = this._berichtsVerzeichnis(unterordner);

            GLib.mkdir_with_parents(verzeichnis, 0o755);

            Gio.AppInfo.launch_default_for_uri(
                "file://" + verzeichnis,
                null
            );

        } catch (e) {
            global.logError(e);

            this._statusAnzeige.zeige(
                "Der Berichtsordner konnte nicht geöffnet werden."
            );
            this._statusAnzeige.verbergeNach(8);
        }
    }

    on_berichte_hardware_oeffnen() {
        this._oeffneBerichte("Hardware");
    }

    on_berichte_speedtest_oeffnen() {
        this._oeffneBerichte("Speedtest");
    }

    /*
     * Oeffnet die Unterstuetzerseite im Browser (AP23).
     *
     * Nur nach einem Klick des Benutzers, entsprechend der
     * Fensterregel aus Abschnitt 8 der Projektdokumentation und der
     * Regel von Cinnamon Spices, dass ein Unterstuetzen-Hinweis den
     * Benutzer nicht unterbrechen darf. Das Programm oeffnet von
     * sich aus nie etwas.
     *
     * Die Adresse steht in metrics.js, damit Applet und Desklet
     * nicht auseinanderlaufen koennen.
     */
    on_unterstuetzen() {
        // Ohne brauchbare Adresse waere der Browser irgendwohin
        // geschickt worden.
        if (unterstuetzenUrlFehlt()) {
            this._statusAnzeige.zeige(
                "Die Unterstützerseite ist noch nicht eingerichtet.\n\n" +
                "Diese Entwicklungsfassung enthält noch keine Adresse."
            );
            this._statusAnzeige.verbergeNachLesezeit();
            return;
        }

        try {
            Gio.AppInfo.launch_default_for_uri(UNTERSTUETZEN_URL, null);

        } catch (e) {
            global.logError(e);

            this._statusAnzeige.zeige(
                "Die Unterstützerseite konnte nicht geöffnet werden."
            );
            this._statusAnzeige.verbergeNach(8);
        }
    }

    on_standardwerte_zuruecksetzen() {
        if (!this.settings)
            return;

        const intervall = DEFAULT_REFRESH_INTERVAL_SECONDS;
        const groesse = Math.round(DEFAULT_POPUP_HEIGHT_RATIO * 100);
        const deckkraft = Math.round(DEFAULT_POPUP_OPACITY * 100);
        const symbol = "icon";
        const linksklick = DEFAULT_LINKSKLICK;

        this.settings.setValue("refresh-interval", intervall);
        this.settings.setValue("popup-height-ratio", groesse);
        this.settings.setValue("popup-opacity", deckkraft);
        this.settings.setValue("panel-symbol", symbol);
        this.settings.setValue("linksklick-aktion", linksklick);

        // Messwertliste: alle sichtbar, Reihenfolge und
        // Bezeichnungen wie ausgeliefert.
        const liste = standardMesswertListe();

        this.settings.setValue("messwert-liste", liste);
        this.messwertListe = liste;

        // Sensorauswahl: ueberall wieder automatisch. Da beide
        // Komponenten dieselbe automatische Auswahl verwenden, zeigen
        // sie danach dieselben Sensoren.
        for (const art in SENSOR_SCHLUESSEL) {
            this.settings.setValue(SENSOR_SCHLUESSEL[art], "auto");
            this["sensorwahl_" + art] = "auto";
        }

        // Netzwerkschnittstelle und Laufwerk ebenfalls automatisch.
        this.settings.setValue("netz-schnittstelle", "auto");
        this.settings.setValue("laufwerk-free", "auto");
        this.netzWahl = "auto";
        this.laufwerkWahl = "auto";
        this._uebernehmeQuellenAuswahl();

        // Speedtest-Programm wieder automatisch (AP22).
        this.settings.setValue("speedtest-programm", "auto");
        this.speedtestProgramm = "auto";
        this._uebernehmeSpeedtestProgramm();

        // Warnschwellen: eingeschaltet, Vorgaben.
        const warnListe = standardWarnListe();

        this.settings.setValue("warnschwellen-aktiv", true);
        this.settings.setValue("warnfarben-satz", WARNFARBEN_VORGABE);
        this.settings.setValue("warnschwellen-liste", warnListe);
        this.warnAktiv = true;
        this.warnfarbenSatz = WARNFARBEN_VORGABE;
        this.warnListe = warnListe;

        this._detector.setzeAuswahl(this._sensorAuswahl());
        this._aktualisiereSensorOptionen();

        /*
         * setValue schreibt ausschliesslich die Einstellungsdatei.
         * Weder die gebundenen Eigenschaften noch die zugehoerigen
         * Rueckrufe werden dabei aktualisiert. Die Werte werden
         * deshalb hier selbst uebernommen und angewendet, damit das
         * Zuruecksetzen sofort sichtbar wird.
         */
        this.refreshInterval = intervall;
        this.popupHeightRatio = groesse;
        this.popupOpacity = deckkraft;
        this.panelSymbol = symbol;
        this.linksklickAktion = linksklick;

        this._applyPanelSymbol();
        this._applyPopupStyle();
        this._baueZeilenNeu();

        this._statusAnzeige.zeige(
            "Einstellungen auf Standardwerte zurückgesetzt");
        this._statusAnzeige.verbergeNachLesezeit();

        global.log("aVincePulse AP12: settings reset to defaults");
    }

    _zeigeTextkuerzel() {
        this._symbolischAktiv = false;

        // Ein zuvor gesetztes Symbol wuerde sonst neben dem
        // Text stehen bleiben.
        this.hide_applet_icon();

        this.set_applet_label("aVP");
        this.hide_applet_label(false);
    }

    /*
     * Eingestellte Deckkraft der Hintergrundflaeche in Prozent.
     * Seit AP20 sind 0 bis 85 Prozent zulaessig; ein beschaedigter
     * Wert faellt auf die Vorgabe zurueck.
     */
    _deckkraft() {
        return Math.round(
            this._gueltig(this.popupOpacity, 0, MAX_POPUP_OPACITY,
                          DEFAULT_POPUP_OPACITY * 100)
        );
    }

    /*
     * Gewaehlter Warnfarbensatz (AP20). Eine beschaedigte Auswahl
     * faellt auf die Vorgabe zurueck.
     */
    _warnfarbenSatz() {
        const wahl = String(this.warnfarbenSatz);

        return wahl === "hell" || wahl === "dunkel"
            ? wahl
            : WARNFARBEN_VORGABE;
    }

    /*
     * Setzt Hintergrundflaeche und Abstaende der Hover-Anzeige.
     * Die Deckkraft stammt aus den Einstellungen.
     *
     * Der Innenabstand bleibt auch bei 0 Prozent erhalten: Die
     * Anzeige steht frei in der Bildschirmmitte und wird ueber ihre
     * Gesamtgroesse mittig gesetzt, der Abstand wirkt also nach allen
     * Seiten gleich.
     */
    _applyPopupStyle() {
        if (!this._popup)
            return;

        this._popup.set_style(
            "background-color: rgba(0, 0, 0, " +
            (this._deckkraft() / 100) + ");" +
            "border-radius: 18px;" +
            "padding: 28px 40px;" +
            "spacing: 8px;"
        );
    }



    /*
     * Begrenzt einen Einstellungswert auf den zulaessigen Bereich
     * und faellt bei ungueltiger Eingabe auf den Vorgabewert zurueck.
     */
    _gueltig(wert, min, max, vorgabe) {
        const zahl = Number(wert);

        if (!Number.isFinite(zahl))
            return vorgabe;

        return Math.max(min, Math.min(max, zahl));
    }

    /*
     * Setzt den Zeitgeber nach einer Aenderung des Intervalls
     * sofort neu, damit die Aenderung ohne Wartezeit wirkt.
     */
    _onRefreshIntervalChanged() {
        if (!this._popup || this._entfernt)
            return;

        this._starteMessungNeu();
    }

    /*
     * Misst sofort und startet die Messschleife neu.
     *
     * Der laufende Zeitgeber muss entfernt werden, bevor _update()
     * einen neuen setzt. Sonst liefe die Messschleife doppelt und
     * wuerde sich mit jedem weiteren Aufruf vervielfachen. Bis AP19
     * rief der Speedtest _update() direkt auf; nach jedem Test lief
     * dadurch eine Schleife mehr (Befund K1). Jeder sofortige
     * Neustart der Messung geht deshalb ueber diese Methode.
     */
    _starteMessungNeu() {
        if (this._timeout) {
            Mainloop.source_remove(this._timeout);
            this._timeout = null;
        }

        this._update();
    }


    /*
     * Baut die Anzeigezeilen nach einer Aenderung der Messwertliste neu auf.
     */
    _baueZeilenNeu() {
        if (!this._popup || this._entfernt)
            return;

        this._popup.destroy_all_children();
        this._rows = {};

        this._buildRows();
        this._applyPopupScale();

        this._starteMessungNeu();
    }

    _makeRow(name, value, unit, symbol, symbolAnhebung) {
        const row = new St.BoxLayout({
            vertical: false
        });

        const nameLabel = new St.Label({ text: name });
        const valueLabel = new St.Label({ text: value });
        const unitLabel = new St.Label({ text: unit });

        /*
         * Alle drei Zellen auf der Mittellinie der Zeile ausrichten.
         *
         * Ohne das richten sie sich an der Schriftgrundlinie aus.
         * Zeichen wie die Uhr bei LAST oder der Datentraeger bei FREE
         * haben eine andere Hoehe als Grossbuchstaben und wirken
         * dadurch gegenueber der Beschriftung nach unten versetzt.
         */
        for (const zelle of [nameLabel, valueLabel, unitLabel])
            zelle.set_y_align(Clutter.ActorAlign.CENTER);

        row.add_child(nameLabel);
        row.add_child(valueLabel);
        row.add_child(unitLabel);

        // Schriftgroesse und Spaltenbreiten setzt _applyPopupScale(),
        // da sie von der Bildschirmhoehe und der Zeilenzahl abhaengen.
        return {
            row: row,
            name: nameLabel,
            value: valueLabel,
            unit: unitLabel,
            // Beschriftung und Symbol getrennt aufbewahren, damit
            // _setzeBeschriftung() die Auszeichnung bei jeder
            // Groessenaenderung neu aufbauen kann.
            nameText: name,
            symbol: symbol || "",
            symbolAnhebung: symbolAnhebung
        };
    }

    /*
     * Berechnet Schriftgroesse und Spaltenbreiten der Hover-Anzeige
     * aus der Hoehe des Bildschirms und der Anzahl angezeigter Zeilen.
     *
     * Die Anzeige belegt dadurch unabhaengig von Bildschirmgroesse und
     * Messwertanzahl stets etwa denselben Anteil der Bildschirmhoehe.
     */

    /*
     * Berechnet die Spaltenbreiten aus der Schriftgroesse und den
     * tatsaechlich angezeigten Beschriftungen.
     *
     * Feste Pixelbreiten passen nur zu einer einzigen Schriftgroesse.
     * Bei groesserer Schrift wurden Beschriftungen wie "SPEED" und
     * Einheiten wie "MBit/s" abgeschnitten.
     */

    /*
     * Maskiert die Zeichen, die Pango-Markup als Auszeichnung deutet.
     * Ohne das wuerde eine Beschriftung mit & oder < die Zeile leeren.
     */
    _maskiereMarkup(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    /*
     * Setzt die Beschriftung einer Zeile und hebt ein vorhandenes
     * Symbol leicht an.
     *
     * Sinnbilder wie die Uhr oder der Datentraeger sind kleiner und
     * runder als Grossbuchstaben und sitzen auf der gemeinsamen
     * Schriftgrundlinie optisch zu tief.
     *
     * Die Anhebung wird aus der Schriftgroesse berechnet, nicht fest
     * vorgegeben. Ein fester Wert waere bei kleiner Schrift zu gross
     * und bei grosser zu klein und wuerde auf hochaufloesenden
     * Bildschirmen zusaetzlich verrutschen.
     */
    _setzeBeschriftung(item, fontSize) {
        if (!item)
            return;

        if (!item.symbol) {
            item.name.set_text(item.nameText);
            return;
        }

        try {
            /*
             * Pango rechnet in 1/1024 Punkt.
             *
             * Der Faktor gehoert zum jeweiligen Zeichen, da
             * Schriftzeichen unterschiedlich hoch auf der
             * Grundlinie sitzen. Er steht deshalb in metrics.js.
             */
            const faktor =
                Number.isFinite(Number(item.symbolAnhebung))
                    ? Number(item.symbolAnhebung)
                    : 110;

            const anhebung = Math.round(fontSize * faktor);

            item.name.clutter_text.set_use_markup(true);
            item.name.clutter_text.set_markup(
                this._maskiereMarkup(item.nameText) +
                " <span rise='" + anhebung + "'>" +
                this._maskiereMarkup(item.symbol) +
                "</span>"
            );

        } catch (e) {
            // Schlaegt die Auszeichnung fehl, bleibt die Zeile
            // lesbar: Beschriftung und Symbol als einfacher Text.
            global.logError(e);
            item.name.set_text(item.nameText + " " + item.symbol);
        }
    }

    _berechneSpaltenbreiten(fontSize) {
        let maxLabel = 0;
        let maxEinheit = 0;

        for (const id of METRIC_ORDER) {
            const item = this._rows[id];

            if (!item)
                continue;

            const metric = METRICS[id];

            // Massgeblich ist der angezeigte Text, also gegebenenfalls
            // die eigene Bezeichnung aus der Messwertliste.
            const beschriftung =
                String(item.nameText) +
                (item.symbol ? " " + item.symbol : "");

            maxLabel = Math.max(maxLabel, beschriftung.length);
            maxEinheit = Math.max(maxEinheit, String(metric.unit).length);
        }

        if (maxLabel === 0)
            maxLabel = 6;

        // Die Einheiten von Netzwerk und Speedtest wechseln zur
        // Laufzeit zwischen B/s, KB/s, MB/s, GB/s und MBit/s.
        // Die Spalte muss die laengste davon aufnehmen koennen.
        maxEinheit = Math.max(maxEinheit, 6);

        // Mittlere Zeichenbreite bei fetter Schrift, zuzueglich
        // eines Zeichens Reserve.
        const proZeichen = 0.62;

        return {
            name: Math.round(fontSize * proZeichen * (maxLabel + 1)),
            value: Math.round(fontSize * proZeichen * 7),
            unit: Math.round(fontSize * proZeichen * (maxEinheit + 1))
        };
    }

    _applyPopupScale() {
        const monitor = Main.layoutManager.primaryMonitor;

        const zeilen = Object.keys(this._rows).length;

        if (!monitor || zeilen === 0)
            return;

        const anteil =
            this._gueltig(this.popupHeightRatio, 40, 90,
                          DEFAULT_POPUP_HEIGHT_RATIO * 100) / 100;

        // Zeilenhoehe entspricht rund dem 1.35-fachen der Schriftgroesse,
        // dazu kommen Innenabstand und Zeilenabstand.
        const verfuegbar =
            monitor.height * anteil - 2 * 28;

        let fontSize =
            Math.floor(verfuegbar / (zeilen * 1.35 + zeilen * 0.18));

        fontSize = Math.max(
            POPUP_MIN_FONT_SIZE,
            Math.min(POPUP_MAX_FONT_SIZE, fontSize)
        );

        // Der Schatten traegt die Lesbarkeit, sobald wenig oder
        // keine Flaeche eingestellt ist (AP20). Er steht in
        // metrics.js, damit beide Komponenten gleich aussehen.
        const commonStyle =
            "font-size: " + fontSize + "px;" +
            "font-weight: 700;" +
            "color: white;" +
            "text-shadow: " + SCHRIFTSCHATTEN + ";";

        const breiten = this._berechneSpaltenbreiten(fontSize);

        const nameWidth = breiten.name;
        const valueWidth = breiten.value;
        const unitWidth = breiten.unit;

        for (const id of METRIC_ORDER) {
            const item = this._rows[id];

            if (!item)
                continue;

            item.row.set_style(
                "spacing: " + Math.round(fontSize * 0.38) + "px;"
            );

            item.name.set_style(
                commonStyle + "width: " + nameWidth + "px;"
            );

            this._setzeBeschriftung(item, fontSize);

            item.wertStil =
                commonStyle +
                "width: " + valueWidth + "px;" +
                "text-align: right;";

            item.einheitStil =
                commonStyle +
                "width: " + unitWidth + "px;" +
                "text-align: left;";

            this._wendeStufeAn(item);
        }

        // Nur protokollieren, wenn sich etwas geaendert hat. Sonst
        // schrieb jedes Ueberfahren des Symbols Zeilen ins
        // Sitzungsprotokoll (Befund H6).
        const skalierung =
            zeilen + " rows, font " + fontSize + "px, " +
            Math.round(anteil * 100) + "% of " +
            monitor.width + "x" + monitor.height;

        if (skalierung !== this._letzteSkalierung) {
            this._letzteSkalierung = skalierung;
            global.log("aVincePulse AP09: popup scaled - " + skalierung);
        }
    }

    /*
     * Ergaenzt fehlende Messwerte in den gespeicherten Listen, jeweils
     * mit der Vorgabe am Ende. Vorhandene Eintraege bleiben unveraendert.
     *
     * Fehlt eine Zeile, wird der Messwert zwar mit der Vorgabe
     * angezeigt bzw. bewertet, erscheint aber nicht in der Liste und
     * laesst sich nicht einstellen. Das betrifft etwa Messwerte, die
     * ein Update neu hinzufuegt.
     */
    _vervollstaendigeListen() {
        const ergaenze = (schluessel, eigenschaft, standard) => {
            const liste = Array.isArray(this[eigenschaft])
                ? this[eigenschaft]
                : [];

            const vorhanden = new Set(
                liste
                    .filter(e => e && typeof e === "object")
                    .map(e => e.messwert)
            );

            const fehlend = standard.filter(e => !vorhanden.has(e.messwert));

            if (fehlend.length === 0)
                return;

            const neu = liste.concat(fehlend);

            // setValue schreibt nur die Datei, die gebundene Eigenschaft
            // wird deshalb zusaetzlich gesetzt (siehe AP09).
            this.settings.setValue(schluessel, neu);
            this[eigenschaft] = neu;

            global.log(
                "aVincePulse AP18: " + schluessel + " ergaenzt um " +
                fehlend.map(e => e.messwert).join(", ")
            );
        };

        ergaenze("messwert-liste", "messwertListe", standardMesswertListe());
        ergaenze("warnschwellen-liste", "warnListe", standardWarnListe());
    }

    /*
     * Bewertet die Messwerte mit Warnschwellen und faerbt Wert und
     * Einheit ein. Nur bei einem Stufenwechsel wird der Stil neu
     * gesetzt.
     */
    _bewerteWarnschwellen(werte) {
        const schwellen = ordneWarnschwellen(this.warnListe);

        for (const id in werte) {
            const item = this._rows[id];

            if (!item)
                continue;

            const stufe = this.warnAktiv === false
                ? "normal"
                : bewerteStufe(werte[id], schwellen[id], item.stufe);

            if (stufe !== item.stufe) {
                item.stufe = stufe;
                this._wendeStufeAn(item);
            }
        }
    }

    /*
     * Setzt Wert und Einheit auf ihren Grundstil, bei einer Warnstufe
     * mit angehaengter Farbe. Die spaeter angehaengte Farbe hat Vorrang
     * vor einer Farbe im Grundstil.
     */
    _wendeStufeAn(item) {
        if (!item || item.wertStil === undefined)
            return;

        const gewaehlt = warnfarbeFuer(item.stufe, this._warnfarbenSatz());

        const farbe = gewaehlt ? "color: " + gewaehlt + ";" : "";

        item.value.set_style(item.wertStil + farbe);
        item.unit.set_style(item.einheitStil + farbe);
    }

    _setValue(id, value) {
        const row = this._rows[id];

        if (!row || value === undefined || value === null)
            return;

        row.value.set_text(String(value));
    }

    _setUnit(id, unit) {
        const row = this._rows[id];

        if (!row || !unit)
            return;

        row.unit.set_text(unit);
    }

    /*
     * Unsichtbare Flaeche ueber dem gesamten Bildschirm (AP21).
     *
     * Sie faengt Klick und Fingertipp neben der Anzeige ab und
     * schliesst diese. Sie ist die verlaessliche Sicherung: Der
     * zusaetzliche Tastaturgriff fuer Esc kann fehlschlagen, der
     * Klickfaenger nicht. Solange die Anzeige nicht angeheftet ist,
     * bleibt er verborgen und faengt nichts ab.
     */
    _erzeugeKlickfaenger() {
        this._klickfaenger = new St.Widget({
            reactive: true,
            can_focus: true,
            visible: false
        });

        Main.uiGroup.add_child(this._klickfaenger);

        // Die Anzeige liegt ueber dem Klickfaenger, sonst waere sie
        // verdeckt und ein Klick auf sie kaeme nie an.
        Main.uiGroup.set_child_above_sibling(this._popup, this._klickfaenger);

        this._klickfaenger.connect("button-press-event", () => {
            this._loeseAnzeige();

            return Clutter.EVENT_STOP;
        });

        this._klickfaenger.connect("key-press-event", (actor, event) => {
            if (event.get_key_symbol() === Clutter.KEY_Escape) {
                this._loeseAnzeige();

                return Clutter.EVENT_STOP;
            }

            return Clutter.EVENT_PROPAGATE;
        });

        // Ein Klick auf die Anzeige selbst schliesst sie ebenfalls.
        this._popup.connect("button-press-event", () => {
            this._loeseAnzeige();

            return Clutter.EVENT_STOP;
        });
    }

    /*
     * Gewaehlte Aktion beim Linksklick. Ein beschaedigter Wert faellt
     * auf die Vorgabe zurueck.
     */
    _linksklickAktion() {
        const wahl = String(this.linksklickAktion);

        return LINKSKLICK_AKTIONEN.includes(wahl)
            ? wahl
            : DEFAULT_LINKSKLICK;
    }

    /*
     * Linksklick auf das Panel-Symbol. Cinnamon ruft diese Methode
     * ueber Applet._onButtonPressEvent, aber nur ausserhalb des
     * Panel-Bearbeitungsmodus - dort dient der Klick dem Verschieben.
     */
    on_applet_clicked(event) {
        if (this._entfernt)
            return;

        switch (this._linksklickAktion()) {
            case "systemueberwachung":
                this._oeffneSystemueberwachung();
                break;

            case "nichts":
                break;

            default:
                if (this._istAngeheftet)
                    this._loeseAnzeige();
                else
                    this._hefteAnzeigeAn();
        }
    }

    /*
     * Laesst die Anzeige stehen, bis sie geschlossen wird (AP21).
     *
     * Zwei voneinander unabhaengige Wege fuehren wieder heraus: der
     * Klickfaenger fuer Klick und Fingertipp, und - sofern der
     * Tastaturgriff gelingt - Esc.
     */
    _hefteAnzeigeAn() {
        if (!this._popup || !this._klickfaenger || this._entfernt)
            return;

        this._istAngeheftet = true;

        /*
         * Der Klickfaenger deckt die gesamte Zeichenflaeche ab, nicht
         * nur den primaeren Monitor. Sonst bliebe ein Klick auf einem
         * zweiten Bildschirm wirkungslos.
         */
        this._klickfaenger.set_position(0, 0);
        this._klickfaenger.set_size(global.stage.width, global.stage.height);
        this._klickfaenger.show();

        Main.uiGroup.set_child_above_sibling(this._popup, this._klickfaenger);

        // Nur waehrend der Anhaftung nimmt die Anzeige Klicks an.
        // Sonst finge sie beim blossen Ueberfahren Mausereignisse ab,
        // die darunter liegenden Fenstern zustehen.
        this._popup.reactive = true;

        this._showPopup();

        /*
         * Der Tastaturgriff dient allein der Esc-Taste. Schlaegt er
         * fehl, bleibt die Anzeige ueber den Klickfaenger bedienbar;
         * nur Esc entfaellt dann.
         */
        this._modalAktiv = Main.pushModal(this._klickfaenger);

        if (this._modalAktiv)
            this._klickfaenger.grab_key_focus();
        else
            global.log("aVincePulse AP21: Tastaturgriff nicht moeglich, " +
                       "Esc steht nicht zur Verfuegung");
    }

    /*
     * Hebt die Anhaftung auf und raeumt alles ab, was dazugehoert.
     * Wird auch beim Entfernen des Applets und vor einem Speedtest
     * gerufen und muss deshalb mehrfach aufrufbar sein.
     */
    _loeseAnzeige() {
        if (!this._istAngeheftet)
            return;

        this._istAngeheftet = false;

        if (this._modalAktiv) {
            Main.popModal(this._klickfaenger);
            this._modalAktiv = false;
        }

        if (this._klickfaenger)
            this._klickfaenger.hide();

        if (this._popup)
            this._popup.reactive = false;

        this._hidePopup();
    }

    /*
     * Oeffnet die Systemueberwachung der Arbeitsumgebung (AP21).
     *
     * Nur nach einem Klick des Benutzers, entsprechend der Fensterregel
     * in PROJECT-STATUS.md, Abschnitt 8.
     */
    _oeffneSystemueberwachung() {
        try {
            for (const eintrag of SYSTEMUEBERWACHUNG_EINTRAEGE) {
                const programm = Gio.DesktopAppInfo.new(eintrag);

                if (programm) {
                    programm.launch([], null);

                    return;
                }
            }

            for (const befehl of SYSTEMUEBERWACHUNG_BEFEHLE) {
                if (!GLib.find_program_in_path(befehl))
                    continue;

                Gio.AppInfo.create_from_commandline(
                    befehl,
                    null,
                    Gio.AppInfoCreateFlags.NONE
                ).launch([], null);

                return;
            }

            this._statusAnzeige.zeige(
                "Auf diesem System wurde keine Systemüberwachung " +
                "gefunden."
            );

            this._statusAnzeige.verbergeNach(8);

        } catch (e) {
            global.logError(e);

            this._statusAnzeige.zeige(
                "Die Systemüberwachung konnte nicht geöffnet werden."
            );

            this._statusAnzeige.verbergeNach(8);
        }
    }

    _showPopup() {
        if (!this._popup || this._entfernt)
            return;

        // Erneut skalieren, falls sich Bildschirm oder Aufloesung
        // seit dem letzten Anzeigen geaendert haben.
        this._applyPopupScale();

        this._popup.show();

        GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            if (this._popup && this._popup.visible)
                this._updatePopupPosition();

            return GLib.SOURCE_REMOVE;
        });
    }

    _hidePopup() {
        // Eine angeheftete Anzeige bleibt stehen, auch wenn der
        // Mauszeiger das Panel-Symbol verlaesst (AP21). Geschlossen
        // wird sie ueber _loeseAnzeige(), das die Anhaftung zuerst
        // aufhebt und dann hierher zurueckkommt.
        if (this._istAngeheftet)
            return;

        if (this._popup)
            this._popup.hide();
    }

    _updatePopupPosition() {
        if (!this._popup)
            return;

        const monitor = Main.layoutManager.primaryMonitor;

        const width = this._popup.width;
        const height = this._popup.height;

        const x =
            monitor.x +
            Math.round((monitor.width - width) / 2);

        const y =
            monitor.y +
            Math.round((monitor.height - height) / 2);

        this._popup.set_position(x, y);
    }

    /*
     * Startet den Internet-Speedtest.
     * Wird aus dem Rechtsklick-Menue und aus den Einstellungen gerufen.
     *
     * Bis AP19 startete ein einfacher Klick auf das Panel-Symbol den
     * Test. Das geschah leicht versehentlich, etwa beim Verschieben
     * des Applets (Befund H14). Wie beim Desklet (AP11) laeuft der
     * Start deshalb nur noch ueber das Menue. Ein Klick hat keine
     * Wirkung; die Messwerte zeigt das Ueberfahren mit der Maus.
     */
    starteSpeedtest() {
        if (this._entfernt || this._speedtest.istAktiv())
            return;

        // Eine angeheftete Anzeige wuerde sonst stehen bleiben und
        // mit der Meldung in der Bildschirmmitte zusammenfallen
        // (AP21). _loeseAnzeige() verbirgt die Anzeige gleich mit.
        this._loeseAnzeige();
        this._hidePopup();

        // Die Meldung verwendet eine feste Deckkraft, siehe
        // StatusAnzeige.zeige() (Befund G3 aus AP19).
        this._statusAnzeige.zeige("Internet-Speedtest läuft …");

        this._speedtest.starte(ergebnis => {
            // Nach dem Entfernen keine Meldung mehr (Befund M2).
            if (this._entfernt || !this._statusAnzeige)
                return;

            if (ergebnis.erfolg) {
                this._statusAnzeige.zeige(
                    "Speedtest abgeschlossen\n\n" +
                    "Download " + ergebnis.werte.SPEED_DOWN + " MBit/s, " +
                    "Upload " + ergebnis.werte.SPEED_UP + " MBit/s" +
                    (ergebnis.bericht
                        ? "\n\nBericht abgelegt \u2013 zu finden über die " +
                          "Einstellungen unter „Speedtest-Berichte öffnen“"
                        : "")
                );
                this._statusAnzeige.verbergeNachLesezeit();
                // Nicht _update() direkt: das startete eine zweite
                // Messschleife (Befund K1).
                this._starteMessungNeu();
            } else {
                // Die Meldung bleibt kurz stehen, damit der Grund
                // des Fehlschlags lesbar ist.
                this._statusAnzeige.zeige(ergebnis.meldung);
                this._statusAnzeige.verbergeNach(8);
            }
        });
    }

    /*
     * Wird von der Schaltflaeche im Einstellungsfenster gerufen.
     * Dieser Rueckruf fehlte bisher, weshalb die Schaltflaeche
     * im Applet wirkungslos blieb.
     */
    on_speedtest_starten() {
        this.starteSpeedtest();
    }

    /*
     * Ein Takt der Messschleife: messen, anzeigen, naechsten Takt setzen.
     *
     * Der naechste Takt wird auch dann gesetzt, wenn beim Messen oder
     * Anzeigen ein Fehler auftritt. Sonst bliebe die Anzeige bis zum
     * Neuladen stehen (Befund G2). Nach dem Entfernen des Applets
     * wird nicht mehr gemessen.
     */
    _update() {
        if (this._entfernt)
            return;

        try {
            this._messeUndZeige();
        } catch (e) {
            global.logError(e);
        } finally {
            this._setzeNaechstenTakt();
        }
    }

    _setzeNaechstenTakt() {
        if (this._entfernt)
            return;

        const sekunden = Math.round(
            this._gueltig(this.refreshInterval, 1, 30,
                          DEFAULT_REFRESH_INTERVAL_SECONDS)
        );

        // Der naechste Takt liegt auf einer vollen Taktmarke der
        // Systemuhr, damit Applet und Desklet im selben Moment messen.
        this._timeout = Mainloop.timeout_add(
            Measurement.msBisZumNaechstenTakt(sekunden),
            () => {
                this._timeout = null;
                this._update();
                return false;
            }
        );
    }

    /*
     * Erfasst die Messwerte eigenständig.
     *
     * Es wird bewusst keine vom Desklet bereitgestellte Datei gelesen.
     * Das Applet bleibt dadurch unabhängig davon, ob ein Desklet
     * installiert oder aktiv ist.
     */
    _messeUndZeige() {
        const hardware =
            this._measurement.readHardwareValues();

        const load =
            this._measurement.readCpuLoad();

        const ram =
            this._measurement.readRamUsage();

        const speedtest =
            this._measurement.readSpeedtestValues();

        const network =
            this._measurement.readNetworkSpeed();

        const down =
            this._measurement.formatRate(network.down);

        const up =
            this._measurement.formatRate(network.up);

        const storageFree =
            this._measurement.formatSize(
                this._measurement.readStorageFree()
            );

        this._setValue("cpu_temp", hardware.cpu);
        this._setValue("cpu_load", load);
        this._setValue("ram_load", ram);
        this._setValue("storage_temp", hardware.ssd);
        this._setValue("fan_speed", hardware.fan);

        this._setValue("storage_free", storageFree.value);
        this._setUnit("storage_free", storageFree.unit);

        this._setValue("battery_charge", hardware.batteryCharge);
        this._setUnit("psu_state", hardware.psuState);

        // Warnschwellen: Akku nur im Akkubetrieb, Speicherplatz in
        // Prozent des gemessenen Laufwerks.
        this._bewerteWarnschwellen({
            cpu_temp: hardware.cpu,
            storage_temp: hardware.ssd,
            cpu_load: load,
            ram_load: ram,
            storage_free: this._measurement.readStorageFreeAnteil(),
            battery_charge:
                hardware.psuState === "OFF" ? hardware.batteryCharge : null
        });

        this._setValue("net_down", down.value);
        this._setUnit("net_down", down.unit);

        this._setValue("net_up", up.value);
        this._setUnit("net_up", up.unit);

        if (speedtest) {
            this._setValue("speed_down", speedtest.SPEED_DOWN);
            this._setValue("speed_up", speedtest.SPEED_UP);
            this._setValue("ping", speedtest.PING);
            this._setValue("jitter", speedtest.JITTER);

            const alter =
                this._measurement.readSpeedtestAge(speedtest);

            if (alter) {
                this._setValue("speed_age", alter.value);
                this._setUnit("speed_age", alter.unit);
            }
        }

        if (this._popup && this._popup.visible)
            this._updatePopupPosition();
    }

    on_applet_removed_from_panel() {
        /*
         * Zuerst die Anhaftung aufheben (AP21). Bleibt der
         * Tastaturgriff bestehen, nimmt der Bildschirm keine Eingaben
         * mehr an. Cinnamon loest ihn zwar auch selbst, sobald der
         * Klickfaenger zerstoert wird, doch darauf allein soll es
         * nicht ankommen.
         */
        this._loeseAnzeige();

        // Ab hier wird nicht mehr gemessen und nichts mehr angezeigt.
        this._entfernt = true;

        // Maussignale trennen (Befund G8).
        for (const id of [this._enterId, this._leaveId]) {
            if (id)
                this.actor.disconnect(id);
        }

        this._enterId = null;
        this._leaveId = null;

        if (this._rueckfrage) {
            this._rueckfrage.close();
            this._rueckfrage = null;
        }

        this._trenneFensterSignal();

        if (this._fensterZeitgeber) {
            Mainloop.source_remove(this._fensterZeitgeber);
            this._fensterZeitgeber = null;
        }

        if (this.settings) {
            this.settings.finalize();
            this.settings = null;
        }

        if (this._timeout) {
            Mainloop.source_remove(this._timeout);
            this._timeout = null;
        }

        // Ein laufender Speedtest wird beendet (Befund M2).
        if (this._speedtest)
            this._speedtest.verwerfe();

        if (this._statusAnzeige) {
            this._statusAnzeige.zerstoere();
            this._statusAnzeige = null;
        }

        if (this._popup) {
            this._popup.destroy();
            this._popup = null;
        }

        if (this._klickfaenger) {
            this._klickfaenger.destroy();
            this._klickfaenger = null;
        }
    }
}

function main(metadata, orientation, panel_height, instance_id) {
    return new AVincePulseApplet(
        metadata,
        orientation,
        panel_height,
        instance_id
    );
}
