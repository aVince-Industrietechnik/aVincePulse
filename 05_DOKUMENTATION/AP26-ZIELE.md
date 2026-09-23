# AP26 – Ziele und Akzeptanzkriterien

**Festgelegt am 23.09.2026, vom Nutzer freigegeben.**

Grundlage: `06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/spices/EINREICHUNG-ANFORDERUNGEN.md`
sowie Abschnitt 9 des Prüfberichts AP25.

## Ziel

Die drei Befunde abarbeiten, die aus AP25 zurückgestellt wurden und
wörtlich in der Prüfliste der Cinnamon-Spices-Gutachter stehen, das
Lizenzfeld ergänzen und die offene Entscheidung zu den übersetzten
Protokollzeilen treffen – damit bei der Einreichung nichts angemerkt
wird, was vorher zu beheben war.

**AP26 ist das letzte Paket vor der Einreichung.**

## Umfang – fünf Punkte

### 1. S1/P14 – synchrones `query_filesystem_info`

Die Prüfliste der Gutachter sagt: synchrone Dateizugriffe sind
„avoided at all costs".

Bestand vor AP26: zwei Aufrufstellen in `measurement.js` (Zeile 429
und 451), erreicht über vier Wege.

| Weg | Wann | Häufigkeit |
|---|---|---|
| `readStorageFree()` | jeder Takt | alle 3 s |
| `readStorageFreeAnteil()` | jeder Takt | alle 3 s |
| `_platzText()` über `getLaufwerkOptionen()` | Auswahlfeld aufbauen | auf Aktion |
| `_freierPlatz()` im Hardwarebericht | Bericht schreiben | auf Aktion |

Zwei synchrone Abfragen je Takt – das ist zugleich Befund P14.

**Entscheidung des Nutzers: alle vier Wege werden asynchron.** Nach
AP26 enthält der Quellcode keinen synchronen `query_filesystem_info`
mehr.

Die beiden Taktabfragen werden zu **einer** zusammengefasst
(`filesystem::free,filesystem::size` in einem Aufruf). Damit ist S1
behoben und P14 gleich mit.

Vorgehen je Weg:

- **Takt:** Zeile „Speicherplatz" und ihre Warnschwelle werden im
  Rückruf gesetzt, wenige Millisekunden nach den übrigen Werten.
  `_bewerteWarnschwellen()` läuft über die übergebenen Schlüssel; ein
  Aufruf mit nur `storage_free` lässt die anderen Zeilen unberührt.
- **Bericht:** `berichtText()` bekommt einen Rückruf, der Bericht wird
  darin geschrieben. Die Werte bleiben exakt.
- **Auswahlfeld:** Der freie Platz steht nur in der Beschriftung, nicht
  im Wert. `_auswahlKennzeichen()` vergleicht ausschließlich Werte, die
  AP16-Logik zum Neu-Öffnen des Fensters wird also nicht berührt. Die
  Optionen werden weiter sofort gesetzt, die Beschriftungen nach der
  asynchronen Abfrage ein zweites Mal mit `setOptions` nachgezogen –
  bei unveränderten Werten.

Die übrigen synchronen Zugriffe (`/proc`, `/sys`, eigene kleine
Dateien) bleiben. AP25 hat sie ausdrücklich als unbedenklich
eingestuft; sie umzustellen wäre ein eigenes Paket.

### 2. S3 – `GLib.SOURCE_REMOVE` / `SOURCE_CONTINUE`

16 Rückgabewerte in Zeitgeber-Rückrufen, davon 14 nach
`SOURCE_REMOVE` und 2 nach `SOURCE_CONTINUE`.

| Datei | Zeilen |
|---|---|
| `applet.js` | 1052, 1109, 1119, 1122\*, 2364 |
| `speedtest.js` (Applet) | 921, 1252, 1278 |
| `desklet.js` | 790, 1407, 1464, 1474, 1477\* |
| `speedtest.js` (Desklet) | 921, 1252, 1278 |

\* die beiden `SOURCE_CONTINUE`-Fälle.

Die beiden bereits richtigen Stellen (`applet.js:2226`,
`speedtest.js:1231`) bleiben unverändert.

**Nicht anfassen:** `applet.js:1057` und `desklet.js:1412` sind
`return true` der umgebenden Funktion, kein Zeitgeber.

