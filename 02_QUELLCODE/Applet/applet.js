/*
 * aVincePulse
 * Applet – Panel-Symbol und zentrale Hover-Anzeige
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
const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

const Metrics = imports.applets['avincepulse-applet@avince'].metrics;
const Measurement = imports.applets['avincepulse-applet@avince'].measurement;
const HardwareDetection = imports.applets['avincepulse-applet@avince'].hardwareDetection;

const MeasurementProvider = Measurement.MeasurementProvider;
const HardwareDetector = HardwareDetection.HardwareDetector;

const METRICS = Metrics.METRICS;
const METRIC_ORDER = Metrics.METRIC_ORDER;

/*
 * Vorgabewerte.
 *
 * Sie greifen nur, solange die Einstellungen noch nicht geladen
 * sind oder ein Wert ungueltig ist. Massgeblich sind sonst die
 * Werte aus settings-schema.json.
 *
 * Zum Aktualisierungsintervall: Applet und Desklet messen
 * eigenstaendig. Ihre Zeitgeber laufen daher nicht exakt
 * gleichzeitig, wodurch sich einzelne Werte kurzzeitig um einen
 * Messzyklus unterscheiden koennen. Das ist die bewusste Folge
 * der Eigenstaendigkeit beider Komponenten. Gleiche Intervalle
 * in Applet und Desklet lassen den Unterschied nicht auffallen.
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
 * Werte unter 0.45 sollten daher nicht angeboten werden.
 *
 * Der Wert ist ueber die Einstellungen veraenderbar. Das Schema
 * laesst bewusst nur 45 bis 85 Prozent zu.
 */
const DEFAULT_POPUP_OPACITY = 0.55;


class AVincePulseApplet extends Applet.TextIconApplet {
    constructor(metadata, orientation, panel_height, instance_id) {
        super(orientation, panel_height, instance_id);

        this.set_applet_tooltip("aVincePulse");

        this._metadataPath = metadata.path;
        this._timeout = null;
        this._symbolischAktiv = false;

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

        this._applyPanelSymbol();
        this._speedtestRunning = false;
        this._speedtestStatus = null;

        // Zuordnung Messwert-ID -> Anzeigezeile.
        this._rows = {};

        this._measurement = new MeasurementProvider(
            new HardwareDetector()
        );

        this._popup = new St.BoxLayout({
            vertical: true,
            reactive: false,
            visible: false
        });

        this._applyPopupStyle();
        this._buildRows();
        this._applyPopupScale();

        Main.uiGroup.add_child(this._popup);

        this.actor.connect("enter-event", () => {
            this._showPopup();
        });

        this.actor.connect("leave-event", () => {
            this._hidePopup();
        });

        this._update();
    }

