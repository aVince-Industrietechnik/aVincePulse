# AP27 am Zweitgerät prüfen (Tower)

**Angelegt am 26.09.2026.** Diese Datei liegt im Repository und ist
deshalb nach einem `git pull` auch am Tower lesbar:

```bash
cd ~/aVincePulse && cat 05_DOKUMENTATION/AP27-TOWERTEST.md
```

Die Prüfskripte liegen unter `05_DOKUMENTATION/werkzeuge/` und kommen
mit demselben `git pull` mit. Nichts muss abgetippt werden.

**Warum nicht in `06_TESTVERSIONEN/`:** Dieses Verzeichnis ist per
`.gitignore` ausgeschlossen und existiert am Tower gar nicht. Alles,
was am Zweitgerät gebraucht wird, muss in Git liegen.

---

## Warum der Tower gebraucht wird

Der Tower hat **keinen Akku**, und die in AP27 geänderte Zeile betrifft
genau die Akkuauswertung. Für den Fix selbst bringt er deshalb keinen
neuen Nachweis – `_readBatteryCharge()` wird dort nie aufgerufen.

Gebraucht wird er aus drei anderen Gründen:

1. **Die Untergrenze könnte ihn aussperren.** AP27 trägt
   `"cinnamon-version": ["6.6"]` ein. Läuft auf dem Tower ein älteres
   Cinnamon, verschwindet aVincePulse dort nach dem Update. Dann wäre
   die Grenze falsch gewählt und müsste herunter.
2. **`hardwareDetection.js` wurde geändert** – in genau dieser Datei
   hingen vier der neun Zweitgerätebefunde aus AP25 (B1, B8, B9, P10).
   Alle vier waren auf dem Referenzgerät nicht auffindbar.
3. **Der Tower deckt den Fall „kein Akku" ab.** `battery_charge` und
   `psu_state` müssen weiterhin ausgeblendet bleiben.

---

## Schritt 1 – Cinnamon-Version, vor allem anderen

```bash
cinnamon --version
```

**Steht dort etwas Kleineres als 6.6: hier aufhören und die Zahl
melden.** Alles Weitere wäre sinnlos, die Grenze muss dann zuerst
angepasst werden.

Bei `6.6.x` geht es weiter.

## Schritt 2 – Neuen Stand holen

```bash
cd ~/aVincePulse && git pull && git log -1 --oneline
```

Erwartet wird der Commit, der AP27 enthält.

## Schritt 3 – Kontrolle, dass die Änderung angekommen ist

```bash
cd ~/aVincePulse && grep -A2 cinnamon-version 02_QUELLCODE/Applet/metadata.json && grep -c "_zahlOderNull(this._readFile(basePath" 02_QUELLCODE/Applet/hardwareDetection.js
```

Erwartet: die drei Zeilen mit `"6.6"`, danach eine `1`.

## Schritt 4 – Testinstallation erneuern

```bash
cd ~/aVincePulse && rsync -a --delete 02_QUELLCODE/Applet/ ~/.local/share/cinnamon/applets/avincepulse-applet@avince/ && rsync -a --delete 02_QUELLCODE/Desklet/ ~/.local/share/cinnamon/desklets/avincepulse-desklet@avince/
```

## Schritt 5 – Übersetzung einspielen

```bash
cd ~/.local/share/cinnamon && cinnamon-xlet-makepot -i applets/avincepulse-applet@avince/ && cinnamon-xlet-makepot -i desklets/avincepulse-desklet@avince/
```

## Schritt 6 – Cinnamon neu starten

`Alt+F2`, dann `r`, dann Eingabetaste.

`hardwareDetection.js` ist ein gemeinsames Modul; ein Neuladen der
Komponenten genügt dafür nicht.

## Schritt 7 – Zustand auslesen

```bash
cd ~/aVincePulse && python3 05_DOKUMENTATION/werkzeuge/ap27-towertest.py
```

## Schritt 8 – Laufwerke und Sensoren zum Abgleich

```bash
df -h / | tail -1 && lsblk -o NAME,SIZE,MOUNTPOINT | grep -v loop && for h in /sys/class/hwmon/hwmon*; do echo "$h  $(cat $h/name 2>/dev/null)  -> $(basename $(readlink -f $h/device 2>/dev/null) 2>/dev/null)"; done
```

## Schritt 9 – Akkuauswertung prüfen

Läuft auch ohne Akku: Geprüft wird die Funktion mit gestellten Werten.

```bash
cd ~/aVincePulse && GI_TYPELIB_PATH=/usr/lib/x86_64-linux-gnu/cinnamon:/usr/lib/x86_64-linux-gnu/muffin cjs 05_DOKUMENTATION/werkzeuge/ap27-akkupruefung.js
```

Erwartet: **11 bestanden, 0 Fehler.**

---

## Was erwartet wird

| Prüfung | erwartet auf dem Tower |
|---|---|
| Cinnamon-Version | 6.6 oder höher |
| Applet und Desklet | beide `True` |
| `battery_charge`, `psu_state` | `AUS` davor oder gar nicht aufgeführt |
| `Akku erkannt` | `False` |
| SSD-Sensor | gehört zu demselben `nvme…`-Gerät wie das gemessene Laufwerk aus Schritt 8 |
| Akkuprüfung | 11 bestanden, 0 Fehler |

Die letzte Zeile der Tabelle ist der Punkt aus **B1**: Auf einem
Rechner mit zwei gleichartigen NVMe muss der Temperatursensor zu dem
Laufwerk gehören, dessen freien Platz die Anzeige nennt – sonst stehen
Temperatur und freier Platz zweier verschiedener Platten nebeneinander,
ohne jeden Hinweis darauf.

## Zurückzumelden

Die Ausgaben der Schritte 1, 2, 7, 8 und 9.

## Ergebnis

Wird nach dem Lauf hier eingetragen.