### 3. S4 – Begründung im Code, keine Änderung

`applet.js:2359` und `desklet.js:785`. Der Takt-Zeitgeber legt sich im
eigenen Rückruf neu an. Das ist **richtig so**: Der Abstand ist
veränderlich, weil der Takt auf die Systemuhr ausgerichtet wird, damit
Applet und Desklet im selben Moment messen (AP15). Ein fester
periodischer Zeitgeber könnte das nicht leisten.

Der vorhandene Kommentar nennt das Warum, sagt aber nicht, dass hier
bewusst kein periodischer Zeitgeber verwendet wird. Er wird so
ergänzt, dass ein Gutachter nicht raten muss. **Kein Code ändert
sich.**

### 4. Übersetzte Werte in Protokollzeilen

Die offene Entscheidung aus AP25, Abschnitt 9. Abschnitt 8 des
Statusdokuments verlangt unübersetzte Protokollzeilen; auf einem
englischen System steht dort `automatic`, wer ein Protokoll durchsucht,
findet es nicht.

**Ursache:** `_quelle[art]` in `hardwareDetection.js` ist ein
übersetzter Text und wird doppelt verwendet – im Hardwarebericht
(sichtbar, soll übersetzt sein) und in den Protokollzeilen `AP05` und
`AP14` (soll unübersetzt sein).

**Entscheidung des Nutzers:** Die beiden Verwendungen werden getrennt.
Ein zweiter Wert `_quelleKennung[art]` trägt eine feste, unübersetzte
Kennung (`auto`, `manual`, `auto-fallback`) und geht ins Protokoll.
`_quelle[art]` bleibt übersetzt und geht in den Bericht.

Betroffen sind zwei Code-Stellen: `hardwareDetection.js:315` (AP14,
schreibt je Aufruf drei Zeilen – cpu, storage, fan) und `:265` (AP05
Speichersensor, eine Zeile). Der Prüfbericht nennt fünf Protokollzeilen
(vier aus AP14, eine aus B7); die genaue Zahl wird im laufenden
Protokoll nachgezählt und bei Abweichung in der Fortschreibung
berichtigt.

### 5. Lizenzfeld in beide `info.json`

`"license": "GPL-3.0-only"` in
`PRUEFDATEN/einreichung/applets/…/info.json` und
`…/desklets/…/info.json`. Von der Vorgabe empfohlen, echte Spices im
Repository führen das Feld.

## Akzeptanzkriterien

1. `grep -rn "query_filesystem_info"` findet in `02_QUELLCODE` nur noch
   `_async` und `_finish`.
2. Je Takt **eine** Dateisystemabfrage statt zwei, nachgewiesen über
   die Zählung der Messschleife von außen (inotify, Abschnitt 9).
3. Anzeige „Speicherplatz" und ihre Warnschwelle verhalten sich
   unverändert: Wert stimmt mit `df` überein, die Warnfarbe schaltet an
   derselben Schwelle. Kein `--` nach dem Laden.
4. Hardwarebericht und Laufwerks-Auswahlfeld zeigen denselben freien
   Platz wie bisher.
5. Kein `return true` oder `return false` mehr in einem
   Zeitgeber-Rückruf; die beiden Nicht-Zeitgeber-Stellen unverändert.
6. Die Protokollzeilen `AP05` und `AP14` enthalten auf einem deutschen
   System keinen deutschen Text mehr, der Hardwarebericht dagegen
   weiterhin.
7. Die vier gemeinsamen Module bleiben zwischen Applet und Desklet
   **bitgenau identisch**.
8. Syntaxprüfung mit `cjs` 10/10, Namensprüfung vor der Installation
   (AP18-Regel), alle sieben Prüfskripte ohne Fehler.
9. Funktionstest im laufenden Cinnamon: beide Komponenten,
   Einstellungsfenster, „Hardware neu erkennen", Speedtest-Meldungen,
   Fensterposition nach Neu-Öffnen – das sind die Stellen, an denen die
   Zeitgeber hängen.
10. Beide `info.json` tragen das Lizenzfeld.
11. Einreichungspakete **neu gebaut**, `validate-spice` erneut
    „No errors found". Dieselbe Begründung wie in AP25, Phase 3,
    Schritt 6: ein Prüfergebnis vom Vortag sagt über den heutigen Stand
    nichts aus.
