# AP27 – Ziele und Akzeptanzkriterien

**Festgelegt am 26.09.2026, vom Nutzer freigegeben.**

Grundlage: der Abschluss-Audit vom 26.09.2026, Kategorie A.

## Ziel

Die beiden Punkte erledigen, die vor der Einreichung besser aufgehoben
sind als danach. Kein Umbau, keine neue Funktion.

**AP27 ist das letzte Paket vor der Einreichung.**

## Zwei Punkte

### 1. Cinnamon-Untergrenze deklarieren

`"cinnamon-version": ["6.6"]` in beide `metadata.json`.

**Was das Feld bewirkt.** Es ist eine **Untergrenze**, kein Bereich.
`versionCheck()` in `/usr/share/cinnamon/js/ui/extension.js` liefert
`true`, sobald die laufende Version größer oder gleich **einer** der
angegebenen ist; nach oben wird nie etwas ausgeschlossen. Ein einziger
Eintrag genügt deshalb.

**Was ohne das Feld geschieht.** Nichts wird geprüft: `extension.js`
wertet es nur aus, wenn es vorhanden ist, und `ExtensionCore.py` fällt
im Zweifel auf „kompatibel" zurück. aVincePulse würde also auch auf
Cinnamon 5.4 angeboten.

**Warum das ein Risiko ist.** Geprüft ist ausschließlich Cinnamon
6.6.9. Der Schema-Typ `list` mit `columns`, `dependency`, `setOptions()`
und der Typ `generic` werden verwendet; ab welcher Cinnamon-Fassung sie
existieren, ließ sich ohne eine ältere Installation nicht feststellen.
Ein Nutzer auf Mint 21 sähe im Zweifel ein beschädigtes
Einstellungsfenster und hielte aVincePulse für fehlerhaft.

**Warum 6.6 und nicht 6.2.** Entscheidung des Nutzers vom 26.09.2026.
Ausschlaggebend war die Umkehrbarkeit: Eine Untergrenze später zu
**senken** nimmt niemandem etwas weg und lässt mehr Nutzer hinzukommen.
Sie **anzuheben** entzieht das Spice Leuten, die es bereits verwenden.
6.6 entspricht Mint 22.3, also genau dem geprüften Stand.

**Preis dieser Wahl:** Mint 22, 22.1 und 22.2 (Cinnamon 6.2 und 6.4)
können nicht installieren. Ob es dort liefe, ist unbekannt und ließe
sich nur in einer virtuellen Maschine feststellen – ein eigenes
Arbeitspaket nach der Veröffentlichung.

**Pflicht ist das Feld nicht.** In `extension.js` steht es nur bei
`Type.EXTENSION` unter `requiredProperties`; `APPLET` und `DESKLET`
haben gar keine. Auch `validate-spice` verlangt es nicht. Es wird
gesetzt, weil es schützt, nicht weil es gefordert wäre.

### 2. Akku-Zeile gegen eine leere Sensordatei absichern

`hardwareDetection.js`, `_readBatteryCharge()`, Zeile 980:
`Number(capacity)` wird zu `this._zahlOderNull(capacity)`.

**Die Lücke.** `_readFile()` endet auf `.trim()` und liefert bei einer
**leeren** Datei `""`, nicht `null`. Die Prüfung lautet
`if (capacity !== null)` und lässt `""` durch. `Number("")` ist `0`,
endlich, ≥ 0 und ≤ 100 – die Funktion gibt `"0"` zurück und erreicht
die Ersatzrechnung aus `charge_now`/`charge_full` nie.

**Die Folge.** Anzeige „BATT 0 %" statt `--`. Schwerwiegender: Die
Warnschwelle für `battery_charge` ist „tief" mit kritisch = 10 und wird
im Akkubetrieb ausgewertet. Ein Notebook mit vollem Akku zeigte
dauerhaft kritisch rot 0 %.

**Einordnung.** Die Datei muss dafür vorhanden **und leer** sein. Auf
beiden Geräten nicht reproduzierbar: Der Tower hat keine Einträge unter
`/sys/class/power_supply`, das Referenzgerät liefert einen Wert.
Theoretisch belegt, im Betrieb nicht beobachtet.

Es ist dieselbe Fallenklasse, die AP25 als P1, P6, P7, P8 und P9
bereinigt hat – hier ist eine Stelle übrig geblieben. Alle 30
`Number()`-Aufrufe wurden im Audit einzeln geprüft; dies ist der
einzige ungeschützte.

