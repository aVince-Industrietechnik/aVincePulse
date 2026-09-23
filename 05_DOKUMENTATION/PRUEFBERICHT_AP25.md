# aVincePulse – Prüfbericht AP25 (Abschlussprüfung vor der Einreichung)

> **GERÜST, Stand 23.09.2026. AP25 ist nicht abgeschlossen.**
> Alles zum Referenzgerät ist belegt und eingetragen. Vom Zweitgerät
> sind **14 von 15 Prüfpunkten bestanden**, einer ist dort nicht
> prüfbar, der Dauerlauf Z15 läuft noch (Abschnitt 5). Sechs
> Rückmeldungen sind entschieden; B6 wartet auf die Freigabe zur
> Umsetzung. Version, Tag und Release folgen erst danach.

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

### Dazu: Befunde vom Zweitgerät

Die Zahlen oben betreffen **Phase 1 auf dem Referenzgerät**. Der Test
auf dem Tower hat am 23.09.2026 weitere Rückmeldungen ergeben, geführt
unter eigenen Kennungen `B`:

| | Zahl |
|---|---|
| neue Befunde am Programm | **3** – B1 (mittel), B3 (Hinweis), B6 (mittel) |
| Befund am Prüfwerkzeug | **1** – B2 (gering) |
| kein Befund | 2 – B4 gehört zu P15, B5 in die Roadmap |

**Keiner davon ist kritisch.** Alle sind am 23.09.2026 entschieden:
B1, B2 und B3 sind behoben, B4 bleibt unverändert, B5 ist in die
Roadmap aufgenommen, B6 ist auf Variante B entschieden und wartet auf
die Freigabe zur Umsetzung. Einzelheiten und Nachweise in
Abschnitt 5.6.

**B1 verdient dabei die meiste Aufmerksamkeit:** Er zeigt auf jedem
Rechner mit zwei NVMe-Laufwerken stillschweigend die Temperatur eines
anderen Laufwerks an, als die Platzanzeige meint – und war auf dem
Referenzgerät grundsätzlich nicht auffindbar.

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
| P1 | mittel | Akku ohne `capacity`, aber mit `charge_full` | **nicht prüfbar** – der Tower hat keinen Akku |
| P7 | gering | Sensoren mit leeren Dateien | **im Betrieb belegt** – `iwlwifi_1` bei getrenntem WLAN zeigt `-- °C`, nicht `0` |
| P10 | mittel | abweichende `hwmon`-Nummerierung, Treiber-Neuladen | für ein späteres Paket vorgemerkt |
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

**Nahezu vollständig.** Z1 bis Z14 sind bestanden, Z4 ist auf diesem
Gerät nicht prüfbar, Z15 läuft. Sechs Rückmeldungen sind aufgenommen.

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
| Z15 | Zwei Stunden Betrieb | **läuft** seit 13:53, Ausgangswert 88 Protokollzeilen. **[OFFEN]** |

**14 von 15 Prüfpunkten bestanden**, einer nicht prüfbar, einer läuft.
Kein Prüfpunkt abweichend.

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

Danach zu prüfen: **Verschieben und Rechtsklick-Menü bei Deckkraft 0** –
ohne Cinnamon-Fläche gibt es keinen sichtbaren Rand, an dem angefasst
wird. **Umsetzung erst nach ausdrücklicher Freigabe des Nutzers.**

---

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
| **B6** | Variante B | **wartet auf Freigabe** |

Die Umsetzung von B1 bis B3 ist am Referenzgerät geprüft, aber **B1
selbst ist dort nicht beobachtbar** – eine NVMe, kein Gleichstand. Der
Betriebsnachweis für die Behebung kann nur vom Zweitgerät kommen.

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
| 8 | **Tests auf mehreren Rechnern** | **nahezu erfüllt** – 14 von 15 Prüfpunkten bestanden, Z15 läuft | Abschnitt 5 |

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
| 17 | Release-Regel beantwortet | **teilweise** – Punkt 8 bis auf Z15 erfüllt |
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
| **Dauerlauf Z15 auf dem Zweitgerät** | AP25 | läuft seit 13:53 |
| **B6 umsetzen** | AP25 | Variante B entschieden, Freigabe steht aus |

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

## 10. Abschluss

> **[OFFEN] – Phase 3, erst nach dem Zweitgerät.**

Reihenfolge: diesen Bericht vervollständigen, `PROJECT-STATUS.md` und
`ROADMAP_V2.md` fortschreiben, Version `0.1.0-dev.25` in beide
`metadata.json` und in beide Testinstallationen, `.bak`-Dateien
entfernen (Kriterium 22), Snapshot `0.1.0-dev_AP25-END/`, Commit, Tag
`0.1.0-dev_AP25-END`, Vollbackup mit Wiederherstellungsprobe,
GitHub-Release.
