const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;
const Settings = imports.ui.settings;
const Metrics = imports.desklets['avincepulse-desklet@avince'].metrics;
const Measurement = imports.desklets['avincepulse-desklet@avince'].measurement;
const MeasurementProvider = Measurement.MeasurementProvider;

const METRICS = Metrics.METRICS;
const METRIC_ORDER = Metrics.METRIC_ORDER;


class AVinceHWMonitor extends Desklet.Desklet {
    constructor(metadata, desklet_id) {
        super(metadata, desklet_id);

        this.actor.add_style_class_name("avince-hwmonitor");

        this._timeout = null;

        this.fontSize = 14;
        this.fontWeight = "600";
        this.refreshInterval = 3;

        this._measurement = new MeasurementProvider();

        this.settings = new Settings.DeskletSettings(
            this,
            metadata.uuid,
            desklet_id
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "font-size",
            "fontSize",
            this._applyStyle.bind(this)
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "font-weight",
            "fontWeight",
            this._applyStyle.bind(this)
        );

        this.settings.bindProperty(
            Settings.BindingDirection.IN,
            "refresh-interval",
            "refreshInterval",
            null
        );

        this._container = new St.BoxLayout({
            vertical: true,
            style_class: "avince-hw-container"
        });

        const cpuMetric = METRICS.cpu_temp;

        this._cpu = this._makeRow(
            cpuMetric.label,
            cpuMetric.defaultValue,
            cpuMetric.unit
        );
        const loadMetric = METRICS.cpu_load;

        this._load = this._makeRow(
            loadMetric.label,
            loadMetric.defaultValue,
            loadMetric.unit
        );
        const ramMetric = METRICS.ram_load;

        this._ram = this._makeRow(
            ramMetric.label,
            ramMetric.defaultValue,
            ramMetric.unit
        );
        const storageMetric = METRICS.storage_temp;
        this._ssd = this._makeRow(
            storageMetric.label,
            storageMetric.defaultValue,
            storageMetric.unit
        );
        const fanMetric = METRICS.fan_speed;
        this._fan = this._makeRow(
            fanMetric.label,
            fanMetric.defaultValue,
            fanMetric.unit
        );
        const downMetric = METRICS.net_down;
        this._down = this._makeRow(
            downMetric.label,
            downMetric.defaultValue,
            downMetric.unit
        );
        const upMetric = METRICS.net_up;
        this._up = this._makeRow(
            upMetric.label,
            upMetric.defaultValue,
            upMetric.unit
        );

        const speedDownMetric = METRICS.speed_down;
        this._speedDown = this._makeRow(
            speedDownMetric.label,
            speedDownMetric.defaultValue,
            speedDownMetric.unit
        );
        const speedUpMetric = METRICS.speed_up;
        this._speedUp = this._makeRow(
            speedUpMetric.label,
            speedUpMetric.defaultValue,
            speedUpMetric.unit
        );
        const pingMetric = METRICS.ping;
        this._ping = this._makeRow(
            pingMetric.label,
            pingMetric.defaultValue,
            pingMetric.unit
        );
        const jitterMetric = METRICS.jitter;
        this._jitter = this._makeRow(
            jitterMetric.label,
            jitterMetric.defaultValue,
            jitterMetric.unit
        );

        this._container.add_child(this._cpu.row);
        this._container.add_child(this._load.row);
        this._container.add_child(this._ram.row);
        this._container.add_child(this._ssd.row);
        this._container.add_child(this._fan.row);
        this._container.add_child(this._down.row);
        this._container.add_child(this._up.row);

        this._container.add_child(this._speedDown.row);
        this._container.add_child(this._speedUp.row);
        this._container.add_child(this._ping.row);
        this._container.add_child(this._jitter.row);

        this.setContent(this._container);

        this._applyStyle();
        this._update();
    }

    _makeRow(name, value, unit) {
        const row = new St.BoxLayout({
            vertical: false,
            style_class: "avince-hw-row"
        });

        const nameLabel = new St.Label({
            text: name,
            style_class: "avince-hw-name"
        });

        const valueLabel = new St.Label({
            text: value,
            style_class: "avince-hw-value"
        });

        const unitLabel = new St.Label({
            text: unit,
            style_class: "avince-hw-unit"
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

    _applyStyle() {
        if (!this._cpu || !this._load || !this._ram || !this._ssd ||
            !this._fan || !this._down || !this._up ||
            !this._speedDown || !this._speedUp || !this._ping || !this._jitter)
            return;

        const style =
            "font-size: " + this.fontSize + "px;" +
            "font-weight: " + this.fontWeight + ";";

        for (const item of [
            this._cpu,
            this._load,
            this._ram,
            this._ssd,
            this._fan,
            this._down,
            this._up,
            this._speedDown,
            this._speedUp,
            this._ping,
            this._jitter
        ]) {
            item.name.set_style(style);
            item.value.set_style(style);
            item.unit.set_style(style);
        }
    }

    _update() {
        const hardware =
            this._measurement.readHardwareValues();

        const cpu = hardware.cpu;
        const ssd = hardware.ssd;
        const fan = hardware.fan;

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

        this._cpu.value.set_text(cpu);
        this._load.value.set_text(load);
        this._ram.value.set_text(ram);
        this._ssd.value.set_text(ssd);
        this._fan.value.set_text(fan);

        this._down.value.set_text(down.value);
        this._down.unit.set_text(down.unit);

        this._up.value.set_text(up.value);
        this._up.unit.set_text(up.unit);

        if (speedtest) {
            this._speedDown.value.set_text(speedtest.SPEED_DOWN);
            this._speedUp.value.set_text(speedtest.SPEED_UP);
            this._ping.value.set_text(speedtest.PING);
            this._jitter.value.set_text(speedtest.JITTER);
        }

        // Aktuelle Messwerte für das aVince Hardware Popup bereitstellen.
        // Das Popup verwendet dadurch exakt dieselben Werte wie das Desklet.
        try {
            const sharedValues =
                "CPU=" + cpu + "\n" +
                "LOAD=" + load + "\n" +
                "RAM=" + ram + "\n" +
                "SSD=" + ssd + "\n" +
                "FAN=" + fan + "\n" +
                "DOWN_VALUE=" + down.value + "\n" +
                "DOWN_UNIT=" + down.unit + "\n" +
                "UP_VALUE=" + up.value + "\n" +
                "UP_UNIT=" + up.unit + "\n" +
                "SPEED_DOWN=" + (speedtest ? speedtest.SPEED_DOWN : "") + "\n" +
                "SPEED_UP=" + (speedtest ? speedtest.SPEED_UP : "") + "\n" +
                "PING=" + (speedtest ? speedtest.PING : "") + "\n" +
                "JITTER=" + (speedtest ? speedtest.JITTER : "") + "\n";

            GLib.file_set_contents(
                "/tmp/avince-hwmonitor-values",
                sharedValues
            );
        } catch (e) {
            global.logError(e);
        }

        const seconds = Math.max(1, Number(this.refreshInterval) || 3);

        this._timeout = Mainloop.timeout_add_seconds(seconds, () => {
            this._update();
            return false;
        });
    }

    on_desklet_removed() {
        if (this._timeout) {
            Mainloop.source_remove(this._timeout);
            this._timeout = null;
        }
    }
}

function main(metadata, desklet_id) {
    return new AVinceHWMonitor(metadata, desklet_id);
}