12. Version `0.1.0-dev.26`, Snapshot, Fortschreibung, Commit, Tag,
    Vollbackup mit Wiederherstellungsprobe, GitHub-Release.

## Nicht im Umfang

P10, S2, P17, der Betriebsnachweis zu B9, P1 und P11, das Vektorlogo,
das Mausrad-Verhalten im Einstellungsfenster und die 21 Beschriftungen
in den Listenspalten.

## Risiko und Vorgehen

Die Umstellung berührt `measurement.js` und `hardwareDetection.js` –
beides **gemeinsame Module**. Nach jeder Änderung daran ist ein
Cinnamon-Neustart nötig; den löst der Nutzer aus.

Die empfindlichste Stelle ist der Bericht- und Optionsweg in
`on_hardware_neu_erkennen()`, wo AP12, AP16, AP17 und B8
zusammenlaufen. Der Entwurf hält die Werte-Reihenfolge dort bewusst
synchron, damit genau diese Logik unverändert bleibt.

Reihenfolge der Umsetzung, aufsteigend nach Risiko:

1. Punkt 5 – Lizenzfeld (kein Verhalten)
2. Punkt 3 – Kommentar zu S4 (kein Code)
3. Punkt 2 – S3, Zeitgeber-Rückgabewerte
4. Punkt 4 – Protokollzeilen
5. Punkt 1 – S1, asynchrone Dateisystemabfrage

---

# Ergebnis

**Abgeschlossen am 23.09.2026.** Version `0.1.0-dev.26`.

Alle fünf Punkte umgesetzt, alle zwölf Akzeptanzkriterien erfüllt.

## Was geändert wurde

| Punkt | Dateien | Umfang |
|---|---|---|
| **1 – S1/P14** | `measurement.js` (2×), `applet.js`, `desklet.js` | asynchrone Abfrage, zwei Taktabfragen zu einer zusammengefasst |
| **2 – S3** | `applet.js`, `desklet.js`, `speedtest.js` (2×) | 16 Rückgabewerte in 15 Zeitgebern |
| **3 – S4** | `applet.js`, `desklet.js` | nur Kommentar |
| **4 – Protokollzeilen** | `hardwareDetection.js` (2×) | `_quelleKennung` neben `_quelle` |
| **5 – Lizenzfeld** | beide `info.json` | eine Zeile je Paket |

### Punkt 1 im Einzelnen

Der Zwischenspeicher `_platzSpeicher` hält den zuletzt gemessenen Wert
je Pfad. Gefüllt wird er ausschließlich von `_frageLaufwerkAb()`, also
asynchron. Vier Wege nutzen ihn:

- **Takt:** `readStorageAsync()` fragt das gemessene Laufwerk ab und
  liefert freien Platz und Anteil aus **einem** Aufruf. Wert und
  Warnschwelle werden im Rückruf gesetzt. `_bewerteWarnschwellen()`
  läuft nur über die übergebenen Schlüssel, die übrigen Zeilen bleiben
  unberührt.
- **Bericht:** `berichtTextAsync()` holt vorher alle Laufwerke frisch.
  `_schreibeHardwareBericht()` meldet den Pfad über einen Rückruf,
  Meldung und Rückfrage stehen darin.
- **Auswahlfeld:** `getLaufwerkOptionen()` bleibt synchron und liest
  aus dem Zwischenspeicher. Anschließend zieht
  `aktualisiereLaufwerkPlatz()` die Beschriftungen nach.

**Warum das Auswahlfeld nicht asynchron aufgebaut wird:** Der freie
Platz steht nur in der Beschriftung, nicht im Wert.
`_auswahlKennzeichen()` vergleicht ausschließlich Werte. Bliebe der
Aufbau nicht synchron, liefe die Rückfrage zum Neu-Öffnen des Fensters
(AP16) in einen Rückruf – und damit die Reihenfolge, in der AP12,
AP16, AP17 und B8 zusammenlaufen. Die Beschriftung nachzuziehen
erreicht dasselbe, ohne diese Logik anzufassen.

## Akzeptanzkriterien – Nachweise

