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

var SpeedtestRunner = class SpeedtestRunner {
    constructor() {
        this._laeuft = false;
        this._quelle = "";
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
     * optional TIMESTAMP, oder null wenn keine gueltigen Werte
     * vorliegen.
     */
    leseWerte() {
        let werte = this._leseDatei(this.datenPfad());

        if (!werte) {
            werte = this._leseDatei(this._alterPfad());

            // Einmalige Uebernahme in die neue Ablage.
            if (werte)
                this._schreibeWerte(werte);
        }

        return werte;
    }

    _leseDatei(pfad) {
        try {
            const inhalt = this._dateiInhalt(pfad);

            if (!inhalt)
                return null;

            const werte = {};

            for (const zeile of inhalt.split("\n")) {
                // Kommentarzeilen des erklaerenden Kopfes ueberspringen.
                if (zeile.trim().startsWith("#"))
                    continue;

                const pos = zeile.indexOf("=");

                if (pos > 0) {
                    werte[zeile.substring(0, pos)] =
                        zeile.substring(pos + 1);
                }
            }

            if (
                werte.SPEED_DOWN === undefined ||
                werte.SPEED_UP === undefined ||
                werte.PING === undefined ||
                werte.JITTER === undefined
            )
                return null;

            return werte;

        } catch (e) {
            global.logError(e);
            return null;
        }
    }

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
                "# Aenderungen von Hand werden beim naechsten Test ueberschrieben.\n" +
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
        if (!werte || !werte.TIMESTAMP)
            return null;

        const zeitpunkt = Number(werte.TIMESTAMP);

        if (!Number.isFinite(zeitpunkt) || zeitpunkt <= 0)
            return null;

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

        this._laeuft = true;

        try {
            const prozess = Gio.Subprocess.new(
                [programm, "--json"],
                Gio.SubprocessFlags.STDOUT_PIPE |
                Gio.SubprocessFlags.STDERR_PIPE
            );

            prozess.communicate_utf8_async(null, null, (p, ergebnis) => {
                this._laeuft = false;

                try {
                    const [, stdout, stderr] =
                        p.communicate_utf8_finish(ergebnis);

                    if (!p.get_successful()) {
                        throw new Error(
                            stderr || "Der Speedtest wurde nicht erfolgreich beendet."
                        );
                    }

                    const daten = JSON.parse(stdout)[0];

                    if (
                        !daten ||
                        daten.download === undefined ||
                        daten.upload === undefined ||
                        daten.ping === undefined ||
                        daten.jitter === undefined
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

                    rueckmeldung({
                        erfolg: true,
                        werte: werte,
                        bericht: bericht
                    });

                } catch (e) {
                    global.logError(e);

                    rueckmeldung({
                        erfolg: false,
                        meldung: "Der Speedtest ist fehlgeschlagen."
                    });
                }
            });

        } catch (e) {
            this._laeuft = false;
            global.logError(e);

            rueckmeldung({
                erfolg: false,
                meldung: "Der Speedtest konnte nicht gestartet werden."
            });
        }
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
var StatusAnzeige = class StatusAnzeige {
    constructor() {
        this._label = null;
        this._timeout = null;
    }

    /*
     * Zeigt einen Text mittig auf dem Bildschirm.
     * deckkraft liegt zwischen 0 und 1; fehlt der Wert, wird ein
     * gut lesbarer Vorgabewert verwendet.
     */
    zeige(text, deckkraft) {
        this._entferneZeitgeber();

        const opazitaet =
            Number.isFinite(Number(deckkraft))
                ? Math.max(0.45, Math.min(0.85, Number(deckkraft)))
                : 0.55;

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

        if (!this._label) {
            this._label = new St.Label({ text: text, style: stil });
            Main.uiGroup.add_child(this._label);
        } else {
            this._label.set_text(text);
            this._label.set_style(stil);
        }

        // Lange Meldungen umbrechen statt ueber den Rand laufen lassen.
        try {
            this._label.clutter_text.set_line_wrap(true);
            this._label.clutter_text.set_line_alignment(1);
        } catch (e) {
            global.logError(e);
        }

        this._label.show();

        // Die Groesse steht erst nach dem Zeichnen fest.
        GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            if (this._label && this._label.visible) {
                this._label.set_position(
                    monitor.x + Math.round((monitor.width - this._label.width) / 2),
                    monitor.y + Math.round((monitor.height - this._label.height) / 2)
                );
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