    /*
     * Erzeugt für jeden in METRIC_ORDER aufgeführten Messwert
     * genau eine Anzeigezeile.
     *
     * Messwerte, für die auf diesem Gerät kein Sensor gefunden
     * wurde, erhalten keine Zeile.
     */
    _buildRows() {
        const availability =
            this._measurement.getMetricAvailability();

        for (const id of METRIC_ORDER) {
            const metric = METRICS[id];

            if (!metric) {
                global.logError(
                    "aVincePulse: METRIC_ORDER verweist auf einen " +
                    "in METRICS nicht definierten Messwert: " + id
                );
                continue;
            }

            if (availability[id] === false) {
                global.log(
                    "aVincePulse AP08: metric hidden, no sensor -> " + id
                );
                continue;
            }

            const row = this._makeRow(
                metric.label,
                metric.defaultValue,
                metric.unit
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
    on_standardwerte_zuruecksetzen() {
        if (!this.settings)
            return;

        const intervall = DEFAULT_REFRESH_INTERVAL_SECONDS;
        const groesse = Math.round(DEFAULT_POPUP_HEIGHT_RATIO * 100);
        const deckkraft = Math.round(DEFAULT_POPUP_OPACITY * 100);
        const symbol = "icon";

        this.settings.setValue("refresh-interval", intervall);
        this.settings.setValue("popup-height-ratio", groesse);
        this.settings.setValue("popup-opacity", deckkraft);
        this.settings.setValue("panel-symbol", symbol);

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

        this._applyPanelSymbol();
        this._applyPopupStyle();
        this._applyPopupScale();
        this._onRefreshIntervalChanged();

        global.log("aVincePulse AP09: settings reset to defaults");
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
     * Setzt Hintergrundflaeche und Abstaende der Hover-Anzeige.
     * Die Deckkraft stammt aus den Einstellungen.
     */
    _applyPopupStyle() {
        if (!this._popup)
            return;

        const deckkraft =
            this._gueltig(this.popupOpacity, 45, 85,
                          DEFAULT_POPUP_OPACITY * 100) / 100;

        this._popup.set_style(
            "background-color: rgba(0, 0, 0, " + deckkraft + ");" +
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
        if (this._timeout) {
            Mainloop.source_remove(this._timeout);
            this._timeout = null;
        }

        this._update();
    }

    _makeRow(name, value, unit) {
        const row = new St.BoxLayout({
            vertical: false
        });

        const nameLabel = new St.Label({ text: name });
        const valueLabel = new St.Label({ text: value });
        const unitLabel = new St.Label({ text: unit });

        row.add_child(nameLabel);
        row.add_child(valueLabel);
        row.add_child(unitLabel);

        // Schriftgroesse und Spaltenbreiten setzt _applyPopupScale(),
        // da sie von der Bildschirmhoehe und der Zeilenzahl abhaengen.
        return {
            row: row,
            name: nameLabel,
            value: valueLabel,
            unit: unitLabel
        };
    }

    /*
     * Berechnet Schriftgroesse und Spaltenbreiten der Hover-Anzeige
     * aus der Hoehe des Bildschirms und der Anzahl angezeigter Zeilen.
     *
     * Die Anzeige belegt dadurch unabhaengig von Bildschirmgroesse und
     * Messwertanzahl stets etwa denselben Anteil der Bildschirmhoehe.
     */
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

        const commonStyle =
            "font-size: " + fontSize + "px;" +
            "font-weight: 700;" +
            "color: white;" +
            "text-shadow: 0px 0px 8px rgba(0,0,0,0.9);";

        // Spaltenbreiten aus der Schriftgroesse ableiten, damit
        // Beschriftungen bei keiner Groesse abgeschnitten werden.
        const nameWidth = Math.round(fontSize * 5.4);
        const valueWidth = Math.round(fontSize * 4.6);
        const unitWidth = Math.round(fontSize * 3.2);

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

            item.value.set_style(
                commonStyle +
                "width: " + valueWidth + "px;" +
                "text-align: right;"
            );

            item.unit.set_style(
                commonStyle +
                "width: " + unitWidth + "px;" +
                "text-align: left;"
            );
        }

        global.log(
            "aVincePulse AP09: popup scaled - " + zeilen +
            " rows, font " + fontSize + "px, " +
            Math.round(anteil * 100) + "% of " +
            monitor.width + "x" + monitor.height
        );
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

    _showPopup() {
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
        this._popup.hide();
    }

    _updatePopupPosition() {
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

    on_applet_clicked(event) {
        if (this._speedtestRunning)
            return;

        this._speedtestRunning = true;
        this._hidePopup();
        this._showSpeedtestStatus("Internet-Speedtest läuft …");

        try {
            const proc = Gio.Subprocess.new(
                ["/usr/local/bin/librespeed-cli", "--json"],
                Gio.SubprocessFlags.STDOUT_PIPE |
                Gio.SubprocessFlags.STDERR_PIPE
            );

            proc.communicate_utf8_async(null, null, (process, result) => {
                try {
                    const [, stdout, stderr] =
                        process.communicate_utf8_finish(result);

                    if (!process.get_successful())
                        throw new Error(stderr || "LibreSpeed fehlgeschlagen");

                    const data = JSON.parse(stdout)[0];

                    if (
                        data.download === undefined ||
                        data.upload === undefined ||
                        data.ping === undefined ||
                        data.jitter === undefined
                    ) {
                        throw new Error("Unvollständige LibreSpeed-Daten");
                    }

                    const dir =
                        GLib.build_filenamev([
                            GLib.get_home_dir(),
                            ".config",
                            "cinnamon",
                            "spices",
                            "avince-hwmonitor@angelo"
                        ]);

                    GLib.mkdir_with_parents(dir, 0o755);

                    const file =
                        GLib.build_filenamev([
                            dir,
                            "speedtest-values"
                        ]);

                    const text =
                        "SPEED_DOWN=" + Number(data.download).toFixed(2) + "\n" +
                        "SPEED_UP=" + Number(data.upload).toFixed(2) + "\n" +
                        "PING=" + Number(data.ping).toFixed(2) + "\n" +
                        "JITTER=" + Number(data.jitter).toFixed(2) + "\n";

                    GLib.file_set_contents(file, text);

                } catch (e) {
                    global.logError(e);
                }

                this._speedtestRunning = false;
                this._hideSpeedtestStatus();
            });

        } catch (e) {
            global.logError(e);
            this._speedtestRunning = false;
            this._hideSpeedtestStatus();
        }
    }

    _showSpeedtestStatus(text) {
        if (!this._speedtestStatus) {
            this._speedtestStatus = new St.Label({
                text: text,
                style:
                    "font-size: 34px;" +
                    "font-weight: 700;" +
                    "color: white;" +
                    "text-shadow: 0px 0px 8px rgba(0,0,0,0.9);" +
                    "background-color: rgba(0, 0, 0, " +
                    (this._gueltig(this.popupOpacity, 45, 85,
                                   DEFAULT_POPUP_OPACITY * 100) / 100) + ");" +
                    "border-radius: 18px;" +
                    "padding: 28px 40px;"
            });

            Main.uiGroup.add_child(this._speedtestStatus);
        } else {
            this._speedtestStatus.set_text(text);
        }

        this._speedtestStatus.show();

        GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            if (this._speedtestStatus) {
                const monitor = Main.layoutManager.primaryMonitor;

                const x =
                    monitor.x +
                    Math.round(
                        (monitor.width - this._speedtestStatus.width) / 2
                    );

                const y =
                    monitor.y +
                    Math.round(
                        (monitor.height - this._speedtestStatus.height) / 2
                    );

                this._speedtestStatus.set_position(x, y);
            }

            return GLib.SOURCE_REMOVE;
        });
    }

    _hideSpeedtestStatus() {
        if (this._speedtestStatus)
            this._speedtestStatus.hide();
    }

    /*
     * Erfasst die Messwerte eigenständig.
     *
     * Es wird bewusst keine vom Desklet bereitgestellte Datei gelesen.
     * Das Applet bleibt dadurch unabhängig davon, ob ein Desklet
     * installiert oder aktiv ist.
     */
    _update() {
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

        this._setValue("net_down", down.value);
        this._setUnit("net_down", down.unit);

        this._setValue("net_up", up.value);
        this._setUnit("net_up", up.unit);

        if (speedtest) {
            this._setValue("speed_down", speedtest.SPEED_DOWN);
            this._setValue("speed_up", speedtest.SPEED_UP);
            this._setValue("ping", speedtest.PING);
            this._setValue("jitter", speedtest.JITTER);
        }

        if (this._popup.visible)
            this._updatePopupPosition();

        const sekunden = Math.round(
            this._gueltig(this.refreshInterval, 1, 30,
                          DEFAULT_REFRESH_INTERVAL_SECONDS)
        );

        this._timeout = Mainloop.timeout_add_seconds(
            sekunden,
            () => {
                this._update();
                return false;
            }
        );
    }

    on_applet_removed_from_panel() {
        if (this.settings) {
            this.settings.finalize();
            this.settings = null;
        }

        if (this._timeout) {
            Mainloop.source_remove(this._timeout);
            this._timeout = null;
        }

        if (this._speedtestStatus) {
            this._speedtestStatus.destroy();
            this._speedtestStatus = null;
        }

        if (this._popup) {
            this._popup.destroy();
            this._popup = null;
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
