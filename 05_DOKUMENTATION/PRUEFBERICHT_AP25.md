# aVincePulse – Prüfbericht AP25 (Abschlussprüfung vor der Einreichung)

> **Stand 23.09.2026. Prüfung abgeschlossen, Paket noch nicht.**
> Phase 1 und Phase 2 sind durch, beide Geräte sind geprüft, alle
> Befunde sind entschieden. Offen ist **Phase 3** – Version, Snapshot,
> Tag, Vollbackup und Release – sowie die Punkte, die nur der Nutzer
> erledigen kann (Abschnitt 9).

Geprüfter Stand: Commit `92ea1cd`
Version in `metadata.json`: `0.1.0-dev.25` – gesetzt am 23.09.2026 in
Phase 3, Schritt 5
Snapshot vor Beginn: `06_TESTVERSIONEN/0.1.0-dev_AP25-START/`
Prüfdaten (lokal, nicht versioniert): `06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/`
Grundlage: `ROADMAP_V2.md`, Abschnitte 23 und 24; Akzeptanzkriterien in
`PROJECT-STATUS.md`, Abschnitt 14

---

## 1. Vorgehen

AP25 läuft in drei Phasen, die dritte in drei Schritten an zwei Geräten.

| Phase | Inhalt | Stand |
|---|---|---|
| 1 | Prüfen ohne Codeänderung: zehn Prüfblöcke | **abgeschlossen** 22.09.2026 |
| 2 A | elf kleine Befunde ohne Entscheidungsbedarf | **abgeschlossen** 22.09.2026 |
| 2 B | sechs Befunde mit Entscheidung des Nutzers | **abgeschlossen** 23.09.2026 |
| – | Test auf dem Zweitgerät (Tower) | **abgeschlossen** 23.09.2026 |
| 2 C | neun Rückmeldungen des Zweitgeräts, B1 bis B9 | **abgeschlossen** 23.09.2026 |
| 3 | Bericht, Version, Snapshot, Tag, Backup, Release | **in Arbeit** |

**Der Test auf dem Zweitgerät findet vor dem Abschluss statt, nicht
danach.** Entscheidung des Nutzers vom 23.09.2026. Grund: `ROADMAP_V2.md`,
Abschnitt 23, führt „Tests auf mehreren unterschiedlichen Rechnern" als
Bedingung der Release-Regel. Ein auf einem Gerät geprüftes Paket könnte
die Abschlussprüfung nicht ohne Vorbehalt bestanden nennen. Zudem sind
P1 und P11 gerade die Befunde, die auf einem Desktop auftreten können –
eine Korrektur nach gesetztem Tag würde ein eigenes Arbeitspaket
erzwingen für etwas, das in AP25 gehört.

### Gemeinsame Module

`metrics.js`, `measurement.js`, `hardwareDetection.js` und `speedtest.js`
sind in Applet und Desklet bitgenau identisch. Ein Befund in einem dieser
Module gilt immer für beide Komponenten. Nach jeder Änderung neu geprüft,
zuletzt am 23.09.2026: 4 von 4 identisch.

### Nachweisarten

- **durch Dateien belegt** – aus dem Quellcode oder den Cinnamon-Quellen ablesbar
- **durch Test belegt** – im laufenden System beobachtet
- **abgeleitet** – folgt aus dem Code, Wirkung nicht beobachtet
- **nicht prüfbar auf diesem Gerät** – Hardware fehlt

---

## 2. Befundübersicht

**35 Befunde aus Phase 1, keiner kritisch.** Vollständige Liste mit je
einem Nachweis: `PRUEFDATEN/codedurchsicht/BEFUNDE.md`.

| Stufe | Zahl | behoben | offen |
|---|---|---|---|
| kritisch | **0** | – | – |
| mittel | 11 | 7 | 4 |
| gering | 13 | 10 | 3 |
| Hinweis | 9 | 2 | 7 |
| zur Kenntnis | 1 | 0 | 1 |
| Verbesserungsvorschlag | 1 | 1 | 0 |
| **Summe** | **35** | **20** | **15** |

**Behoben:** P1 P2 P3 P4 P5 P6 P7 P8 P9 P16 P18 P19 P20 P23 P24 P27 P28
P29 P30 P31
**Offen:** P10 P11 P12 P13 P14 P15 P17 P21 P22 P25 P26 S1 S2 S3 S4

Die 15 offenen sind sämtlich bewertet und einzeln entschieden
(Kriterium 10): drei für ein späteres Paket vorgemerkt, zehn zur
Kenntnis genommen, einer vom Nutzer zu erledigen (P26), dazu die vier,
die nur auf dem Zweitgerät beobachtbar sind – P1 und P7 sind darunter
bereits im Code behoben.

> **Zwei Abweichungen gegenüber der Tabelle im Zwischenstand vom
> 22.09.2026**, beide nur Zählweise, nicht Inhalt. Dort stand
> „mittel 10, gering 14, Hinweis 10". Hier ist **P18** („gering bis
> mittel") der höheren Stufe zugeschlagen, und **„zur Kenntnis"** ist
> von „Hinweis" getrennt ausgewiesen. Die Summe bleibt 35. In Phase 3
> in `PROJECT-STATUS.md` berichtigt (Abschnitt 12).

### Dazu: Befunde vom Zweitgerät

Die Zahlen oben betreffen **Phase 1 auf dem Referenzgerät**. Der Test
auf dem Tower hat am 23.09.2026 weitere Rückmeldungen ergeben, geführt
unter eigenen Kennungen `B`:

| | Zahl |
|---|---|
| neue Befunde am Programm | **6** – B1, B6, B8, B9 (mittel), B3, B7 (Hinweis) |
| Befund am Prüfwerkzeug | **1** – B2 (gering) |
| kein Befund | 2 – B4 gehört zu P15, B5 in die Roadmap |

**Keiner davon ist kritisch.** Stand:

| Befund | Stand |
|---|---|
| B1, B3, B6, B7, B8 | behoben und auf **beiden** Geräten geprüft |
| B2 | behoben (Prüfwerkzeug) |
| B4 | keine Änderung |
| B5 | in der Roadmap, OPTIONAL 1.0 |
| **B9** | behoben und geprüft |

**B8 wog am schwersten.** Er hob die Behebung von B1 durch eine
bewusste Handlung des Nutzers wieder auf – „Hardware neu erkennen"
soll die Erkennung verbessern, nicht verschlechtern. Einzelheiten und
Nachweise in Abschnitt 5.6 sowie in
`PRUEFDATEN/phase2/ERGEBNIS-B7-B8.md`.

**Ein Nebenbefund ist dabei offen geblieben:** Die Protokollzeile zum
Speichersensor enthält einen übersetzten Wert (`automatisch`), obwohl
Abschnitt 8 Protokollzeilen unübersetzt verlangt. Nicht neu – die vier
`AP14`-Zeilen tun dasselbe seit AP14 –, aber um eine Stelle vermehrt.
Zur Entscheidung.

**B1 verdient dabei die meiste Aufmerksamkeit:** Er zeigt auf jedem
Rechner mit zwei NVMe-Laufwerken stillschweigend die Temperatur eines
anderen Laufwerks an, als die Platzanzeige meint – und war auf dem
Referenzgerät grundsätzlich nicht auffindbar.

### Behoben in Phase 2, Gruppe A (22.09.2026)

**13 Befunde** ohne Entscheidungsbedarf: P1, P2, P3, P4, P5, P6, P7, P8,
P9, P19, P20, P23, P24. Geprüft mit **38 Funktionsprüfungen** unter
`cjs`, Nachweise in `PRUEFDATEN/phase2/`.

> Der Zwischenstand vom 22.09.2026 sprach von „elf Befunden". Das war
> die Zahl der **Zeilen** seiner Änderungstabelle; die erste fasst P1,
> P6 und P7 zusammen. Betroffen sind 13 Befunde. In Phase 3 in
> `PROJECT-STATUS.md` berichtigt (Abschnitt 12).

Zwei weitere bereits vorher: **P27** (Vorgabe des Leistensymbols auf
hellen Themes unbrauchbar, Kontrast 1,19 : 1) und die Sofortmaßnahme zu
**P28**.

### Behoben in Phase 2, Gruppe B (23.09.2026)

Sechs Befunde, jeder mit Entscheidung des Nutzers. **207
Funktionsprüfungen** unter `cjs` gegen den ausgelieferten Quelltext,
jeder Befund zusätzlich im laufenden Betrieb belegt.

| Befund | Stufe | Entscheidung | Nachweis |
|---|---|---|---|
| P16 | mittel | beheben | `phase2/ERGEBNIS-GRUPPE-B.md` |
| P18 | gering–mittel | beheben | `phase2/ERGEBNIS-GRUPPE-B.md` |
| P30 | mittel | beheben | `phase2/ERGEBNIS-GRUPPE-B.md` |
| P28 | mittel | Weg C | `phase2/ERGEBNIS-GRUPPE-B-TEIL2.md` |
| P29 | gering | „Hardwareerkennung" | `phase2/ERGEBNIS-GRUPPE-B-TEIL2.md` |
| P31 | Vorschlag | Weg B | `phase2/ERGEBNIS-GRUPPE-B-TEIL2.md` |

**P26** – das Repository ist privat – stellt der Nutzer vor der
Veröffentlichung selbst um; siehe Abschnitt 9.

### Offen: nur auf dem Zweitgerät beobachtbar

