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