**Der Nachweis läuft ohne die fehlende Hardware.** `test_ap27.js`
schneidet `_readBatteryCharge()` aus dem echten Quelltext, hängt eine
Attrappe für `_readFile` daran und prüft die Fälle einzeln – Verfahren
wie bei `test_b7_b8.js` aus AP25.

## Akzeptanzkriterien

1. Beide `metadata.json` tragen `"cinnamon-version": ["6.6"]`, JSON
   gültig.
2. **Nach dem Cinnamon-Neustart laufen beide Komponenten weiter** –
   keine Meldung „not compatible", keine Fehlerzeile im Protokoll.
   Damit ist im Betrieb belegt, dass `6.6.9` die Grenze `6.6` besteht.
3. `_readBatteryCharge()` liefert `"--"` statt `"0"`, wenn `capacity`
   leer ist – belegt durch `test_ap27.js`.
4. **Der Normalfall bleibt unverändert:** Die Akkuanzeige zeigt
   denselben Wert wie `/sys/class/power_supply/BAT0/capacity`.
5. Kein ungeschützter `Number()`-Aufruf mehr auf einen Rohwert aus
   `/sys` oder `/proc`, in allen zehn Dateien geprüft.
6. Die vier gemeinsamen Module bleiben zwischen Applet und Desklet
   **bitgenau identisch**.
7. Syntax 10/10; die acht vorhandenen Prüfskripte weiterhin **430
   Prüfungen, 0 Fehler**, dazu `test_ap27.js`.
8. Einreichungspakete neu gebaut, `validate-spice` erneut
   „No errors found".
9. Version `0.1.0-dev.27`, Snapshot, Fortschreibung, Commit, Tag,
   Vollbackup mit Wiederherstellungsprobe, GitHub-Release.

## Nicht im Umfang

Alles aus den Kategorien B und C des Audits, insbesondere die
Laufwerksliste (B1), die nicht atomare Speedtest-Sperre (B2), die
Temperatur-Heuristik (B3), die verbleibenden synchronen Zugriffe (B4)
und die Klickfängergröße (B5).

Begründung: Sie berühren Bereiche, in denen vier der neun
Zweitgerätebefunde aus AP25 lagen (B1, B8, B9, P10). Ohne den Tower
sind sie nicht verantwortbar zu ändern.

## Risiko

`hardwareDetection.js` ist ein **gemeinsames Modul** – nach der
Änderung ist ein Cinnamon-Neustart nötig; den löst der Nutzer aus.

Die Änderung selbst ist so klein, wie eine Änderung sein kann: Ein
Funktionsaufruf wird durch einen anderen ersetzt, der in derselben
Datei bereits verwendet wird und durch 23 bestehende Prüfungen
abgedeckt ist. Das Verhalten ändert sich ausschließlich in dem Fall,
der heute falsch ist.

Punkt 1 fasst keine Zeile Code an.

## Reihenfolge

1. Diese Datei
2. Punkt 1 – Metadaten
3. Punkt 2 – Code und Prüfskript
4. Prüfungen ohne Cinnamon
5. Installation, Cinnamon-Neustart durch den Nutzer, Funktionstest
6. Abschluss nach der Routine aus Abschnitt 9 des Statusdokuments

---

# Ergebnis

**Abgeschlossen am 26.09.2026.** Version `0.1.0-dev.27`.

Beide Punkte umgesetzt, alle neun Akzeptanzkriterien erfüllt.

| Nr. | Kriterium | Nachweis |
|---|---|---|
| 1 | Feld in beiden `metadata.json` | `["6.6"]`, JSON gültig, je drei Zeilen |
| 2 | Komponenten laden nach dem Neustart | **beide Geräte**: keine Meldung „not compatible", 0 Fehlerzeilen |
| 3 | `"--"` statt `"0"` bei leerer `capacity` | `test_ap27.js`, dazu `gegenprobe.js` gegen den alten Stand |
| 4 | Normalfall unverändert | Referenzgerät **100 %**, deckungsgleich mit `/sys` |
| 5 | kein ungeschützter `Number()` mehr | in allen zehn Dateien geprüft |
| 6 | gemeinsame Module bitgenau identisch | alle vier |
| 7 | Syntax und Prüfskripte | 10/10; **494 Prüfungen in neun Skripten, 0 Fehler** |
| 8 | Pakete neu gebaut | beide **„No errors found"**, `VALIDATE-2026-09-26-AP27.txt` |
| 9 | Version, Snapshot, Tag, Backup, Release | `0.1.0-dev.27` |

