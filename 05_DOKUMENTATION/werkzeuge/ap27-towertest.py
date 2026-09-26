#!/usr/bin/env python3
"""
AP27 - Zustand beider Komponenten im laufenden Cinnamon auslesen.

Aufruf (aus dem Projektwurzelverzeichnis oder von ueberall):
    python3 05_DOKUMENTATION/werkzeuge/ap27-towertest.py

Liest ausschliesslich. Verwendet org.Cinnamon.Eval ueber Gio, nicht
ueber gdbus (Regel aus AP19: gdbus zerlegt Anführungszeichen).

Gedacht fuer den Tower, laeuft aber auf jedem Geraet.
"""
import json
from gi.repository import Gio, GLib


def ev(code):
    bus = Gio.bus_get_sync(Gio.BusType.SESSION, None)
    antwort = bus.call_sync(
        "org.Cinnamon", "/org/Cinnamon", "org.Cinnamon", "Eval",
        GLib.Variant("(s)", (code,)), GLib.VariantType("(bs)"),
        Gio.DBusCallFlags.NONE, 15000, None)
    ok, ergebnis = antwort.unpack()
    if not ok:
        raise SystemExit("Eval fehlgeschlagen: " + ergebnis)
    return json.loads(json.loads(ergebnis))


CODE = """
(function () {
    const a = imports.ui.appletManager
        .getRunningInstancesForUuid("avincepulse-applet@avince")[0];

    const d = imports.ui.main.deskletContainer.actor.get_children()
        .map(x => x._delegate).filter(x => x && x._rows)[0];

    const zeilen = (k) => {
        if (!k || !k._rows) return null;
        const r = {};
        for (const id in k._rows) {
            const z = k._rows[id];
            r[id] = (z.row && z.row.visible ? "" : "AUS ") +
                    z.value.get_text() + " " + z.unit.get_text();
        }
        return r;
    };

    const info = (k) => {
        if (!k) return null;
        const m = k._detector ? k._detector.getMapping() : null;
        return {
            laufwerk: k._measurement ? k._measurement.laufwerkGeraet() : "?",
            sensorSSD: m && m.storage
                ? m.storage.chip + " / " + m.storage.label + " / " + m.storage.path
                : "keiner",
            sensorCPU: m && m.cpu
                ? m.cpu.chip + " / " + m.cpu.label : "keiner",
            akkuErkannt: !!(m && m.battery && m.battery.path),
            verfuegbar: k._detector ? k._detector.getAvailability() : null
        };
    };

    return JSON.stringify({
        appletLaeuft: !!a, deskletLaeuft: !!d,
        appletZeilen: zeilen(a), deskletZeilen: zeilen(d),
        appletInfo: info(a)
    });
})()
"""

z = ev(CODE)

print("Applet laeuft : %s" % z["appletLaeuft"])
print("Desklet laeuft: %s" % z["deskletLaeuft"])
print("")

i = z["appletInfo"] or {}
print("Gemessenes Laufwerk  : %s" % i.get("laufwerk"))
print("Gewaehlter SSD-Sensor: %s" % i.get("sensorSSD"))
print("Gewaehlter CPU-Sensor: %s" % i.get("sensorCPU"))
print("Akku erkannt         : %s" % i.get("akkuErkannt"))
print("")

print("Verfuegbarkeit laut Erkennung:")
for k, v in sorted((i.get("verfuegbar") or {}).items()):
    print("   %-16s %s" % (k, v))
print("")

for name, schluessel in (("APPLET", "appletZeilen"), ("DESKLET", "deskletZeilen")):
    print("%s-Zeilen:" % name)
    r = z[schluessel]
    if not r:
        print("   (keine)")
    else:
        for k in sorted(r):
            print("   %-16s %s" % (k, r[k]))
    print("")