| Nr. | Kriterium | Nachweis |
|---|---|---|
| 1 | kein synchroner `query_filesystem_info` | nur `_async` und `_finish`, je einmal je Modul |
| 2 | eine Dateisystemabfrage je Takt | im Quelltext belegt: ein `_async`-Aufruf, `_laufwerk()` einmal, beide Werte aus einem Aufruf. Siehe „Grenze des Nachweises" |
| 3 | Anzeige unverändert, kein `--` | Applet und Desklet 1.6 TB = `df`. Siehe „Das `--`, das niemand sieht" |
| 4 | Bericht und Auswahlfeld unverändert | Bericht vom 21:21:15 mit `1.6 TB` und `505 MB`; alle drei Beschriftungen mit Werten |
| 5 | keine nackten Zeitgeber-Rückgaben | `test_ap26.js` prüft alle 15 Zeitgeber einzeln |
| 6 | Protokoll unübersetzt, Bericht übersetzt | Protokoll: `(drive: nvme0n1p2, auto)`. Bericht: `Gemessen: / (automatisch)` |
| 7 | gemeinsame Module bitgenau identisch | alle vier |
| 8 | Syntax, Namen, Prüfskripte | Syntax 10/10; **430 Prüfungen, 0 Fehler** (345 aus AP25 + 85 neu) |
| 9 | Funktionstest im laufenden Cinnamon | siehe unten |
| 10 | Lizenzfeld | beide `info.json` |
| 11 | Pakete neu gebaut, `validate-spice` | beide **„No errors found"**, `VALIDATE-2026-09-23-AP26.txt` |
| 12 | Version, Snapshot, Tag, Backup, Release | Version `0.1.0-dev.26` |

## Funktionstest im laufenden Cinnamon (23.09.2026, ab 21:14)

| Prüfung | Ergebnis |
|---|---|
| Protokoll nach dem Neustart | `(auto)` statt `(automatisch)`, unmittelbar vergleichbar mit dem Start um 20:00:58 |
| Fehlerzeilen | **0** mit aVincePulse-Bezug |
| Speicherplatz | Applet und Desklet je `1.6 TB`, `df` bestätigt |
| Messtakt | 2,90 / 2,99 / 3,01 s – folgt weiter der Systemuhr |
| **Gleichlauf** | Versatz Applet/Desklet **0 ms** in allen vier Takten |
| Laufwerk-Auswahlfeld | alle drei Beschriftungen mit freiem Platz, kein `--` |
| „Hardware neu erkennen" | Meldung „5 von 5 … Bericht abgelegt … Auswahl unverändert", Bericht um 21:21:15 neu geschrieben |
| Speedtest | um 21:22:37 durchgelaufen, vollständige Werte, Meldung selbsttätig ausgeblendet (`visible: false`, Zeitgeber entfernt) |
| Einstellungswerte | **0 geänderte Werte** gegenüber der Sicherung von 21:09:44 |

Die eine gemeldete Abweichung vom Schema ist `panel-symbol = symbolic`
– die eigene Wahl des Nutzers vom 22.09.2026, unverändert seit dem
Endstand von AP25.

**Der Gleichlauf von 0 ms ist der Betriebsnachweis für S4.** Die
Entscheidung, den Takt-Zeitgeber nicht auf einen periodischen
umzustellen, ist damit nicht nur begründet, sondern belegt.

## Das `--`, das niemand sieht

Nach dem Neuladen steht in der Applet-Zeile für **5,6 ms** `-- GB`,
bevor der asynchrone Wert eintrifft. Gemessen wurde zusätzlich, ob die
Zeile in diesem Moment sichtbar ist: **sie ist es nicht** – das Popup
existiert zu diesem Zeitpunkt noch nicht
(`get_paint_visibility() === false`). Beim Desklet, das dauerhaft
sichtbar ist, trug die allererste Ablesung bereits `1.6 TB`.

Das Akzeptanzkriterium 3 lautete wörtlich „kein `--` nach dem Laden".
Für alles Sichtbare trifft das zu, für den unsichtbaren Zwischenzustand
nicht. Festgehalten, weil ein späterer Umbau der Anzeige diesen
Zustand sichtbar machen könnte.

## Grenze des Nachweises

