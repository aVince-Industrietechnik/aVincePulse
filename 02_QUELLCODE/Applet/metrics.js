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

/*
 * Warnschwellen (AP18).
 *
 * richtung "hoch": Warnung, sobald der Wert die Schwelle erreicht
 * oder ueberschreitet. richtung "tief": sobald er sie erreicht oder
 * unterschreitet. Die Vorgaben sind uebliche Richtwerte und in den
 * Einstellungen jeder Komponente aenderbar.
 *
 * Speicher-Temperatur: NVMe-SSDs erreichen beim Kopieren grosser
 * Dateien leicht 60-70 degC. Die Referenz-SSD meldet selbst Warnung
 * bei 89 und kritisch bei 94 degC (hwmon temp1_max/temp1_crit).
 *
 * Der freie Speicherplatz wird in Prozent des Laufwerks bewertet, da
 * Laufwerke sehr verschieden gross sind. Der Akku wird nur im
 * Akkubetrieb bewertet; die Komponente uebergibt sonst keinen Wert.
 */
var WARNSCHWELLEN = {
    cpu_temp:       { richtung: "hoch", warnung: 80, kritisch: 90 },
    storage_temp:   { richtung: "hoch", warnung: 70, kritisch: 80 },
    cpu_load:       { richtung: "hoch", warnung: 85, kritisch: 95 },
    ram_load:       { richtung: "hoch", warnung: 85, kritisch: 95 },
    storage_free:   { richtung: "tief", warnung: 10, kritisch: 5 },
    battery_charge: { richtung: "tief", warnung: 20, kritisch: 10 }
};

// Farben der Stufen auf abgedunkelter Flaeche. Dort sind die hellen
// Farben gut lesbar; ohne Flaeche gilt WARNFARBEN_VARIANTEN (AP20).
var WARNFARBEN = {
    warnung: "#FFA726",
    kritisch: "#FF5252"
};

/*
 * Lesbarkeit ohne Hintergrundflaeche (AP20).
 *
 * Ab WARN_FLAECHE_GRENZE Prozent Deckkraft traegt die abgedunkelte
 * Flaeche die Lesbarkeit. Darunter muessen Schatten und Farbe sie
 * allein sichern. Beide Komponenten verwenden dieselben Werte, damit
 * Applet und Desklet gleich aussehen.
 *
 * Ausgangslage (Befund G9 aus AP19): Ohne Flaeche erreicht das bisher
 * verwendete Orange #FFA726 gegen reinweissen Bildschirminhalt nur
 * 1,95 : 1. Als Mindestkontrast gelten 3,0 : 1 fuer grosse, fette
 * Schrift. Da der Hintergrund unbekannt ist, muss eine Farbe gegen
 * Weiss UND gegen Schwarz bestehen.
 *
 * ERPROBUNG AP20 (20.09.2026): Die Varianten A, B und C werden auf
 * hellem und dunklem Hintergrundbild verglichen. Nach der Entscheidung
 * des Nutzers bleibt genau eine uebrig; die Einstellungen unter
 * "Erprobung" und die uebrigen Varianten entfallen dann wieder.
 *
 * Rechnerische Kontraste der Farbvarianten ohne Flaeche
 * (nachgerechnet mit 06_TESTVERSIONEN/0.1.0-dev_AP20-PRUEFDATEN/
 * kontrast.py, WCAG 2.1):
 *
 *   A  #E65100 Warnung   3,79 : 1 gegen Weiss  5,54 : 1 gegen Schwarz
 *      #C62828 kritisch  5,62 : 1              3,74 : 1
 *   B  #FFA726 Warnung   1,94 : 1             10,81 : 1   (wie bisher)
 *      #FF5252 kritisch  3,19 : 1              6,58 : 1
 *   C  #FF8F00 Warnung   2,29 : 1              9,18 : 1
 *      #D50000 kritisch  5,48 : 1              3,83 : 1
 *
 * Nur A besteht rechnerisch gegen beide Extreme. B setzt ganz auf den
 * Schatten, C liegt dazwischen. Den Ausschlag gibt der Augenschein.
 *
 * Offen und in der Erprobung mit zu beurteilen: Auch MIT Flaeche
 * bleiben die hellen Farben rechnerisch schwach, sobald die Flaeche
 * ueber hellem Bildschirminhalt liegt und dadurch mittelgrau wird.
 * Bei 55 Prozent ueber Reinweiss erreicht #FF5252 nur 1,49 : 1,
 * #FFA726 nur 2,44 : 1; erst bei 85 Prozent werden es 4,74 bzw.
 * 7,79 : 1. Eine dunklere Farbe hilft dort nicht, sie verschwindet
 * auf der dunklen Flaeche erst recht. Deshalb laesst sich in der
 * Erprobung einstellen, ob die Varianten auch mit Flaeche gelten.
 */
