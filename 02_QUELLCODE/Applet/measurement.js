/*
 * aVincePulse
 * Measurement Layer
 *
 * Entwicklungsstand: 0.1.0-dev
 *
 * Zuständig für die Erfassung und Aufbereitung der Messwerte.
 * Darstellung und UI bleiben in desklet.js bzw. applet.js.
 *
 * Diese Datei ist in Applet und Desklet identisch.
 *
 * Der HardwareDetector wird bewusst nicht hier importiert, sondern
 * beim Erzeugen übergeben. Cinnamon Spices verlangt für Applet und
 * Desklet getrennte Pakete mit eigener UUID; ein fest verdrahteter
 * Importpfad würde die beiden Kopien dieser Datei auseinanderlaufen
 * lassen. Der Pfad steht deshalb nur in desklet.js und applet.js.
 *
 * Netzwerkschnittstelle und Laufwerk fuer den freien Speicherplatz
 * koennen vom Benutzer gewaehlt werden. Ohne Wahl, mit "auto" oder wenn
 * die Wahl nicht vorhanden ist, gilt die Schnittstelle der
 * Standardverbindung bzw. die Systempartition "/".
 */

// Dateisystemtypen, die trotz eines Geraets unter /dev kein
// sinnvolles Laufwerk fuer den freien Speicherplatz sind.
const KEIN_LAUFWERK_TYPEN = ["squashfs"];

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const ByteArray = imports.byteArray;