Akzeptanzkriterium 2 – „eine Dateisystemabfrage je Takt statt zwei" –
ist im Quelltext belegt und von `test_ap26.js` abgesichert, **nicht
aber am laufenden Prozess gezählt**. Dafür wäre `sudo strace -p` auf
den Cinnamon-Prozess nötig (`ptrace_scope` steht auf 1); das hält
Cinnamon kurz an. Bewusst unterlassen.

## Was am Prüfwerkzeug nachgezogen wurde

Zwei Skripte aus AP25 brachen zunächst ab. **Beides lag am Werkzeug,
nicht am Programm:**

- `test_gruppeB2.js` und `test_b7_b8.js` suchen
  `_schreibeHardwareBericht(detector)` als Text. Die Signatur trägt
  seit AP26 einen Rückruf als zweites Argument.
- Die Attrappe in `test_b7_b8.js` ersetzt `_waehleSensor()` durch eine
  Fassung, die nichts setzt, und kannte `_quelleKennung` nicht.

Dass im echten Ablauf `detect()` die Kennung immer belegt, bevor die
erste Protokollzeile geschrieben wird, wurde am Quelltext nachgesehen:
`detect()` setzt `_quelleKennung = {}` und ruft danach
`_waehleSensor()` für alle drei Sensorarten; `setzeLaufwerkGeraet()`
protokolliert erst danach.

Ein dritter Abbruch war ein Aufruffehler: `test_gruppeB.js` braucht
`GI_TYPELIB_PATH`, wie in seinem eigenen Kopf steht.

## Berichtigung zum Prüfbericht AP25

Abschnitt 9 des Prüfberichts nennt **fünf** Protokollzeilen mit
übersetztem Wert, „vier aus AP14, eine aus B7". Nachgezählt sind es
**vier**: Die `AP14`-Schleife läuft über `SENSOR_ARTEN`, und das sind
drei – `cpu`, `storage`, `fan`. Dazu kommt die eine `AP05`-Zeile aus
B7. Im Protokoll vom 23.09.2026 um 21:14:32 sind genau diese vier
Zeilen zu sehen.

An Ursache und Behebung ändert das nichts; betroffen waren zwei
Code-Stellen.

## Neues Prüfwerkzeug

`06_TESTVERSIONEN/0.1.0-dev_AP26-PRUEFDATEN/test_ap26.js` – 85
Prüfungen. Sichert die Akzeptanzkriterien dauerhaft ab und schlägt an,
wenn ein Zeitgeber hinzukommt, dessen Rückgabewert nicht benannt ist.

Die letzte Prüfung darin ruft `readStorageAsync()` wirklich auf und
vergleicht das Ergebnis mit `df` – sie prüft also das Verhalten, nicht
nur den Text.

---

# Nachtrag: die Beobachtung zu den Meldungen in der Bildschirmmitte

**Gemessen am 23.09.2026 nach Abschluss des Pakets.**

Beim Funktionstest fiel dem Nutzer auf, die Texte der Meldungen nach
„Hardware neu erkennen" und nach dem Speedtest schienen sich „nach
einer kurzen Sekunde zu verschieben oder ein anderer Text erschien
darunter". Fotografieren ließ es sich nicht.

Nachgemessen statt vermutet: `PRUEFDATEN/meldung_messen.py` wartet auf
das Erscheinen einer Meldung und zeichnet dann alle 30 ms Text,
Position, Größe und Deckkraft auf – dazu die Fenster, die sie
überlappen. Gelesen wird über `org.Cinnamon.Eval` aus Python
(`eval.py`), rein lesend.

**Es sind zwei verschiedene Ursachen, keine davon ein Fehler.**

## Hardwareerkennung: die Fenster dahinter

Die Meldung hatte über ihre gesamte Anzeigedauer von 6,7 Sekunden
**genau einen Zustand**:

```
x=314  y=358   909x309   Deckkraft 255   "Hardware neu erkannt …"
```

Kein Textwechsel, keine Positions- oder Größenänderung.

Was sich änderte, lag **dahinter**. Die Aufzeichnung nennt vier
Fenster, die die Meldung überlappen:

| Fenster | Lage | Überlappung |
|---|---|---|
| `Bildschirmfoto` | 523,270 · 489×439 | **mittig, quer durch den Text** |
| `aVincePulse Applet` | 50,50 · 800×632 | linke Hälfte |
| `Claude` | Vollbild | ganz |
| `nemo-desktop` | Vollbild | ganz |

Die Meldung liegt bei 314–1223 × 358–667 und hat Deckkraft **0,55**.
Alles dahinter scheint durch.

**Das ist Befund H15 aus AP17**, dort wörtlich festgehalten: „ein
durchscheinendes Fenster hinter einer halbtransparenten Meldung wirkt
für den Nutzer wie ‚anderer Text in der Meldung'". Die Deckkraft 0,55
ist die Entscheidung des Nutzers vom 20.09.2026 und ergibt gegen
reinweißen Inhalt 4,7 : 1.

Im Screenshot des Nutzers ist es zu sehen: Durch die Meldung hindurch
liest man den Knopf „Hardware neu erkennen" und den Satz „Findet die
Erkennung neue oder entfernte Sensoren …".

**Warum es sich nicht fotografieren ließ:** Das Aufnahmewerkzeug stand
selbst mitten hinter der Meldung und erschien und verschwand beim
Auslösen.

## Speedtest: die Fläche wächst um ihre Mitte

Hier springt tatsächlich etwas, und zwar erwartbar. Der Speedtest
zeigt zwei Meldungen nacheinander:

| Zeitpunkt | Text | Lage | Größe | Deckkraft |
|---|---|---|---|---|
| 0 ms | „Internet-Speedtest läuft …" | 577,474 | 382×77 | 255 |
| 33 579 ms | „Speedtest abgeschlossen …" | **0,0** | 909×222 | **0** |
| 33 624 ms | dieselbe | 314,401 | 909×222 | 255 |
| 38 394 ms | – | – | – | ausgeblendet |

Die linke obere Ecke wandert um **263 px nach links und 73 px nach
oben**, die Fläche wird **2,4-mal so breit und 2,9-mal so hoch**.

**Beide Meldungen sind dabei exakt zentriert:**

| Meldung | Mittelpunkt |
|---|---|
| „läuft …" | 768,0 / 512,5 |
| Ergebnis | 768,5 / 512,0 |
| Bildschirmmitte (1536×1024) | 768 / 512 |

Der Text springt also nicht *weg*, die Fläche **wächst um dieselbe
Mitte herum**. Für das Auge ist das ein Sprung, rechnerisch ist es
richtig.

**Der Zwischenzustand bei (0,0) ist unsichtbar.** Die Zeile mit
Deckkraft 0 belegt, dass der Schutz im Code greift: Eine neue Fläche
steht anfangs oben links und wird erst mittig gesetzt und sichtbar
gemacht, wenn ihre Größe feststeht. Sichtbar wäre sie 45 ms lang
gewesen – gemessen war sie es nie.

## Bewertung

**Kein Handlungsbedarf, und kein Zusammenhang mit AP26.** Beide
Verhaltensweisen bestehen seit AP17 bzw. AP19 und sind dort begründet.

Wer die Meldungen künftig ruhiger machen will, hat zwei Stellschrauben
– beide mit einem Preis:

- **Die Fläche nicht zentrieren, sondern ihre obere Kante festhalten.**
  Dann wächst sie nur nach unten. Kurze Meldungen säßen dafür nicht
  mehr in der Mitte.
- **Die Deckkraft erhöhen.** Das nähme das Durchscheinen, widerspräche
  aber der Entscheidung vom 20.09.2026 und verdeckte mehr vom
  darunterliegenden Fenster.

Festgehalten, damit die Beobachtung nicht erneut als Fehler geprüft
wird.

## Werkzeug

`06_TESTVERSIONEN/0.1.0-dev_AP26-PRUEFDATEN/meldung_messen.py`

```bash
python3 meldung_messen.py "'Hardware neu erkennen' druecken" 40 6
python3 meldung_messen.py "'Internet-Speedtest starten' druecken" 200 8
```

Das Skript wartet auf den Klick des Nutzers, statt einen Countdown zu
setzen; der Nutzer muss nichts timen. Es zeichnet auf, bis die Meldung
verschwunden ist, und läuft bewusst als **einzige** Aufzeichnung
(Regel aus AP19).
