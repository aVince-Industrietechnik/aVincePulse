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
const HardwareDetection = imports.desklets['avincepulse-desklet@avince'].hardwareDetection;

const MeasurementProvider = Measurement.MeasurementProvider;
const HardwareDetector = HardwareDetection.HardwareDetector;

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

        this._measurement = new MeasurementProvider(
            new HardwareDetector()
        );

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

        this._bindeSichtbarkeit();

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
     *
     * Messwerte, fuer die auf diesem Geraet kein Sensor gefunden
     * wurde, erhalten keine Zeile. Ein fehlender Sensor fuehrt
     * damit weder zu einer Dauerausgabe "--" noch zu einem Fehler.
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

            // Messwerte ohne passenden Sensor werden nicht angezeigt.
            // Nur ausdruecklich als nicht verfuegbar gemeldete Werte
            // entfallen; alle uebrigen bleiben sichtbar.
            // Vom Benutzer abgewaehlte Messwerte erhalten keine Zeile.
            if (!this._istSichtbar(id))
                continue;

            if (availability[id] === false) {
                global.log(
                    "aVincePulse AP07: metric hidden, no sensor -> " + id
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


    /*
     * Schluessel der Sichtbarkeitseinstellung eines Messwertes.
     * Die Messwert-ID verwendet Unterstriche, die Einstellungen
     * nach Cinnamon-Konvention Bindestriche.
     */
    _sichtbarkeitsSchluessel(id) {
        return "show-" + id.replace(/_/g, "-");
    }

    /*
     * Bindet fuer jeden Messwert den zugehoerigen Schalter.
     * Aendert sich einer, werden die Anzeigezeilen neu aufgebaut.
     */
    _bindeSichtbarkeit() {
        for (const id of METRIC_ORDER) {
            this.settings.bindProperty(
                Settings.BindingDirection.IN,
                this._sichtbarkeitsSchluessel(id),
                "zeige_" + id,
                this._baueZeilenNeu.bind(this)
            );
        }
    }

    /*
     * Meldet, ob ein Messwert angezeigt werden soll.
     * Nur ein ausdrueckliches false blendet aus; fehlt die
     * Einstellung, bleibt der Messwert sichtbar.
     */
    _istSichtbar(id) {
        return this["zeige_" + id] !== false;
    }

    /*
     * Baut die Anzeigezeilen nach einer Aenderung der Auswahl neu auf.
     */
    _baueZeilenNeu() {
        if (!this._container)
            return;

        this._container.destroy_all_children();
        this._rows = {};

        this._buildRows();
        this._applyStyle();

        // Der laufende Zeitgeber muss entfernt werden, bevor _update()
        // einen neuen setzt. Sonst liefe die Messschleife doppelt und
        // wuerde sich mit jeder weiteren Aenderung vervielfachen.
        if (this._timeout) {
            Mainloop.source_remove(this._timeout);
            this._timeout = null;
        }

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


    /*
     * Berechnet die Spaltenbreiten aus der Schriftgroesse und den
     * tatsaechlich angezeigten Beschriftungen.
     *
     * Feste Pixelbreiten passen nur zu einer einzigen Schriftgroesse.
     * Bei groesserer Schrift wurden Beschriftungen wie "SPEED" und
     * Einheiten wie "MBit/s" abgeschnitten.
     */
    _berechneSpaltenbreiten(fontSize) {
        let maxLabel = 0;
        let maxEinheit = 0;

        for (const id of METRIC_ORDER) {
            if (!this._rows[id])
                continue;

            const metric = METRICS[id];

            maxLabel = Math.max(maxLabel, String(metric.label).length);
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

    _applyStyle() {
        if (!this._rows)
            return;

        const fontSize = Math.max(1, Number(this.fontSize) || 14);
        const breiten = this._berechneSpaltenbreiten(fontSize);

        const style =
            "font-size: " + fontSize + "px;" +
            "font-weight: " + this.fontWeight + ";";

        for (const id of METRIC_ORDER) {
            const item = this._rows[id];

            if (!item)
                continue;

            item.name.set_style(
                style + "width: " + breiten.name + "px;");

            item.value.set_style(
                style +
                "width: " + breiten.value + "px;" +
                "text-align: right;");

            item.unit.set_style(
                style +
                "width: " + breiten.unit + "px;" +
                "text-align: left;");
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

        const storageFree =
            this._measurement.formatSize(
                this._measurement.readStorageFree()
            );

        this._setValue("cpu_temp", cpu);
        this._setValue("cpu_load", load);
        this._setValue("ram_load", ram);
        this._setValue("storage_temp", ssd);
        this._setValue("fan_speed", fan);

        this._setValue("storage_free", storageFree.value);
        this._setUnit("storage_free", storageFree.unit);

        this._setValue("battery_charge", hardware.batteryCharge);

        // Die STATUS-Zeile zeigt den festen Text "PSU" als Wert,
        // der Netzteilzustand ON/OFF steht in der Einheitenspalte.
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

    /*
     * Setzt alle Einstellungen auf die Auslieferungswerte zurueck.
     * Wird ueber die Schaltflaeche im Einstellungsfenster gerufen.
     *
     * settings.setValue() schreibt ausschliesslich die
     * Einstellungsdatei. Weder die gebundenen Eigenschaften noch die
     * zugehoerigen Rueckrufe werden dabei aktualisiert. Die Werte
     * werden deshalb zusaetzlich hier gesetzt und angewendet.
     */
    on_standardwerte_zuruecksetzen() {
        if (!this.settings)
            return;

        const schriftgroesse = 14;
        const schriftstaerke = "600";
        const intervall = 3;

        this.settings.setValue("font-size", schriftgroesse);
        this.settings.setValue("font-weight", schriftstaerke);
        this.settings.setValue("refresh-interval", intervall);

        // Alle Messwerte wieder einblenden.
        for (const id of METRIC_ORDER) {
            const schluessel = this._sichtbarkeitsSchluessel(id);

            this.settings.setValue(schluessel, true);
            this["zeige_" + id] = true;
        }

        this.fontSize = schriftgroesse;
        this.fontWeight = schriftstaerke;
        this.refreshInterval = intervall;

        this._baueZeilenNeu();

        global.log("aVincePulse AP10: settings reset to defaults");
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