## Der Nachweis für Punkt 2

**Nicht behauptet, sondern gemessen.** `gegenprobe.js` führt dieselben
Fälle gegen die Fassung aus Commit `6fff747`:

| Fall | vor AP27 | nach AP27 |
|---|---|---|
| `capacity` leer | **„0"** | `--` |
| `capacity` nur Leerzeichen | **„0"** | `--` |
| `capacity` leer, `charge_now`/`charge_full` gültig | **„0"** | **„50"** |
| `capacity` gültig (87) | „87" | „87" |
| `capacity` unlesbar | `--` | `--` |

Der dritte Fall wiegt am schwersten: Ein Gerät, das seinen Ladestand
über `charge_now` meldet und eine leere `capacity`-Datei führt, hätte
dauerhaft 0 % gezeigt – die Ersatzrechnung wurde nie erreicht.

**Warum die Gegenprobe:** In AP25 schlugen dreimal Prüfungen an,
obwohl der Code richtig war. Umgekehrt ist eine Prüfung, die auch ohne
die Änderung besteht, wertlos. Ein Erfolg allein belegt nichts, solange
nicht gezeigt ist, dass die Prüfung überhaupt anschlagen kann.

## Zweitgerät

**Am 26.09.2026 auf tower-linux bestanden**, Einzelheiten in
`AP27-TOWERTEST.md`.

Der Tower hat keinen Akku und konnte den Fix nicht im Betrieb
nachweisen. Er hat aber die drei Fragen beantwortet, für die er
gebraucht wurde:

- **Cinnamon 6.6.9** – die Untergrenze sperrt ihn nicht aus.
- **`battery_charge` und `psu_state` bleiben ausgeblendet**, `Akku
  erkannt: False`. Der Fall „kein Akku" ist unberührt.
- **Die Zuordnung von SSD-Sensor und Laufwerk stimmt** –
  `nvme1n1p2` ↔ `hwmon1 → nvme1`.

**Ein ungeplanter dritter Beleg für B1, B9 und P10:** Die
hwmon-Nummerierung hatte sich gegenüber dem 23.09.2026 erneut
verschoben, die Linux-SSD lag nun auf `hwmon1` statt `hwmon2`. Die
Automatik traf trotzdem die richtige Platte.

## Was offen bleibt

- **Der Fix im echten Akkubetrieb mit leerer `capacity`-Datei.** Die
  Hardware dafür gibt es auf keinem der beiden Geräte; belegt ist er
  mit gestellten Werten.
- **Ob aVincePulse auf Cinnamon 6.2 liefe.** Unbekannt und nur in
  einer virtuellen Maschine feststellbar. Läuft es dort, kann die
  Untergrenze gesenkt werden und die gesamte Mint-22-Reihe kommt hinzu.

## Nebenbefund, geklärt

Die Abweichung `FREE 1.6 TB` gegenüber `df -h 1,7T` am Tower ist **B4
aus AP25**, dort bereits als „kein Befund" abgeschlossen: `df` rundet
auf. Zur Gegenprobe auf dem Referenzgerät gemessen – dort liefert
`filesystem::free` denselben Wert wie `df --output=avail`, beide zeigen
`1,6T`. Die Randnotiz zur Basis (1024⁴ mit der Beschriftung „TB") ist
bei **P15** vermerkt und für ein späteres Paket vorgemerkt.

## Neues Prüfwerkzeug

| Datei | Zweck |
|---|---|
| `06_TESTVERSIONEN/0.1.0-dev_AP27-PRUEFDATEN/test_ap27.js` | 64 Prüfungen zu beiden Punkten |
| `…/gegenprobe.js` | belegt, dass `test_ap27.js` anschlagen kann |
| `05_DOKUMENTATION/werkzeuge/ap27-towertest.py` | liest den Zustand beider Komponenten aus dem laufenden Cinnamon |
| `05_DOKUMENTATION/werkzeuge/ap27-akkupruefung.js` | prüft die Akku-Auswertung, **auch ohne Akku** |

Die beiden letzten liegen bewusst in `05_DOKUMENTATION/`: Alles unter
`06_TESTVERSIONEN/` ist per `.gitignore` ausgeschlossen und existiert
am Zweitgerät gar nicht.