| Befund | Stufe | Tritt auf bei | Stand |
|---|---|---|---|
| P1 | mittel | Akku ohne `capacity`, aber mit `charge_full` | **nicht prüfbar** – der Tower hat keinen Akku |
| P7 | gering | Sensoren mit leeren Dateien | **im Betrieb belegt** – `iwlwifi_1` bei getrenntem WLAN zeigt `-- °C`, nicht `0` |
| P10 | mittel | abweichende `hwmon`-Nummerierung, Treiber-Neuladen | **im Betrieb belegt und für die Automatik abgefangen** – die Nummerierung wechselte zwischen zwei Starts, die Wahl blieb richtig (5.10). Für die **manuelle** Wahl offen: **B9** |
| P11 | gering | mehrere `mains`-Schnittstellen | **nicht prüfbar** – `/sys/class/power_supply` ist leer |

P1 und P7 sind in Gruppe A im Code behoben. **P7 ist damit auch im
Betrieb bestätigt**; für P1 fehlt die Hardware auf beiden Geräten.

### Offen: für ein späteres Paket

**P10** (gespeicherter `hwmon`-Pfad kann veralten – der einzige Befund,
der stillschweigend falsche Messwerte anzeigen würde), **S1/P14**
(synchrones `query_filesystem_info`, Spices-Regel „avoid synchronous
I/O"), **P17** (Fenstererkennung am übersetzten Titel, wirkt erst, wenn
jemand den Xlet-Namen übersetzt).

### Offen: nur zur Kenntnis

P11, P12, P13, P15, P21, P22, P25, S2, S3, S4.

---

## 3. Phase 1 – die zehn Prüfblöcke

### 3.1 Code-Durchsicht (Kriterium 1)

Alle zehn Quelldateien beider Komponenten, zusätzlich durch einen
unabhängigen Prüfer ohne Projektdokumentation. Jeder Befund mit Datei,
Zeile und Nachweisart. `PRUEFDATEN/codedurchsicht/BEFUNDE.md`.

### 3.2 Funktionstest (Kriterien 2 und 3)

22.09.2026, vom Nutzer durchgeführt, begleitet und ausgewertet.
**75 Prüfpunkte in vier Etappen, kein Punkt abweichend.**

| Etappe | Umfang | Punkte |
|---|---|---|
| 1 – Applet, Deutsch | alle 22 Bedienelemente, Menü, Anzeige | 45 |
| 2 – Desklet, Deutsch | alle 21 Bedienelemente, Menü, Anzeige | 20 |
| 3 – Umschalten auf Englisch | beide Komponenten | 8 |
| 4 – Desklet Englisch, Berichte | Hardware- und Speedtest-Bericht | 2 |

Nach jeder Etappe alle Werte gegen die Schema-Vorgaben verglichen,
jedes Mal **0 Abweichungen**. Umgeschaltet über `cinnamon-xlet-makepot
-i` und `-r`, ohne Eingriff in die Systemsprache.
`PRUEFDATEN/funktionstest/`.

### 3.3 Robustheit (Kriterium 4)

R1 bis R5 bestanden. R1 und R2 haben die Befunde **P16** und **P18** im
Betrieb bewiesen – R1 mit einer von außen über inotify gezählten
Taktrate von 1 Sekunde statt 3, also dreifacher Messlast.
`PRUEFDATEN/robustheit/ERGEBNIS.md`.

### 3.4 Langzeittest (Kriterium 5)

21.09. 21:48 bis 22.09. 08:00, **613 volle Minuten**, gefordert waren
mindestens 480.

| Größe | Ergebnis | Soll |
|---|---|---|
| Lesezugriffe je Minute | Mittel **39,99**, min 39, max 40 | 40 |
| Taktmarken je Minute | Mittel **20,00** | 20 |
| Zugriffe je Taktmarke, Höchstwert der Nacht | **2** | 2 |
| Speicherzuwachs | **+2,3 MB** über 10 Stunden | bewertet |
| Protokollzeilen von aVincePulse | **0** | 0 |

Befund **K1 aus AP19** damit über zehn Stunden als behoben belegt. Das
CPU-Plateau aus AP19 trat **nicht** wieder auf: ab 23 Uhr neun Stunden
lang zwischen 2,82 und 2,89 Prozent. `PRUEFDATEN/langzeit/ERGEBNIS.md`.

### 3.5 Installation und Deinstallation (Kriterium 6)

22.09.2026, Befehle aus `README.de.md` **wortwörtlich** ausgeführt, mit
auf ein Wegwerf-Verzeichnis umgebogenem `HOME`; die Testinstallation des
Nutzers blieb unberührt. Ergebnis: **Befund I1/P26** – das Repository
ist privat, `git clone` aus dem README scheitert.
`PRUEFDATEN/installation/ERGEBNIS.md`.

### 3.6 Cinnamon-Spices-Vorgaben (Kriterium 7)

Die heute gültigen Vorgaben beider Repositories abgerufen und abgeglichen;
Befunde S1 bis S4. Abweichungen benannt. `PRUEFDATEN/spices/`,
Tabelle in `PRUEFDATEN/codedurchsicht/BEFUNDE.md`.

### 3.7 Einreichungspakete (Kriterium 8)

Für beide Komponenten aufgebaut und mit dem **offiziellen**
`validate-spice` aus dem Spices-Repository geprüft: **„No errors
found."** `PRUEFDATEN/einreichung/`.

### 3.8 Speedtest mit beiden Programmen (Kriterium 14)

22.09.2026, beide Läufe im Applet über das Rechtsklick-Menü. Vorher
angekündigt: Datenvolumen, gespeicherte Felder, Dauer.

| Programm | Download | Upload | Ping | Jitter |
|---|---|---|---|---|
| `librespeed-cli`, automatisch gewählt | 82,66 MBit/s | 12,37 MBit/s | 14,72 ms | **2,24 ms** |
| `speedtest-cli`, manuell gewählt | siehe Nachweis | | | **nicht gemessen** |

Nachtest am 23.09.2026 für **P3**: Der Programmhinweis erscheint jetzt
auf Deutsch. Drei Codezustände, drei passende Berichte – der Befund ist
damit auch im Betrieb nachgewiesen, nicht nur seine Behebung.
`PRUEFDATEN/speedtest/`, `PRUEFDATEN/nachtest_p3/ERGEBNIS.md`.

### 3.9 Logo und Panel-Symbol (Kriterium 20)

Erprobt bei 16, 20, 22, 24, 32, 48 und 64 Pixel – die Roadmap verlangt
16, 20, 24, 32 und 64; 22 und 48 kamen hinzu, weil Cinnamon sie bei
gängigen Panelhöhen verwendet.

| Frage | Ergebnis |
|---|---|
| Kantenglättung beim Verkleinern | **sauber** – bei 16 px noch 56 Alpha-Zwischenwerte |
| Form bei 16 px erkennbar | **ja** |
| Auflösung der PNG ausreichend | **ja**, bei allen Größen |
| Würde ein Vektorlogo etwas verbessern | **nein** – der Mangel war ein Farb-, kein Auflösungsproblem |

**Folgerung:** Das Vektorlogo aus Roadmap-Abschnitt 15 ist für die
Veröffentlichung nicht erforderlich; die Forderung wird mit diesem
Messergebnis begründet auf „nach 1.0" verschoben. Ein Paket **AP26 –
Logo als Vektor** ist nicht nötig. Belege: `PRUEFDATEN/logo/`,
42 Einzelbilder und eine Vergleichstafel.

### 3.10 Rechte-, Marken- und Lizenzfragen (Kriterien 11, 12, 13)

Geschlossen in `08_LIZENZEN_RECHTE/GRAFIKEN.md`, `NAME-UND-MARKE.md`
und dem Ookla-Nachtrag in `SPEEDTEST-PROGRAMME.md`.

---

## 4. Phase 2 – die Korrekturen im Einzelnen

### 4.1 Gruppe A (22.09.2026)

Elf Befunde, alle klein und ohne Entscheidungsbedarf. Kern ist eine neue
Hilfsfunktion `_zahlOderNull()` in `measurement.js` und
`hardwareDetection.js`, an acht Stellen angewandt, dazu `zahlOderNull()`
in `metrics.js` für die Warnschwellen.

Geprüft: Syntax 10/10, gemeinsame Module 4/4 bitgenau identisch, JSON
4/4 gültig, `de.po` ohne unübersetzte und ohne `fuzzy` Einträge,
`msgfmt -c` fehlerfrei, **38 Funktionsprüfungen mit `cjs` bestanden**.

Die Prüfungen enthalten eine Gegenprobe: Der alte Code hätte aus
`false`, `[]` und `" "` jeweils eine Schwelle von 0 gemacht – also eine
Dauerwarnung.

### 4.2 Gruppe B, erster Teil: P16, P18, P30 (23.09.2026)

**113 Funktionsprüfungen bestanden, 0 Fehler.**
`PRUEFDATEN/phase2/ERGEBNIS-GRUPPE-B.md`.

**P16** – `_gueltig()` prüft den Typ, bevor `Number()` läuft.
`Number(null)`, `Number("")`, `Number(false)` und `Number([])` ergeben
alle `0` und sind endlich; die Vorgabe griff deshalb nur bei
`undefined`, `NaN` oder echtem Text. Ein `"value": null` beim Messtakt
bedeutete 1 Sekunde statt 3 – dauerhaft dreifache Messlast.

**P18** – die Ursache reichte weiter als der Befund beschrieb: Drei der
vier Anbieter bauen die „Nicht gefunden"-Beschriftung aus dem
gespeicherten Wert, `speedtest.js` als einziger aus `def.anzeige`.
`_auswahlKennzeichen()` setzt diese Regel stillschweigend voraus.
Behoben wurde die Abweichung, nicht der Filter – damit gilt die Annahme
überall.

**P30** – am Cinnamon-Quelltext nachgeprüft: `TextIconApplet`
(`/usr/share/cinnamon/js/ui/applet.js:789`) ruft bei jeder
Höhenänderung erst `_setStyle()` und dann **ohne Wächter**
`on_panel_height_changed()`. Die Überschreibung greift unmittelbar
danach.

