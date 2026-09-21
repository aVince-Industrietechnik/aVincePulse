/*
 * aVincePulse
 * Hardware Detection / Sensor Mapping
 *
 * Copyright (C) 2026 Angelo Vincenti - aVince Industrietechnik
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License,
 * version 3, as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see
 * <https://www.gnu.org/licenses/>.
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
 *
 * Der Sensor fuer CPU-Temperatur, Speicher-Temperatur und Luefter
 * kann vom Benutzer vorgegeben werden. Ohne Vorgabe, mit "auto" oder
 * wenn der vorgegebene Sensor fehlt, gilt die automatische Auswahl
 * ueber das Punktesystem.
 *
 * Jeder Sensor traegt eine Kennung aus Chip, Geraet und Sensornummer,
 * zum Beispiel "dell_smm|dell_smm_hwmon|temp3". Die hwmonN-Nummer ist
 * bewusst nicht enthalten, da sie sich nach einem Neustart aendern
 * kann. Chip und Bezeichnung allein reichen nicht: dell_smm meldet
 * sechs Temperaturen ohne Bezeichnung, zwei NVMe-SSDs heissen beide
 * "nvme / Composite".
 */

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const ByteArray = imports.byteArray;

// Messwerte, deren Sensor waehlbar ist, und die zugehoerige Sensorart.
var SENSOR_ARTEN = ["cpu", "storage", "fan"];

