/*
 * aVincePulse
 * Zentrale Definition der Messwerte
 *
 * Entwicklungsstand: 0.1.0-dev
 *
 * Diese Datei enthält ausschließlich die Beschreibung der Messwerte.
 * Hardware-Erkennung und Messwerterfassung erfolgen getrennt.
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

    fan_speed: {
        id: "fan_speed",
        label: "FAN",
        type: "rotation",
        unit: "rpm",
        defaultValue: "----"
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

    speed_down: {
        id: "speed_down",
        label: "SPEED ↓",
        type: "speedtest",
        unit: "MBit/s",
        defaultValue: "--"
    },

    speed_up: {
        id: "speed_up",
        label: "SPEED ↑",
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
    "fan_speed",
    "net_down",
    "net_up",
    "speed_down",
    "speed_up",
    "ping",
    "jitter"
];
