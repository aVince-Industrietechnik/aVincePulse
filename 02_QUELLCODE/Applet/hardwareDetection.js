/*
 * aVincePulse
 * Hardware Detection / Sensor Mapping
 *
 * Entwicklungsstand: 0.1.0-dev
 *
 * Erkennt geeignete hwmon-Sensoren fuer:
 * - CPU-Temperatur
 * - Storage-/NVMe-Temperatur
 * - Luefterdrehzahl
 *
 * Messwerte werden direkt aus /sys/class/hwmon gelesen.
 *
 * Zusaetzlich wird der Systemakku ueber /sys/class/power_supply erkannt.
 * Akkus von Peripheriegeraeten werden dabei ausgeschlossen.
 */

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const ByteArray = imports.byteArray;

var HardwareDetector = class HardwareDetector {
    constructor() {
        this._mapping = this.detect();

        global.log(
            "aVincePulse AP05: CPU sensor -> " +
            this._describe(this._mapping.cpu)
        );

        global.log(
            "aVincePulse AP05: Storage sensor -> " +
            this._describe(this._mapping.storage)
        );

        global.log(
            "aVincePulse AP05: FAN sensor -> " +
            this._describe(this._mapping.fan)
        );

        global.log(
            "aVincePulse AP07: Battery/PSU -> " +
            this._describeBattery(this._mapping.battery)
        );
    }

    detect() {
        const sensors = this._scanHwmon();

        return {
            cpu: this._selectBest(
                sensors.temperatures,
                sensor => this._scoreCpu(sensor)
            ),

            storage: this._selectBest(
                sensors.temperatures,
                sensor => this._scoreStorage(sensor)
            ),

            fan: this._selectBest(
                sensors.fans,
                sensor => this._scoreFan(sensor)
            ),

            battery: this._detectBattery()
        };
    }

    readValues() {
        const battery =
            this._readBattery(this._mapping.battery);

        return {
            cpu: this._readTemperature(this._mapping.cpu),
            ssd: this._readTemperature(this._mapping.storage),
            fan: this._readFan(this._mapping.fan),
            batteryCharge: battery.charge,
            psuState: battery.psu
        };
    }

    getMapping() {
        return this._mapping;
    }

    /*
     * Meldet, welche hardwareabhaengigen Messwerte auf diesem
     * Geraet tatsaechlich verfuegbar sind.
     *
     * Die Schluessel entsprechen den Messwert-IDs aus metrics.js.
     * Messwerte, die hier nicht aufgefuehrt sind, gelten als
     * immer verfuegbar - etwa CPU-Auslastung oder Netzwerk,
     * die nicht von einem Sensor abhaengen.
     *
     * Die Auswertung erfolgt einmalig bei der Hardwareerkennung.
     */
    getAvailability() {
        const hasBattery = !!(
            this._mapping.battery &&
            this._mapping.battery.path
        );

        return {
            cpu_temp: this._mapping.cpu !== null,
            storage_temp: this._mapping.storage !== null,
            fan_speed: this._mapping.fan !== null,

            // Ladezustand und Netzteilzustand werden nur auf
            // Geraeten mit Akku angezeigt. Ein Desktop-PC meldet
            // haeufig eine AC-Schnittstelle, aber keinen Akku -
            // eine dauerhafte Anzeige "PSU ON" waere dort ohne Aussage.
            battery_charge: hasBattery,
            psu_state: hasBattery
        };
    }

    _scanHwmon() {
        const result = {
            temperatures: [],
            fans: []
        };

        try {
            const rootPath = "/sys/class/hwmon";
            const root = Gio.File.new_for_path(rootPath);

            const enumerator = root.enumerate_children(
                "standard::name",
                Gio.FileQueryInfoFlags.NONE,
                null
            );

            let info;

            while ((info = enumerator.next_file(null)) !== null) {
                const dirName = info.get_name();

                if (!/^hwmon[0-9]+$/.test(dirName))
                    continue;

                const basePath =
                    rootPath + "/" + dirName;

                const chip =
                    this._readFile(basePath + "/name") || "";

                this._scanHwmonDirectory(
                    basePath,
                    chip,
                    result
                );
            }

            enumerator.close(null);

        } catch (e) {
            global.logError(e);
        }

        return result;
    }

    _scanHwmonDirectory(basePath, chip, result) {
        try {
            const dir = Gio.File.new_for_path(basePath);

            const enumerator = dir.enumerate_children(
                "standard::name",
                Gio.FileQueryInfoFlags.NONE,
                null
            );

            let info;

            while ((info = enumerator.next_file(null)) !== null) {
                const name = info.get_name();

                let match =
                    name.match(/^temp([0-9]+)_input$/);

                if (match) {
                    const index = Number(match[1]);

                    const label =
                        this._readFile(
                            basePath +
                            "/temp" +
                            index +
                            "_label"
                        ) || "";

                    result.temperatures.push({
                        chip: chip,
                        label: label,
                        index: index,
                        path: basePath + "/" + name
                    });

                    continue;
                }

                match =
                    name.match(/^fan([0-9]+)_input$/);

                if (match) {
                    const index = Number(match[1]);

                    const label =
                        this._readFile(
                            basePath +
                            "/fan" +
                            index +
                            "_label"
                        ) || "";

                    result.fans.push({
                        chip: chip,
                        label: label,
                        index: index,
                        path: basePath + "/" + name
                    });
                }
            }

            enumerator.close(null);

        } catch (e) {
            global.logError(e);
        }
    }

    _scoreCpu(sensor) {
        const chip =
            sensor.chip.toLowerCase();

        const label =
            sensor.label.toLowerCase();

        // Intel
        if (chip.includes("coretemp")) {
            if (label.includes("package id"))
                return 1000;

            if (label.includes("package"))
                return 980;

            if (label.startsWith("core"))
                return 800;

            return 750 - sensor.index;
        }

        // AMD
        if (
            chip.includes("k10temp") ||
            chip.includes("zenpower")
        ) {
            if (label === "tdie")
                return 1000;

            if (label === "tctl")
                return 950;

            if (label.includes("tccd"))
                return 750;

            return 700 - sensor.index;
        }

        // Weitere Systeme
        if (
            label.includes("cpu") ||
            label.includes("package") ||
            label === "tdie" ||
            label === "tctl"
        )
            return 600;

        if (
            chip.includes("cpu") &&
            chip.includes("thermal")
        )
            return 550;

        return -1;
    }

    _scoreStorage(sensor) {
        const chip =
            sensor.chip.toLowerCase();

        const label =
            sensor.label.toLowerCase();

        if (chip.includes("nvme")) {
            if (label === "composite")
                return 1000;

            if (label.includes("sensor 1"))
                return 850;

            return 800 - sensor.index;
        }

        if (chip.includes("drivetemp"))
            return 900 - sensor.index;

        if (
            label.includes("composite") ||
            label.includes("ssd") ||
            label.includes("drive") ||
            label.includes("disk")
        )
            return 600;

        return -1;
    }

    _scoreFan(sensor) {
        const chip =
            sensor.chip.toLowerCase();

        if (chip.includes("dell_smm"))
            return 1000 - sensor.index;

        if (
            chip.includes("thinkpad") ||
            chip.includes("nct") ||
            chip.includes("it87") ||
            chip.includes("asus") ||
            chip.includes("applesmc")
        )
            return 800 - sensor.index;

        // Jeder echte fan*_input ist besser als kein FAN.
        return 500 - sensor.index;
    }

    _selectBest(candidates, scorer) {
        let best = null;
        let bestScore = -1;

        for (const sensor of candidates) {
            const score = scorer(sensor);

            if (score > bestScore) {
                best = sensor;
                bestScore = score;
            }
        }

        return bestScore >= 0 ? best : null;
    }

    _readTemperature(sensor) {
        if (!sensor)
            return "--";

        const text =
            this._readFile(sensor.path);

        if (text === null)
            return "--";

        let value = Number(text);

        if (!Number.isFinite(value))
            return "--";

        // Linux hwmon liefert Temperaturen normalerweise
        // in Milligrad Celsius.
        if (Math.abs(value) > 1000)
            value = value / 1000;

        if (value < -50 || value > 150)
            return "--";

        return String(Math.round(value));
    }

    _readFan(sensor) {
        if (!sensor)
            return "----";

        const text =
            this._readFile(sensor.path);

        if (text === null)
            return "----";

        const value = Number(text);

        if (
            !Number.isFinite(value) ||
            value < 0 ||
            value > 200000
        )
            return "----";

        return String(Math.round(value));
    }

    /*
     * Sucht den Systemakku unter /sys/class/power_supply.
     *
     * Akkus von Peripheriegeraeten - Funkmaus, Tastatur, Headset -
     * melden sich dort ebenfalls als "Battery", tragen aber
     * scope = Device. Nur diese werden ausgeschlossen.
     * Fehlt die scope-Datei, handelt es sich nach Linux-Konvention
     * um den Systemakku.
     *
     * Zusaetzlich wird die Netzteil-Schnittstelle gesucht, damit
     * Netzbetrieb und Akkubetrieb unterschieden werden koennen.
     */
    _detectBattery() {
        const result = {
            path: null,
            acPath: null
        };

        try {
            const rootPath = "/sys/class/power_supply";
            const root = Gio.File.new_for_path(rootPath);

            const enumerator = root.enumerate_children(
                "standard::name",
                Gio.FileQueryInfoFlags.NONE,
                null
            );

            let info;

            while ((info = enumerator.next_file(null)) !== null) {
                const basePath =
                    rootPath + "/" + info.get_name();

                const type =
                    (this._readFile(basePath + "/type") || "")
                        .toLowerCase();

                if (type === "mains") {
                    if (!result.acPath)
                        result.acPath = basePath;

                    continue;
                }

                if (type !== "battery")
                    continue;

                const scope =
                    (this._readFile(basePath + "/scope") || "")
                        .toLowerCase();

                // Peripheriegeraete ueberspringen.
                if (scope === "device")
                    continue;

                if (!result.path)
                    result.path = basePath;
            }

            enumerator.close(null);

        } catch (e) {
            global.logError(e);
        }

        return result;
    }

    /*
     * Liefert Ladezustand und Betriebszustand des Systemakkus.
     * Ohne Akku - Desktop-PC, Mini-PC - bleiben beide Werte "--".
     */
    _readBattery(battery) {
        const result = {
            charge: "--",
            psu: "--"
        };

        if (!battery)
            return result;

        if (battery.path) {
            result.charge =
                this._readBatteryCharge(battery.path);
        }

        result.psu =
            this._readPsuState(battery);

        return result;
    }

    _readBatteryCharge(basePath) {
        const capacity =
            this._readFile(basePath + "/capacity");

        if (capacity !== null) {
            const value = Number(capacity);

            if (
                Number.isFinite(value) &&
                value >= 0 &&
                value <= 100
            )
                return String(Math.round(value));
        }

        // Nicht jede Hardware stellt capacity bereit.
        // In diesem Fall wird der Ladezustand berechnet.
        const pairs = [
            ["/charge_now", "/charge_full"],
            ["/energy_now", "/energy_full"]
        ];

        for (const pair of pairs) {
            const now =
                Number(this._readFile(basePath + pair[0]));

            const full =
                Number(this._readFile(basePath + pair[1]));

            if (
                Number.isFinite(now) &&
                Number.isFinite(full) &&
                full > 0
            ) {
                const percent = 100 * now / full;

                return String(
                    Math.round(
                        Math.max(0, Math.min(100, percent))
                    )
                );
            }
        }

        return "--";
    }

    /*
     * Zustand der Stromversorgung (Power Supply Unit).
     *
     * ON  = Netzteil angeschlossen, das Geraet laedt oder
     *       laeuft im Netzbetrieb
     * OFF = kein Netzteil, das Geraet laeuft ueber den Akku
     * --  = keine Netzteil-Schnittstelle vorhanden
     */
    _readPsuState(battery) {
        if (!battery.acPath) {
            // Ohne AC-Schnittstelle laesst sich der Netzbetrieb
            // ersatzweise aus dem Akkustatus ableiten.
            if (!battery.path)
                return "--";

            const status =
                (this._readFile(battery.path + "/status") || "")
                    .toLowerCase();

            if (status === "discharging")
                return "OFF";

            if (status === "charging" || status === "full")
                return "ON";

            return "--";
        }

        const online =
            this._readFile(battery.acPath + "/online");

        if (online === "1")
            return "ON";

        if (online === "0")
            return "OFF";

        return "--";
    }

    _readFile(path) {
        try {
            const result =
                GLib.file_get_contents(path);

            if (!result[0])
                return null;

            return ByteArray
                .toString(result[1])
                .trim();

        } catch (e) {
            return null;
        }
    }

    /*
     * Lesbarer Bericht ueber die erkannte Hardware.
     * Dient der Anzeige und dem Abspeichern als Textdatei.
     */
    berichtText(komponente) {
        const zeilen = [];

        zeilen.push("aVincePulse - Erkannte Hardware");
        zeilen.push("================================");
        zeilen.push("");
        zeilen.push("Erstellt am  : " + new Date().toLocaleString());
        zeilen.push("Erstellt von : " + (komponente || "unbekannt"));
        zeilen.push("");

        zeilen.push("Sensoren");
        zeilen.push("--------");
        zeilen.push("CPU-Temperatur     : " + this._describe(this._mapping.cpu));
        zeilen.push("Storage-Temperatur : " + this._describe(this._mapping.storage));
        zeilen.push("Luefter            : " + this._describe(this._mapping.fan));
        zeilen.push("Akku / Netzteil    : " + this._describeBattery(this._mapping.battery));
        zeilen.push("");

        const verfuegbar = this.getAvailability();

        zeilen.push("Verfuegbare Messwerte");
        zeilen.push("---------------------");

        for (const id of Object.keys(verfuegbar)) {
            zeilen.push(
                id.padEnd(20) +
                (verfuegbar[id] ? "vorhanden" : "nicht vorhanden")
            );
        }

        zeilen.push("");
        zeilen.push("Alle uebrigen Messwerte haengen nicht von einem");
        zeilen.push("Sensor ab und sind immer verfuegbar.");
        zeilen.push("");
        zeilen.push("Vollstaendige Sensorliste des Systems");
        zeilen.push("-------------------------------------");

        const alle = this._scanHwmon();

        for (const s of alle.temperatures) {
            zeilen.push(
                "Temperatur  " + s.chip.padEnd(14) +
                (s.label || "ohne Bezeichnung").padEnd(18) + s.path
            );
        }

        for (const s of alle.fans) {
            zeilen.push(
                "Luefter     " + s.chip.padEnd(14) +
                (s.label || "ohne Bezeichnung").padEnd(18) + s.path
            );
        }

        return zeilen.join("\n") + "\n";
    }

    _describeBattery(battery) {
        if (!battery || !battery.path)
            return "NOT FOUND (system without battery)";

        return (
            battery.path +
            " / AC: " +
            (battery.acPath || "none")
        );
    }

    _describe(sensor) {
        if (!sensor)
            return "NOT FOUND";

        return (
            sensor.chip +
            " / " +
            (sensor.label || "unlabeled") +
            " / " +
            sensor.path
        );
    }
};
