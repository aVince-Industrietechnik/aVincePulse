# aVincePulse – Prüfbericht AP25 (Abschlussprüfung vor der Einreichung)

> **GERÜST, Stand 23.09.2026. AP25 ist nicht abgeschlossen.**
> Alles zum Referenzgerät ist belegt und eingetragen. Der Teil zum
> Zweitgerät ist offen und mit `[OFFEN]` gekennzeichnet; er wird nach
> Schritt 2 ergänzt. Version, Tag und Release folgen erst danach.

Geprüfter Stand: Commit `f670a3d` (Quellcode), Dokumentation bis `a57eccb`
Version in `metadata.json`: `0.1.0-dev.24` – **unverändert**, AP25 läuft
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
| – | Test auf dem Zweitgerät (Tower) | **[OFFEN]** |
| 3 | Bericht, Version, Snapshot, Tag, Backup, Release | **[OFFEN]** |

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
> 22.09.2026**, beide nur Zählweise, nicht Inhalt. Dort steht
> „mittel 10, gering 14, Hinweis 10". Hier ist **P18** („gering bis
> mittel") der höheren Stufe zugeschlagen, und **„zur Kenntnis"** ist
> von „Hinweis" getrennt ausgewiesen. Die Summe bleibt 35. Der
> Zwischenstand ist in Phase 3 entsprechend nachzuziehen.

### Behoben in Phase 2, Gruppe A (22.09.2026)

**13 Befunde** ohne Entscheidungsbedarf: P1, P2, P3, P4, P5, P6, P7, P8,
P9, P19, P20, P23, P24. Geprüft mit **38 Funktionsprüfungen** unter
`cjs`, Nachweise in `PRUEFDATEN/phase2/`.

> Der Zwischenstand vom 22.09.2026 spricht von „elf Befunden". Das ist
> die Zahl der **Zeilen** seiner Änderungstabelle; die erste Zeile fasst
> P1, P6 und P7 zusammen. Betroffen sind 13 Befunde. In Phase 3
> nachzuziehen.

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
Veröffentlichung selbst um. **[OFFEN]**

### Offen: nur auf dem Zweitgerät beobachtbar

| Befund | Stufe | Tritt auf bei | Stand |
|---|---|---|---|
| P1 | mittel | Akku ohne `capacity`, aber mit `charge_full` | **[OFFEN]** |
| P7 | gering | Sensoren mit leeren Dateien | **[OFFEN]** |
| P10 | mittel | abweichende `hwmon`-Nummerierung, Treiber-Neuladen | **[OFFEN]** |
| P11 | gering | mehrere `mains`-Schnittstellen | **[OFFEN]** |

P1 und P7 sind in Gruppe A im Code behoben; offen ist allein der
Betriebsnachweis auf passender Hardware.

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

> **[OFFEN] – Schritt 2, noch nicht durchgeführt.**
> Anleitung: `ZWEITGERAET-TESTEN.md`, Einstieg: `ZWEITGERAET-EINSTIEG.md`

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

> **[OFFEN]** – wird nach Schritt 2 eingetragen.

| Nr | Prüfung | Ergebnis |
|---|---|---|
| Z1 | Beide Bestandteile lassen sich hinzufügen | [OFFEN] |
| Z2 | Sitzungsprotokoll nach dem Start | [OFFEN] |
| Z3 | Akku: BATT und STATUS ausgeblendet | [OFFEN] |
| Z4 | Netzteil, mehrere `mains` | [nicht prüfbar] |
| Z5 | Temperaturen plausibel | [OFFEN] |
| Z6 | Lüfter: FAN ausgeblendet | [OFFEN] |
| Z7 | Sensorauswahl zeigt die Sensoren dieses Rechners | [OFFEN] |
| Z8 | Laufwerksauswahl | [OFFEN] |
| Z9 | Ohne Speedtest-Programm | [OFFEN] |
| Z10 | Warnschwellen | [OFFEN] |
| Z11 | Hardware neu erkennen, zweimal | [OFFEN] |
| Z12 | Zurücksetzen, 0 Abweichungen | [OFFEN] |
| Z13 | Bildschirmauflösung | [OFFEN] |
| Z14 | Panel-Symbol | [OFFEN] |
| Z15 | Zwei Stunden Betrieb | [OFFEN] |

