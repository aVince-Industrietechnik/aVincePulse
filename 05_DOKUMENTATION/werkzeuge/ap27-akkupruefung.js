/*
 * AP27 - prueft die Akku-Auswertung im ausgelieferten Quellcode.
 *
 * Aufruf aus dem Projektwurzelverzeichnis:
 *   GI_TYPELIB_PATH=/usr/lib/x86_64-linux-gnu/cinnamon:/usr/lib/x86_64-linux-gnu/muffin \
 *   cjs 05_DOKUMENTATION/werkzeuge/ap27-akkupruefung.js
 *
 * Ein abweichender Pfad zu hardwareDetection.js kann als Argument
 * uebergeben werden.
 *
 * Geprueft wird der echte Quelltext: _readBatteryCharge() und
 * _zahlOderNull() werden als Text ausgeschnitten und mit einer
 * Attrappe fuer _readFile ausgewertet. Dadurch laesst sich der Fall
 * belegen, fuer den auf keinem der beiden Geraete die Hardware da ist -
 * ein Akku, dessen capacity-Datei vorhanden, aber leer ist.
 *
 * Laeuft auch auf einem Rechner ohne Akku.
 */
const GLib = imports.gi.GLib;
const ByteArray = imports.byteArray;

const PFAD = ARGV[0] || "02_QUELLCODE/Applet/hardwareDetection.js";

function lies(p) {
    const [ok, roh] = GLib.file_get_contents(p);
    if (!ok) throw new Error("nicht lesbar: " + p);
    return ByteArray.toString(roh);
}

function methode(q, kopf) {
    const s = q.indexOf(kopf);
    if (s < 0) throw new Error("nicht gefunden: " + kopf);

    let t = 0;
    for (let j = q.indexOf("{", s); j < q.length; j++) {
        if (q[j] === "{") t++;
        else if (q[j] === "}" && --t === 0) return q.slice(s, j + 1);
    }

    throw new Error("Klammer nicht geschlossen: " + kopf);
}

const quelle = lies(PFAD);

const fnLadung = eval("(function " +
    methode(quelle, "_readBatteryCharge(basePath) {").replace("_readBatteryCharge", "") + ")");

const fnZahl = eval("(function " +
    methode(quelle, "_zahlOderNull(rohwert) {").replace("_zahlOderNull", "") + ")");

function probe(dateien) {
    const o = {
        _zahlOderNull: fnZahl,
        // Ein fehlender Eintrag bedeutet "Datei nicht vorhanden".
        _readFile: function (p) {
            const n = p.slice(p.lastIndexOf("/"));
            return Object.prototype.hasOwnProperty.call(dateien, n)
                ? dateien[n] : null;
        }
    };

    return fnLadung.call(o, "/akku");
}

/*
 * Die ersten drei Faelle ergaben vor AP27 allesamt "0".
 */
const FAELLE = [
    ["capacity leer",                   { "/capacity": "" }, "--"],
    ["capacity nur Leerzeichen",        { "/capacity": "  " }, "--"],
    ["capacity leer + charge_now/full", { "/capacity": "",
                                          "/charge_now": "2400000",
                                          "/charge_full": "4800000" }, "50"],
    ["capacity unlesbarer Text",        { "/capacity": "n/a" }, "--"],
    ["capacity 87",                     { "/capacity": "87" }, "87"],
    ["capacity 0 bleibt 0",             { "/capacity": "0" }, "0"],
    ["capacity 142 ausserhalb",         { "/capacity": "142" }, "--"],
    ["nur charge_now/full (P1)",        { "/charge_now": "2400000",
                                          "/charge_full": "4800000" }, "50"],
    ["nur energy_now/full",             { "/energy_now": "30000000",
                                          "/energy_full": "40000000" }, "75"],
    ["charge_now leer (P1)",            { "/charge_now": "",
                                          "/charge_full": "4800000" }, "--"],
    ["gar nichts vorhanden",            {}, "--"]
];

print("Quelle: " + PFAD);
print("");

let gut = 0, schlecht = 0;

for (const [name, dateien, soll] of FAELLE) {
    const ist = probe(dateien);

    if (ist === soll) {
        gut++;
        print("  OK      " + name + "  ->  " + ist);
    } else {
        schlecht++;
        print("  FEHLER  " + name + "  ->  " + ist + "  statt  " + soll);
    }
}

print("");
print("Ergebnis: " + gut + " bestanden, " + schlecht + " Fehler");
