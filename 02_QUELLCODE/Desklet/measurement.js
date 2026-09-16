/*
 * aVincePulse
 * Measurement Layer
 *
 * Entwicklungsstand: 0.1.0-dev
 *
 * Zuständig für die Erfassung und Aufbereitung der Messwerte.
 * Darstellung und UI bleiben in desklet.js.
 */

const GLib = imports.gi.GLib;
const ByteArray = imports.byteArray;

const HardwareDetection =
    imports.desklets['avincepulse-desklet@avince'].hardwareDetection;

const HardwareDetector =
    HardwareDetection.HardwareDetector;

var MeasurementProvider = class MeasurementProvider {
    constructor() {
        this._hardwareDetector =
            new HardwareDetector();

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

    readSpeedtestValues() {
        try {
            const path =
                GLib.build_filenamev([
                    GLib.get_home_dir(),
                    ".config",
                    "cinnamon",
                    "spices",
                    "avince-hwmonitor@angelo",
                    "speedtest-values"
                ]);

            const text = this._readFile(path);

            if (!text)
                return null;

            const values = {};

            for (const line of text.split("\n")) {
                const pos = line.indexOf("=");

                if (pos > 0) {
                    const key = line.substring(0, pos);
                    const value = line.substring(pos + 1);
                    values[key] = value;
                }
            }

            if (
                values.SPEED_DOWN === undefined ||
                values.SPEED_UP === undefined ||
                values.PING === undefined ||
                values.JITTER === undefined
            )
                return null;

            return values;

        } catch (e) {
            global.logError(e);
            return null;
        }
    }

    readHardwareValues() {
        return this._hardwareDetector.readValues();
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