### 5.6 Befunde des Zweitgeräts

> **[OFFEN]** – neue Befunde werden hier aufgenommen und in
> `BEFUNDE.md` fortgeschrieben.

---

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
| 8 | **Tests auf mehreren Rechnern** | **[OFFEN]** – Schritt 2 | Abschnitt 5 |

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
| 14 | Echter Speedtest je Programm | **erfüllt** |
| 15 | Einstellungen gegen Schema | **erfüllt** |
| 16 | Dieser Prüfbericht | **in Arbeit** |
| 17 | Release-Regel beantwortet | **teilweise** – Punkt 8 offen |
| 18 | Liste „Vor der Einreichung noch offen" | **in Arbeit**, Abschnitt 9 |
| 19 | `CHANGELOG.md` mit Eintrag für die erste Veröffentlichung | **teilweise** – Datei vorhanden, Eintrag steht unter „Unreleased" |
| 20 | Panel-Symbol erprobt | **erfüllt** |
| 21 | Kopfzeile `Entwicklungsstand` entfernt | **erfüllt** – in keiner Quelldatei mehr |
| 22 | `.bak`-Dateien entfernt | **[OFFEN]** – Phase 3; derzeit 455 Stück |
| 23 | Abschluss: Version, Snapshot, Tag, Backup, Release | **[OFFEN]** – Phase 3 |

**17 von 23 erfüllt, 4 teilweise oder in Arbeit, 2 offen.** Die beiden
offenen – 22 und 23 – gehören zu Phase 3. Von den vier teilweisen hängt
Kriterium 17 allein am Zweitgerät.

---

## 9. Vor der Einreichung noch offen (Kriterium 18)

Was nur der Nutzer erledigen kann oder was bewusst verschoben wurde.

### Nur der Nutzer

| Punkt | Herkunft | Anmerkung |
|---|---|---|
| **Repository öffentlich stellen** | P26 | sonst scheitert `git clone` aus beiden READMEs |
| **Screenshots für beide READMEs** | AP23 | drei Platzhalter sind gesetzt |
| **Ko-fi: Zahlungsweg verbinden** | AP23 | noch keine Zahlungsmethode hinterlegt |
| **Test auf dem Zweitgerät** | AP25 | Schritt 2, läuft |

### Bewusst verschoben

| Punkt | Entscheidung |
|---|---|
| **Vektorlogo (SVG)** | auf „nach 1.0", mit Messergebnis begründet – Kriterium 20 |
| **21 Beschriftungen in den Listenspalten bleiben englisch** | von Cinnamon nicht übersetzbar, in AP24 belegt |
| **Mausrad verstellt Auswahlfelder** | Cinnamon-Verhalten, nicht im Xlet lösbar; in Abschnitt 8 dokumentiert |
| **P10, S1/P14, P17** | eigenes Paket nach der Einreichung |

### Bekannte Einschränkungen des Prüfumfangs

- **P1 und P11 ohne Betriebsnachweis** – die nötige Hardware steht
  weder auf dem Referenz- noch auf dem Zweitgerät zur Verfügung.
- **Nur eine Cinnamon-Fassung geprüft** – beide Geräte laufen Mint 22.3
  mit Cinnamon 6.6.9.
- **`sivel/speedtest-cli` wird seit dem 30.04.2026 nicht mehr
  gepflegt** – in `SPEEDTEST-PROGRAMME.md` vermerkt.

---

## 10. Abschluss

> **[OFFEN] – Phase 3, erst nach dem Zweitgerät.**

Reihenfolge: diesen Bericht vervollständigen, `PROJECT-STATUS.md` und
`ROADMAP_V2.md` fortschreiben, Version `0.1.0-dev.25` in beide
`metadata.json` und in beide Testinstallationen, `.bak`-Dateien
entfernen (Kriterium 22), Snapshot `0.1.0-dev_AP25-END/`, Commit, Tag
`0.1.0-dev_AP25-END`, Vollbackup mit Wiederherstellungsprobe,
GitHub-Release.
