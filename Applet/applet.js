const Applet = imports.ui.applet;
const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const ByteArray = imports.byteArray;

class AVinceHWPopup extends Applet.TextIconApplet {
    constructor(metadata, orientation, panel_height, instance_id) {
        super(orientation, panel_height, instance_id);

        this.set_applet_label("⚡");
        this.set_applet_tooltip("aVince Hardware Monitor");

        this._timeout = null;
        this._speedtestRunning = false;
        this._speedtestStatus = null;
        this._lastRx = null;
        this._lastTx = null;
        this._lastNetTime = null;
        this._lastInterface = null;

        this._popup = new St.BoxLayout({
            vertical: true,
            reactive: false,
            visible: false,
            style:
                "background-color: transparent;" +
                "padding: 20px;" +
                "spacing: 8px;"
        });

        this._cpu = this._makeRow("CPU", "--", "°C");
        this._load = this._makeRow("LOAD", "--", "%");
        this._ram = this._makeRow("RAM", "--", "%");
        this._ssd = this._makeRow("SSD", "--", "°C");
        this._fan = this._makeRow("FAN", "----", "rpm");
        this._down = this._makeRow("DOWN", "0.0", "KB/s");
        this._up = this._makeRow("UP", "0.0", "KB/s");

        this._speedDown = this._makeRow("SPEED ↓", "--", "MBit/s");
        this._speedUp = this._makeRow("SPEED ↑", "--", "MBit/s");
        this._ping = this._makeRow("PING", "--", "ms");
        this._jitter = this._makeRow("JITTER", "--", "ms");

        this._popup.add_child(this._cpu.row);
        this._popup.add_child(this._load.row);
        this._popup.add_child(this._ram.row);
        this._popup.add_child(this._ssd.row);
        this._popup.add_child(this._fan.row);
        this._popup.add_child(this._down.row);
        this._popup.add_child(this._up.row);

        this._popup.add_child(this._speedDown.row);
        this._popup.add_child(this._speedUp.row);
        this._popup.add_child(this._ping.row);
        this._popup.add_child(this._jitter.row);

        Main.uiGroup.add_child(this._popup);

        this.actor.connect("enter-event", () => {
            this._showPopup();
        });

        this.actor.connect("leave-event", () => {
            this._hidePopup();
        });

        this._update();
    }

    _makeRow(name, value, unit) {
        const row = new St.BoxLayout({
            vertical: false,
            style: "spacing: 18px;"
        });

        const commonStyle =
            "font-size: 48px;" +
            "font-weight: 700;" +
            "color: white;" +
            "text-shadow: 0px 0px 8px rgba(0,0,0,1);";

        const nameLabel = new St.Label({
            text: name,
            style:
                commonStyle +
                "width: 180px;"
        });

        const valueLabel = new St.Label({
            text: value,
            style:
                commonStyle +
                "width: 220px;" +
                "text-align: right;"
        });

        const unitLabel = new St.Label({
            text: unit,
            style:
                commonStyle +
                "width: 150px;" +
                "text-align: left;"
        });

        row.add_child(nameLabel);
        row.add_child(valueLabel);
        row.add_child(unitLabel);

        return {
            row: row,
            name: nameLabel,
            value: valueLabel,
            unit: unitLabel
        };
    }

    _readSensors() {
        try {
            const result = GLib.spawn_command_line_sync("sensors");

            if (!result[0])
                return "";

            return ByteArray.toString(result[1]);
        } catch (e) {
            global.logError(e);
            return "";
        }
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

            const iface = ByteArray.toString(result[1]).trim();

            return iface || null;
        } catch (e) {
            return null;
        }
    }

    _readNetworkSpeed() {
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
            down = Math.max(0, (rx - this._lastRx) / elapsed);
            up = Math.max(0, (tx - this._lastTx) / elapsed);
        }

        this._lastRx = rx;
        this._lastTx = tx;
        this._lastNetTime = now;
        this._lastInterface = iface;

        return { down: down, up: up };
    }

    _formatRate(bytesPerSecond) {
        if (bytesPerSecond >= 1024 * 1024 * 1024) {
            return {
                value: (bytesPerSecond / (1024 * 1024 * 1024)).toFixed(1),
                unit: "GB/s"
            };
        }

        if (bytesPerSecond >= 1024 * 1024) {
            return {
                value: (bytesPerSecond / (1024 * 1024)).toFixed(1),
                unit: "MB/s"
            };
        }

        if (bytesPerSecond >= 1024) {
            return {
                value: (bytesPerSecond / 1024).toFixed(1),
                unit: "KB/s"
            };
        }

        return {
            value: Math.round(bytesPerSecond).toString(),
            unit: "B/s"
        };
    }

    _showPopup() {
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
                    "font-size: 48px;" +
                    "font-weight: 700;" +
                    "color: white;" +
                    "text-shadow: 0px 0px 8px rgba(0,0,0,1);" +
                    "padding: 20px;"
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

    _update() {
        try {
            const result = GLib.file_get_contents(
                "/tmp/avince-hwmonitor-values"
            );

            if (result[0]) {
                const text = ByteArray.toString(result[1]);
                const values = {};

                for (const line of text.split("\n")) {
                    const pos = line.indexOf("=");

                    if (pos > 0) {
                        const key = line.substring(0, pos);
                        const value = line.substring(pos + 1);
                        values[key] = value;
                    }
                }

                if (values.CPU !== undefined)
                    this._cpu.value.set_text(values.CPU);

                if (values.LOAD !== undefined)
                    this._load.value.set_text(values.LOAD);

                if (values.RAM !== undefined)
                    this._ram.value.set_text(values.RAM);

                if (values.SSD !== undefined)
                    this._ssd.value.set_text(values.SSD);

                if (values.FAN !== undefined)
                    this._fan.value.set_text(values.FAN);

                if (values.DOWN_VALUE !== undefined)
                    this._down.value.set_text(values.DOWN_VALUE);

                if (values.DOWN_UNIT !== undefined)
                    this._down.unit.set_text(values.DOWN_UNIT);

                if (values.UP_VALUE !== undefined)
                    this._up.value.set_text(values.UP_VALUE);

                if (values.UP_UNIT !== undefined)
                    this._up.unit.set_text(values.UP_UNIT);

                if (values.SPEED_DOWN !== undefined && values.SPEED_DOWN !== "")
                    this._speedDown.value.set_text(values.SPEED_DOWN);

                if (values.SPEED_UP !== undefined && values.SPEED_UP !== "")
                    this._speedUp.value.set_text(values.SPEED_UP);

                if (values.PING !== undefined && values.PING !== "")
                    this._ping.value.set_text(values.PING);

                if (values.JITTER !== undefined && values.JITTER !== "")
                    this._jitter.value.set_text(values.JITTER);
            }
        } catch (e) {
            // Falls das Desklet noch keinen Wert geschrieben hat,
            // bleiben die zuletzt angezeigten Werte erhalten.
        }

        if (this._popup.visible)
            this._updatePopupPosition();

        this._timeout = Mainloop.timeout_add_seconds(1, () => {
            this._update();
            return false;
        });
    }

    on_applet_removed_from_panel() {
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
    return new AVinceHWPopup(
        metadata,
        orientation,
        panel_height,
        instance_id
    );
}