var HardwareDetector = class HardwareDetector {
    /*
     * auswahl: optional { cpu, storage, fan } mit je einer
     * Sensorkennung oder "auto".
     */
    constructor(auswahl) {
        this._auswahl = this._normalisiereAuswahl(auswahl);
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

        // Alle gefundenen Sensoren bleiben erhalten, damit sie zur
        // Auswahl angeboten und ohne neuen Suchlauf gewechselt
        // werden koennen.
        this._sensoren = sensors;

        this._automatisch = {
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

        this._quelle = {};

        const mapping = {
            battery: this._detectBattery()
        };

        for (const art of SENSOR_ARTEN)
            mapping[art] = this._waehleSensor(art);

        return mapping;
    }

    /*
     * Uebernimmt eine neue Sensorauswahl ohne erneuten Suchlauf.
     * Die Aenderung wirkt ab dem naechsten readValues().
     */
    setzeAuswahl(auswahl) {
        this._auswahl = this._normalisiereAuswahl(auswahl);

        for (const art of SENSOR_ARTEN) {
            this._mapping[art] = this._waehleSensor(art);

            global.log(
                "aVincePulse AP14: " + art + " sensor (" +
                this._quelle[art] + ") -> " +
                this._describe(this._mapping[art])
            );
        }
    }

    /*
     * Bietet die Sensoren einer Art zur Auswahl an.
     *
     * Rueckgabe: Objekt { Anzeigetext: Kennung } in der Form, die
     * Cinnamon fuer die Optionen eines Auswahlfeldes erwartet.
     * Der erste Eintrag ist immer "Automatisch" mit dem Sensor, den
     * die automatische Auswahl gerade verwendet.
     *
     * Ist ein gespeicherter Sensor nicht mehr vorhanden, erscheint er
     * als "Nicht gefunden", damit das Auswahlfeld nicht leer wirkt und
     * die Wahl erhalten bleibt, bis der Sensor zurueckkehrt.
     */
    getSensorOptionen(art, aktuelleWahl) {
        const optionen = {};
        const auto = this._automatisch[art];

        optionen[
            "Automatisch (" +
            (auto ? this._anzeigeName(auto, art) : "kein Sensor gefunden") +
            ")"
        ] = "auto";

        const kandidaten = this._kandidaten(art).slice().sort(
            (a, b) =>
                a.chip.localeCompare(b.chip) ||
                a.geraet.localeCompare(b.geraet) ||
                a.index - b.index
        );

        for (const sensor of kandidaten) {
            const wert = art === "fan"
                ? this._readFan(sensor) + " rpm"
                : this._readTemperature(sensor) + " \u00b0C";

            let text = this._anzeigeName(sensor, art) + "  \u00b7  " + wert;

            // Anzeigetexte muessen eindeutig sein, da sie als
            // Schluessel dienen.
            while (text in optionen)
                text += " ";

            optionen[text] = sensor.key;
        }

        if (
            aktuelleWahl &&
            aktuelleWahl !== "auto" &&
            !kandidaten.some(sensor => sensor.key === aktuelleWahl)
        )
            optionen["Nicht gefunden: " + aktuelleWahl] = aktuelleWahl;

        return optionen;
    }

    _normalisiereAuswahl(auswahl) {
        const ergebnis = {};

        for (const art of SENSOR_ARTEN) {
            const wert = auswahl ? auswahl[art] : null;

            ergebnis[art] =
                typeof wert === "string" && wert !== ""
                    ? wert
                    : "auto";
        }

        return ergebnis;
    }

    _kandidaten(art) {
        if (!this._sensoren)
            return [];

        return art === "fan"
            ? this._sensoren.fans
            : this._sensoren.temperatures;
    }

    /*
     * Liefert den vom Benutzer gewaehlten Sensor, sonst den
     * automatisch ermittelten. Vermerkt die Herkunft fuer Protokoll
     * und Hardwarebericht.
     */
    _waehleSensor(art) {
        const gewuenscht = this._auswahl[art];
        const auto = this._automatisch[art];

        if (gewuenscht === "auto") {
            this._quelle[art] = "automatisch";
            return auto;
        }

        const sensor = this._kandidaten(art)
            .find(kandidat => kandidat.key === gewuenscht);

        if (sensor) {
            this._quelle[art] = "manuell gewählt";
            return sensor;
        }

        this._quelle[art] =
            "automatisch – gewählter Sensor " + gewuenscht + " nicht gefunden";
        return auto;
    }

    /*
     * Lesbarer Name eines Sensors, zum Beispiel "coretemp - Core 0".
     * Sensoren ohne Bezeichnung werden durchnummeriert. Melden mehrere
     * Geraete denselben Chip, etwa zwei NVMe-SSDs, wird das Geraet
     * angehaengt.
     */
    _anzeigeName(sensor, art) {
        const bezeichnung = sensor.label ||
            (art === "fan" ? "L\u00fcfter " : "Temperatur ") + sensor.index;

        const geraete = new Set(
            this._kandidaten(art)
                .filter(kandidat => kandidat.chip === sensor.chip)
                .map(kandidat => kandidat.geraet)
        );

        return sensor.chip + " \u2013 " + bezeichnung +
            (geraete.size > 1 ? " [" + sensor.geraet + "]" : "");
    }

    /*
     * Geraet, an dem ein hwmon-Chip haengt, etwa "nvme0" oder
     * "coretemp.0". Anders als die hwmonN-Nummer bleibt es nach
     * einem Neustart gleich.
     */
    _geraetVon(basePath) {
        try {
            return GLib.path_get_basename(
                GLib.file_read_link(basePath + "/device")
            );
        } catch (e) {
            return "";
        }
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
        const geraet = this._geraetVon(basePath);

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
                        geraet: geraet,
                        key: chip + "|" + geraet + "|temp" + index,
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
                        geraet: geraet,
                        key: chip + "|" + geraet + "|fan" + index,
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
        zeilen.push("                     (" + this._quelle.cpu + ")");
        zeilen.push("Storage-Temperatur : " + this._describe(this._mapping.storage));
        zeilen.push("                     (" + this._quelle.storage + ")");
        zeilen.push("Lüfter             : " + this._describe(this._mapping.fan));
        zeilen.push("                     (" + this._quelle.fan + ")");
        zeilen.push("Akku / Netzteil    : " + this._describeBattery(this._mapping.battery));
        zeilen.push("");

        const verfuegbar = this.getAvailability();

        zeilen.push("Verfügbare Messwerte");
        zeilen.push("--------------------");

        for (const id of Object.keys(verfuegbar)) {
            zeilen.push(
                id.padEnd(20) +
                (verfuegbar[id] ? "vorhanden" : "nicht vorhanden")
            );
        }

        zeilen.push("");
        zeilen.push("Alle übrigen Messwerte hängen nicht von einem");
        zeilen.push("Sensor ab und sind immer verfügbar.");
        zeilen.push("");
        zeilen.push("Vollständige Sensorliste des Systems");
        zeilen.push("------------------------------------");

        /*
         * Eine Zeile je Sensor mit festen Spalten, damit sich die
         * Liste ohne seitliches Scrollen lesen laesst. Der hwmon-Pfad
         * steht bewusst nicht darin: Er ist lang und aendert sich nach
         * einem Neustart. Fuer die verwendeten Sensoren steht er oben.
         */
        const alle = this._scanHwmon();

        const verwendung = {};
        const zuordnung = [
            ["cpu", "CPU"],
            ["storage", "Speicher"],
            ["fan", "Lüfter"]
        ];

        for (const [art, name] of zuordnung) {
            const sensor = this._mapping[art];

            if (sensor)
                verwendung[sensor.key] =
                    (verwendung[sensor.key] ? verwendung[sensor.key] + "+" : "") +
                    name;
        }

        const sortiert = liste => liste.slice().sort(
            (a, b) =>
                a.chip.localeCompare(b.chip) ||
                a.geraet.localeCompare(b.geraet) ||
                a.index - b.index
        );

        const zeile = (art, chip, bezeichnung, wert, genutzt, kennung) =>
            art.padEnd(12) + chip.padEnd(14) + bezeichnung.padEnd(18) +
            wert.padStart(9) + "   " + genutzt.padEnd(14) + kennung;

        zeilen.push(zeile("Art", "Chip", "Bezeichnung", "Wert", "Verwendet", "Kennung"));
        zeilen.push(zeile("---", "----", "-----------", "----", "---------", "-------"));

        for (const s of sortiert(alle.temperatures)) {
            zeilen.push(zeile(
                "Temperatur",
                s.chip,
                s.label || "Temperatur " + s.index,
                this._readTemperature(s) + " °C",
                verwendung[s.key] || "-",
                s.key
            ));
        }

        for (const s of sortiert(alle.fans)) {
            zeilen.push(zeile(
                "Lüfter",
                s.chip,
                s.label || "Lüfter " + s.index,
                this._readFan(s) + " rpm",
                verwendung[s.key] || "-",
                s.key
            ));
        }

        zeilen.push("");
        zeilen.push("Wert: gemessen bei Erstellung dieses Berichts.");
        zeilen.push("Kennung: bleibt nach einem Neustart gleich und wird für");
        zeilen.push("die Sensorauswahl in den Einstellungen gespeichert.");

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