var MeasurementProvider = class MeasurementProvider {
    constructor(hardwareDetector, speedtestRunner) {
        this._hardwareDetector = hardwareDetector;
        this._speedtestRunner = speedtestRunner;

        this._lastRx = null;
        this._lastTx = null;
        this._lastNetTime = null;
        this._lastInterface = null;

        this._lastCpuTotal = null;
        this._lastCpuIdle = null;

        // Auswahl des Benutzers; "auto" verhaelt sich wie bisher.
        this._netzAuswahl = "auto";
        this._laufwerkAuswahl = "auto";
    }

    /*
     * Uebernimmt die gewaehlte Netzwerkschnittstelle (Name wie
     * "wlp2s0") oder "auto". Wirkt ab der naechsten Messung.
     */
    setzeNetzwerkAuswahl(name) {
        this._netzAuswahl =
            typeof name === "string" && /^[A-Za-z0-9_.:@-]+$/.test(name) &&
            name !== "." && name !== ".."
                ? name
                : "auto";
    }

    /*
     * Uebernimmt das gewaehlte Laufwerk (Kennung wie "uuid:...")
     * oder "auto". Wirkt ab der naechsten Messung.
     */
    setzeLaufwerkAuswahl(kennung) {
        this._laufwerkAuswahl =
            typeof kennung === "string" && kennung !== ""
                ? kennung
                : "auto";
    }

    readCpuLoad() {
        try {
            const text = this._readFile("/proc/stat");

            if (!text)
                return "--";

            const line = text.split("\n")[0];
            const parts = line.trim().split(/\s+/);

            if (parts[0] !== "cpu")
                return "--";

            const values = parts.slice(1).map(Number);

            const idle =
                (values[3] || 0) +
                (values[4] || 0);

            const total =
                values.reduce((sum, value) => sum + value, 0);

            if (
                this._lastCpuTotal === null ||
                this._lastCpuIdle === null
            ) {
                this._lastCpuTotal = total;
                this._lastCpuIdle = idle;
                return "--";
            }

            const totalDelta = total - this._lastCpuTotal;
            const idleDelta = idle - this._lastCpuIdle;

            this._lastCpuTotal = total;
            this._lastCpuIdle = idle;

            if (totalDelta <= 0)
                return "--";

            const load =
                100 * (totalDelta - idleDelta) / totalDelta;

            return String(
                Math.round(Math.max(0, Math.min(100, load)))
            );

        } catch (e) {
            global.logError(e);
            return "--";
        }
    }

    readRamUsage() {
        try {
            const text = this._readFile("/proc/meminfo");

            if (!text)
                return "--";

            const totalMatch =
                text.match(/^MemTotal:\s+(\d+)\s+kB/m);

            const availableMatch =
                text.match(/^MemAvailable:\s+(\d+)\s+kB/m);

            if (!totalMatch || !availableMatch)
                return "--";

            const total = Number(totalMatch[1]);
            const available = Number(availableMatch[1]);

            if (total <= 0)
                return "--";

            const used =
                100 * (total - available) / total;

            return String(
                Math.round(Math.max(0, Math.min(100, used)))
            );

        } catch (e) {
            global.logError(e);
            return "--";
        }
    }

    /*
     * Liest die gespeicherten Speedtest-Werte.
     * Ablage und Format verantwortet speedtest.js.
     */
    readSpeedtestValues() {
        if (!this._speedtestRunner)
            return null;

        return this._speedtestRunner.leseWerte();
    }

    /*
     * Alter des letzten erfolgreichen Speedtests, aufbereitet
     * fuer die Anzeige in einer Messwertzeile.
     */
    readSpeedtestAge(werte) {
        if (!this._speedtestRunner)
            return null;

        return this._speedtestRunner.alterDesErgebnisses(werte);
    }

    readHardwareValues() {
        return this._hardwareDetector.readValues();
    }

    /*
     * Tauscht die Hardwareerkennung gegen eine neu durchgefuehrte aus.
     *
     * Die Erkennung laeuft sonst nur einmal beim Laden. Aendert sich
     * die Hardware oder wird ein Treiber verzoegert geladen, bliebe
     * ein Messwert bis zum naechsten Neustart verschwunden.
     */
    setHardwareDetector(hardwareDetector) {
        this._hardwareDetector = hardwareDetector;
    }

    /*
     * Reicht die Verfuegbarkeit der hardwareabhaengigen Messwerte
     * an die Anzeigeschicht weiter.
     */
    getMetricAvailability() {
        return this._hardwareDetector.getAvailability();
    }

    readNetworkSpeed() {
        const iface = this._aktiveSchnittstelle();

        if (!iface)
            return { down: 0, up: 0 };

        const rxText = this._readFile(
            "/sys/class/net/" + iface + "/statistics/rx_bytes"
        );

        const txText = this._readFile(
            "/sys/class/net/" + iface + "/statistics/tx_bytes"
        );

        if (rxText === null || txText === null)
            return { down: 0, up: 0 };

        const rx = Number(rxText);
        const tx = Number(txText);
        const now = GLib.get_monotonic_time() / 1000000;

        if (
            this._lastRx === null ||
            this._lastTx === null ||
            this._lastNetTime === null ||
            this._lastInterface !== iface
        ) {
            this._lastRx = rx;
            this._lastTx = tx;
            this._lastNetTime = now;
            this._lastInterface = iface;

            return { down: 0, up: 0 };
        }

        const elapsed = now - this._lastNetTime;

        let down = 0;
        let up = 0;

        if (elapsed > 0) {
            down = Math.max(
                0,
                (rx - this._lastRx) / elapsed
            );

            up = Math.max(
                0,
                (tx - this._lastTx) / elapsed
            );
        }

        this._lastRx = rx;
        this._lastTx = tx;
        this._lastNetTime = now;
        this._lastInterface = iface;

        return { down, up };
    }

    formatRate(bytesPerSecond) {
        if (bytesPerSecond >= 1024 * 1024 * 1024) {
            return {
                value:
                    (bytesPerSecond /
                    (1024 * 1024 * 1024)).toFixed(1),
                unit: "GB/s"
            };
        }

        if (bytesPerSecond >= 1024 * 1024) {
            return {
                value:
                    (bytesPerSecond /
                    (1024 * 1024)).toFixed(1),
                unit: "MB/s"
            };
        }

        if (bytesPerSecond >= 1024) {
            return {
                value:
                    (bytesPerSecond / 1024).toFixed(1),
                unit: "KB/s"
            };
        }

        return {
            value:
                Math.round(bytesPerSecond).toString(),
            unit: "B/s"
        };
    }

    /*
     * Freier Speicherplatz des gewaehlten Laufwerks, sonst der
     * Systempartition.
     *
     * Die Abfrage erfolgt ueber GIO und damit ausschliesslich fuer das
     * Dateisystem, in dem der Pfad liegt. Netzlaufwerke werden bewusst
     * nicht angeboten: Die Abfrage laeuft bei jedem Takt, und ein nicht
     * erreichbares Netzlaufwerk koennte die Oberflaeche blockieren.
     *
     * Rueckgabe in Byte, oder null wenn der Wert nicht ermittelbar ist.
     */
    readStorageFree() {
        return this._freierPlatz(this._laufwerk().pfad);
    }

    /*
     * Freier Speicherplatz des gemessenen Laufwerks in Prozent seiner
     * Groesse, fuer die Warnschwellen (AP18). null, wenn nicht
     * ermittelbar.
     */
    readStorageFreeAnteil() {
        try {
            const info = Gio.File.new_for_path(this._laufwerk().pfad)
                .query_filesystem_info(
                    "filesystem::free,filesystem::size",
                    null
                );

            const frei = info.get_attribute_uint64("filesystem::free");
            const gesamt = info.get_attribute_uint64("filesystem::size");

            if (!Number.isFinite(frei) || !(gesamt > 0))
                return null;

            return frei / gesamt * 100;

        } catch (e) {
            return null;
        }
    }

    _freierPlatz(pfad) {
        try {
            const file = Gio.File.new_for_path(pfad);

            const info = file.query_filesystem_info(
                "filesystem::free",
                null
            );

            if (!info)
                return null;

            const free =
                info.get_attribute_uint64("filesystem::free");

            if (!Number.isFinite(free) || free < 0)
                return null;

            return free;

        } catch (e) {
            global.logError(e);
            return null;
        }
    }

    /*
     * Formatiert eine Byte-Angabe als Speichergroesse.
     * Die Einheit wird automatisch gewaehlt.
     */
    formatSize(bytes) {
        if (bytes === null || !Number.isFinite(bytes)) {
            return {
                value: "--",
                unit: "GB"
            };
        }

        if (bytes >= 1024 * 1024 * 1024 * 1024) {
            return {
                value:
                    (bytes /
                    (1024 * 1024 * 1024 * 1024)).toFixed(1),
                unit: "TB"
            };
        }

        if (bytes >= 1024 * 1024 * 1024) {
            return {
                value:
                    (bytes /
                    (1024 * 1024 * 1024)).toFixed(1),
                unit: "GB"
            };
        }

        return {
            value:
                (bytes / (1024 * 1024)).toFixed(0),
            unit: "MB"
        };
    }

    _readFile(path) {
        try {
            const result = GLib.file_get_contents(path);

            if (!result[0])
                return null;

            return ByteArray.toString(result[1]).trim();
        } catch (e) {
            return null;
        }
    }

    /*
     * Schnittstelle der Standardverbindung ins Internet.
     *
     * Gelesen aus /proc/net/route statt ueber "ip route": Bisher wurde
     * dafuer bei jedem Takt ein eigenes Programm gestartet. Gibt es
     * mehrere Standardrouten, gilt die mit der kleinsten Metrik, wie
     * bei "ip route".
     */
    _getDefaultInterface() {
        const text = this._readFile("/proc/net/route");

        if (!text)
            return null;

        let beste = null;
        let besteMetrik = Infinity;

        for (const zeile of text.split("\n").slice(1)) {
            const teile = zeile.trim().split(/\s+/);

            if (teile.length < 8)
                continue;

            const ziel = teile[1];
            const flags = parseInt(teile[3], 16);
            const metrik = Number(teile[6]);
            const maske = teile[7];

            // Standardroute: Ziel und Maske 0, Route aktiv (RTF_UP).
            if (ziel !== "00000000" || maske !== "00000000" || !(flags & 0x1))
                continue;

            if (metrik < besteMetrik) {
                beste = teile[0];
                besteMetrik = metrik;
            }
        }

        return beste;
    }

    /*
     * Gemessene Schnittstelle: die gewaehlte, sofern vorhanden,
     * sonst die der Standardverbindung.
     */
    _aktiveSchnittstelle() {
        if (
            this._netzAuswahl !== "auto" &&
            GLib.file_test(
                "/sys/class/net/" + this._netzAuswahl,
                GLib.FileTest.EXISTS
            )
        )
            return this._netzAuswahl;

        return this._getDefaultInterface();
    }

    /*
     * Alle Netzwerkschnittstellen ausser der internen (lo), mit Art
     * und Zustand. Virtuelle Schnittstellen werden mit aufgefuehrt,
     * da darunter auch VPN-Verbindungen fallen.
     */
    _schnittstellen() {
        const liste = [];

        try {
            const verzeichnis = Gio.File.new_for_path("/sys/class/net");
            const enumerator = verzeichnis.enumerate_children(
                "standard::name",
                Gio.FileQueryInfoFlags.NONE,
                null
            );

            let info;

            while ((info = enumerator.next_file(null)) !== null) {
                const name = info.get_name();

                if (name === "lo")
                    continue;

                const basis = "/sys/class/net/" + name;

                liste.push({
                    name: name,
                    art: this._schnittstellenArt(name, basis),
                    verbunden: this._istVerbunden(basis)
                });
            }

            enumerator.close(null);

        } catch (e) {
            global.logError(e);
        }

        return liste.sort((a, b) => a.name.localeCompare(b.name));
    }

    _schnittstellenArt(name, basis) {
        const vorhanden = pfad =>
            GLib.file_test(basis + pfad, GLib.FileTest.EXISTS);

        const uevent = this._readFile(basis + "/uevent") || "";

        if (vorhanden("/wireless") || vorhanden("/phy80211"))
            return "WLAN";

        if (/DEVTYPE=wwan/.test(uevent) || name.startsWith("ww"))
            return "Mobilfunk";

        if (
            this._readFile(basis + "/type") === "65534" ||
            /DEVTYPE=wireguard/.test(uevent) ||
            /^(tun|tap|wg|ppp|vpn)/.test(name)
        )
            return "VPN";

        // Ohne zugehoeriges Geraet ist die Schnittstelle rein virtuell,
        // etwa eine Bruecke fuer virtuelle Maschinen oder Docker.
        if (!vorhanden("/device"))
            return "virtuell";

        return "LAN";
    }

    /*
     * VPN-Schnittstellen melden als Zustand haeufig "unknown", auch
     * wenn sie aktiv sind. Dann entscheiden die Flags UP und RUNNING.
     */
    _istVerbunden(basis) {
        const zustand = this._readFile(basis + "/operstate");

        if (zustand === "up")
            return true;

        if (zustand !== "unknown")
            return false;

        const flags = parseInt(this._readFile(basis + "/flags") || "0", 16);

        return (flags & 0x41) === 0x41;
    }

    /*
     * Angebot fuer das Auswahlfeld der Netzwerkschnittstelle in der
     * Form { Anzeigetext: Name }, wie Cinnamon sie erwartet.
     */
    getNetzwerkOptionen(aktuelleWahl) {
        const optionen = {};
        const liste = this._schnittstellen();
        const standard = this._getDefaultInterface();
        const beschreibe = s => s.name + " – " + s.art;

        const std = liste.find(s => s.name === standard);

        optionen[
            "Automatisch (" +
            (std ? beschreibe(std) : "derzeit keine Verbindung") +
            ")"
        ] = "auto";

        for (const s of liste) {
            let text = beschreibe(s) + "  ·  " +
                (s.verbunden ? "verbunden" : "getrennt");

            while (text in optionen)
                text += " ";

            optionen[text] = s.name;
        }

        if (
            aktuelleWahl &&
            aktuelleWahl !== "auto" &&
            !liste.some(s => s.name === aktuelleWahl)
        )
            optionen["Nicht gefunden: " + aktuelleWahl] = aktuelleWahl;

        return optionen;
    }

    /*
     * Alle lokal eingehaengten Laufwerke.
     *
     * Beruecksichtigt werden nur Dateisysteme auf einem Geraet unter
     * /dev. Netzlaufwerke, tmpfs, proc und aehnliche fallen dadurch
     * heraus, ebenso eingehaengte Programmpakete (squashfs auf
     * /dev/loop).
     *
     * Kennung ist die UUID des Dateisystems. Ein USB-Stick wird so
     * wiedererkannt, auch wenn er beim naechsten Mal an anderer
     * Stelle eingehaengt wird. Ist mehrfach dasselbe Dateisystem
     * eingehaengt, zaehlt der erste Einhaengeort.
     */
    _laufwerke() {
        const text = this._readFile("/proc/self/mounts") || "";
        const uuids = this._uuidsNachGeraet();
        const liste = [];
        const vorhanden = {};

        for (const zeile of text.split("\n")) {
            const teile = zeile.split(" ");

            if (teile.length < 3)
                continue;

            const geraet = this._entschluessele(teile[0]);
            const pfad = this._entschluessele(teile[1]);
            const typ = teile[2];

            if (
                !geraet.startsWith("/dev/") ||
                geraet.startsWith("/dev/loop") ||
                KEIN_LAUFWERK_TYPEN.includes(typ)
            )
                continue;

            const kern = this._kernelName(geraet);
            const kennung = uuids[kern]
                ? "uuid:" + uuids[kern]
                : "dev:" + kern;

            if (vorhanden[kennung])
                continue;

            vorhanden[kennung] = true;

            liste.push({
                kennung: kennung,
                pfad: pfad,
                geraet: GLib.path_get_basename(geraet),
                typ: typ
            });
        }

        return liste;
    }

    /*
     * Gemessenes Laufwerk: das gewaehlte, sofern eingehaengt,
     * sonst die Systempartition.
     */
    _laufwerk() {
        if (this._laufwerkAuswahl !== "auto") {
            const gewaehlt = this._laufwerke()
                .find(l => l.kennung === this._laufwerkAuswahl);

            if (gewaehlt)
                return gewaehlt;
        }

        return { kennung: "auto", pfad: "/" };
    }

    getLaufwerkOptionen(aktuelleWahl) {
        const optionen = {};
        const liste = this._laufwerke();
        const beschreibe = l =>
            l.pfad + " – " + l.geraet + "  ·  " + l.typ +
            "  ·  " + this._platzText(l.pfad);

        const system = liste.find(l => l.pfad === "/");

        optionen[
            "Automatisch (" +
            (system ? "/ – " + system.geraet + ", " +
                this._platzText("/") : "/") +
            ")"
        ] = "auto";

        for (const l of liste) {
            let text = beschreibe(l);

            while (text in optionen)
                text += " ";

            optionen[text] = l.kennung;
        }

        if (
            aktuelleWahl &&
            aktuelleWahl !== "auto" &&
            !liste.some(l => l.kennung === aktuelleWahl)
        )
            optionen["Nicht eingehängt: " + aktuelleWahl] = aktuelleWahl;

        return optionen;
    }

    _platzText(pfad) {
        const groesse = this.formatSize(this._freierPlatz(pfad));

        return groesse.value.replace(".", ",") + " " + groesse.unit + " frei";
    }

    // Kernelname eines Geraets, etwa "dm-0" fuer /dev/mapper/...
    _kernelName(geraet) {
        try {
            return GLib.path_get_basename(GLib.file_read_link(geraet));
        } catch (e) {
            return GLib.path_get_basename(geraet);
        }
    }

    // Zuordnung Kernelname -> Dateisystem-UUID.
    _uuidsNachGeraet() {
        const zuordnung = {};

        try {
            const verzeichnis = Gio.File.new_for_path("/dev/disk/by-uuid");
            const enumerator = verzeichnis.enumerate_children(
                "standard::name",
                Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
                null
            );

            let info;

            while ((info = enumerator.next_file(null)) !== null) {
                const uuid = info.get_name();

                try {
                    const ziel = GLib.file_read_link(
                        "/dev/disk/by-uuid/" + uuid
                    );

                    zuordnung[GLib.path_get_basename(ziel)] = uuid;
                } catch (e) {
                    // Eintrag ohne lesbares Ziel: uebergehen.
                }
            }

            enumerator.close(null);

        } catch (e) {
            // Ohne by-uuid wird das Geraet selbst als Kennung verwendet.
        }

        return zuordnung;
    }

    // /proc/self/mounts schreibt Leerzeichen und aehnliches oktal (\040).
    _entschluessele(text) {
        return text.replace(
            /\\([0-7]{3})/g,
            (treffer, oktal) => String.fromCharCode(parseInt(oktal, 8))
        );
    }

    /*
     * Berichtsteil ueber Netzwerkschnittstellen und Laufwerke,
     * angehaengt an den Hardwarebericht.
     */
    berichtText() {
        const zeilen = [];
        const aktiv = this._aktiveSchnittstelle();
        const herkunft = (auswahl, gefunden) =>
            auswahl === "auto"
                ? "automatisch"
                : gefunden
                    ? "manuell gewählt"
                    : "automatisch – gewählt war " + auswahl + ", nicht vorhanden";

        zeilen.push("");
        zeilen.push("Netzwerkschnittstellen");
        zeilen.push("----------------------");
        zeilen.push(
            "Gemessen: " + (aktiv || "keine") + "  (" +
            herkunft(this._netzAuswahl, aktiv === this._netzAuswahl) + ")"
        );
        zeilen.push("");

        const netz = (name, art, zustand, genutzt) =>
            name.padEnd(16) + art.padEnd(12) + zustand.padEnd(12) + genutzt;

        zeilen.push(netz("Name", "Art", "Zustand", "Verwendet"));
        zeilen.push(netz("----", "---", "-------", "---------"));

        for (const s of this._schnittstellen()) {
            zeilen.push(netz(
                s.name,
                s.art,
                s.verbunden ? "verbunden" : "getrennt",
                s.name === aktiv ? "DOWN/UP" : "-"
            ));
        }

        const laufwerk = this._laufwerk();

        zeilen.push("");
        zeilen.push("Laufwerke (lokal eingehängt)");
        zeilen.push("----------------------------");
        zeilen.push(
            "Gemessen: " + laufwerk.pfad + "  (" +
            herkunft(this._laufwerkAuswahl, laufwerk.kennung === this._laufwerkAuswahl) +
            ")"
        );
        zeilen.push("");

        const lw = (pfad, geraet, typ, frei, genutzt, kennung) =>
            pfad.padEnd(20) + geraet.padEnd(14) + typ.padEnd(8) +
            frei.padStart(14) + "   " + genutzt.padEnd(11) + kennung;

        zeilen.push(lw("Einhängeort", "Gerät", "Typ", "Frei", "Verwendet", "Kennung"));
        zeilen.push(lw("-----------", "-----", "---", "----", "---------", "-------"));

        for (const l of this._laufwerke()) {
            zeilen.push(lw(
                l.pfad,
                l.geraet,
                l.typ,
                this._platzText(l.pfad).replace(" frei", ""),
                l.pfad === laufwerk.pfad ? "FREE" : "-",
                l.kennung
            ));
        }

        zeilen.push("");
        zeilen.push("Netzlaufwerke werden bewusst nicht angeboten: Die Abfrage");
        zeilen.push("läuft bei jedem Takt, ein nicht erreichbares Netzlaufwerk");
        zeilen.push("könnte die Oberfläche blockieren.");

        return zeilen.join("\n") + "\n";
    }
};

