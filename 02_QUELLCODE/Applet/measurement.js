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
 */

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
        const iface = this._getDefaultInterface();

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
     * Freier Speicherplatz der Systempartition.
     *
     * Die Abfrage erfolgt ueber GIO und damit ausschliesslich fuer das
     * Dateisystem, in dem "/" liegt. Eingehaengte Netzlaufwerke,
     * tmpfs und efivarfs werden dadurch nicht mit erfasst.
     *
     * Rueckgabe in Byte, oder null wenn der Wert nicht ermittelbar ist.
     */
    readStorageFree() {
        try {
            const file = Gio.File.new_for_path("/");

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

    _getDefaultInterface() {
        try {
            const result = GLib.spawn_command_line_sync(
                "sh -c \"ip route show default | awk 'NR==1 {print $5}'\""
            );

            if (!result[0])
                return null;

            const iface =
                ByteArray.toString(result[1]).trim();

            return iface || null;

        } catch (e) {
            return null;
        }
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
