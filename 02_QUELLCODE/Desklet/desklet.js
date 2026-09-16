/*
 * aVincePulse
 * Desklet – UI, Refresh und Integration
 *
 * Entwicklungsstand: 0.1.0-dev
 *
 * Die Anzeigezeilen werden zentral aus metrics.js erzeugt.
 * METRIC_ORDER bestimmt Reihenfolge und Umfang der Anzeige,
 * METRICS liefert Beschriftung, Einheit und Startwert.
 *
 * Messwerterfassung liegt in measurement.js,
 * Hardware-/Sensorerkennung in hardwareDetection.js.
 */

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

        // Zuordnung Messwert-ID -> Anzeigezeile.
        // Wird in _buildRows() aus METRIC_ORDER gefuellt.
        this._rows = {};

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

        this._buildRows();

        this.setContent(this._container);

        this._applyStyle();
        this._update();
    }

    /*
     * Erzeugt fuer jeden in METRIC_ORDER aufgefuehrten Messwert
     * genau eine Anzeigezeile.
     *
     * Ein neuer Messwert erfordert dadurch nur noch einen Eintrag
     * in metrics.js und keine Aenderung an dieser Datei.
     */
    _buildRows() {
        for (const id of METRIC_ORDER) {
            const metric = METRICS[id];

            if (!metric) {
                global.logError(
                    "aVincePulse: METRIC_ORDER verweist auf einen " +
                    "in METRICS nicht definierten Messwert: " + id
                );
                continue;
            }

            const row = this._makeRow(
                metric.label,
                metric.defaultValue,
                metric.unit
            );

            this._rows[id] = row;
            this._container.add_child(row.row);
        }
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

    /*
     * Setzt den Anzeigewert eines Messwertes.
     * Nicht vorhandene Zeilen werden stillschweigend uebergangen,
     * damit ein fehlender Messwert kein Programmfehler ist.
     */
    _setValue(id, value) {
        const row = this._rows[id];

        if (!row || value === undefined || value === null)
            return;

        row.value.set_text(String(value));
    }

    /*
     * Setzt die Einheit eines Messwertes.
     * Wird fuer Messwerte mit dynamischer Einheit benoetigt,
     * zum Beispiel B/s, KB/s oder MB/s beim Netzwerkdurchsatz.
     */
    _setUnit(id, unit) {
        const row = this._rows[id];

        if (!row || !unit)
            return;

        row.unit.set_text(unit);
    }

    _applyStyle() {
        if (!this._rows)
            return;

        const style =
            "font-size: " + this.fontSize + "px;" +
            "font-weight: " + this.fontWeight + ";";

        for (const id of METRIC_ORDER) {
            const item = this._rows[id];

            if (!item)
                continue;

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

        this._setValue("cpu_temp", cpu);
        this._setValue("cpu_load", load);
        this._setValue("ram_load", ram);
        this._setValue("storage_temp", ssd);
        this._setValue("fan_speed", fan);

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