var WARN_FLAECHE_GRENZE = 45;

/*
 * Schattenvarianten fuer die Darstellung ohne Flaeche.
 *
 * C gibt zwei Schatten an und klaert damit zugleich, ob Cinnamon
 * (St) mehrere Schatten je Text darstellt. Das ist nicht gesichert
 * und laesst sich nur praktisch pruefen. Bleibt bei C sichtbar kein
 * Schatten, unterstuetzt St nur einen.
 */
var SCHATTEN_VARIANTEN = {
    A: "0px 0px 8px rgba(0,0,0,1)",
    B: "0px 0px 3px rgba(0,0,0,1)",
    C: "0px 0px 3px rgba(0,0,0,1), 0px 0px 9px rgba(0,0,0,1)"
};

var WARNFARBEN_VARIANTEN = {
    A: { warnung: "#E65100", kritisch: "#C62828" },
    B: { warnung: "#FFA726", kritisch: "#FF5252" },
    C: { warnung: "#FF8F00", kritisch: "#D50000" }
};

/*
 * Liefert den Eintrag einer Variantentabelle. Eine unbekannte oder
 * beschaedigte Angabe faellt auf A zurueck.
 */
function warnVariante(tabelle, name) {
    return tabelle[String(name).toUpperCase()] || tabelle.A;
}

/*
 * Gilt bei dieser Deckkraft die Darstellung mit Flaeche?
 * deckkraft ist der eingestellte Wert in Prozent (0 bis 85).
 */
function mitFlaeche(deckkraft) {
    const wert = Number(deckkraft);

    return Number.isFinite(wert) && wert >= WARN_FLAECHE_GRENZE;
}

/*
 * Schatten fuer Beschriftung, Wert und Einheit.
 *
 * grundschatten ist der bisherige Schatten der Komponente; er gilt
 * weiter, solange eine Flaeche vorhanden ist. Applet und Desklet
 * verwenden dort verschiedene Radien, da ihre Schriftgroessen weit
 * auseinanderliegen.
 */
function schattenFuer(deckkraft, variante, grundschatten) {
    if (mitFlaeche(deckkraft))
        return grundschatten;

    return warnVariante(SCHATTEN_VARIANTEN, variante);
}

/*
 * Farbe einer Warnstufe, passend zur eingestellten Deckkraft.
 * Liefert null, wenn die Stufe nicht eingefaerbt wird.
 *
 * ERPROBUNG AP20: Mit auchMitFlaeche = true gilt die gewaehlte
 * Variante unabhaengig von der Deckkraft. Damit laesst sich
 * beurteilen, ob die hellen Farben auf einer Flaeche ueber hellem
 * Bildschirminhalt genuegen (siehe Kommentar oben). Der Parameter
 * faellt nach der Entscheidung des Nutzers wieder weg.
 */
function warnfarbeFuer(stufe, deckkraft, variante, auchMitFlaeche) {
    if (mitFlaeche(deckkraft) && auchMitFlaeche !== true)
        return WARNFARBEN[stufe] || null;

    return warnVariante(WARNFARBEN_VARIANTEN, variante)[stufe] || null;
}

