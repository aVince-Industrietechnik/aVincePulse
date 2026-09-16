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
            )
        };
    }

    readValues() {
        return {
            cpu: this._readTemperature(this._mapping.cpu),
            ssd: this._readTemperature(this._mapping.storage),
            fan: this._readFan(this._mapping.fan)
        };
    }

    getMapping() {
        return this._mapping;
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
