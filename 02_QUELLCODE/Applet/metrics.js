/*
 * aVincePulse
 * Zentrale Definition der Messwerte
 *
 * Entwicklungsstand: 0.1.0-dev
 *
 * Diese Datei enthält ausschließlich die Beschreibung der Messwerte.
 * Hardware-Erkennung und Messwerterfassung erfolgen getrennt.
 *
 * Das optionale Feld "symbol" führt ein Sinnbild getrennt von der
 * Beschriftung. Beides bleibt dadurch unabhängig: Die Beschriftung
 * kann übersetzt werden, ohne dass das Symbol mitgeführt oder dabei
 * verloren gehen kann.
 *
 * "symbolAnhebung" bestimmt, wie weit das Symbol angehoben wird,
 * damit es auf der Höhe der Großbuchstaben sitzt. Der Wert gehört
 * zum Zeichen, nicht zur Anzeige: Schriftzeichen haben
 * unterschiedliche Metriken und sitzen von Haus aus verschieden
 * hoch auf der Grundlinie. Mit derselben Anhebung für alle Zeichen
 * wirkt das eine richtig und das andere verrutscht.
 *
 * Der Wert wird mit der Schriftgröße multipliziert und bleibt
 * dadurch bei jeder Größe und Bildschirmauflösung im Verhältnis
 * gleich. Fehlt er, wird ein mittlerer Vorgabewert verwendet.
 */

var METRICS = {
    cpu_temp: {
        id: "cpu_temp",
        label: "CPU",
        type: "temperature",
        unit: "°C",
        defaultValue: "--"
    },

    cpu_load: {
        id: "cpu_load",
        label: "LOAD",
        type: "percentage",
        unit: "%",
        defaultValue: "--"
    },

    ram_load: {
        id: "ram_load",
        label: "RAM",
        type: "percentage",
        unit: "%",
        defaultValue: "--"
    },

    storage_temp: {
        id: "storage_temp",
        label: "SSD",
        type: "temperature",
        unit: "°C",
        defaultValue: "--"
    },

    storage_free: {
        id: "storage_free",
        label: "FREE",
        symbol: "⛁",
        symbolAnhebung: 30,
        type: "storage",
        unit: "GB",
        defaultValue: "--",
        dynamicUnit: true
    },

    fan_speed: {
        id: "fan_speed",
        label: "FAN",
        type: "rotation",
        unit: "rpm",
        defaultValue: "----"
    },

    battery_charge: {
        id: "battery_charge",
        label: "BATT",
        type: "percentage",
        unit: "%",
        defaultValue: "--"
    },

    psu_state: {
        id: "psu_state",
        label: "STATUS",
        type: "state",
        unit: "--",
        defaultValue: "PSU",
        dynamicUnit: true
    },

    net_down: {
        id: "net_down",
        label: "DOWN",
        type: "data_rate",
        unit: "KB/s",
        defaultValue: "0.0",
        dynamicUnit: true
    },

    net_up: {
        id: "net_up",
        label: "UP",
        type: "data_rate",
        unit: "KB/s",
        defaultValue: "0.0",
        dynamicUnit: true
    },

    // Die Pfeile sitzen von Haus aus auf Hoehe der Grossbuchstaben
    // und werden deshalb nicht angehoben. Als Symbol gefuehrt bleiben
    // sie auch bei einer eigenen Bezeichnung erhalten.
    speed_down: {
        id: "speed_down",
        label: "SPEED",
        symbol: "↓",
        symbolAnhebung: 0,
        type: "speedtest",
        unit: "MBit/s",
        defaultValue: "--"
    },

    speed_up: {
        id: "speed_up",
        label: "SPEED",
        symbol: "↑",
        symbolAnhebung: 0,
        type: "speedtest",
        unit: "MBit/s",
        defaultValue: "--"
    },

    ping: {
        id: "ping",
        label: "PING",
        type: "latency",
        unit: "ms",
        defaultValue: "--"
    },

    speed_age: {
        id: "speed_age",
        label: "LAST",
        symbol: "◷",
        symbolAnhebung: 110,
        type: "age",
        unit: "min",
        defaultValue: "--",
        dynamicUnit: true
    },

    jitter: {
        id: "jitter",
        label: "JITTER",
        type: "latency_variation",
        unit: "ms",
        defaultValue: "--"
    }
};

var METRIC_ORDER = [
    "cpu_temp",
    "cpu_load",
    "ram_load",
    "storage_temp",
    "storage_free",
    "fan_speed",
    "battery_charge",
    "psu_state",
    "net_down",
    "net_up",
    "speed_down",
    "speed_up",
    "ping",
    "jitter",
    "speed_age"
];

/*
 * Auslieferungsfassung der Messwertliste in den Einstellungen.
 *
 * Jeder Eintrag enthaelt die Messwert-ID, eine eigene Bezeichnung
 * (leer bedeutet: Vorgabe aus METRICS) und die Sichtbarkeit.
 * Die Reihenfolge entspricht METRIC_ORDER.
 */
function standardMesswertListe() {
    return METRIC_ORDER.map(id => ({
        messwert: id,
        bezeichnung: "",
        sichtbar: true
    }));
}

/*
 * Bereinigt die vom Benutzer eingestellte Messwertliste.
 *
 * Das Bearbeitungsfenster von Cinnamon zeigt immer alle Spalten,
 * also auch den Messwert selbst. Er laesst sich dort versehentlich
 * umstellen. Die Anzeige darf dadurch weder Luecken noch doppelte
 * Zeilen bekommen:
 *
 * - unbekannte oder beschaedigte Eintraege werden verworfen
 * - von doppelten Eintraegen gilt nur der erste
 * - fehlende Messwerte werden sichtbar am Ende ergaenzt
 *
 * Liefert eine Liste von { id, bezeichnung, sichtbar } in der
 * vom Benutzer gewaehlten Reihenfolge.
 */
function ordneMesswerte(liste) {
    const ergebnis = [];
    const vorhanden = {};
    const eintraege = Array.isArray(liste) ? liste : [];

    for (const eintrag of eintraege) {
        if (!eintrag || typeof eintrag !== "object")
            continue;

        const id = eintrag.messwert;

        if (!Object.prototype.hasOwnProperty.call(METRICS, id))
            continue;

        if (vorhanden[id])
            continue;

        vorhanden[id] = true;

        ergebnis.push({
            id: id,
            // Eigene Bezeichnungen erscheinen immer in Grossbuchstaben,
            // passend zu den Vorgaben. Das Eingabefeld von Cinnamon
            // laesst sich nicht einschraenken, daher wird hier
            // umgewandelt.
            bezeichnung:
                typeof eintrag.bezeichnung === "string"
                    ? eintrag.bezeichnung.trim().toUpperCase()
                    : "",
            // Nur ein ausdrueckliches false blendet aus.
            sichtbar: eintrag.sichtbar !== false
        });
    }

    for (const id of METRIC_ORDER) {
        if (vorhanden[id])
            continue;

        ergebnis.push({
            id: id,
            bezeichnung: "",
            sichtbar: true
        });
    }

    return ergebnis;
}
