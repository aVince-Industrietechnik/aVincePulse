/*
 * aVincePulse
 * Internet-Speedtest
 *
 * Entwicklungsstand: 0.1.0-dev
 *
 * Kapselt Ausfuehrung, Ablage und Auswertung des Speedtests.
 * Applet und Desklet verwenden dieses Modul gemeinsam, damit der
 * Speedtest aus beiden Komponenten ausgeloest werden kann.
 *
 * Diese Datei ist in Applet und Desklet identisch.
 */

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const ByteArray = imports.byteArray;

/*
 * Moegliche Ablageorte des Speedtest-Programms.
 * Zuerst wird der Suchpfad des Systems durchsucht; diese Liste
 * dient als Ergaenzung fuer Installationen ausserhalb davon.
 */
const PROGRAMM_NAMEN = [
    "librespeed-cli"
];

const ZUSAETZLICHE_PFADE = [
    "/usr/local/bin/librespeed-cli",
    "/usr/bin/librespeed-cli",
    "/opt/librespeed/librespeed-cli",
    "/snap/bin/librespeed-cli"
];

// Messwerte der Ablage; jeder muss als Zahl vorliegen.
const WERTE_SCHLUESSEL = ["SPEED_DOWN", "SPEED_UP", "PING", "JITTER"];

/*
 * Zeitgrenze fuer einen Speedtest in Sekunden. Ein Test dauert auf dem
 * Referenzgeraet rund 35 Sekunden. Haengt das Programm, wird es danach
 * beendet, statt die Meldung "laeuft" dauerhaft stehen zu lassen und
 * jeden weiteren Test zu sperren (Befund M2).
 */
const ZEITGRENZE_SEKUNDEN = 120;

/*
 * Sperrdatei gegen gleichzeitige Tests aus Applet und Desklet. Jede
 * Komponente hat einen eigenen SpeedtestRunner; zwei parallele Tests
 * teilten sich die Bandbreite und lieferten etwa halbe Werte
 * (Befund G1). Eine Sperre, die aelter als die Zeitgrenze plus
 * Reserve ist, gilt als verwaist, etwa nach einem Absturz.
 */
const SPERRDATEI = "speedtest.lock";
const SPERRE_VERFALL_SEKUNDEN = ZEITGRENZE_SEKUNDEN + 30;