**Betriebsnachweise:**

| Befund | Nachweis |
|---|---|
| P30 | Panelhöhe 38 → 50 → 38, Symbol bleibt bei **24 px** (vorher: 16 px, dauerhaft) |
| P18 | in der Einstellungsdatei erhalten: `'Nicht gefunden: librespeed-cli' -> 'librespeed-cli'` – Beschriftung aus dem Wert gebildet |
| P18 | Kennzeichen am laufenden Applet: `speedtest-programm:auto,speedtest-cli` – der fehlende Eintrag zählt nicht mit |

Die Umbenennung des Programms für den Test ist unabhängig belegt:
`mtime` der Datei unverändert vom 15.09., `ctime` auf 08:18:52 – die
Signatur eines `mv`.

### 4.3 Gruppe B, zweiter Teil: P28, P29, P31 (23.09.2026)

**94 Funktionsprüfungen bestanden, 0 Fehler.**
`PRUEFDATEN/phase2/ERGEBNIS-GRUPPE-B-TEIL2.md`.

**P28, Weg C** – neue Methode `_vorgabe()` liest
`settingsData[key].default` mit der Code-Konstante als Rückfall. Alle
Einzelwerte kommen aus dem Schema: **12 Schlüssel im Applet, 10 im
Desklet**; aus dem Code nur noch die beiden Listen. Im Desklet war die
Lage schlechter als berichtet: `font-size`, `font-weight` und
`refresh-interval` standen als Zahl bzw. Text mitten in der Funktion.

*Betriebsnachweis:* „Auf Standardwerte zurücksetzen" in beiden
Komponenten, danach `werte_pruefen.py`: **`GESAMT: 0 Abweichung(en)`**.
Vor dem Test wich genau ein Wert ab – `panel-symbol` – und genau daran
war der 22.09. gescheitert.

**P29** – Ausgangstext im Schema von `"Hardware"` auf
`"Hardware detection"` geändert, übersetzt als „Hardwareerkennung".
Grund: `xlet-settings.py:81–91` nimmt die eigene Übersetzung nur, wenn
sie vom Ausgangstext abweicht; sonst gewinnt Cinnamons Katalog, und der
übersetzt `Hardware` mit „Geräte". Gegengeprüft: Cinnamon kennt
`Hardware detection` nicht.

*Betriebsnachweis:* Der Abschnitt heißt im Einstellungsfenster jetzt
„Hardwareerkennung".

**P31, Weg B** – ein Hardwarebericht je Komponente mit festem Namen,
bei jeder Erkennung überschrieben; der Zeitpunkt steht im Bericht.
Speedtest-Berichte unverändert. Beide READMEs nachgezogen; die Zusage
„Berichte werden nie selbsttätig gelöscht" wurde dabei genauer gefasst
statt stehen gelassen.

*Betriebsnachweis:* Nach zwei Erkennungen unverändert 7 Dateien im
Ordner, die Applet-Datei von 09:06:18 auf 09:11:44 gesprungen – also
überschrieben, nicht angelegt.

### 4.4 Nebenbefund zur Prüfmethodik

**Eine Einstellungsdatei zurückzuspielen erreicht die laufende
Komponente nicht.** Beim Versuch, `panel-symbol` nach dem Test wieder zu
setzen, standen Datei (`symbolic`) und laufendes Applet (`icon`)
auseinander; auch `settings.getValue()` lieferte den alten Wert. Die
Formatierung schied als Ursache aus – die Datei blieb bis auf den einen
Wert zeichengleich.

Gefährlich daran: Der nächste Schreibvorgang Cinnamons kippt die Datei
zurück. Der Zustand wurde sofort zeichengleich zurückgenommen.

**Folgerung für Abschnitt 9 des Statusdokuments:** Die Regel „Datei
vorher sichern, danach wiederherstellen" ist zu ergänzen – das
Zurückspielen allein genügt nicht. Entweder die Komponente danach neu
laden, oder den Wert über das Einstellungsfenster setzen.

---

## 5. Test auf dem Zweitgerät (Tower)

Durchgeführt am 23.09.2026 auf `tower-linux` gegen den Stand
`0.1.0-dev.24` (Quellcode `f670a3d`). Anleitung:
`ZWEITGERAET-TESTEN.md`, Einstieg: `ZWEITGERAET-EINSTIEG.md`.

**Prüfliste vollständig durchlaufen:** 14 von 15 Punkten bestanden,
Z4 ist auf diesem Gerät nicht prüfbar. Kein Punkt abweichend. Sechs
Rückmeldungen sind aufgenommen und entschieden.

> **Wichtig für die Einordnung.** Die Prüfliste lief gegen den Code
> von `f670a3d`. Die daraus entstandenen Korrekturen B1, B2, B3 und B6
> sind **danach** entstanden; der heutige Stand ist `cf91d12` mit zehn
> geänderten Quelldateien. Ein **Nachtest auf dem Zweitgerät steht
> deshalb aus** – Einzelheiten unter 5.7.

Der Tower hat den geprüften Stand vorher bestätigt:
`git merge-base --is-ancestor f670a3d HEAD` → in Ordnung. Er stand auf
`73bc7a4`; gegenüber `f670a3d` ist dort nur Dokumentation nachgezogen,
der **Quellcode ist derselbe**.

### 5.1 Warum

`ROADMAP_V2.md`, Abschnitt 23, verlangt „Tests auf mehreren
unterschiedlichen Rechnern". Bis zum 23.09.2026 war aVincePulse
ausschließlich auf dem Referenzgerät geprüft.

### 5.2 Hardware des Zweitgeräts (erhoben am 23.09.2026)

| | Referenz (Dell Latitude 5285) | Tower |
|---|---|---|
| System | Mint 22.3, Cinnamon 6.6.9, X11 | **identisch** |
| CPU-Sensor | `coretemp` (Intel) | **`k10temp` (AMD)** |
| Grafik | kein eigener Sensor | **`amdgpu`** (integriert) + NVIDIA-Karte ohne hwmon |
| Lüfter laut `hwmon` | `dell_smm`, 1 Lüfter | **keiner** – obwohl physisch fünf vorhanden |
| Stromversorgung | `AC`, `BAT0`, Maus-Akku | **keine** |
| NVMe | 1× | **2×, gleicher Name** |
| RAM-Sensoren | – | **2× `spd5118`** (DDR5) |
| Netzwerkkarte | – | **`r8169`** mit Temperatursensor |
| hwmon ohne Messwerte | – | **`asus`** (0 Temp, 0 Lüfter) |
| Schnittstellen | wlp2s0, wwan0, virbr0 | eno1, wlp6s0, virbr0 |
| Bildschirm | 1536 × 1024 | **2560 × 1440** |

Die beiden NVMe sind zwei **Samsung 990 PRO 2 TB**:

| hwmon | Gerät | Inhalt |
|---|---|---|
| hwmon1 | `nvme1` | Windows-SSD |
| hwmon2 | `nvme0` | Linux-SSD, trägt `/` |

Kein Speedtest-Programm installiert – das ist für Z9 so gewollt.

**Gleich ist die Software-Grundlage.** Der Tower prüft andere
**Hardware**, nicht eine andere Cinnamon-Fassung. Das begrenzt die
Aussagekraft und ist so zu lesen.

### 5.3 Was der Tower abdeckt

- **Kein Akku** – `BATT` und `STATUS` müssen vollständig ausgeblendet
  sein. `getAvailability()` hängt beide am Akku, nicht am Netzteil.
- **Keine auslesbaren Lüfter** – `FAN` ebenso. Physisch sind fünf
  Lüfter vorhanden; sie hängen am Super-I/O-Chip, dessen Treiber nicht
  von selbst lädt, bzw. am NVIDIA-Treiber, der `hwmon` nicht bedient.
- **P7** – `hwmon4 asus` trägt einen Namen, liefert aber keinen Wert.
- **P10** – völlig andere `hwmon`-Nummerierung, dazu zweimal `nvme` und
  zweimal `spd5118` mit identischem Namen. Prüft die stabile
  Sensorkennung aus AP14.
- **AMD statt Intel** – die automatische Sensorwahl muss `k10temp`
  treffen.

### 5.4 Was der Tower nicht abdecken kann

| Befund | Grund |
|---|---|
| **P1** – Akku ohne `capacity` zeigt „0 %" | der Tower hat gar keinen Akku |
| **P11** – erste `mains`-Schnittstelle gewinnt | `/sys/class/power_supply` ist leer |

Beide bleiben **reine Code-Befunde ohne Betriebsnachweis**. Beide sind
gering bis mittel eingestuft und im Code belegt.

### 5.5 Ergebnis der Prüfliste Z1 bis Z15