/*
 * Puffer gegen Flackern: Eine erreichte Stufe gilt weiter, bis der
 * Wert die Schwelle um diesen Betrag wieder verlassen hat. Pendelt
 * die CPU-Last zwischen 84 und 86 %, wechselt die Farbe sonst bei
 * jedem Takt.
 */
var WARN_PUFFER = 2;

const WARN_RANG = { normal: 0, warnung: 1, kritisch: 2 };

function standardWarnListe() {
    return Object.keys(WARNSCHWELLEN).map(id => ({
        messwert: id,
        warnung: WARNSCHWELLEN[id].warnung,
        kritisch: WARNSCHWELLEN[id].kritisch,
        aktiv: true
    }));
}

/*
 * Bereinigt die eingestellte Liste der Warnschwellen.
 *
 * Unbekannte, beschaedigte und doppelte Eintraege werden verworfen,
 * fehlende Messwerte erhalten die Vorgaben. Sind Warnung und kritisch
 * vertauscht eingegeben, gilt die strengere Schwelle als kritisch.
 *
 * Liefert { Messwert-ID: { richtung, warnung, kritisch, aktiv } }.
 */
function ordneWarnschwellen(liste) {
    const ergebnis = {};

    for (const id in WARNSCHWELLEN) {
        ergebnis[id] = {
            richtung: WARNSCHWELLEN[id].richtung,
            warnung: WARNSCHWELLEN[id].warnung,
            kritisch: WARNSCHWELLEN[id].kritisch,
            aktiv: true
        };
    }

    const vorhanden = {};

    for (const eintrag of Array.isArray(liste) ? liste : []) {
        if (!eintrag || typeof eintrag !== "object")
            continue;

        const id = eintrag.messwert;

        if (!Object.prototype.hasOwnProperty.call(WARNSCHWELLEN, id) || vorhanden[id])
            continue;

        vorhanden[id] = true;

        const schwelle = ergebnis[id];
        const warnung = Number(eintrag.warnung);
        const kritisch = Number(eintrag.kritisch);

        if (eintrag.warnung !== null && eintrag.warnung !== "" && Number.isFinite(warnung))
            schwelle.warnung = warnung;

        if (eintrag.kritisch !== null && eintrag.kritisch !== "" && Number.isFinite(kritisch))
            schwelle.kritisch = kritisch;

        schwelle.aktiv = eintrag.aktiv !== false;

        const a = schwelle.warnung;
        const b = schwelle.kritisch;

        if (schwelle.richtung === "hoch") {
            schwelle.warnung = Math.min(a, b);
            schwelle.kritisch = Math.max(a, b);
        } else {
            schwelle.warnung = Math.max(a, b);
            schwelle.kritisch = Math.min(a, b);
        }
    }

    return ergebnis;
}

/*
 * Bewertet einen Messwert: "normal", "warnung" oder "kritisch".
 *
 * vorher ist die bisherige Stufe; sie bestimmt den Puffer gegen
 * Flackern. Nicht auswertbare Werte wie "--" gelten als normal.
 */
function bewerteStufe(wert, schwelle, vorher) {
    if (!schwelle || !schwelle.aktiv)
        return "normal";

    if (wert === null || wert === undefined || wert === "")
        return "normal";

    const zahl = Number(wert);

    if (!Number.isFinite(zahl))
        return "normal";

    const bisher = WARN_RANG[vorher] || 0;

    // Abstand jenseits der Schwelle, in Richtung "schlechter" positiv.
    const jenseits = grenze =>
        schwelle.richtung === "hoch" ? zahl - grenze : grenze - zahl;

    const erreicht = (grenze, stufe) =>
        jenseits(grenze) >= 0 ||
        (bisher >= WARN_RANG[stufe] && jenseits(grenze) > -WARN_PUFFER);

    if (erreicht(schwelle.kritisch, "kritisch"))
        return "kritisch";

    if (erreicht(schwelle.warnung, "warnung"))
        return "warnung";

    return "normal";
}