var SpeedtestRunner = class SpeedtestRunner {
    constructor() {
        this._laeuft = false;
        this._quelle = "";

        // Laufender Test (Befund M2): Prozess, Abbruch, Zeitgrenze.
        this._prozess = null;
        this._abbruch = null;
        this._zeitgeber = null;
        this._verworfen = false;
        this._zeitUeberschritten = false;
    }

    /*
     * Sucht das Speedtest-Programm.
     *
     * Ein fest verdrahteter Pfad wuerde nur auf Rechnern
     * funktionieren, auf denen das Programm genau dort liegt.
     * Rueckgabe: Pfad oder null.
     */
    findeProgramm() {
        for (const name of PROGRAMM_NAMEN) {
            const gefunden = GLib.find_program_in_path(name);

            if (gefunden)
                return gefunden;
        }

        for (const pfad of ZUSAETZLICHE_PFADE) {
            if (GLib.file_test(pfad, GLib.FileTest.IS_EXECUTABLE))
                return pfad;
        }

        return null;
    }

    istVerfuegbar() {
        return this.findeProgramm() !== null;
    }

    istAktiv() {
        return this._laeuft;
    }

    /*
     * Verzeichnis fuer gemeinsam genutzte Benutzerdaten.
     *
     * Bewusst nicht im Einstellungsordner einer der beiden UUIDs:
     * Applet und Desklet sollen dieselben Speedtest-Werte sehen,
     * unabhaengig davon, welche Komponente den Test ausgeloest hat
     * und ob die andere ueberhaupt installiert ist.
     */
    datenVerzeichnis() {
        return GLib.build_filenamev([
            GLib.get_user_data_dir(),
            "avincepulse"
        ]);
    }

    datenPfad() {
        return GLib.build_filenamev([
            this.datenVerzeichnis(),
            "speedtest-values"
        ]);
    }

    /*
     * Fruehere Ablage aus der Baseline-Version.
     * Wird einmalig uebernommen, damit ein vorhandenes Ergebnis
     * beim Wechsel nicht verloren geht.
     */
    _alterPfad() {
        return GLib.build_filenamev([
            GLib.get_home_dir(),
            ".config",
            "cinnamon",
            "spices",
            "avince-hwmonitor@angelo",
            "speedtest-values"
        ]);
    }

    /*
     * Liest die gespeicherten Werte.
     *
     * Rueckgabe: Objekt mit SPEED_DOWN, SPEED_UP, PING, JITTER und
     * optional TIMESTAMP, oder null wenn noch nie gemessen wurde.
     * Unbrauchbare Einzelwerte erscheinen als "--".
     *
     * Die fruehere Ablage wird nur uebernommen, wenn die neue Datei
     * fehlt. Bis AP19 geschah das auch bei einer beschaedigten neuen
     * Datei, und zwar bei jedem Takt: veraltete Werte erschienen als
     * aktuell und ueberschrieben die neue Datei (Befund G10). Die
     * fruehere Ablage selbst bleibt unangetastet.
     */
    leseWerte() {
        if (GLib.file_test(this.datenPfad(), GLib.FileTest.EXISTS))
            return this._leseDatei(this.datenPfad());

        const alt = this._leseDatei(this._alterPfad());

        // Einmalige Uebernahme in die neue Ablage, nur mit
        // vollstaendigen Werten.
        if (alt && WERTE_SCHLUESSEL.every(k => alt[k] !== "--"))
            this._schreibeWerte(alt);

        return alt;
    }

    _leseDatei(pfad) {
        try {
            const inhalt = this._dateiInhalt(pfad);

            if (inhalt === null)
                return null;

            const roh = {};

            for (const zeile of inhalt.split("\n")) {
                // Kommentarzeilen des erklaerenden Kopfes ueberspringen.
                if (zeile.trim().startsWith("#"))
                    continue;

                const pos = zeile.indexOf("=");

                if (pos > 0) {
                    roh[zeile.substring(0, pos).trim()] =
                        zeile.substring(pos + 1).trim();
                }
            }

            // Nur nicht negative Zahlen werden angezeigt, alles andere
            // als "--". Bis AP19 erschien etwa "abc" ungeprueft.
            const werte = {};

            for (const schluessel of WERTE_SCHLUESSEL) {
                werte[schluessel] = /^\d+(\.\d+)?$/.test(roh[schluessel] || "")
                    ? roh[schluessel]
                    : "--";
            }

            if (/^\d+$/.test(roh.TIMESTAMP || ""))
                werte.TIMESTAMP = roh.TIMESTAMP;

            if (roh.QUELLE)
                werte.QUELLE = roh.QUELLE;

            return werte;

        } catch (e) {
            global.logError(e);
            return null;
        }
    }

    /*
     * Inhalt einer Datei als Text, oder null wenn sie nicht gelesen
     * werden kann. Eine leere Datei ergibt einen leeren Text.
     */
    _dateiInhalt(pfad) {
        try {
            const ergebnis = GLib.file_get_contents(pfad);

            if (!ergebnis[0])
                return null;

            return ByteArray.toString(ergebnis[1]).trim();

        } catch (e) {
            return null;
        }
    }

    _schreibeWerte(werte) {
        try {
            GLib.mkdir_with_parents(this.datenVerzeichnis(), 0o755);

            const zeitpunkt = werte.TIMESTAMP
                ? new Date(Number(werte.TIMESTAMP) * 1000).toLocaleString()
                : "unbekannt";

            /*
             * Die Datei wird maschinell gelesen. Der erklaerende Kopf
             * steht deshalb in Kommentarzeilen, die beim Einlesen
             * uebersprungen werden.
             */
            const text =
                "# aVincePulse - Letzter Internet-Speedtest\n" +
                "# =========================================\n" +
                "#\n" +
                "# Gemessen am : " + zeitpunkt + "\n" +
                "# Gemessen von: " + (werte.QUELLE || "unbekannt") + "\n" +
                "#\n" +
                "# SPEED_DOWN und SPEED_UP in MBit/s, PING und JITTER in ms.\n" +
                "# TIMESTAMP ist der Messzeitpunkt in Sekunden seit 1970.\n" +
                "#\n" +
                "# Diese Datei wird von aVincePulse geschrieben.\n" +
                "# Änderungen von Hand werden beim nächsten Test überschrieben.\n" +
                "\n" +
                "SPEED_DOWN=" + werte.SPEED_DOWN + "\n" +
                "SPEED_UP=" + werte.SPEED_UP + "\n" +
                "PING=" + werte.PING + "\n" +
                "JITTER=" + werte.JITTER + "\n" +
                "TIMESTAMP=" + (werte.TIMESTAMP || "") + "\n" +
                "QUELLE=" + (werte.QUELLE || "") + "\n";

            GLib.file_set_contents(this.datenPfad(), text);
            return true;

        } catch (e) {
            global.logError(e);
            return false;
        }
    }

    /*
     * Schreibt einen bleibenden Bericht ueber die Messung.
     *
     * Die Wertedatei enthaelt immer nur das juengste Ergebnis und
     * wird ueberschrieben. Die Berichte bleiben erhalten und lassen
     * sich dadurch im Verlauf vergleichen. Datum und Uhrzeit im
     * Dateinamen sorgen fuer eine chronologische Sortierung, die
     * Herkunft steht am Anfang.
     *
     * Rueckgabe: Pfad oder null.
     */
    _schreibeBericht(werte) {
        try {
            const verzeichnis = GLib.build_filenamev([
                GLib.get_user_data_dir(),
                "avincepulse",
                "berichte",
                "Speedtest"
            ]);

            GLib.mkdir_with_parents(verzeichnis, 0o755);

            const jetzt = new Date();
            const zwei = z => String(z).padStart(2, "0");

            const stempel =
                jetzt.getFullYear() + "-" +
                zwei(jetzt.getMonth() + 1) + "-" +
                zwei(jetzt.getDate()) + "_" +
                zwei(jetzt.getHours()) + "-" +
                zwei(jetzt.getMinutes()) + "-" +
                zwei(jetzt.getSeconds());

            const quelle = this._quelle || "unbekannt";

            const kuerzel =
                quelle.toLowerCase().indexOf("applet") >= 0
                    ? "aVP-applet"
                    : (quelle.toLowerCase().indexOf("desklet") >= 0
                        ? "aVP-desklet"
                        : "aVP");

            const pfad = GLib.build_filenamev([
                verzeichnis,
                kuerzel + "-speedtest-bericht_" + stempel + ".txt"
            ]);

            const text =
                "aVincePulse - Internet-Speedtest\n" +
                "================================\n" +
                "\n" +
                "Gemessen am  : " + jetzt.toLocaleString() + "\n" +
                "Gemessen von : " + quelle + "\n" +
                "Programm     : " + (this.findeProgramm() || "unbekannt") + "\n" +
                "\n" +
                "Ergebnis\n" +
                "--------\n" +
                "Download : " + werte.SPEED_DOWN + " MBit/s\n" +
                "Upload   : " + werte.SPEED_UP + " MBit/s\n" +
                "Ping     : " + werte.PING + " ms\n" +
                "Jitter   : " + werte.JITTER + " ms\n";

            GLib.file_set_contents(pfad, text);

            return pfad;

        } catch (e) {
            global.logError(e);
            return null;
        }
    }

    /*
     * Alter des letzten erfolgreichen Speedtests.
     *
     * Rueckgabe: Objekt mit Wert und Einheit, passend zur
     * Anzeige in einer Messwertzeile, oder null.
     */
    alterDesErgebnisses(werte) {
        if (!werte)
            return null;

        const zeitpunkt = Number(werte.TIMESTAMP);

        // Ohne gueltigen Zeitpunkt "--" statt null. Bei null blieb bis
        // AP19 das zuletzt angezeigte Alter stehen und wirkte aktuell
        // (Befund G10).
        if (!werte.TIMESTAMP || !Number.isFinite(zeitpunkt) || zeitpunkt <= 0)
            return { value: "--", unit: "min" };

        const jetzt = Math.floor(Date.now() / 1000);
        const sekunden = Math.max(0, jetzt - zeitpunkt);

        /*
         * Bewusst keine Sekundenanzeige.
         *
         * Applet und Desklet messen eigenstaendig und zu versetzten
         * Zeitpunkten. Eine Anzeige in Sekunden liefe in beiden
         * Komponenten sichtbar auseinander und wirkte unruhig,
         * obwohl derselbe Messwert zugrunde liegt. In Minuten
         * gerundet stimmen beide nahezu immer ueberein.
         */
        const minuten = Math.floor(sekunden / 60);

        if (minuten < 60)
            return { value: String(minuten), unit: "min" };

        const stunden = Math.floor(minuten / 60);

        if (stunden < 24)
            return { value: String(stunden), unit: "h" };

        return { value: String(Math.floor(stunden / 24)), unit: "d" };
    }

    /*
     * Fuehrt den Speedtest aus.
     *
     * rueckmeldung wird mit einem Objekt aufgerufen:
     *   { erfolg: true,  werte: {...} }
     *   { erfolg: false, meldung: "..." }
     *
     * Ein fehlgeschlagener Test ueberschreibt vorhandene gueltige
     * Werte nicht.
     */
    /*
     * Bezeichnung der Komponente, die den Test ausloest.
     * Sie wird in der Wertedatei vermerkt.
     */
    setzeQuelle(bezeichnung) {
        this._quelle = bezeichnung;
    }

    starte(rueckmeldung) {
        if (this._laeuft) {
            rueckmeldung({
                erfolg: false,
                meldung: "Es läuft bereits ein Speedtest."
            });
            return;
        }

        const programm = this.findeProgramm();

        if (!programm) {
            rueckmeldung({
                erfolg: false,
                meldung:
                    "Für den Internet-Speedtest wird das Programm " +
                    "librespeed-cli benötigt. Es wurde auf diesem " +
                    "Rechner nicht gefunden."
            });
            return;
        }

        // Laeuft bereits ein Test der anderen Komponente, nicht
        // zusaetzlich starten (Befund G1).
        const fremd = this._fremdeSperre();

        if (fremd) {
            rueckmeldung({
                erfolg: false,
                meldung:
                    "Es läuft bereits ein Internet-Speedtest " +
                    "(gestartet vom " + fremd + ").\n\n" +
                    "Das Ergebnis erscheint in beiden Komponenten."
            });
            return;
        }

        this._laeuft = true;
        this._verworfen = false;
        this._zeitUeberschritten = false;
        this._setzeSperre();

        try {
            const prozess = Gio.Subprocess.new(
                [programm, "--json"],
                Gio.SubprocessFlags.STDOUT_PIPE |
                Gio.SubprocessFlags.STDERR_PIPE
            );

            this._prozess = prozess;
            this._abbruch = new Gio.Cancellable();

            // Haengt das Programm, wird es nach der Zeitgrenze beendet
            // (Befund M2). Der Rueckruf unten meldet dann den Abbruch.
            this._zeitgeber = Mainloop.timeout_add_seconds(
                ZEITGRENZE_SEKUNDEN,
                () => {
                    this._zeitgeber = null;
                    this._zeitUeberschritten = true;
                    this._beendeProzess();
                    return false;
                }
            );

            prozess.communicate_utf8_async(null, this._abbruch, (p, ergebnis) => {
                this._laeuft = false;
                this._prozess = null;
                this._abbruch = null;
                this._entferneZeitgeber();

                // Die Komponente wurde inzwischen entfernt: keine
                // Rueckmeldung mehr an eine nicht vorhandene Anzeige.
                // Die Sperre hat verwerfe() bereits aufgehoben; hier
                // nicht erneut loeschen, sonst traefe es womoeglich die
                // Sperre eines inzwischen gestarteten anderen Tests.
                if (this._verworfen)
                    return;

                this._entferneSperre();

                let antwort;

                try {
                    const [, stdout, stderr] =
                        p.communicate_utf8_finish(ergebnis);

                    if (this._zeitUeberschritten) {
                        throw new Error(
                            "Speedtest nach " + ZEITGRENZE_SEKUNDEN +
                            " s abgebrochen"
                        );
                    }

                    if (!p.get_successful()) {
                        throw new Error(
                            stderr || "Der Speedtest wurde nicht erfolgreich beendet."
                        );
                    }

                    const ausgabe = JSON.parse(stdout);
                    const daten = Array.isArray(ausgabe) ? ausgabe[0] : ausgabe;

                    if (
                        !daten ||
                        !Number.isFinite(Number(daten.download)) ||
                        !Number.isFinite(Number(daten.upload)) ||
                        !Number.isFinite(Number(daten.ping)) ||
                        !Number.isFinite(Number(daten.jitter))
                    ) {
                        throw new Error("Die Messdaten sind unvollständig.");
                    }

                    const werte = {
                        SPEED_DOWN: Number(daten.download).toFixed(2),
                        SPEED_UP: Number(daten.upload).toFixed(2),
                        PING: Number(daten.ping).toFixed(2),
                        JITTER: Number(daten.jitter).toFixed(2),
                        TIMESTAMP: String(Math.floor(Date.now() / 1000)),
                        QUELLE: this._quelle || "unbekannt"
                    };

                    if (!this._schreibeWerte(werte))
                        throw new Error("Das Ergebnis konnte nicht gespeichert werden.");

                    // Zusaetzlich zur Wertedatei, die stets den
                    // aktuellen Stand enthaelt, einen bleibenden
                    // Bericht ablegen.
                    const bericht = this._schreibeBericht(werte);

                    antwort = {
                        erfolg: true,
                        werte: werte,
                        bericht: bericht
                    };

                } catch (e) {
                    global.logError(e);

                    antwort = {
                        erfolg: false,
                        meldung: this._zeitUeberschritten
                            ? "Der Internet-Speedtest wurde nach " +
                              ZEITGRENZE_SEKUNDEN + " Sekunden abgebrochen, " +
                              "da er nicht beendet wurde."
                            : "Der Speedtest ist fehlgeschlagen."
                    };
                }

                // Rueckmeldung ausserhalb von try: Ein Fehler in der
                // Anzeige der Komponente fuehrte bis AP19 dazu, dass
                // nach "Speedtest abgeschlossen" zusaetzlich
                // "fehlgeschlagen" gemeldet wurde (Befund M2).
                try {
                    rueckmeldung(antwort);
                } catch (e) {
                    global.logError(e);
                }
            });

        } catch (e) {
            this._laeuft = false;
            this._prozess = null;
            this._abbruch = null;
            this._entferneZeitgeber();
            this._entferneSperre();
            global.logError(e);

            rueckmeldung({
                erfolg: false,
                meldung: "Der Speedtest konnte nicht gestartet werden."
            });
        }
    }

    /*
     * Verwirft einen laufenden Speedtest, etwa beim Entfernen der
     * Komponente. Das Programm wird beendet, die Sperre aufgehoben,
     * eine Rueckmeldung erfolgt nicht mehr.
     */
    verwerfe() {
        this._verworfen = true;

        if (this._abbruch)
            this._abbruch.cancel();

        this._beendeProzess();
        this._entferneZeitgeber();

        if (this._laeuft)
            this._entferneSperre();

        this._laeuft = false;
    }

    _beendeProzess() {
        try {
            if (this._prozess)
                this._prozess.force_exit();
        } catch (e) {
            global.logError(e);
        }
    }

    _entferneZeitgeber() {
        if (this._zeitgeber) {
            Mainloop.source_remove(this._zeitgeber);
            this._zeitgeber = null;
        }
    }

    _sperrPfad() {
        return GLib.build_filenamev([this.datenVerzeichnis(), SPERRDATEI]);
    }

    _setzeSperre() {
        try {
            GLib.mkdir_with_parents(this.datenVerzeichnis(), 0o755);
            GLib.file_set_contents(
                this._sperrPfad(),
                Math.floor(Date.now() / 1000) + "\n" +
                (this._quelle || "unbekannt") + "\n"
            );
        } catch (e) {
            global.logError(e);
        }
    }

    _entferneSperre() {
        try {
            const datei = Gio.File.new_for_path(this._sperrPfad());

            if (datei.query_exists(null))
                datei.delete(null);
        } catch (e) {
            global.logError(e);
        }
    }

    /*
     * Name der Komponente, die gerade einen Test ausfuehrt, oder null.
     * Eine veraltete Sperre wird ignoriert.
     */
    _fremdeSperre() {
        const inhalt = this._dateiInhalt(this._sperrPfad());

        if (!inhalt)
            return null;

        const [zeit, quelle] = inhalt.split("\n");
        const alter = Math.floor(Date.now() / 1000) - Number(zeit);

        if (!Number.isFinite(alter) || alter < 0 || alter > SPERRE_VERFALL_SEKUNDEN)
            return null;

        return quelle || "unbekannt";
    }
};