/*
 * Mindestabstand zur naechsten Taktmarke in Millisekunden.
 *
 * Ein Zeitgeber kann einige Millisekunden vor der Marke ausloesen.
 * Laege die naechste Marke dann nur wenige Millisekunden entfernt,
 * folgte sofort ein zweiter Takt. Unterhalb dieses Abstands gilt
 * deshalb die uebernaechste Marke.
 */
var TAKT_MINDESTABSTAND_MS = 200;

/*
 * Millisekunden bis zur naechsten Taktmarke auf der Systemuhr.
 *
 * Taktmarken sind die vollen Vielfachen des Intervalls, bei 3 Sekunden
 * also :00, :03, :06 und so weiter. Applet und Desklet richten sich
 * dadurch nach derselben Uhr und messen bei gleichem Intervall im
 * selben Moment, ohne voneinander zu wissen. Bisher lief jeder Takt
 * ab dem eigenen Startzeitpunkt, beide lagen bis zu ein Intervall
 * auseinander.
 *
 * Die Marke wird bei jedem Takt neu berechnet. Verzoegerungen des
 * Zeitgebers summieren sich dadurch nicht auf.
 *
 * jetztMs ist nur fuer Tests vorgesehen.
 */
function msBisZumNaechstenTakt(intervallSekunden, jetztMs) {
    const intervall =
        Math.max(1, Math.round(Number(intervallSekunden) || 3)) * 1000;

    const jetzt =
        jetztMs === undefined ? Date.now() : jetztMs;

    let rest = intervall - (jetzt % intervall);

    if (rest < TAKT_MINDESTABSTAND_MS)
        rest += intervall;

    return rest;
}