| Nr | Prüfung | Ergebnis |
|---|---|---|
| Z1 | Beide Bestandteile lassen sich hinzufügen | **bestanden** – Applet 164 ms, Desklet 102 ms, beide ohne Fehler |
| Z2 | Sitzungsprotokoll nach dem Start | **bestanden** – keine aVincePulse-Zeile mit `error`, `exception` oder `warn` im **gesamten** `~/.xsession-errors` |
| Z3 | Akku: BATT und STATUS ausgeblendet | **bestanden** – beide vollständig ausgeblendet, 12 Zeilen |
| Z4 | Netzteil, mehrere `mains` | **nicht prüfbar** – `/sys/class/power_supply` ist leer |
| Z5 | Temperaturen plausibel | **bestanden** – CPU 39–41 °C, SSD 33–34 °C, keine `0 °C`, kein `NaN` |
| Z6 | Lüfter: FAN ausgeblendet | **bestanden** – vollständig ausgeblendet |
| Z7 | Sensorauswahl zeigt die Sensoren dieses Rechners | **bestanden** – je drei Sensoren für `nvme0` und `nvme1` (Composite, Sensor 1, Sensor 2), unterscheidbar |
| Z8 | Laufwerksauswahl | **bestanden** – beide Laufwerke mit freiem Platz |
| Z9 | Ohne Speedtest-Programm | **bestanden** – Auswahlfeld, Schaltfläche und Menüeintrag verborgen, Hinweis sichtbar, Speedtest-Berichte weiter erreichbar; geprüft in **beiden** Bestandteilen |
| Z10 | Warnschwellen | **bestanden** – Warnfarbe erscheint, Schwelle zurückgestellt |
| Z11 | Hardware neu erkennen, zweimal | **bestanden** – je Bestandteil genau **eine** Datei, beim zweiten Mal überschrieben |
| Z12 | Zurücksetzen | **bestanden** – `werte_pruefen.py` danach `GESAMT: 0 Abweichungen`; die Speedtest-Bedienelemente bleiben verborgen |
| Z13 | Bildschirmauflösung | **bestanden** – Hover-Anzeige vollständig, „12 rows, font 48px, 70% of 2560×1440"; auf dem Referenzgerät 28 px bei 1536 × 1024 |
| Z14 | Panel-Symbol | **bestanden** – bei der eingestellten Leistenhöhe erkennbar |
| Z15 | Zwei Stunden Betrieb | **bestanden** – 13:53 bis 15:53, Protokoll **88 → 88 Zeilen**, also keine einzige neue. Danach zeigten alle Messwertzeilen Werte; `SPEED`, `PING`, `JITTER` und `LAST` standen auf `--`, weil damals noch kein Speedtest-Programm installiert war |

**14 von 15 Prüfpunkten bestanden**, einer auf diesem Gerät nicht
prüfbar. **Kein Prüfpunkt abweichend.**

Zu Z15 offen geblieben: Dass sich die Werte im Zweistundenlauf
**fortlaufend aktualisieren**, wurde nicht gezielt beobachtet – nur,
dass am Ende alle Zeilen Werte trugen. Beim Nachtest kurz mitzuprüfen.

### Mitgeprüft: P29

Der Abschnitt im Einstellungsfenster heißt auf dem Tower
**„Hardwareerkennung"**. Das belegt zweierlei: Die Korrektur zu P29
wirkt auch auf einem anderen Rechner, und die Übersetzung ist dort
richtig eingespielt – die Probe aus `ZWEITGERAET-TESTEN.md`,
Abschnitt 3.1.

### Betriebsnachweise, die nur hier zu holen waren

**P7 – Sensoren mit leeren Dateien: im Betrieb belegt.**
Bei getrennter WLAN-Verbindung liefert `iwlwifi_1` keinen Wert. Der
Hardwarebericht des Towers zeigt dafür **`-- °C`**, nicht `0`. Damit
ist die Korrektur aus Phase 2, Gruppe A – `_zahlOderNull()` – auf
echter Hardware bestätigt. Auf dem Referenzgerät war der Fall nicht
herstellbar.

**B1 – aus dem Hardwarebericht des Towers:**

```
Speicher : nvme|nvme1|temp1      (Windows-SSD)
FREE     : /  auf nvme0n1p2      (Linux-SSD)
```

Zwei verschiedene Laufwerke in einer Anzeige, schwarz auf weiß im
Bericht. Einzelheiten in Abschnitt 5.6.

### Zeilenzahl als Maß

15 Messwerte abzüglich `BATT`, `STATUS` und `FAN` ergeben **12** – genau
das wurde gezählt. `getAvailability()` blendet die drei aus, weil weder
Akku noch Lüftersensor vorhanden sind.

`SPEED`, `PING`, `JITTER` und `LAST` bleiben sichtbar und zeigen `--`.
Das ist richtig: Sie hängen nicht an `getAvailability()`, sondern am
Vorhandensein von Messwerten.

### Wertevergleich gegen die Schema-Vorgaben

`werte_pruefen.py` meldet **2 Abweichungen**, beide
`speedtest-vorhanden: false` gegen die Schema-Vorgabe `true`. Das ist
**kein Fehler des Programms**, sondern einer des Prüfwerkzeugs – der
Schlüssel wird zur Laufzeit geschrieben (`applet.js:747`) und ist
folgerichtig `false`, weil kein Speedtest-Programm installiert ist.
Aufgenommen als **B2**.

**Die Messwertliste ist unverändert**, und `fan_speed`,
`battery_charge` und `psu_state` stehen darin weiterhin auf
`sichtbar: true`. Auch das ist richtig: Das Ausblenden geschieht zur
Laufzeit über die Verfügbarkeitsprüfung und **greift nicht in die
gespeicherte Einstellung ein**. Ein Gerätewechsel oder ein
nachgerüsteter Sensor bringt die Zeilen damit von selbst zurück.

### 5.6 Befunde des Zweitgeräts

Sechs Rückmeldungen vom Zweitgerät, eigene Kennungen `B`. Alle von
Claude am Referenzgerät **im Quelltext nachgeprüft**, bevor sie hier
stehen. Noch nicht in `BEFUNDE.md` übernommen und noch nicht behoben –
das geschieht nach der Entscheidung des Nutzers.

| Kennung | Stufe | Kurz |
|---|---|---|
| **B1** | mittel | SSD-Temperatur und freier Platz gehören zu verschiedenen Laufwerken |
| **B2** | gering | `werte_pruefen.py` wertet einen Laufzeitwert als Abweichung |
| **B3** | Hinweis | Protokollkennung `AP08` im Applet, `AP07` im Desklet |
| **B4** | – | kein Befund; Randnotiz zur Einheit, gehört zu **P15** |
| **B5** | – | kein Befund; Erweiterungswunsch für die Roadmap |
| **B6** | mittel | dunkler Kasten hinter dem Desklet |
| **B7** | Hinweis | Protokollzeile `AP05 Storage` nennt einen vorläufigen Sensor |
| **B8** | mittel | „Hardware neu erkennen" hebt die Behebung von B1 wieder auf |
| **B9** | mittel | manuell gewählter Sensor ist über Neustarts nicht stabil |

---

#### B1 – SSD-Temperatur zeigt ein anderes Laufwerk als der freie Platz (mittel)

`hardwareDetection.js:589` und `:640`

```js
if (label === "composite") return 1000;   // _scoreStorage
if (score > bestScore) { ... }            // _selectBest, strikt groesser
```

Beide NVMe tragen einen Sensor mit der Beschriftung `Composite` und
erhalten damit **dieselbe Bewertung 1000**. Da `_selectBest()` nur bei
einem **echt größeren** Wert wechselt, gewinnt der zuerst gescannte
Sensor – auf dem Tower `hwmon1` = `nvme1`, die Windows-SSD. Der freie
Platz stammt dagegen von `/`, also von `nvme0`.

**Angezeigt werden damit zwei verschiedene Laufwerke in einer Anzeige,
ohne jeden Hinweis darauf.**

Die Wirkung reicht über eine falsche Zahl hinaus: Eine Warnschwelle auf
die SSD-Temperatur überwacht dann die Windows-SSD. Die läuft unter Linux
im Leerlauf und bleibt kühl – die Warnung löst nie aus, während die
Linux-SSD heiß wird.

*Nachweis:* Code beider Methoden gelesen; auf dem Tower beobachtet.

*Warum erst jetzt:* Das Referenzgerät hat **eine** NVMe. Ein
Gleichstand kann dort nicht entstehen. Genau dafür war der Test auf
einem zweiten Gerät angesetzt.

*Einordnung:* Dieselbe Art wie **P10** – ein stillschweigend falscher
Messwert – und deshalb dieselbe Stufe. B1 ist von beiden jedoch der
**wahrscheinlichere**: P10 braucht ein neu geladenes Modul, B1 nur zwei
NVMe-Laufwerke.

*Vorschlag (aus der Tower-Sitzung, hier geprüft):* Bei
`sensor-storage = auto` den Sensor bevorzugen, dessen `sensor.geraet`
im `realpath` von `/sys/class/block/<Partition des FREE-Laufwerks>`
vorkommt. Die Daten liegen vor: Der Sensor führt `geraet` (`nvme0`),
das Laufwerk seine Partition (`nvme0n1p2`). Findet sich keine
Zuordnung, bleibt es beim heutigen Verhalten – Geräte mit nur einer
Platte sind also nicht betroffen. Betrifft `hardwareDetection.js` und
`measurement.js`, beide gemeinsame Module.

*Übergangslösung:* `sensor-storage` von Hand auf `nvme0` stellen.

#### B2 – `werte_pruefen.py` wertet einen Laufzeitwert als Abweichung (gering)

`speedtest-vorhanden` ist im Schema `{"type": "generic", "default":
true}` und wird zur Laufzeit von `applet.js:747` geschrieben. Auf einem
Rechner ohne Speedtest-Programm ist `false` der **richtige** Wert; das
Prüfwerkzeug meldet ihn dennoch als Abweichung.

**Ein Fehler im Prüfwerkzeug, nicht im Programm.** Er ist trotzdem
aufzunehmen: Ein Werkzeug, das folgenlose Abweichungen meldet, führt
dazu, dass echte übersehen werden.

**Beobachtung vom Zweitgerät, noch nicht erklärt.** Nach „Auf
Standardwerte zurücksetzen" steht `speedtest-vorhanden` bis zum
nächsten Cinnamon-Start auf `true`, obwohl kein Speedtest-Programm
vorhanden ist.