/*
 * Bildschirmmittige Rueckmeldung fuer laenger laufende Vorgaenge.
 *
 * Applet und Desklet verwenden dieselbe Darstellung, damit der
 * Ablauf unabhaengig davon gleich aussieht, welche Komponente den
 * Vorgang ausgeloest hat.
 *
 * Verwendet wird sie beim Speedtest und bei der Hardwareerkennung.
 * Sie liegt hier, weil sie mit dem Speedtest entstanden ist; bei
 * weiterer Verwendung gehoert sie in ein eigenes Modul.
 */
/*
 * Deckkraft der Flaeche hinter den Meldungen in der Bildschirmmitte.
 * Fest, siehe zeige() (Befund G3 aus AP19).
 */
const MELDUNG_DECKKRAFT = 0.55;

var StatusAnzeige = class StatusAnzeige {
    constructor() {
        this._label = null;
        this._timeout = null;
    }

    /*
     * Zeigt einen Text mittig auf dem Bildschirm.
     *
     * Die Flaeche hinter der Meldung verwendet immer 0,55 und folgt
     * bewusst nicht der Einstellung "Hintergrundflaeche" (Befund G3
     * aus AP19, Entscheidung des Nutzers vom 20.09.2026). Meldungen
     * sind kurzlebig und wichtig; sie sollen unabhaengig davon lesbar
     * sein, wie durchsichtig der Benutzer seine Anzeige eingestellt
     * hat. 0,55 ergibt gegen reinweissen Inhalt 4,7 : 1.
     */
    zeige(text) {
        this._entferneZeitgeber();

        const opazitaet = MELDUNG_DECKKRAFT;

        const monitor = Main.layoutManager.primaryMonitor;

        /*
         * Schrift- und Hoechstbreite an den Bildschirm koppeln.
         *
         * Eine feste Groesse fuehrt auf kleinen Bildschirmen dazu,
         * dass die Meldung ueber den Rand hinauslaeuft und darunter
         * liegende Fenster verdeckt.
         */
        const schrift = Math.round(
            Math.max(16, Math.min(32, monitor.height * 0.024))
        );

        const hoechstbreite = Math.round(monitor.width * 0.55);

        const stil =
            "font-size: " + schrift + "px;" +
            "font-weight: 700;" +
            "color: white;" +
            "text-shadow: 0px 0px 8px rgba(0,0,0,0.9);" +
            "background-color: rgba(0, 0, 0, " + opazitaet + ");" +
            "border-radius: 18px;" +
            "padding: 24px 32px;" +
            "max-width: " + hoechstbreite + "px;";

        /*
         * Die Flaeche wird fuer jede Meldung neu angelegt. Eine
         * wiederverwendete Flaeche behielt die Groesse eines vorherigen
         * kurzen Textes: Nach "Hardware wird neu erkannt ..." zeigte die
         * folgende neunzeilige Meldung nur ihre erste Zeile (gemessen:
         * 77 statt 367 Pixel Hoehe).
         */
        if (this._label) {
            this._label.destroy();
            this._label = null;
        }

        // Zunaechst unsichtbar: Eine neue Flaeche steht anfangs oben
        // links (0,0) und wird erst in die Mitte gesetzt, sobald ihre
        // Groesse feststeht. Ohne das blitzte sie dort kurz auf.
        this._label = new St.Label({ text: text, style: stil, opacity: 0 });
        Main.uiGroup.add_child(this._label);

        // Lange Meldungen umbrechen statt ueber den Rand laufen lassen.
        try {
            this._label.clutter_text.set_line_wrap(true);
            this._label.clutter_text.set_line_alignment(1);
        } catch (e) {
            global.logError(e);
        }

        this._label.show();

        const label = this._label;

        // Die Groesse steht erst nach dem Zeichnen fest. Erst dann wird
        // die Flaeche mittig gesetzt und sichtbar gemacht. Gehoert die
        // Flaeche inzwischen zu einer neueren Meldung, bleibt sie
        // unangetastet.
        GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            if (label === this._label && label.visible) {
                label.set_position(
                    monitor.x + Math.round((monitor.width - label.width) / 2),
                    monitor.y + Math.round((monitor.height - label.height) / 2)
                );
                label.opacity = 255;
            }

            return GLib.SOURCE_REMOVE;
        });
    }

    verberge() {
        this._entferneZeitgeber();

        if (this._label)
            this._label.hide();
    }

    /*
     * Blendet die Meldung nach der angegebenen Zeit aus, damit
     * eine Fehlermeldung lesbar bleibt.
     */
    verbergeNach(sekunden) {
        this._entferneZeitgeber();

        this._timeout = Mainloop.timeout_add_seconds(sekunden, () => {
            this._timeout = null;
            this.verberge();
            return false;
        });
    }

    /*
     * Blendet die Meldung nach einer Zeit aus, die sich nach ihrer
     * Laenge richtet: 1 Sekunde plus 0,2 Sekunden je Wort, mindestens
     * 2,5 und hoechstens 10 Sekunden. Kurze Hinweise verschwinden so
     * rasch, lange bleiben lesbar.
     *
     * Fehlermeldungen verwenden weiterhin verbergeNach() mit fester
     * Zeit, damit sie nicht uebersehen werden.
     */
    verbergeNachLesezeit() {
        const text = this._label ? this._label.get_text() : "";
        const woerter = text.split(/\s+/).filter(w => w !== "").length;

        const millisekunden = Math.round(
            Math.max(2500, Math.min(10000, 1000 + woerter * 200))
        );

        this._entferneZeitgeber();

        this._timeout = Mainloop.timeout_add(millisekunden, () => {
            this._timeout = null;
            this.verberge();
            return false;
        });
    }

    _entferneZeitgeber() {
        if (this._timeout) {
            Mainloop.source_remove(this._timeout);
            this._timeout = null;
        }
    }

    zerstoere() {
        this._entferneZeitgeber();

        if (this._label) {
            this._label.destroy();
            this._label = null;
        }
    }
};