Der Code gibt dafür keine Erklärung her:
`on_standardwerte_zuruecksetzen()` fasst den Schlüssel nicht an, und
`_aktualisiereSpeedtestVerfuegbarkeit()` (`applet.js:745`) schreibt nur
bei Abweichung. **Der Mechanismus ist offen** und in Phase 3 zu klären
oder als Hinweis zu schließen.

*Wirkung: keine.* Die Oberfläche fragt `istVerfuegbar()` zur Laufzeit
ab und bleibt richtig – auf dem Tower blieben Auswahlfeld,
Schaltfläche und Menüeintrag auch nach dem Zurücksetzen verborgen
(Z12). Der gespeicherte Wert ist für die Anzeige ohne Belang.

#### B3 – uneinheitliche Protokollkennung (Hinweis)

`applet.js:440` schreibt `aVincePulse AP08: metric hidden, no sensor`,
`desklet.js:311` dasselbe mit `AP07`. Beide meinen denselben Vorgang.

#### B4 – kein Befund, gehört zu P15

`FREE` zeigt 1,6 TB, `df` zeigt 1,7T. Ursache: `df` rundet auf. Kein
Fehler.

Die Randnotiz dazu ist jedoch **P15**: `measurement.js:495` teilt durch
1024⁴ und beschriftet das Ergebnis mit „TB", richtig wäre „TiB". Es ist
dieselbe Verwechslung, die P15 bereits für `formatRate` festhält
(Teilung durch 1024, Beschriftung „KB/s"). **B4 wird deshalb nicht als
eigener Befund geführt, sondern bei P15 vermerkt**, dessen Umfang sich
damit von einer auf zwei Stellen erweitert.

#### B5 – kein Befund, Erweiterungswunsch

Zweites Laufwerk als eigene Zeile statt nur über die Auswahl. Das ist
eine Funktionserweiterung, keine Abweichung, und gehört in
`ROADMAP_V2.md` – nicht in AP25.

**Am 23.09.2026 sind zwei weitere Wünsche des Nutzers dazugekommen**,
ebenfalls nicht Teil von AP25 und ebenfalls in Abschnitt 24 der Roadmap
aufgenommen: eine **abschaltbare Balkenanzeige** für prozentuale Werte
und die **GPU-Auslastung**. Grundsatz des Nutzers für beide:
eigenständige Umsetzung, **kein Code aus fremden Desklets**.

#### B6 – Dunkler Kasten hinter dem Desklet (mittel)

Auf dem Tower **und** auf dem Referenzgerät bestätigt.

`02_QUELLCODE/Desklet/metadata.json` enthält keinen Eintrag
`prevent-decorations`. Cinnamon wertet ihn so aus
(`/usr/share/cinnamon/js/ui/desklet.js:143–163`):

```js
let dec = global.settings.get_int('desklet-decorations');
let preventDecorations = this.metadata['prevent-decorations'];
if (preventDecorations == true) { dec = 0; }
```

Ohne den Eintrag gilt die globale Einstellung „Gestaltung der
Desklets": `0` ohne Verzierung, `1` mit Rahmen, `2` mit Rahmen und
Kopfzeile. Bei `1` und `2` legt Cinnamon eine eigene Fläche hinter das
Desklet.

**Der Widerspruch:** aVincePulse bringt eine eigene Einstellung für die
Hintergrunddeckkraft mit, ab AP20, Vorgabe `0` – also durchsichtig. Wer
sie auf 0 stellt, will keine Fläche. Cinnamon legt dann trotzdem eine
darunter, und die eigene Einstellung wirkt scheinbar nicht.

*Warum es bisher nicht auffiel:* Auf dem Referenzgerät steht
`desklet-decorations` auf `0`. Sichtbar wird es erst, wenn jemand die
Cinnamon-Einstellung ändert – was ein Nutzer jederzeit tun kann, ohne
einen Zusammenhang zu aVincePulse zu vermuten.

*Vorschlag:* `"prevent-decorations": true` in
`Desklet/metadata.json`, dazu ein Tooltip an der Einstellung
`hintergrund-deckkraft`, der auf die eigene Fläche hinweist.

*Abzuwägen war:* `prevent-decorations` nimmt dem Nutzer die
Cinnamon-Verzierung für dieses Desklet **dauerhaft** ab – auch dem, der
sie bewusst will. Dafür spricht, dass aVincePulse eine eigene, feiner
einstellbare Fläche mitbringt.

**Entscheidung des Nutzers vom 23.09.2026: Variante B.**

1. `"prevent-decorations": true` in `Desklet/metadata.json`
2. Tooltip an `hintergrund-deckkraft`, englischer Wortlaut:
   „At 0 per cent the desklet has no panel. aVincePulse ignores the
   Cinnamon setting ‚Desklet decorations', so the look is the same with
   every theme."
3. Deutsche Entsprechung in `Desklet/po/de.po`:
   „Bei 0 Prozent hat das Desklet keine Fläche. aVincePulse ignoriert
   die Cinnamon-Einstellung ‚Gestaltung der Desklets', daher sieht es
   mit jedem Theme gleich aus."

**Umgesetzt und bestanden am 23.09.2026**, Nachweis
`phase2/ERGEBNIS-B6.md`.

Der Tooltip war nicht leer – er trug bereits Text aus AP20, der mit
„At 0 per cent the desklet has no panel, as before." beginnt. Eingefügt
wurde deshalb nur der neue Satz, direkt dahinter, statt den ersten zu
wiederholen.

*Probe:* Der Schematext wurde genommen und damit im neu erzeugten
Katalog nachgeschlagen – die deutsche Fassung kommt zurück. `msgid` und
Schematext sind damit zeichengleich; ein Unterschied hätte den Tooltip
stillschweigend englisch gelassen.

*Am laufenden System:* Nach dem Cinnamon-Neustart führt das Desklet
`prevent-decorations: true`. Der Nutzer hat „Gestaltung der Desklets"
nacheinander auf *Umrandung und Kopfzeile*, *Nur Umrandung* und zurück
gestellt – **ohne jede Auswirkung auf das Desklet**.

Die beiden Punkte, die er ausdrücklich sehen wollte, bei Deckkraft 0:
**Verschieben geht**, und das **Rechtsklick-Menü öffnet sich** auf der
durchsichtigen Fläche. Das war die Sorge bei Variante B – ohne
Cinnamon-Fläche gibt es keinen sichtbaren Rand zum Anfassen.

*Zwei Funde am Rande.* Cinnamon erklärt den Mechanismus im eigenen
Einstellungsfenster („einige Desklets benötigen es, dass die Umrandung
oder die Kopfzeile immer vorhanden sind"); es ist also ein vorgesehener
Weg, kein Kniff. Und **alle übrigen Desklets auf dem Referenzgerät
setzen `prevent-decorations` bereits** – aVincePulse war das einzige
ohne.

---

#### B8 – „Hardware neu erkennen" hebt die Behebung von B1 wieder auf (mittel)

Beim Nachtest am 23.09.2026 gefunden.

`applet.js:1143` und `desklet.js:1498` erzeugen eine **neue**
Hardwareerkennung und übergeben sie:

```js
const detector = new HardwareDetector(this._sensorAuswahl());

this._detector = detector;
this._measurement.setHardwareDetector(detector);
this._aktualisiereSensorOptionen();
```

**`setzeLaufwerkGeraet()` wird dabei nicht gerufen.** Der neue Detector
kennt das gemessene Laufwerk also nicht, der Zuschlag entfällt, und bei
Gleichstand gewinnt wieder der zuerst gescannte Sensor.

*Beleg vom Zweitgerät:* Applet 17:03:43 neu erkannt →
`AP05 Storage hwmon1`, **keine `AP25`-Zeile**; der Hardwarebericht nennt
`Datenträgertemperatur … hwmon1`; die Anzeige springt auf 33–34 °C,
und `hwmon1` misst 32 °C. Das Desklet, bei dem nicht neu erkannt wurde,
zeigt weiterhin 40 °C – **zwei Komponenten, zwei verschiedene
Laufwerke, gleichzeitig auf demselben Bildschirm.**

*Einordnung:* dieselbe Art wie B1 und P10 – ein stillschweigend
falscher Messwert – und deshalb dieselbe Stufe. Der Nutzer hat ihn als
„hoch" gemeldet; der Maßstab des Projekts kennt kritisch / mittel /
gering / Hinweis, ein „hoch" gibt es nicht.

Erschwerend ist, dass B8 nach einer **bewussten Handlung** des Nutzers
eintritt, von der er das Gegenteil erwartet: „Hardware neu erkennen"
soll die Erkennung verbessern, nicht verschlechtern. Und er trifft
einen Rechner, auf dem die Anzeige vorher richtig war.

*Ursache im Grundsatz:* Es gibt **zwei** Stellen je Komponente, die
einen `HardwareDetector` erzeugen – im Konstruktor und beim Neuerkennen
– aber nur **eine**, die ihm das Laufwerk nennt
(`_uebernehmeQuellenAuswahl()`). Die erste Stelle ist dadurch gedeckt,
die zweite nicht.

*Vorschlag des Nutzers, hier geprüft:* In beiden Dateien ergänzen:

```js
detector.setzeLaufwerkGeraet(this._measurement.laufwerkGeraet());
```

**Mit einer Verbesserung zur vorgeschlagenen Stelle.** Der Nutzer
schlug „nach `setHardwareDetector()` und vor
`_schreibeHardwareBericht()`" vor. Richtiger ist unmittelbar nach
`setHardwareDetector()` und **vor `_aktualisiereSensorOptionen()`** –
sonst schreibt das Auswahlfeld den Eintrag „Automatisch (…)" noch mit
dem falschen Sensor.

*Für die Dokumentation:* **Wer einen `HardwareDetector` erzeugt, muss
ihm auch das gemessene Laufwerk nennen.** Dieselbe Art von Regel wie
die aus P28 zu den Vorgabewerten. In Abschnitt 8 des Statusdokuments
aufzunehmen.

#### B7 – Protokollzeile nennt einen vorläufigen Sensor (Hinweis)

Der Konstruktor von `HardwareDetector` protokolliert unmittelbar nach
`detect()`:

```
AP05: Storage sensor -> ... hwmon1 ...
```

`setzeLaufwerkGeraet()` folgt erst danach und setzt auf `hwmon2` um.
Im Protokoll stehen damit beide Zeilen, die erste ist überholt.

**Die Anzeige ist richtig**, nur das Protokoll führt in die Irre – und
zwar genau dort, wo man bei einem Verdacht zuerst nachsieht.

*Vorschlag:* die `AP05`-Zeile als vorläufig kennzeichnen oder erst nach
der Laufwerkszuordnung schreiben.

#### B9 – Eine manuelle Sensorwahl überlebt einen Neustart nicht zuverlässig (mittel)

Beim Nachweis von B8 am 23.09.2026 gefunden. **Noch nicht behoben.**

Die gespeicherte Sensorkennung wird so gebildet
(`hardwareDetection.js:594`):

```js
key: chip + "|" + geraet + "|temp" + index      // "nvme|nvme0|temp1"
```

`geraet` ist der Controllername. Bei zwei NVMe-Laufwerken wechselt er
zwischen Starts: Am Vormittag war `nvme0` die Linux-SSD, nach dem Start
um 17:54 die **Windows-SSD**.

**Wirkung:** Wer den Sensor von Hand wählt – etwa
„nvme – Composite **[nvme0]**" – misst nach einem Neustart
stillschweigend die **andere** Platte. Es gibt keine Meldung; die
Kennung existiert ja weiterhin, sie zeigt nur woandershin.

**Die Automatik ist nicht betroffen**, seit B1 die Wahl an das
gemessene Laufwerk bindet statt an eine Nummer. Betroffen ist
ausschließlich die manuelle Wahl.

**Die Annahme steht falsch im Code**, seit AP14
(`hardwareDetection.js:450–452`):

```js
/*
 * Geraet, an dem ein hwmon-Chip haengt, etwa "nvme0" oder
 * "coretemp.0". Anders als die hwmonN-Nummer bleibt es nach
 * einem Neustart gleich.
 */
```

Für `coretemp.0` oder `dell_smm` trifft das zu, für NVMe-Controller
nicht – der Kernel nummeriert sie in der Reihenfolge, in der er sie
findet, und die ist nicht zugesichert.

**Schwerer wiegt, dass der Hardwarebericht es dem Nutzer zusagt**
(`hardwareDetection.js:1168`):

> „Kennung: bleibt nach einem Neustart gleich und wird für die
> Sensorauswahl in den Einstellungen gespeichert."

Das ist auf einem Rechner mit zwei NVMe **falsch** – als sichtbarer
Text, nicht nur als Kommentar.

*Einordnung:* dieselbe Art wie P10, B1 und B8 – ein stillschweigend
falscher Messwert – und dieselbe Stufe. Er trifft seltener, weil er
eine manuelle Wahl voraussetzt; dafür trifft er dauerhaft, bis jemand
nachsieht.

*Vorschlag des Nutzers:* die Kennung an ein festes Merkmal binden –
`serial` oder `wwid` aus `/sys/class/nvme/nvmeX/` – oder mindestens
den Berichtstext berichtigen.

*Geprüft:* Beide Merkmale sind auch auf dem Referenzgerät vorhanden
und gefüllt.

*Zu bedenken:* Eine geänderte Kennung entwertet jede bereits
gespeicherte Wahl – bestehende Einstellungen fänden ihren Sensor
nicht mehr und fielen auf „Automatisch" zurück. Das ist vor der ersten
Veröffentlichung folgenlos, danach nicht mehr.

**Entscheidung des Nutzers vom 23.09.2026: jetzt beheben, und zwar
beides** – Kennung an ein festes Merkmal binden und den Berichtstext
berichtigen.

**Umgesetzt und geprüft**, Nachweis `phase2/ERGEBNIS-B9.md`. Neue
Methode `_stabileKennung()` bevorzugt die Seriennummer aus
`<hwmon>/device/serial`; ohne Seriennummer bleibt es beim Gerätenamen.
Der Gerätename bleibt im Sensorobjekt erhalten – er wird für die
Anzeige und für den Laufwerksabgleich aus B1 weiter gebraucht.

Am laufenden System belegt: `nvme|sn:<Seriennummer>|temp1` statt
`nvme|nvme0|temp1`; die übrigen Chips behalten ihren Gerätenamen. Im
Auswahlfeld erscheint die Seriennummer nicht. **30 Funktionsprüfungen
bestanden.**

> Die tatsächliche Seriennummer stand hier bis zum 23.09.2026 im
> Klartext. Sie wurde vor dem Öffentlichstellen des Repositories
> unkenntlich gemacht: Sie identifiziert ein Gerät des Entwicklers und
> gehört nicht in eine öffentliche Dokumentation. Der vollständige
> Beleg steht in `PRUEFDATEN/phase2/ERGEBNIS-B9.md`, das über
> `.gitignore` von GitHub ausgeschlossen ist.

*Ein zweiter Beleg kam beim Umsetzen hinzu:* Auf dem Referenzgerät
hieß der Maus-Akku am Vormittag `hidpp_battery_22`, am Abend
`hidpp_battery_24`. Die Annahme aus AP14 trägt also noch weniger weit
als beim Befund angenommen – sie ist nicht auf NVMe beschränkt.

*Offen:* Ein Nachweis im Betrieb auf dem Zweitgerät wäre erst nach
einem **Neustart des Towers** aussagekräftig, weil sich die
Nummerierung nur dann wieder ändern kann.

#### Randnotiz zur Anleitung

`ZWEITGERAET-TESTEN.md`, Abschnitt 2.4, schreibt „Ohne jedes Programm
verschwindet der Speedtest". Gemeint sind die **Bedienelemente** –
Auswahlfeld, Schaltfläche, Menüeintrag. Die Messwertzeilen `SPEED`,
`PING`, `JITTER` und `LAST` bleiben stehen und zeigen `--`; so ist es
gewollt und im Hinweistext beschrieben. Die Formulierung ist in Phase 3
zu schärfen.

### Noch zu entscheiden

Entschieden am 23.09.2026:

| Punkt | Entscheidung | Stand |
|---|---|---|
| **B1** | beheben | umgesetzt, 32 Funktionsprüfungen bestanden |
| **B2** | beheben | umgesetzt in `werte_pruefen.py` |
| **B3** | beheben | umgesetzt, `AP08` → `AP07` |
| **B4** | keine Änderung | – |
| **B5** | in die Roadmap | aufgenommen, `ROADMAP_V2.md`, Abschnitt 24, OPTIONAL 1.0 |
| **B6** | Variante B | umgesetzt, auf **beiden** Geräten bestanden |
| **B7** | beheben | umgesetzt, am Referenzgerät bestanden |
| **B8** | beheben | umgesetzt, am Referenzgerät bestanden; Nachweis auf dem Zweitgerät offen |

Die Umsetzung von B1 bis B3 ist am Referenzgerät geprüft, aber **B1
selbst ist dort nicht beobachtbar** – eine NVMe, kein Gleichstand. Der
Betriebsnachweis für die Behebung kann nur vom Zweitgerät kommen.

---

### 5.7 Speedtest auf dem Zweitgerät (Kriterium 14)

Nicht verlangt, vom Nutzer zusätzlich durchgeführt – und damit ist
Kriterium 14 auf **zwei** Rechnern belegt statt auf einem.

Nach der Prüfung von Z9 wurde `speedtest-cli` 2.1.3-2 nachinstalliert.
Nach dem Cinnamon-Neustart waren Auswahlfeld und Schaltfläche sichtbar –
die Gegenprobe zu Z9, wo beide verborgen sein mussten.

Applet-Bericht vom 23.09.2026, 16:26:56, Programm automatisch gewählt:

| | aVincePulse | Handtest zum Vergleich |
|---|---|---|
| Download | 71,89 MBit/s | 77,9 MBit/s |
| Upload | 10,72 MBit/s | 10,6 MBit/s |
| Ping | 17,13 ms | 46,7 ms |
| Jitter | **nicht gemessen** | – |

„Nicht gemessen" ist richtig: `speedtest-cli` liefert keinen
Jitter-Wert, und genau darauf weist der Programmhinweis im Bericht hin.

Die Abweichungen zum Handtest sind **keine Befunde**. Ein Speedtest
misst gegen einen Messserver, den das Programm selbst wählt; Download
und Upload liegen innerhalb üblicher Schwankung. Der Ping
unterscheidet sich stärker, weil beide Läufe unterschiedliche Server
getroffen haben – gemessen wird die Laufzeit dorthin, nicht eine
Eigenschaft des Anschlusses.

**Keine Fehlerzeile im Protokoll.**

### 5.8 Nachtest gegen den korrigierten Stand – offen

Die Prüfliste lief gegen `f670a3d`. Der heutige Stand `cf91d12`
unterscheidet sich in zehn Quelldateien (B1, B3, B6; B2 betrifft nur
das Prüfwerkzeug).

**Das ist genau der Fall, den die Reihenfolge-Entscheidung vom
23.09.2026 vermeiden sollte** – dort ging es allerdings um den Tag und
das Release, und beides steht noch aus. Der Nachtest holt es nach.

Durchgeführt am 23.09.2026 gegen `b1ed015`.

| Punkt | Ergebnis |
|---|---|
| **B1 beim Start** | **bestanden** – `AP25: storage sensor for nvme0n1p2 -> hwmon2`, Desklet 16:59:19.796, Applet 16:59:20.162. Das Desklet zeigt 40 °C, `hwmon2` misst 39 °C |
| **B3** | **bestanden** – 27 Protokollzeilen ab 16:59, davon `AP08`: **0** |
| **B6** | **bestanden** – kein Kasten bei „Nur Umrandung" und „Umrandung und Kopfzeile"; Verschieben und Rechtsklick in Ordnung |
| **Z1** | **bestanden** – Desklet 98 ms, Applet 72 ms |
| **Z2** | **bestanden** – Fehlerzeilen: 0 |
| **Z5** | **bestanden** |
| **Z7** | **bestanden** – „Automatisch (nvme – Composite [nvme0])" |
| Werte aktualisieren sich | **bestanden** – Lasttest mit vier `yes`-Prozessen über 20 s: `LOAD` und `CPU` steigen und fallen in Applet **und** Desklet. Damit ist auch der Rest aus Z15 erledigt |

**Aber:** Der Nachtest hat einen neuen Befund zutage gefördert – **B8**.
Die Behebung von B1 wirkt beim Start, wird aber durch „Hardware neu
erkennen" wieder aufgehoben. Einzelheiten in 5.6.

**B7 und B8 sind inzwischen behoben** und am Referenzgerät geprüft
(`phase2/ERGEBNIS-B7-B8.md`). Dort ist belegt, dass die Zuordnung beim
Neuerkennen **erhalten bleibt**:

```
17:43:29.487  AP05: Storage sensor -> ... hwmon3 ... (drive: nvme0n1p2)
17:43:29.564  AP12: hardware rescan - available: ...
17:43:38.149  AP05: Storage sensor -> ... hwmon3 ... (drive: nvme0n1p2)
17:43:38.213  AP12: hardware rescan - available: ...
```

Die beiden Behebungen stützen sich dabei gegenseitig: Weil B7 die Zeile
aus dem Konstruktor in die Zuordnung verlegt hat, **beweist ihr bloßes
Erscheinen nach dem Neuerkennen**, dass `setzeLaufwerkGeraet()` dort
gerufen wird.

### 5.9 Nachweis von B7 und B8 auf dem Zweitgerät – bestanden

23.09.2026 gegen `a11089c`. Tower-Neustart 17:54:32, Cinnamon-Neustart
18:12:46; ausgewertet wurden nur Zeilen ab 18:12:46. `sensor-storage`
stand in beiden Bestandteilen auf „Automatisch".

| Prüfung | Ergebnis |
|---|---|
| **B7** | **bestanden** – genau **zwei** `AP05`-Zeilen (18:12:56.871 und 18:12:57.517), beide `hwmon2 (drive: nvme1n1p2, automatisch)`, **keine** `AP25`-Zeile |
| **B8** | **bestanden** – nach je einem Druck auf „Hardware neu erkennen": Applet 18:14:38.883, Desklet 18:14:52.934, je eine **neue** `AP05`-Zeile mit `hwmon2 / nvme1n1p2`, unmittelbar vor der `AP12`-Zeile |
| Anzeige | **Applet und Desklet zeigen denselben Wert**, 40 °C. `hwmon2` misst 39 °C, `hwmon1` 33 °C |
| Berichte | beide nennen `Datenträgertemperatur … hwmon2` |
| Zuordnung | `/` = `/dev/nvme1n1p2`, `hwmon2` → `nvme1`, Blockpfad `nvme1n1p2` → `nvme/nvme1` – **stimmig** |
| Rückschritte | 39 Zeilen, **0 Fehler**, **0** `AP08`; Berichtsordner **2 Dateien** mit festen Namen; `werte_pruefen.py` **GESAMT 0** |

Vor der Behebung zeigten Applet und Desklet **33 °C und 40 °C
nebeneinander**. Jetzt stimmen sie überein, und zwar auf dem Laufwerk,
dessen freien Platz `FREE` nennt.

### 5.10 P10 im Betrieb belegt – und ein neuer Befund daraus

**Die `nvme`-Nummerierung hat zwischen zwei Starts gewechselt.**

| | Vormittag | nach dem Start 17:54 |
|---|---|---|
| Linux-SSD (`/`) | `nvme0n1p2` | **`nvme1n1p2`** |
| `hwmon2` zeigt auf | `nvme0` | **`nvme1`** |
| `hwmon1` zeigt auf | `nvme1` | **`nvme0`** (Windows-SSD) |

**Die Automatik traf in beiden Fällen die richtige SSD.** Damit ist
**P10** – „gespeicherter `hwmon`-Pfad kann auf einen anderen Chip
zeigen" – nicht nur im Betrieb belegt, sondern für den automatischen
Weg zugleich als **abgefangen** nachgewiesen. Der Zuschlag aus B1
bindet die Wahl an das gemessene Laufwerk, nicht an eine Nummer.

Der Nutzer hat ergänzt, dass dem Start eine Treiberinstallation
vorausging, die Reihenfolge beim Start aber **grundsätzlich** nicht
zugesichert ist – der Wechsel kann bei jedem Neustart auftreten, nicht
nur nach einer Treiberänderung. Das ist zutreffend und macht den Befund
schwerer, nicht leichter.

**Für den manuellen Weg gilt das Gegenteil – siehe B9.**


## 6. Einstellungen gegen die Schema-Vorgaben (Kriterium 15)

Verglichen wird **gegen das Schema**, nicht nur gegen eine Sicherung –
eine Sicherung könnte einen versehentlich verstellten Wert bereits
enthalten. Werkzeug: `PRUEFDATEN/werte_pruefen.py`.

| Zeitpunkt | Ergebnis |
|---|---|
| nach jeder der vier Funktionstest-Etappen | 0 Abweichungen |
| nach dem Nachtest P3 | 2, beide erklärt |
| nach Gruppe B, erster Teil | 1, erklärt |
| nach „Zurücksetzen" (Gruppe B, P28) | **0 Abweichungen** |
| Endstand Referenzgerät | 1: `panel-symbol = symbolic` |

Die verbleibende Abweichung ist die eigene Wahl des Nutzers. Die Vorgabe
bleibt nach seiner Entscheidung vom 22.09.2026 bei `icon` (farbig) – es
ist seine Gestaltung, und der Tooltip nennt die Alternative.

Zusätzlich Feld für Feld gegen den Stand vor Beginn der Tests
verglichen: **0 geänderte Werte**.

---

## 7. Release-Regel (Kriterium 17)

`ROADMAP_V2.md`, Abschnitt 23. Zu jedem der acht Punkte eine belegte
Aussage.

| Nr | Punkt | Aussage | Beleg |
|---|---|---|---|
| 1 | Kernfunktionen ausreichend umgesetzt und getestet | erfüllt | AP01–AP24; Funktionstest 75 Punkte |
| 2 | keine bekannten kritischen Stabilitätsprobleme | erfüllt – **0 kritische Befunde** | Abschnitt 2 |
| 3 | Applet und Desklet eigenständig | erfüllt | AP08; Funktionstest beider Komponenten |
| 4 | Installation und Deinstallation geprüft | erfüllt, mit Befund P26 | Abschnitt 3.5 |
| 5 | Abhängigkeiten und Rechte geklärt | erfüllt | `08_LIZENZEN_RECHTE/` |
| 6 | Lizenz- und Namensfragen geklärt | erfüllt | `NAME-UND-MARKE.md`, GPL-3.0-only |
| 7 | Dokumentation vorhanden | erfüllt | beide READMEs, `CHANGELOG.md` |
| 8 | **Tests auf mehreren Rechnern** | **erfüllt** – Prüfliste bestanden, Nachtest und Nachweis von B7/B8 auf dem Zweitgerät bestanden, der daraus entstandene Befund **B9** behoben | Abschnitte 5.5, 5.8 bis 5.10 |

---

## 8. Akzeptanzkriterien – Stand

| Nr | Kriterium | Stand |
|---|---|---|
| 1 | Code-Durchsicht, auch unabhängig | **erfüllt** |
| 2 | Funktionstest, protokolliert | **erfüllt** |
| 3 | Beide Sprachen geprüft | **erfüllt** |
| 4 | Robustheit | **erfüllt** |
| 5 | Langzeittest ≥ 8 h | **erfüllt** (613 min) |
| 6 | Installation und Deinstallation | **erfüllt**, Befund P26 |
| 7 | Cinnamon-Spices-Regeln, Tabelle | **erfüllt** |
| 8 | Einreichungsstruktur, `validate-spice` | **erfüllt** |
| 9 | Applet und Desklet stimmen überein | **erfüllt** (4/4 Module bitgenau) |
| 10 | Offene AP19-Hinweise einzeln entschieden | **erfüllt** |
| 11 | Rechte an den Grafiken | **erfüllt** |
| 12 | Marken- und Namensfrage | **erfüllt** |
| 13 | Ookla-Nutzungsbedingungen | **erfüllt** |
| 14 | Echter Speedtest je Programm | **erfüllt**, auf beiden Geräten |
| 15 | Einstellungen gegen Schema | **erfüllt** |
| 16 | Dieser Prüfbericht | **in Arbeit** |
| 17 | Release-Regel beantwortet | **teilweise** – Punkt 8 bis auf Z15 erfüllt |
| 18 | Liste „Vor der Einreichung noch offen" | **in Arbeit**, Abschnitt 9 |
| 19 | `CHANGELOG.md` mit Eintrag für die erste Veröffentlichung | **teilweise** – Datei vorhanden, Eintrag steht unter „Unreleased" |
| 20 | Panel-Symbol erprobt | **erfüllt** |
| 21 | Kopfzeile `Entwicklungsstand` entfernt | **erfüllt** – in keiner Quelldatei mehr |
| 22 | `.bak`-Dateien entfernt | **in Arbeit** – Phase 3; derzeit 477 Stück, vorher im Snapshot zu sichern |
| 23 | Abschluss: Version, Snapshot, Tag, Backup, Release | **in Arbeit** – Phase 3 |

**17 von 23 erfüllt, 4 teilweise oder in Arbeit, 2 offen.** Die beiden
offenen – 22 und 23 – gehören zu Phase 3. Von den vier teilweisen hängt
Kriterium 17 allein am Zweitgerät.

---

## 9. Vor der Einreichung noch offen (Kriterium 18)

Diese Liste ist die Antwort auf Kriterium 18 und zugleich die
Arbeitsliste vor dem Einreichen. Sie ist nach Dringlichkeit geordnet.

### Muss vor der Einreichung erledigt sein

| Punkt | Herkunft | Anmerkung |
|---|---|---|
| **Repository öffentlich stellen** | P26 | **nur der Nutzer.** Solange es privat ist, scheitert der `git clone` aus beiden READMEs bei jedem Fremden – die Installationsanleitung wäre unbrauchbar. Vorher geprüft, was dadurch öffentlich würde: keine Zugangsdaten, keine IP-Adressen, keine private E-Mail-Adresse; die Seriennummer einer SSD wurde am 23.09.2026 unkenntlich gemacht |
| **Screenshots für beide READMEs** | AP23 | **nur der Nutzer.** Drei Platzhalter sind gesetzt: Applet im Panel, Hover-Anzeige, Einstellungsfenster |
| **Einreichungspakete neu erzeugen** | AP25 | die vorhandenen stammen vom 22.09.; seither haben `metadata.json` (B6) und `hardwareDetection.js` (B1, B7, B8, B9) sich geändert. `validate-spice` erneut laufen lassen. **Teil von Phase 3** |

### Sollte vor der Einreichung entschieden sein

| Punkt | Herkunft | Anmerkung |
|---|---|---|
| **Übersetzter Wert in Protokollzeilen** | AP25 | fünf Stellen (vier aus AP14, eine aus B7). Abschnitt 8 verlangt unübersetzte Protokolle; auf einem englischen System steht dort `automatic`, wer ein Protokoll durchsucht, findet es nicht. Zwei Wege: unübersetzte Kennungen oder die Herkunft dort weglassen |

### Freiwillig

| Punkt | Herkunft | Anmerkung |
|---|---|---|
| **B9 im Betrieb nachweisen** | AP25 | erst nach einem **Neustart des Zweitgeräts** aussagekräftig, weil sich die `nvme`-Nummerierung nur dann wieder ändern kann. Die `cjs`-Prüfung bildet den Fall bereits nach |
| **P1 und P11 auf passender Hardware** | AP25 | ein Gerät mit Akku **ohne** `capacity` bzw. mit mehreren `mains`-Schnittstellen. Steht derzeit nicht zur Verfügung |

### Seit dem 23.09.2026 erledigt

| Punkt | Nachweis |
|---|---|
| **Ko-fi: Zahlungsweg verbinden** | PayPal und Stripe beide verbunden, Währung Euro; die Adresse im Code (`ko-fi.com/avince`) stimmt mit der Seite überein |

### Bewusst verschoben

| Punkt | Entscheidung |
|---|---|
| **Vektorlogo (SVG)** | auf „nach 1.0", mit Messergebnis begründet – Kriterium 20 |
| **21 Beschriftungen in den Listenspalten bleiben englisch** | von Cinnamon nicht übersetzbar, in AP24 belegt |
| **Mausrad verstellt Auswahlfelder** | Cinnamon-Verhalten, nicht im Xlet lösbar; in Abschnitt 8 dokumentiert |
| **P10, S1/P14, P17** | eigenes Paket nach der Einreichung |

### Bekannte Einschränkungen des Prüfumfangs

- **P1 und P11 ohne Betriebsnachweis** – die nötige Hardware steht
  weder auf dem Referenz- noch auf dem Zweitgerät zur Verfügung. Der
  Tower hat gar keinen Akku und keine Einträge unter
  `/sys/class/power_supply`.
- **Nur eine Cinnamon-Fassung geprüft** – beide Geräte laufen Mint 22.3
  mit Cinnamon 6.6.9.
- **`sivel/speedtest-cli` wird seit dem 30.04.2026 nicht mehr
  gepflegt** – in `SPEEDTEST-PROGRAMME.md` vermerkt.

---

## 10. Phase 3 – Abschluss

**In Arbeit seit dem 23.09.2026.** Die Prüfung selbst ist beendet; was
folgt, ist Handwerk.

| Schritt | Inhalt | Stand |
|---|---|---|
| 1 | diesen Bericht abschließen | erledigt |
| 2 | `PROJECT-STATUS.md` fortschreiben | in Arbeit |
| 3 | `ROADMAP_V2.md`: AP25 als abgeschlossen führen | in Arbeit |
| 4 | Liste „Vor der Einreichung noch offen" (Abschnitt 9) | erledigt |
| 5 | Version `0.1.0-dev.25` in beide `metadata.json` und beide Testinstallationen | erledigt |
| 6 | Einreichungspakete neu bauen, erneut `validate-spice` | erledigt – beide **„No errors found"** |
| 7 | `.bak`-Dateien entfernen, vorher sichern | erledigt – 115 entfernt, Archiv angelegt |
| 8 | Snapshot `06_TESTVERSIONEN/0.1.0-dev_AP25-END/` | erledigt – 78 Dateien, keine `.bak` |
| 9 | Commit, Tag `0.1.0-dev_AP25-END`, Vollbackup mit Wiederherstellungsprobe, GitHub-Release | in Arbeit |

**Schritt 6 ist nicht wegzulassen.** Die vorhandenen Pakete unter
`PRUEFDATEN/einreichung/` stammen vom 22.09.2026. Seither hat
`Desklet/metadata.json` durch **B6** einen Eintrag bekommen, und
`hardwareDetection.js` hat sich durch B1, B7, B8 und B9 mehrfach
geändert. Ein „No errors found" vom 22.09. sagt über den heutigen Stand
nichts aus.

**Zu Schritt 7 – eine Annahme, die nicht stimmte.** Der Plan ging davon
aus, die `.bak`-Dateien seien im Snapshot `AP25-START` bereits
gesichert. Beim Nachprüfen stellte sich heraus: Dort liegen **37**, im
Arbeitsverzeichnis lagen **115**; 51 der 83 Namen fehlten. Der Großteil
war erst während AP25 entstanden, und Git erfasst sie nicht, weil
`.bak` in `.gitignore` steht.

Vor dem Löschen wurde deshalb
`06_TESTVERSIONEN/0.1.0-dev_AP25-BAK-ARCHIV.tar.gz` angelegt und mit
einer Wiederherstellungsprobe belegt: **115 von 115 Dateien
zeichengleich**. Erst danach wurde gelöscht.

Die 366 `.bak`-Dateien **innerhalb** von `06_TESTVERSIONEN/` blieben
unangetastet – sie gehören zu den Snapshots früherer Arbeitspakete.

Nach dem Löschen erneut geprüft: Syntax 10/10, gemeinsame Module 4/4
bitgenau identisch, JSON 4/4 gültig, beide `de.po` fehlerfrei, und alle
sieben Prüfskripte zusammen **345 Prüfungen, 0 Fehler**.

## 11. Drei Regeln für Abschnitt 8 des Statusdokuments

Aus den Befunden dieses Pakets, damit sie nicht wiederkehren.

**Wer einen `HardwareDetector` erzeugt, muss ihm das gemessene Laufwerk
nennen.** Aus **B8**: Es gab zwei Erzeugungsstellen je Komponente und
nur eine Zuordnung. Eine Prüfung zählt beides gegeneinander.

**Gerätenamen aus `/sys` sind nicht zugesichert.** Aus **B9**: Der
Kernel vergibt `nvme0`, `hidpp_battery_22` und dergleichen in der
Reihenfolge, in der er die Geräte findet. Was gespeichert wird, braucht
ein Merkmal der Hardware – eine Seriennummer, keine Zählung.

**Eine Einstellungsdatei zurückzuspielen erreicht die laufende
Komponente nicht.** Aus Phase 2, Gruppe B: Datei und Komponente standen
danach auseinander, und Cinnamons nächster Schreibvorgang hätte die
Datei zurückgekippt. Nach dem Zurückspielen ist die Komponente neu zu
laden, oder der Wert wird über das Einstellungsfenster gesetzt – also
über denselben Weg wie beim Nutzer.

## 12. Zwei Zählfehler im Zwischenstand vom 22.09.2026

Beim Auszählen der Befunde aus `BEFUNDE.md` gefunden. Beide betreffen
die Zählweise, nicht den Inhalt; die Summe bleibt 35.

**Erledigt:** Der Zwischenstand in `PROJECT-STATUS.md`, Abschnitt 14,
ist in Phase 3 durch das Ergebnis ersetzt worden; die Berichtigung
steht dort unter „Berichtigung des Zwischenstands vom 22.09.2026".

**Die Stufentabelle** dort nennt „mittel 10, gering 14, Hinweis 10".
Richtig ist **mittel 11, gering 13, Hinweis 9, zur Kenntnis 1**. Zwei
Ursachen: **P18** ist „gering bis mittel" eingestuft und gehört in die
höhere Stufe, und „zur Kenntnis" war mit „Hinweis" zusammengefasst.

**Gruppe A** ist dort als „elf Befunde" beschrieben. Das ist die Zahl
der **Zeilen** ihrer Änderungstabelle; die erste Zeile fasst P1, P6 und
P7 zusammen. Betroffen sind **13 Befunde**.

Beides ist in Phase 3 in `PROJECT-STATUS.md` nachzuziehen.
