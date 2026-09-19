# aVincePulse – Projektstatus und Übergabedokument

Stand: 19.09.2026 (AP19, Phase 1 abgeschlossen)  
Projekt: aVincePulse  
Repository: `aVince-Industrietechnik/aVincePulse`  
Standard-Branch: `main`  
Aktueller Referenzstand: `0.1.0-dev_AP18-END`  
Vorheriger Referenzstand: `0.1.0-dev_AP17-END`

## 1. Zweck dieses Dokuments

Dieses Dokument dient als modellunabhängige Übergabe für die weitere Entwicklung von aVincePulse. Es soll ermöglichen, dass die Arbeit konsistent mit unterschiedlichen KI-Assistenten oder Entwicklungsumgebungen fortgesetzt werden kann.

Vor jeder Weiterentwicklung sollen zuerst dieses Dokument, `01_PROJEKT_ROADMAP/ROADMAP_V2.md` und die vorhandene Dokumentation gelesen werden.

## 2. Projektziel

aVincePulse ist ein modularer Hardware- und Netzwerkmonitor für Linux Mint Cinnamon.

Das Projekt soll aus zwei zusammengehörigen, aber eigenständig nutzbaren Komponenten bestehen:

1. aVincePulse Applet
2. aVincePulse Desklet

Grundprinzip: **EIGENSTÄNDIG + KOOPERATIV**.

Applet und Desklet sollen jeweils für sich funktionieren und gleichzeitig eine konsistente Messwert-, Sensor- und Bedienlogik verwenden.

## 3. Referenzsystem

Aktuelles Entwicklungs- und Referenzsystem:

- Linux Mint Cinnamon
- Referenzrechner: Dell Latitude-5285
- Cinnamon 6.6.x
- X11

Der Latitude-5285 ist Referenzsystem, darf aber nicht zu fest verdrahteter Hardware führen. aVincePulse soll auf unterschiedlichen PCs, Notebooks und Mini-PCs funktionieren.

## 4. Repository-Struktur

Die Git-Repository-Wurzel ist:

`aVincePulse_Development/`

Struktur:

- `01_PROJEKT_ROADMAP/` – Projektplanung und Roadmap
- `02_QUELLCODE/` – aktueller Master-Quellcode
  - `Applet/`
  - `Desklet/`
- `03_GRAFIK_ICONS/` – Grafiken und Icons
  - `01_V_SIGNAL_ICONSET/` – Iconset zur C-1-Designrichtung: Referenzlogo,
    PNG-Größen von 16 bis 1024 Pixel sowie Entwurfsvarianten
- `04_UEBERSETZUNGEN/` – Übersetzungen
- `05_DOKUMENTATION/` – technische und projektbezogene Dokumentation
- `06_TESTVERSIONEN/` – lokale Entwicklungsstände und AP-Snapshots auf der NAS; absichtlich nicht in GitHub versioniert
- `07_RELEASES/` – spätere Release-Artefakte
- `08_LIZENZEN_RECHTE/` – Lizenz- und Rechteprüfung
- `09_GITHUB/` – GitHub-bezogene lokale Hilfsdaten

Wichtig: `06_TESTVERSIONEN/` bleibt lokal auf der Synology/NAS und ist per `.gitignore` ausgeschlossen. Historische Entwicklungsstände werden in GitHub über Commits und Tags abgebildet.

## 5. Aktueller Git-Stand

Grundlegende Commits zu Beginn des Repositorys:

- `f0f7854` – Initial import: aVincePulse 0.1.0-dev through AP05
- `e4cb758` – Restructure repository: use full aVincePulse development project
- `6cb4ad6` – Add project handoff status for model-independent development

Alle späteren Commits sind je Arbeitspaket über `git log --oneline` und die Tags unten nachvollziehbar; sie werden hier bewusst nicht einzeln aufgeführt, damit die Liste nicht veraltet.

Tags:

- `0.1.0-dev_AP05-END` – Entwicklungsstand nach Abschluss von AP05
- `0.1.0-dev_AP06-END` – Entwicklungsstand nach Abschluss von AP06
- `0.1.0-dev_AP07-END` – Entwicklungsstand nach Abschluss von AP07
- `0.1.0-dev_AP08-END` – Entwicklungsstand nach Abschluss von AP08
- `0.1.0-dev_AP09-END` – Entwicklungsstand nach Abschluss von AP09
- `0.1.0-dev_AP10-END` – Entwicklungsstand nach Abschluss von AP10
- `0.1.0-dev_AP11-END` – Entwicklungsstand nach Abschluss von AP11
- `0.1.0-dev_AP12-END` – Entwicklungsstand nach Abschluss von AP12
- `0.1.0-dev_AP13-END` – Entwicklungsstand nach Abschluss von AP13
- `0.1.0-dev_AP14-END` – Entwicklungsstand nach Abschluss von AP14
- `0.1.0-dev_AP15-END` – Entwicklungsstand nach Abschluss von AP15
- `0.1.0-dev_AP16-END` – Entwicklungsstand nach Abschluss von AP16
- `0.1.0-dev_AP17-END` – Entwicklungsstand nach Abschluss von AP17
- `0.1.0-dev_AP18-END` – Entwicklungsstand nach Abschluss von AP18

Hinweis zum Commit `91acca7`: Dieser Commit enthält neben den AP07-Änderungen
zusätzlich das Verzeichnis `03_GRAFIK_ICONS/01_V_SIGNAL_ICONSET/`. Die Dateien
waren zum Zeitpunkt des Commits bereits im Git-Index vorgemerkt und wurden
dadurch mit aufgenommen. Die Commit-Nachricht erwähnt sie nicht.

Die Historie wurde bewusst nicht nachträglich umgeschrieben, da der Commit
bereits veröffentlicht war. Inhaltlich gehören die Dateien in das Repository.

## 6. Abgeschlossene Arbeitspakete

### AP01 – Baseline-Prüfung

Abgeschlossen.

Die vorhandene funktionsfähige Ausgangsbasis wurde geprüft und dokumentiert. Die Baseline bleibt als Referenz erhalten und soll nicht unkontrolliert verändert werden.

Dokumentation:

- `05_DOKUMENTATION/BASELINE-PRUEFUNG.md`

### AP02 – Entwicklungsidentität / Metadatenbereinigung

Abgeschlossen.

Ziel war die Bereinigung und Vereinheitlichung der öffentlichen Entwicklungsidentität und relevanter Metadaten für aVincePulse.

### AP03 – Metric Model

Abgeschlossen.

Datei:

- `02_QUELLCODE/Desklet/metrics.js`

Zentral definierte Messwerte:

- `cpu_temp`
- `cpu_load`
- `ram_load`
- `storage_temp`
- `fan_speed`
- `net_down`
- `net_up`
- `speed_down`
- `speed_up`
- `ping`
- `jitter`

In AP07 ergänzt: `storage_free`, `battery_charge`, `psu_state`.

`METRIC_ORDER` definiert die zentrale Reihenfolge.

Die Desklet-UI verwendet diese zentrale Messwertdefinition und soll keine parallelen hart codierten Messwertdefinitionen erhalten.

### AP04 – Measurement Layer

Abgeschlossen.

Datei:

- `02_QUELLCODE/Desklet/measurement.js`

Zentrale Klasse:

- `MeasurementProvider`

Ausgelagerte Messlogik umfasst unter anderem:

- CPU-Auslastung
- RAM-Auslastung
- Speedtest-Werte
- Hardwarewerte
- Netzwerkgeschwindigkeit
- Datenratenformatierung
- Dateizugriffe
- Ermittlung der Standardschnittstelle

Relevante Zustände wie Netzwerk- und CPU-Differenzwerte liegen im `MeasurementProvider` und nicht mehr in der UI-Schicht.

### AP05 – Hardware Detection / Sensor Mapping

Abgeschlossen.

Datei:

- `02_QUELLCODE/Desklet/hardwareDetection.js`

Zentrale Klasse:

- `HardwareDetector`

Ziel:

- Hardware- und Sensorerkennung über `/sys/class/hwmon`
- dynamische Zuordnung statt fest verdrahteter Sensorbezeichnungen
- CPU-, Storage- und Lüftererkennung

Auf dem Latitude-5285 wurde beispielhaft erkannt:

- CPU: `coretemp`, Label `Package id 0`
- Storage: `nvme`, Label `Composite`
- Fan: `dell_smm`, `fan1`

Wichtig: `hwmonN`-Nummern sind nicht stabil und dürfen nicht fest programmiert werden.

Die frühere feste Auswertung von `sensors`-Texten für `Package id 0`, `Composite` und `fan1:` wurde aus `measurement.js` entfernt.

### AP06 – Desklet-UI über METRIC_ORDER

Abgeschlossen.

Datei:

- `02_QUELLCODE/Desklet/desklet.js`

Ziel war, die Anzeigezeilen des Desklets nicht mehr einzeln im UI-Code aufzubauen, sondern zentral aus dem Messwertmodell zu erzeugen.

Umsetzung:

- neue Methode `_buildRows()` erzeugt die Anzeigezeilen in einer Schleife über `METRIC_ORDER`
- Beschriftung, Einheit und Startwert stammen ausschließlich aus `METRICS`
- neue Hilfsmethoden `_setValue(id, value)` und `_setUnit(id, unit)` sprechen Zeilen über die Messwert-ID an
- `_applyStyle()` iteriert ebenfalls über `METRIC_ORDER`
- Zuordnung Messwert-ID zu Anzeigezeile in `this._rows`
- ein in `METRIC_ORDER` aufgeführter, in `METRICS` nicht definierter Messwert wird protokolliert und übersprungen, ohne die Anzeige zu unterbrechen

Damit ist `metrics.js` die einzige Stelle, an der Messwerte, Reihenfolge, Beschriftung und Einheit definiert werden. Ein zusätzlicher Messwert erfordert keine Änderung mehr an `desklet.js`.

Bewusst nicht Bestandteil von AP06:

- Ein- und Ausblenden einzelner Messwerte
- benutzerdefinierte Reihenfolge über die Einstellungen

AP06 schafft dafür die technische Voraussetzung.

Nachweis der Wirksamkeit:

Ein Testtausch zweier Einträge in `METRIC_ORDER` innerhalb der lokalen Testinstallation führte zur erwarteten Vertauschung der Anzeigezeilen. Der Testeingriff wurde anschließend zurückgenommen; das Repository war davon nicht betroffen.

Unverändert geblieben sind:

- `metrics.js`, `measurement.js`, `hardwareDetection.js`
- `settings-schema.json`, `stylesheet.css`, `metadata.json`
- der gesamte Applet-Quellcode
- das Format der gemeinsam genutzten Datei `/tmp/avince-hwmonitor-values`

### AP07 – Akku, Netzteil, Speicherplatz und Verfügbarkeitsprüfung

Abgeschlossen.

Dateien:

- `02_QUELLCODE/Desklet/metrics.js`
- `02_QUELLCODE/Desklet/hardwareDetection.js`
- `02_QUELLCODE/Desklet/measurement.js`
- `02_QUELLCODE/Desklet/desklet.js`

#### Neue Messwerte

- `battery_charge` – Ladezustand des Systemakkus in Prozent, Anzeige `BATT`
- `psu_state` – Zustand der Stromversorgung, Anzeige `STATUS` mit dem Wert `PSU` und `ON` bzw. `OFF` in der Einheitenspalte
- `storage_free` – freier Speicherplatz der Systempartition, Anzeige `FREE ⛁`, Einheit wechselt automatisch zwischen MB, GB und TB

#### Akkuerkennung

Der Systemakku wird in `hardwareDetection.js` über `/sys/class/power_supply` gesucht.

Wesentlich dabei: Akkus von Peripheriegeräten – Funkmaus, Tastatur, Headset – melden sich dort ebenfalls mit `type = Battery`. Sie tragen jedoch zusätzlich `scope = Device` und werden ausgeschlossen. Fehlt die `scope`-Datei, handelt es sich nach Linux-Konvention um den Systemakku.

Auf dem Latitude-5285 wurde erkannt:

- Akku: `/sys/class/power_supply/BAT0`
- Netzteil: `/sys/class/power_supply/AC`
- ausgeschlossen: `hidpp_battery_124` (Logitech-Funkmaus)

Der Ladezustand wird bevorzugt aus `capacity` gelesen. Stellt die Hardware diese Datei nicht bereit, wird er aus `charge_now/charge_full` bzw. `energy_now/energy_full` berechnet.

Der Netzteilzustand stammt aus `AC/online`. Fehlt eine AC-Schnittstelle, wird er ersatzweise aus dem Akkustatus abgeleitet.

#### Speicherplatz

`measurement.js` ermittelt den freien Platz über `Gio.File.query_filesystem_info` für den Pfad `/`.

Dadurch wird ausschließlich das Dateisystem der Systempartition erfasst. Eingehängte Netzlaufwerke, `tmpfs` und `efivarfs` fließen nicht ein, und es wird kein externer Prozess wie `df` benötigt.

Der gelieferte Wert entspricht dem für Benutzer verfügbaren Platz, also ohne die für root reservierten Blöcke. Er stimmt mit der Spalte `Available` von `df` überein.

Hinweis für Vergleiche: `df -h` rundet grundsätzlich auf, aVincePulse rundet kaufmännisch. Eine Abweichung in der ersten Nachkommastelle ist daher normal und kein Fehler.

#### Verfügbarkeitsprüfung

`HardwareDetector.getAvailability()` meldet, welche hardwareabhängigen Messwerte auf dem Gerät tatsächlich vorhanden sind.

`_buildRows()` erzeugt für einen als nicht verfügbar gemeldeten Messwert keine Anzeigezeile. Ein fehlender Sensor führt damit weder zu einer dauerhaften Ausgabe `--` noch zu einem Fehler.

Betroffene Messwerte:

- `cpu_temp`
- `storage_temp`
- `fan_speed`
- `battery_charge`
- `psu_state`

Nur ausdrücklich als nicht verfügbar gemeldete Messwerte entfallen. Alle übrigen – etwa CPU-Auslastung, RAM, Speicherplatz, Netzwerk und Speedtest – bleiben immer sichtbar. `speed_down`, `speed_up`, `ping` und `jitter` werden bewusst nicht ausgeblendet, damit das Desklet seine Höhe nach dem ersten Speedtest nicht ändert.

`battery_charge` und `psu_state` hängen beide am Systemakku, nicht am Netzteil. Ein Desktop-PC meldet häufig eine AC-Schnittstelle, aber keinen Akku; eine dauerhafte Anzeige `PSU ON` wäre dort ohne Aussage.

Die Erkennung läuft einmalig beim Laden des Desklets. Ändert sich die Hardware oder wird ein Treiber verzögert geladen, ist ein Neuladen erforderlich. Die in der Roadmap vorgesehene Funktion „Hardware neu erkennen" war zu diesem Zeitpunkt noch nicht umgesetzt (seit AP12 vorhanden).

#### Geprüfte Hardwarefälle

Auf dem Referenzsystem real geprüft, zusätzlich per Simulation der Sensorverfügbarkeit:

- Latitude-5285, alle Sensoren vorhanden: 14 Zeilen
- Desktop-PC ohne Lüftersensor und ohne Akku: 11 Zeilen
- Mini-PC zusätzlich ohne Storage-Temperatur: 10 Zeilen
- virtuelle Maschine ohne jeden Sensor: 9 Zeilen, stabil

### AP08 – Applet eigenständig

Abgeschlossen.

Ziel war, das Applet vom Desklet zu lösen. Bis dahin bezog es sämtliche Werte aus `/tmp/avince-hwmonitor-values`; ohne laufendes Desklet zeigte es nichts an. Das widersprach dem Grundsatz EIGENSTÄNDIG + KOOPERATIV.

#### Gemeinsame Module

`metrics.js`, `measurement.js` und `hardwareDetection.js` liegen nun zusätzlich im Applet.

Cinnamon Spices verlangt getrennte Pakete mit eigener UUID und lässt keine gemeinsame Core-Installation zu. Die Module müssen deshalb als Kopie vorliegen.

Damit die Kopien nicht auseinanderlaufen, importiert `measurement.js` den `HardwareDetector` nicht mehr selbst, sondern bekommt ihn beim Erzeugen übergeben:

```js
this._measurement = new MeasurementProvider(new HardwareDetector());
```

Der komponentenspezifische Importpfad steht dadurch nur noch in `desklet.js` und `applet.js`. Die gemeinsamen Module sind in beiden Komponenten bitgenau identisch und lassen sich per Prüfsumme vergleichen. Seit AP11 sind es vier, `speedtest.js` kam hinzu:

```bash
for f in metrics.js measurement.js hardwareDetection.js speedtest.js; do
    sha256sum 02_QUELLCODE/Desklet/$f 02_QUELLCODE/Applet/$f
done
```

Ein Auseinanderlaufen fällt damit sofort auf. Änderungen an einem der drei Module sind immer in beide Verzeichnisse zu übernehmen.

#### Entfernter Code

Aus `applet.js` wurden rund 130 Zeilen toter Code entfernt: `_readSensors()`, `_readNetworkSpeed()`, `_formatRate()`, `_readFile()`, `_getDefaultInterface()` sowie die Zustandsvariablen `_lastRx`, `_lastTx`, `_lastNetTime` und `_lastInterface`. Diese Funktionen waren definiert, wurden aber nirgends aufgerufen; sie stammten aus der Zeit vor der Umstellung auf die gemeinsame Datei.

#### Eigene Messung

Das Applet liest `/tmp/avince-hwmonitor-values` nicht mehr, sondern misst selbst. Das Popup wird wie im Desklet aus `METRIC_ORDER` aufgebaut und blendet Messwerte ohne Sensor aus.

Das Desklet schreibt die Datei weiterhin unverändert, damit das alte Applet `avince-hwpopup@angelo` weiterläuft.

Dass beide Komponenten bei gleichzeitigem Betrieb dieselben Sensoren lesen, ist vertretbar: Es handelt sich um wenige Dateien aus `/sys`. Die Roadmap sieht eine gemeinsame Datenbasis als Option, nicht als Pflicht.

#### Hover-Anzeige

- Aktualisierungsintervall auf 3 Sekunden gesetzt, entspricht dem Standard des Desklets. Vollständige Synchronität ist nicht erreichbar, da beide Komponenten eigenständig messen und ihre Zeitgeber versetzt laufen. (Seit AP15 überholt: Beide richten ihren Takt an der Systemuhr aus und messen bei gleichem Intervall im selben Moment.)
- Schriftgröße und Spaltenbreiten werden aus Bildschirmhöhe und Zeilenzahl berechnet, statt fest bei 48 px zu liegen. Die Anzeige belegt dadurch etwa 70 Prozent der Bildschirmhöhe, unabhängig von Auflösung und Messwertanzahl. Neu berechnet wird bei jedem Öffnen, womit Monitor- und Auflösungswechsel berücksichtigt sind.
- Die Beschriftung `SPEED ↓` wurde zuvor abgeschnitten; die Spaltenbreiten skalieren nun mit der Schriftgröße.
- Hinter der Anzeige liegt eine abgedunkelte Fläche mit abgerundeten Ecken. Die Schrift bleibt dadurch auf jedem Bildschirminhalt lesbar, ohne Schrift- und Schattenfarbe je nach Hintergrund umzuschalten.

Zur Deckkraft siehe `POPUP_BACKGROUND_OPACITY` in `applet.js`. Der Standardwert 0.55 ergibt gegenüber weißer Schrift im ungünstigsten Fall – reinweißer Inhalt dahinter – einen Kontrast von 4.7 : 1. Werte unter 0.45 unterschreiten die Schwelle von 3.0 : 1 für große, fette Schrift und sollten auch später nicht einstellbar sein.

Eine Auswertung des tatsächlichen Bildschirminhalts über `global.stage.read_pixels` wäre technisch möglich, wurde aber verworfen: Unter einer großflächigen Anzeige liegt selten einheitlich Helles oder Dunkles, und die Umschaltung würde beim Verschieben von Fenstern springen.

#### Symbole

Das Applet zeigte bisher das Unicode-Zeichen `⚡` im Panel. Es wurde durch das C-1-Logo ersetzt.

Wichtig ist die Unterscheidung zweier Dateien:

- `icon.png` – von der Cinnamon-Verwaltung für die Darstellung in der Applet- und Desklet-Liste verwendet. Der Dateiname ist fest vorgegeben. Die Liste hat einen hellen Hintergrund, weshalb dort die Fassung mit dunklem Hintergrund liegt. Ein weißes Logo auf transparentem Grund wäre dort unsichtbar.
- `panel-icon.png` – vom Applet über `set_applet_icon_path()` geladen. Weiß-blau-rot auf transparentem Grund.
- `panel-icon-symbolic.png` – einfarbige Fassung für helle Panel-Themes, noch nicht aktiv.

Herkunft und Bearbeitung der Panel-Icons sind in `03_GRAFIK_ICONS/01_V_SIGNAL_ICONSET/03_Panel/README.txt` dokumentiert.

### AP09 – Einstellungen für das Applet

Abgeschlossen.

Datei:

- `02_QUELLCODE/Applet/settings-schema.json` (neu)
- `02_QUELLCODE/Applet/applet.js`

Das Applet besaß bisher keine Einstellungen; alle Werte waren fest im Quelltext.

#### Einstellbare Werte

| Einstellung | Typ | Bereich | Standard |
|---|---|---|---|
| Aktualisierungsintervall | spinbutton | 1–30 s | 3 |
| Anzeigegröße | scale | 40–90 % | 70 |
| Deckkraft der Hintergrundfläche | scale | 45–85 % | 55 |
| Panel-Symbol | combobox | vier Varianten | Logo farbig |

Die Untergrenze der Deckkraft von 45 Prozent ist bewusst gesetzt: Darunter unterschreitet weiße Schrift auf hellem Bildschirminhalt den Mindestkontrast von 3.0 : 1. Zusätzlich begrenzt `_gueltig()` alle Werte im Code, sodass eine beschädigte oder von Hand bearbeitete Einstellungsdatei nicht zu einer unbrauchbaren Darstellung führt.

#### Panel-Symbol

Vier Varianten stehen zur Wahl:

- `icon` – farbiges Logo, 24 px
- `symbolic` – einfarbiges Logo in Theme-Farbe, auf 24 px angehoben
- `symbolic-status` – einfarbiges Logo in der Cinnamon-Größe für Statusanzeigen, 16 px
- `text` – Textkürzel `aVP`

Cinnamon stellt symbolische Symbole absichtlich kleiner dar als farbige, in der rechten Panelzone 16 statt 24 Pixel, da dort üblicherweise Statusanzeigen wie WLAN oder Lautstärke sitzen. Für ein Produktlogo ist das zu klein, weshalb `symbolic` die Größe über `_angleicheIconGroesse()` anhebt. `symbolic-status` verzichtet bewusst darauf, damit sich das Logo bei den übrigen Statusanzeigen einreiht.

Die Angleichung wird in `on_panel_icon_size_changed()` wiederholt, da Cinnamon die Größe bei einer Änderung der Panelhöhe zurücksetzt.

Beim Wechsel zwischen Symbol und Textkürzel muss die jeweils andere Darstellung ausdrücklich entfernt werden (`hide_applet_icon()` bzw. `hide_applet_label()`), sonst bleiben beide nebeneinander stehen.

#### Zurücksetzen

Eine Schaltfläche im Einstellungsfenster setzt alle Werte auf die Vorgaben zurück.

Wichtig dabei: `settings.setValue()` löst die zugehörigen Rückrufe nicht aus. Die Anwendungsmethoden müssen deshalb selbst aufgerufen werden, sonst wirkt das Zurücksetzen nicht sichtbar.

Berichtigt in AP19 (Befund H2): Die frühere Aussage, `setValue()` aktualisiere auch die gebundenen Eigenschaften nicht, trifft nicht zu. Gebundene Eigenschaften lesen ihren Wert direkt aus den Einstellungsdaten (Cinnamon `settings.js`, `_getValue`), die `setValue()` ändert. Die zusätzlichen Zuweisungen im Code sind daher überflüssig und schreiben die Datei bei Listen ein zweites Mal; schädlich sind sie nicht.

### AP10 – Auswahl der angezeigten Messwerte

Abgeschlossen.

Dateien:

- `02_QUELLCODE/Applet/settings-schema.json`, `applet.js`
- `02_QUELLCODE/Desklet/settings-schema.json`, `desklet.js`, `stylesheet.css`

#### Auswahl der Messwerte

Hinweis: Die Schalter wurden in AP13 durch die Messwertliste ersetzt; siehe dort.

Beide Komponenten besitzen je einen Schalter pro Messwert, gegliedert in Hardware, Netzwerk und Internet-Speedtest. Der Schlüssel ergibt sich aus der Messwert-ID: `cpu_temp` wird zu `show-cpu-temp`, da Cinnamon für Einstellungen Bindestriche verwendet.

`_buildRows()` überspringt abgewählte Messwerte. Nur ein ausdrückliches `false` blendet aus; fehlt die Einstellung, bleibt der Messwert sichtbar.

Applet und Desklet werden getrennt eingestellt. Das ist beabsichtigt: Eine gemeinsame Auswahl würde eine Kopplung schaffen, die dem Grundsatz EIGENSTÄNDIG + KOOPERATIV widerspricht.

Das Schema wurde aus `metrics.js` erzeugt und anschließend geprüft, dass alle Schlüssel im Schema exakt denen entsprechen, die der Code bildet. Bei einer Abweichung würde Cinnamon das Binden mit einem Fehler abbrechen.

Wichtig beim Neuaufbau der Zeilen: Der laufende Zeitgeber muss entfernt werden, bevor `_update()` einen neuen setzt. Andernfalls liefe die Messschleife doppelt und würde sich mit jeder weiteren Änderung vervielfachen.

#### Spaltenbreiten

Die festen Pixelbreiten des Desklets (70/58/50) wurden aus `stylesheet.css` entfernt. Beide Komponenten berechnen die Breiten nun in `_berechneSpaltenbreiten()` aus der Schriftgröße und den tatsächlich angezeigten Beschriftungen.

Die alten Werte passten nur zu einer Schriftgröße von 14 px; bei 20 px und mehr wurden Beschriftungen abgeschnitten. Die Einheitenspalte war selbst bei 14 px zu schmal für `MBit/s`.

Die Einheitenspalte ist immer für mindestens sechs Zeichen ausgelegt, da die Einheiten von Netzwerk und Speedtest zur Laufzeit zwischen `B/s`, `KB/s`, `MB/s`, `GB/s` und `MBit/s` wechseln.

Werden Messwerte abgewählt, verkürzt sich die längste Beschriftung und die Anzeige wird von selbst schmaler.

#### Zurücksetzen

Beide Komponenten besitzen nun eine Schaltfläche, die alle Einstellungen einschließlich der Messwertauswahl auf die Auslieferungswerte zurücksetzt. Die dort gesetzten Werte stimmen mit den Vorgaben im jeweiligen Schema überein.

### AP11 – Speedtest in beiden Komponenten

Abgeschlossen.

Dateien:

- `02_QUELLCODE/Desklet/speedtest.js` und `02_QUELLCODE/Applet/speedtest.js` (neu)
- `metrics.js`, `measurement.js`, `desklet.js`, `applet.js`, beide `settings-schema.json`

#### Ausgangslage

Der gesamte Speedtest-Code lag ausschließlich in `applet.js`. Wer nur das Desklet installierte, konnte keinen Speedtest auslösen; die Zeilen `SPEED`, `PING` und `JITTER` wären dauerhaft leer geblieben. Das widersprach dem Grundsatz EIGENSTÄNDIG + KOOPERATIV.

#### Gemeinsames Modul

`speedtest.js` ist das vierte gemeinsame Modul neben `metrics.js`, `measurement.js` und `hardwareDetection.js` und in beiden Komponenten bitgenau identisch.

- `SpeedtestRunner` – Programmsuche, Ausführung, Ablage, Auswertung des Alters
- `SpeedtestAnzeige` – bildschirmmittige Rückmeldung während des Tests

Die Anzeige liegt bewusst im gemeinsamen Modul, damit der Ablauf unabhängig von der auslösenden Komponente gleich aussieht. Eine Cinnamon-Benachrichtigung wurde erprobt und wieder verworfen: Sie ist leicht zu übersehen und erscheint nicht, wenn Benachrichtigungen abgeschaltet sind.

#### Bedienung

- Applet: Klick auf das Panel-Symbol, zusätzlich eine Schaltfläche in den Einstellungen
- Desklet: Kontextmenü über Rechtsklick, zusätzlich eine Schaltfläche in den Einstellungen

Auf einen Klick auf das Desklet wurde bewusst verzichtet, da ein Desklet häufiger verschoben als gemessen wird und ein versehentlich ausgelöster Test Zeit und Bandbreite kostet.

Beide Einstellungsfenster enthalten einen Hinweis auf den jeweiligen Bedienweg.

#### Programmsuche

Der zuvor fest verdrahtete Pfad `/usr/local/bin/librespeed-cli` wurde ersetzt. Gesucht wird zuerst im Suchpfad des Systems, anschließend in vier üblichen Ablageorten. Fehlt das Programm, erscheint eine verständliche Meldung statt wortlosem Nichtstun.

#### Ablage der Ergebnisse

Neuer Ort: `~/.local/share/avincepulse/speedtest-values`

Bewusst nicht im Einstellungsordner einer der beiden UUIDs: Beide Komponenten sollen dasselbe Ergebnis sehen, unabhängig davon, welche den Test ausgelöst hat und ob die andere überhaupt installiert ist.

Ergebnisse aus der früheren Ablage unter der alten UUID `avince-hwmonitor@angelo` werden beim ersten Zugriff einmalig übernommen. Ein fehlgeschlagener Test überschreibt vorhandene gültige Werte nicht.

#### Zeitpunkt des letzten Speedtests

Die Ablage enthält nun `TIMESTAMP`. Der neue Messwert `speed_age` zeigt das Alter als `LAST ◷` an.

Die Anzeige erfolgt in Minuten, Stunden oder Tagen, bewusst nicht in Sekunden: Applet und Desklet messen zu versetzten Zeitpunkten, eine Sekundenanzeige liefe sichtbar auseinander und wirkte unruhig, obwohl derselbe Messwert zugrunde liegt.

#### Symbole in Beschriftungen

Beschriftung und Symbol werden in `metrics.js` getrennt geführt (`label` und `symbol`). Das hält beides unabhängig: Die Beschriftung kann später übersetzt werden, ohne dass das Symbol mitgeführt oder dabei verloren gehen kann.

Die Anzeige hebt das Symbol über Pango-Markup an, damit es auf der Höhe der Großbuchstaben sitzt. Der Faktor steht als `symbolAnhebung` beim jeweiligen Messwert, da Schriftzeichen unterschiedlich hoch auf der Grundlinie sitzen: `⛁` benötigt 30, `◷` benötigt 110. Ein gemeinsamer Wert für alle Zeichen führt dazu, dass eines richtig sitzt und das andere verrutscht.

Der Faktor wird mit der Schriftgröße multipliziert und bleibt dadurch bei jeder Größe und Bildschirmauflösung im Verhältnis gleich. Ein fester Wert wäre bei kleiner Schrift zu groß und bei großer zu klein.

Die Beschriftung wird vor dem Setzen maskiert, damit `&`, `<` oder `>` die Zeile nicht leeren können. Schlägt die Auszeichnung fehl, erscheint die Beschriftung mit Symbol als einfacher Text.

Alle Zellen einer Zeile richten sich an der Mittellinie aus statt an der Schriftgrundlinie.

### AP12 – Hardware neu erkennen und Berichte

Abgeschlossen.

#### Hardware neu erkennen

Die Sensorerkennung lief bisher nur einmalig beim Laden. Nach einem Hardwarewechsel oder bei einem verzögert geladenen Treiber war ein Messwert bis zum nächsten Cinnamon-Neustart nicht verfügbar.

Beide Komponenten besitzen nun eine Schaltfläche, die die Erkennung erneut durchführt. `MeasurementProvider.setHardwareDetector()` tauscht die Erkennung aus, anschließend werden die Anzeigezeilen neu aufgebaut, da sich die Verfügbarkeit geändert haben kann.

#### Berichte

Jede Hardwareerkennung und jeder Speedtest legt einen bleibenden Bericht ab:

```
~/.local/share/avincepulse/berichte/
    Hardware/   aVP-desklet-hardware-bericht_2026-09-17_19-20-11.txt
    Speedtest/  aVP-applet-speedtest-bericht_2026-09-17_20-11-02.txt
```

Getrennte Unterordner je Art, Herkunft am Anfang des Dateinamens, Datum und Uhrzeit für die chronologische Sortierung. Berichte werden nicht überschrieben, sodass sich die Entwicklung nachvollziehen lässt.

Der Hardwarebericht enthält die ausgewählten Sensoren, die Verfügbarkeit jedes sensorabhängigen Messwerts und eine vollständige Liste aller Sensoren des Systems. Letztere ist die Vorarbeit für eine spätere Sensorauswahl durch den Benutzer: Auf dem Latitude-5285 stehen 15 Temperatursensoren zur Verfügung, von denen zwei verwendet werden.

Die Berichte werden bewusst nicht automatisch gelöscht. Das Programm soll keine vom Benutzer einsehbaren Daten ungefragt entfernen.

Die Datei `speedtest-values` enthält weiterhin nur den jüngsten Stand für die Anzeige und wird überschrieben. Sie trägt nun einen erklärenden Kopf in Kommentarzeilen, die beim Einlesen übersprungen werden, sowie den Vermerk, welche Komponente die Messung ausgelöst hat.

#### Rückmeldungen

Speedtest, Hardwareerkennung und Zurücksetzen melden sich über die gemeinsame `StatusAnzeige`, die dafür von `SpeedtestAnzeige` umbenannt wurde.

Schriftgröße und Höchstbreite richten sich nach dem Bildschirm (16 bis 32 px, höchstens 55 Prozent der Breite), lange Texte brechen um. Zuvor lief die Meldung über den Bildschirmrand hinaus und verdeckte das Einstellungsfenster.

Der vollständige Dateipfad wird in der Meldung bewusst nicht genannt; sie verweist stattdessen auf die zuständige Schaltfläche.

#### Berichtsordner öffnen

Je eine Schaltfläche unter Speedtest und unter Geräte öffnet gezielt den jeweiligen Unterordner, statt beide in den gemeinsamen Elternordner zu führen.

#### Nebenbefund

Cinnamon übersetzt bekannte englische Begriffe in den Einstellungen selbsttätig über die eigenen Übersetzungsdateien; aus der Überschrift `Hardware` wird so `Geräte`. Eigene Formulierungen bleiben unübersetzt, bis das Projekt eigene Übersetzungsdateien mitliefert.

### AP13 – Messwertliste: Bezeichnung, Sichtbarkeit und Reihenfolge

Abgeschlossen.

Dateien:

- `02_QUELLCODE/Desklet/metrics.js` und `02_QUELLCODE/Applet/metrics.js`
- `desklet.js`, `applet.js`, beide `settings-schema.json`

AP13 ist der erste Teil der Variante A: zuerst die Messwertliste, in AP14 die Auswahl des Sensors je Messwert.

#### Eine Liste statt 15 Schalter

Die 15 Einzelschalter aus AP10 und ihre drei Zwischenüberschriften wurden in beiden Komponenten durch eine einzige Einstellung `messwert-liste` vom Cinnamon-Typ `list` ersetzt. Spalten:

| Spalte | Inhalt | Bedienung |
|---|---|---|
| Messwert | lesbarer Name mit Vorgabe, z. B. „CPU-Temperatur (Vorgabe: CPU)“ | fest |
| Eigene Bezeichnung | leer bedeutet Vorgabe aus `metrics.js` | Doppelklick öffnet das Bearbeitungsfenster |
| Sichtbar | Kontrollkästchen | direkt anklickbar |

Die Reihenfolge wird mit den Pfeiltasten unter der Liste geändert. Die Schaltflächen „Hinzufügen“ und „Entfernen“ sind über `hidden-buttons` ausgeblendet. Die Spalten „Eigene Bezeichnung“ und „Sichtbar“ sind über `align: 0.5` zentriert; feste Spaltenbreiten lässt Cinnamon nicht zu.

Applet und Desklet werden weiterhin getrennt eingestellt, wie in AP10 festgelegt.

Die Auswahl aus den alten Schaltern wurde bewusst nicht übernommen (Entscheidung vom 18.09.2026): Es handelt sich um eine Entwicklungsversion ohne weitere Nutzer, und Cinnamon entfernt beim Laden Schlüssel, die nicht mehr im Schema stehen. Nach der Umstellung sind alle Messwerte sichtbar.

#### Bereinigung der Liste

Das Bearbeitungsfenster von Cinnamon zeigt immer alle Spalten, also auch den Messwert selbst. Er lässt sich dort versehentlich umstellen, sperren lässt sich das Feld nicht.

`ordneMesswerte()` in `metrics.js` fängt das ab:

- unbekannte oder beschädigte Einträge werden verworfen
- von doppelten Einträgen gilt nur der erste
- fehlende Messwerte werden sichtbar am Ende ergänzt

Die Anzeige enthält dadurch immer jeden Messwert höchstens einmal, auch wenn die Liste in den Einstellungen fehlerhaft ist. `standardMesswertListe()` liefert die Auslieferungsfassung in der Reihenfolge von `METRIC_ORDER` und wird von „Zurücksetzen“ verwendet.

Beide Funktionen liegen im gemeinsamen Modul, damit die Logik nur einmal existiert. `METRIC_ORDER` bestimmt weiterhin die Vorgabereihenfolge; ein neuer Messwert erscheint ohne Änderung an `desklet.js` oder `applet.js` automatisch am Ende der Liste.

#### Eigene Bezeichnungen

- ersetzen nur den Text; das Symbol bleibt erhalten, da es getrennt geführt wird
- werden in der Anzeige immer in Großbuchstaben dargestellt, passend zu den Vorgaben; das Eingabefeld von Cinnamon lässt sich nicht einschränken, in der Liste bleibt die Eingabe wie getippt stehen
- fließen in die Berechnung der Spaltenbreite ein, die sich dadurch anpasst

Die Pfeile von `SPEED ↓` und `SPEED ↑` waren bis dahin Teil der Beschriftung und verschwanden bei einer eigenen Bezeichnung. Sie werden nun wie `⛁` und `◷` als `symbol` geführt, mit `symbolAnhebung: 0`, da sie von Haus aus auf Höhe der Großbuchstaben sitzen. Mit der Vorgabe ist die Anzeige unverändert.

#### Messwerte ohne Sensor

Sie bleiben unabhängig vom Häkchen ausgeblendet. Die Liste zeigt sie trotzdem an, damit die Einstellung bei einem Hardwarewechsel oder nach „Hardware neu erkennen“ greift.

#### Verhalten der Cinnamon-Liste

Beim Test aufgefallen, kein Fehler von aVincePulse:

- Wird eine Zeile an ausgeblendeten Zeilen vorbei verschoben, ändert sich die Liste, die Anzeige aber nicht sichtbar.
- Die Pfeiltasten werden erst aktiv, wenn sich die Auswahl ändert. Ist beim Öffnen bereits die erste Zeile markiert, hilft ein Klick auf eine andere Zeile.

#### Prüfung

- Syntaxprüfung mit `cjs` für alle geänderten Dateien
- `ordneMesswerte()` mit sechs Fällen geprüft: Standardliste, fehlend, kein Array, leer, doppelt und unbekannt, umsortiert; Ergebnis stets genau 15 Messwerte ohne Doppelte
- Funktionstest in Applet und Desklet durch den Nutzer: Sichtbarkeit, Reihenfolge, eigene Bezeichnung, absichtlich doppelter Messwert, Zurücksetzen, Symbole bei Schriftgröße 10 und 30

### AP14 – Sensorauswahl

Abgeschlossen.

Dateien:

- `02_QUELLCODE/Desklet/hardwareDetection.js` und `02_QUELLCODE/Applet/hardwareDetection.js`
- `desklet.js`, `applet.js`, beide `settings-schema.json`

AP14 ist der zweite Teil der Variante A. Für CPU-Temperatur, Speicher-Temperatur und Lüfter kann der Sensor von Hand gewählt werden. Vorgabe ist „Automatisch“, also das Punktesystem aus AP05.

#### Stabile Sensorkennung

Jeder Sensor trägt eine Kennung aus Chip, Gerät und Sensornummer, zum Beispiel `dell_smm|dell_smm_hwmon|temp3` oder `nvme|nvme0|temp1`. Das Gerät stammt aus dem Verweis `hwmonN/device`.

Die in AP14 zunächst geplante Kennung aus Chip und Bezeichnung reicht nicht aus: `dell_smm` meldet auf dem Referenzgerät sechs Temperaturen ohne Bezeichnung, und zwei NVMe-SSDs würden beide `nvme / Composite` heißen.

Die `hwmonN`-Nummer ist bewusst nicht Teil der Kennung. Am 18.09.2026 hat sie sich auf dem Referenzgerät bei drei aufeinanderfolgenden Starts jedes Mal verschoben (coretemp hwmon5 → hwmon5 → hwmon7, dell_smm hwmon7 → hwmon6 → hwmon6, iwlwifi hwmon6 → hwmon7 → hwmon5). Die von Hand gewählte Auswahl wurde jedes Mal richtig wiedergefunden.

#### Auswahlfelder

Beide Komponenten besitzen unter der Messwertliste den Abschnitt „Sensoren“ mit drei Auswahlfeldern (`sensor-cpu`, `sensor-storage`, `sensor-fan`). Gespeichert wird die Kennung oder `auto`.

Die angebotenen Sensoren sind von Gerät zu Gerät verschieden und können deshalb nicht im Schema stehen. `HardwareDetector.getSensorOptionen()` liefert sie, `settings.setOptions()` schreibt sie beim Laden und nach „Hardware neu erkennen“ in die Einstellungsdatei:

- erster Eintrag „Automatisch (…)“ mit dem Sensor, den die automatische Auswahl gerade verwendet
- danach alle Sensoren der Art, sortiert nach Chip, mit lesbarem Namen und dem Wert zum Zeitpunkt der Erkennung, etwa „dell_smm – Temperatur 3 · 41 °C“
- für die beiden Temperaturen werden bewusst alle Temperatursensoren angeboten, damit die Wahl wirklich frei ist
- Sensoren ohne Bezeichnung werden durchnummeriert; melden mehrere Geräte denselben Chip, wird das Gerät angehängt

Ein bereits geöffnetes Einstellungsfenster zeigt neu gesetzte Optionen erst nach Schließen und erneutem Öffnen. (Seit AP16 übernimmt aVincePulse das selbst, siehe dort.)

#### Verhalten

- Eine geänderte Auswahl wirkt sofort. `HardwareDetector.setzeAuswahl()` wechselt den Sensor ohne neuen Suchlauf.
- „Hardware neu erkennen“ übergibt die bestehende Auswahl an die neue Erkennung, sie bleibt also erhalten.
- Fehlt ein gewählter Sensor, gilt die automatische Auswahl. Die Wahl bleibt gespeichert und greift wieder, sobald der Sensor zurückkehrt. Im Auswahlfeld erscheint sie als „Nicht gefunden: …“.
- „Zurücksetzen“ stellt alle drei Felder auf „Automatisch“. Da beide Komponenten dieselbe automatische Auswahl verwenden, zeigen sie danach dieselben Sensoren. Zurückgesetzt wird nur die Komponente, in der die Schaltfläche gedrückt wurde (Entscheidung vom 18.09.2026, Grundsatz EIGENSTÄNDIG).
- Die Sensorauswahl wird je Komponente getrennt eingestellt, wie alle übrigen Einstellungen seit AP10 (Entscheidung vom 18.09.2026).

#### Hardwarebericht

- vermerkt je Messwert die Herkunft: „automatisch“, „manuell gewaehlt“ oder „automatisch – gewaehlter Sensor … nicht gefunden“
- die vollständige Sensorliste ist auf Wunsch des Nutzers als Tabelle mit festen Spalten gestaltet: Art, Chip, Bezeichnung, Wert, Verwendet, Kennung; eine Zeile je Sensor, ohne seitliches Scrollen lesbar
- der `hwmon`-Pfad steht nicht in der Tabelle, da er lang ist und sich nach einem Neustart ändert; für die verwendeten Sensoren steht er weiter oben

Ein Bericht ist eine Momentaufnahme und wird nachträglich nicht geändert. Eine spätere Umstellung der Auswahl erscheint erst im nächsten Bericht.

#### Prüfung

- Syntaxprüfung mit `cjs`, Prüfsummen der vier gemeinsamen Module
- Test der Erkennung mit `cjs` außerhalb von Cinnamon: Optionen aller drei Arten, Wahl von Hand, nicht vorhandener Sensor, fehlerhafte Auswahl, Auswahl im Konstruktor
- Funktionstest in Applet und Desklet durch den Nutzer, einschließlich zweier Neustarts mit von Hand gewähltem CPU-Sensor

### AP15 – Messtakt an der Systemuhr und Einstellungsfenster nur einmal

Abgeschlossen.

Dateien:

- `02_QUELLCODE/Desklet/measurement.js` und `02_QUELLCODE/Applet/measurement.js`
- `desklet.js`, `applet.js`, beide `settings-schema.json`

#### Messtakt

Bisher setzte jede Komponente ihren Zeitgeber auf „Intervall ab jetzt“. Da Applet und Desklet zu verschiedenen Zeitpunkten starten, lagen ihre Takte bis zu ein Intervall auseinander; die Anzeigen wechselten sichtbar versetzt, und die CPU-Auslastung wich ab, weil beide über verschiedene Zeitfenster rechneten.

`msBisZumNaechstenTakt()` in `measurement.js` berechnet die Zeit bis zur nächsten vollen Taktmarke der Systemuhr, also bei 3 Sekunden bis :00, :03, :06 und so weiter. Beide Komponenten setzen ihren Zeitgeber mit `Mainloop.timeout_add()` auf diese Marke und berechnen sie nach jedem Takt neu.

- Beide richten sich nach derselben Uhr und messen bei gleichem Intervall im selben Moment, ohne voneinander zu wissen. Der Grundsatz EIGENSTÄNDIG bleibt gewahrt.
- Da die Marke bei jedem Takt neu berechnet wird, summieren sich Verzögerungen nicht auf.
- Liegt die nächste Marke weniger als `TAKT_MINDESTABSTAND_MS` (200 ms) entfernt, gilt die übernächste. Ein Zeitgeber, der einige Millisekunden vor der Marke auslöst, erzeugt dadurch keinen Doppeltakt.
- Bei unterschiedlichen Intervallen treffen sich beide nur auf gemeinsamen Vielfachen. Ein Hinweis beim Aktualisierungsintervall in beiden Einstellungsfenstern weist darauf hin.
- Direkt nach einer sofortigen Aktualisierung, etwa nach Änderung der Messwertliste, kann die CPU-Auslastung für einen Takt leicht abweichen, da diese Messung ein kürzeres Zeitfenster erfasst.

Das Desklet übernimmt ein geändertes Intervall nun ebenfalls sofort (`_onRefreshIntervalChanged()`); bisher wirkte es dort erst nach dem nächsten Takt.

#### Einstellungsfenster nur einmal

Der Cinnamon-Menüeintrag „Konfigurieren …“ startet bei jedem Aufruf ein weiteres Einstellungsfenster. Beide Komponenten überschreiben deshalb `configureDesklet()` bzw. `configureApplet()`: Ist das eigene Einstellungsfenster bereits offen, wird es über `Main.activateWindow()` nach vorne geholt, bei Bedarf auf seinem Arbeitsbereich und aus dem minimierten Zustand. Sonst öffnet Cinnamon wie bisher ein neues.

Erkannt wird das Fenster an zwei Merkmalen:

- Fensterklasse `xlet-settings.py`
- Titel gleich dem Namen aus `metadata.json` („aVincePulse Applet“ bzw. „aVincePulse Desklet“); dadurch werden die Fenster beider Komponenten nicht verwechselt

Fallstrick: `Meta.Window.get_wm_class()` liefert `Xlet-settings.py` mit großem X, `xprop` zeigt beide Schreibweisen (`"xlet-settings.py", "Xlet-settings.py"`). Im ersten Anlauf wurde mit kleinem x verglichen, das Fenster nie gefunden und jedes Mal ein neues geöffnet. Verglichen wird jetzt ohne Rücksicht auf Groß- und Kleinschreibung. Bei künftigen Arbeiten mit Fenstern die Merkmale über `Meta.Window` selbst prüfen, nicht nur über `xprop`.

Werden die Übersetzungen eingeführt, bildet xlet-settings den Titel aus dem übersetzten Namen. Der Vergleich ist dann anzupassen.

Nicht beeinflussbar: Werden die Einstellungen über Systemeinstellungen → Desklets bzw. Applets → Zahnrad geöffnet, startet Cinnamon das Fenster selbst.

#### Prüfung

- Syntaxprüfung mit `cjs`, Prüfsummen der vier gemeinsamen Module
- `msBisZumNaechstenTakt()` mit Beispielzeiten durchgerechnet: zwei zu verschiedenen Zeiten gestartete Komponenten treffen dieselbe Marke; kein Doppeltakt bei vorzeitigem Auslösen; ungültiges Intervall fällt auf 3 Sekunden zurück
- Einstellungsfenster in Cinnamon selbst geprüft: über `org.Cinnamon.Eval` „Konfigurieren …“ ausgelöst und die offenen Fenster gezählt
- Funktionstest durch den Nutzer: Gleichlauf bei 3 und 5 Sekunden, Gegenprobe mit unterschiedlichen Intervallen, Gleichlauf nach mehr als 30 Minuten; Einstellungsfenster einschließlich minimiert, anderer Arbeitsbereich und Unterscheidung Applet/Desklet

### AP16 – Netzwerkschnittstelle und Laufwerk wählbar

Abgeschlossen.

Dateien:

- `02_QUELLCODE/Desklet/measurement.js` und `02_QUELLCODE/Applet/measurement.js`
- `desklet.js`, `applet.js`, beide `settings-schema.json`

Pflichtumfang für 1.0 laut Roadmap. Für DOWN/UP und für FREE ⛁ ist wählbar, was gemessen wird. Vorgabe ist „Automatisch“: die Schnittstelle der Standardverbindung bzw. die Systempartition `/`.

#### Auswahlfelder

Neuer Abschnitt „Netzwerk und Speicherplatz“ unter „Sensoren“ mit den Einstellungen `netz-schnittstelle` und `laufwerk-free`. Gefüllt werden sie wie in AP14 über `setOptions()`, beim Laden und nach „Hardware neu erkennen“.

- **Netzwerk:** alle Schnittstellen außer `lo`, mit Art (LAN, WLAN, Mobilfunk, VPN, virtuell) und Zustand (verbunden/getrennt). Virtuelle Schnittstellen werden auf Wunsch des Nutzers gekennzeichnet angeboten, da darunter auch VPN-Verbindungen fallen. VPN-Schnittstellen melden als Zustand häufig `unknown`; dann entscheiden die Flags UP und RUNNING. Gespeichert wird der Name; Namen werden vor der Verwendung in einem Pfad geprüft.
- **Laufwerke:** alle Dateisysteme aus `/proc/self/mounts` auf einem Gerät unter `/dev`, ohne `/dev/loop` und `squashfs`. Gespeichert wird die Dateisystem-UUID (`uuid:…`), damit ein USB-Stick auch an anderem Einhängeort wiedererkannt wird; ohne UUID der Kernel-Gerätename (`dev:…`). Oktal geschriebene Zeichen im Einhängeort (`\040`) werden entschlüsselt.
- **Netzlaufwerke werden bewusst nicht angeboten** (Entscheidung vom 18.09.2026): Der freie Platz wird bei jedem Takt abgefragt; ein nicht erreichbares Netzlaufwerk könnte die Oberfläche blockieren, und ein bei Bedarf eingehängtes NAS würde ständig wach gehalten.

Fehlt die gewählte Schnittstelle oder ist das gewählte Laufwerk nicht eingehängt, gilt „Automatisch“. Die Wahl bleibt gespeichert und greift wieder, sobald Schnittstelle bzw. Laufwerk zurück ist; mit einem USB-Stick geprüft. „Zurücksetzen“ stellt beide Felder auf „Automatisch“.

#### Aktive Schnittstelle ohne Programmstart

Die Standardschnittstelle wurde bisher bei jedem Takt über `ip route` ermittelt, also alle drei Sekunden mit einem eigenen Programmstart. Sie wird nun aus `/proc/net/route` gelesen: Standardroute mit Ziel und Maske 0 und gesetztem RTF_UP; bei mehreren die mit der kleinsten Metrik, wie bei `ip route`. Ergebnis auf dem Referenzgerät identisch.

#### Hardwarebericht

`MeasurementProvider.berichtText()` wird an den Bericht der Hardwareerkennung angehängt: Tabellen der Netzwerkschnittstellen und der lokal eingehängten Laufwerke, jeweils mit „Verwendet“ und der Herkunft der Auswahl.

#### Einstellungsfenster automatisch neu öffnen

Auf Vorschlag des Nutzers: Ein geöffnetes Einstellungsfenster liest neu gesetzte Optionen nicht erneut ein. Bisher musste der Nutzer es nach „Hardware neu erkennen“ selbst schließen und wieder öffnen.

Nun gilt: Sind nach der Erkennung Sensoren, Schnittstellen oder Laufwerke hinzugekommen oder weggefallen, schließt die Komponente ihr offenes Einstellungsfenster und öffnet es an derselben Bildschirmposition neu. Ohne Änderung bleibt es offen. Die Meldung nach der Erkennung sagt, ob die Auswahl aktualisiert wurde. Das Fenster der anderen Komponente bleibt unberührt. Das neue Fenster beginnt wieder oben; die Scrollposition lässt sich nicht übernehmen (vom Nutzer akzeptiert).

Umsetzung und Fallstricke, beide erst im Test des Nutzers aufgefallen:

- **Änderungserkennung:** Verglichen wird das Kennzeichen der zuletzt geschriebenen Optionen (`_geschriebeneAuswahl`, gesetzt in `_aktualisiereSensorOptionen()`) mit dem neu geschriebenen. Der erste Ansatz fragte die Auswahl unmittelbar vor und nach der Erkennung ab. Laufwerke und Schnittstellen werden aber live gelesen; ein frisch eingesteckter USB-Stick war dadurch schon im Vorher enthalten und die Änderung wurde nie erkannt. Mitangezeigte Werte wie Temperatur oder freier Platz zählen nicht mit, ebenso wenig Einträge „Nicht gefunden“.
- **Position:** Das alte Fenster wird mit `Meta.Window.delete()` geschlossen; das neue wird erst nach dessen Signal `unmanaged` geöffnet (Sicherung nach 2 Sekunden), und zwar direkt über die Cinnamon-Funktion, damit nicht das verschwindende alte Fenster nach vorne geholt wird. Die Fensterverwaltung legt die Position erst beim Anzeigen fest und überschreibt eine zu früh gesetzte. Die Position wird deshalb alle 100 ms nachgesetzt, bis sie bei drei aufeinanderfolgenden Prüfungen stimmt, höchstens fünf Sekunden lang.

Lehre für künftige Tests: Abläufe über denselben Weg auslösen, den der Nutzer geht, also über die echte Hardwareänderung und die Schaltfläche, nicht über den direkten Aufruf der inneren Funktion.

#### Prüfung

- Syntaxprüfung mit `cjs`, Prüfsummen der vier gemeinsamen Module
- `measurement.js` mit `cjs` außerhalb von Cinnamon: Optionen, Wahl, nicht vorhandene Schnittstelle, nicht eingehängtes Laufwerk, abgewiesener Pfad `../../etc`, Bericht; Standardschnittstelle identisch mit `ip route`
- Neu-Öffnen in Cinnamon über `org.Cinnamon.Eval`: gleiche Position, Fenster der anderen Komponente unberührt, kein Neu-Öffnen ohne Änderung
- Funktionstest durch den Nutzer in Applet und Desklet, einschließlich USB-Stick einstecken und abziehen

### AP17 – Kein Neu-Öffnen ohne Rückfrage, Meldungen und Umlaute

Abgeschlossen.

Dateien:

- `desklet.js`, `applet.js`, beide `settings-schema.json`
- gemeinsame Module `speedtest.js`, `hardwareDetection.js`, `measurement.js` (Meldungsfläche, Berichtstexte)

#### Anlass

Seit AP16 schloss und öffnete sich das Einstellungsfenster nach „Hardware neu erkennen“ bei geänderter Hardware ohne vorherigen Hinweis. Der Nutzer hat dazu eine dauerhafte Regel festgelegt (siehe Abschnitt 8, „Fenster“).

#### Hinweis und Rückfrage

- Unter „Hardware neu erkennen“ steht ein dauerhafter Hinweis (`hinweis-hardware-neu`), dass bei geänderter Hardware eine Rückfrage kommt.
- Findet die Erkennung eine Änderung und ist das Einstellungsfenster der Komponente offen, erscheint eine Rückfrage (`ModalDialog` aus `imports.ui.modalDialog`, Inhalt über `Dialog.MessageDialogContent`) mit „Nicht jetzt“ und „Jetzt neu öffnen“; Esc wirkt wie „Nicht jetzt“. Bis zur Antwort bleibt das Fenster unverändert.
- Ohne Änderung oder bei geschlossenem Fenster gibt es keine Rückfrage.
- Die Rückfrage betrifft nur die auslösende Komponente.
- Die Antwort wird erst ausgeführt, wenn der Dialog vollständig ausgeblendet ist (Signal `closed`). Zuvor lagen Rückfrage und Ergebnismeldung kurz übereinander und waren beide nicht lesbar; durch Aufzeichnung der sichtbaren Flächen im 20-ms-Takt belegt.

Entscheidungen des Nutzers vom 18.09.2026: Hinweis vorher und Rückfrage (Vorschläge A und B), keine Einstellung zum Abschalten (C verworfen). Meldungen in der Bildschirmmitte sind von der Fensterregel ausgenommen.

#### Meldungsfläche (`StatusAnzeige` in `speedtest.js`)

- **Anzeigedauer nach Textlänge:** `verbergeNachLesezeit()` blendet nach 1 Sekunde plus 0,2 Sekunden je Wort aus, mindestens 2,5 und höchstens 10 Sekunden. Kurze Hinweise wie „Einstellungen auf Standardwerte zurückgesetzt“ verschwinden nach 2,5 statt 5 Sekunden, lange bleiben 10 Sekunden. Fehlermeldungen behalten feste 8 Sekunden über `verbergeNach()`.
- **Abgeschnittene Meldung behoben:** Die Fläche wurde wiederverwendet und behielt die Größe eines vorherigen kurzen Textes; die neunzeilige Ergebnismeldung zeigte beim ersten Mal nur ihre erste Zeile (gemessen: 77 statt 367 Pixel Höhe). Die Fläche wird nun für jede Meldung neu angelegt. Der Fehler bestand seit AP12 und wurde durch AP17 erstmals sichtbar.
- **Kein Aufblitzen oben links:** Eine neu angelegte Fläche steht zunächst bei 0,0 und wird erst mittig gesetzt, sobald ihre Größe feststeht. Sie bleibt bis dahin unsichtbar (Deckkraft 0).
- **Meldung „Hardware wird neu erkannt …“ entfernt:** Sie war seit AP12 vorgesehen, aber nie sichtbar, da die Erkennung rund 115 ms dauert und ohne Pause danach läuft (gemessen). Sichtbar gemacht wäre sie nur ein Aufblitzen.
- Leerzeile vor dem abschließenden Satz der Ergebnismeldung, auf Wunsch des Nutzers.

#### Umlaute

Auf Wunsch des Nutzers verwenden alle sichtbaren deutschen Texte Umlaute und ß: Meldungen, Rückfrage, Einstellungen, Hardwarebericht und Kopf der Datei `speedtest-values`. Umgestellt wurden die Ergebnismeldung der Hardwareerkennung sowie Hardwarebericht und Dateikopf; Einstellungen, Menü und Rückfrage waren bereits richtig. Unterstreichungen im Bericht wurden an die kürzeren Wörter angepasst. Code-Kommentare und Protokollzeilen bleiben bewusst in der Umschreibung (Entscheidung des Nutzers), da sie nicht sichtbar sind.

#### Befunde

- **Tooltips an Schaltflächen werden nie angezeigt:** `XLETSettingsButton` in `/usr/share/cinnamon/cinnamon-settings/xlet-settings.py` übernimmt nur Beschriftung und Rückruf, nicht `tooltip`. Die seit AP11 hinterlegten Tooltips an den Schaltflächen für Speedtest, Berichte und Hardware bleiben daher unsichtbar. Hinweise für Schaltflächen gehören in ein `label` darunter. Die vorhandenen Tooltips schaden nicht und wurden nicht entfernt.
- **Lüfter „0 rpm“:** Der Dell-Lüfter steht bei niedriger Temperatur still (bei 57 °C 0 U/min, bei 64 °C 5641 U/min; mit `sensors` bestätigt). Kein Fehler.

#### Lehren für Tests

- Nicht nur den Inhalt einer Anzeige prüfen, sondern ihre sichtbare Größe und Position: Der Text der abgeschnittenen Meldung war vollständig vorhanden.
- Kurzlebige Überlagerungen lassen sich über eine Aufzeichnung der sichtbaren Flächen in `Main.uiGroup` im 20-ms-Takt nachweisen (über `org.Cinnamon.Eval`).
- Nach Änderungen an gemeinsamen Modulen ist ein Cinnamon-Neustart nötig; Berichte, die vorher entstanden sind, zeigen noch den alten Stand.

#### Prüfung

- Syntaxprüfung mit `cjs`, Prüfsummen der vier gemeinsamen Module
- Ablauf in Cinnamon über `org.Cinnamon.Eval`: Rückfrage mit und ohne Änderung, bei offenem und geschlossenem Fenster, beide Antworten, nur auslösende Komponente; Höhe der Meldungsfläche beim ersten und zweiten Durchlauf; Aufzeichnung der sichtbaren Flächen
- Suchlauf über alle sichtbaren Texte auf verbliebene Umschreibungen; Probebericht mit `cjs`
- Funktionstest durch den Nutzer in Applet und Desklet mit USB-Stick, einschließlich Esc, Anzeigedauer und Umlauten in neu erzeugten Berichten

### AP18 – Warnschwellen mit Farbwechsel

Abgeschlossen.

Dateien:

- gemeinsame Module `metrics.js` (Schwellen, Bewertung) und `measurement.js` (freier Platz in Prozent)
- `desklet.js`, `applet.js`, beide `settings-schema.json`, `Desklet/stylesheet.css`

#### Funktion

Ein Messwert färbt Wert und Einheit orange (Warnung, `#FFA726`) bzw. rot (kritisch, `#FF5252`), sobald er eine Schwelle erreicht. Die Beschriftung bleibt weiß.

| Messwert | Warnung | Kritisch | Richtung |
|---|---|---|---|
| CPU-Temperatur | 80 °C | 90 °C | ab Schwelle |
| Speicher-Temperatur | 70 °C | 80 °C | ab Schwelle |
| CPU-Auslastung | 85 % | 95 % | ab Schwelle |
| RAM-Auslastung | 85 % | 95 % | ab Schwelle |
| Freier Speicherplatz | 10 % | 5 % | unter Schwelle, in Prozent des gewählten Laufwerks |
| Akku-Ladezustand | 20 % | 10 % | unter Schwelle, nur im Akkubetrieb |

Begründung der Vorgaben: Die Referenz-CPU meldet kritisch bei 100 °C (`coretemp temp1_crit`), die Referenz-SSD Warnung bei 89 und kritisch bei 94 °C (`nvme temp1_max`, `temp1_crit`). Die SSD-Vorgabe lag zunächst bei 60/70 °C und wurde auf 70/80 °C angehoben, da NVMe-SSDs beim Kopieren großer Dateien leicht 60–70 °C erreichen. Der Speicherplatz wird in Prozent bewertet, weil Laufwerke sehr verschieden groß sind; dafür liefert `readStorageFreeAnteil()` den Anteil aus `filesystem::free` und `filesystem::size`.

Lüfter, Netzwerk und Speedtest erhalten keine Schwellen.

#### Bewertung (`metrics.js`)

- `WARNSCHWELLEN`: Vorgaben und Richtung („hoch“, „tief“) je Messwert
- `bewerteStufe()`: „normal“, „warnung“ oder „kritisch“. Puffer gegen Flackern (`WARN_PUFFER = 2`): Eine erreichte Stufe gilt weiter, bis der Wert die Schwelle um 2 wieder verlassen hat. Nicht auswertbare Werte wie `--` gelten als normal.
- `ordneWarnschwellen()`: bereinigt die eingestellte Liste. Unbekannte, beschädigte und doppelte Einträge werden verworfen, fehlende erhalten die Vorgabe; vertauschte Eingaben werden so geordnet, dass die strengere Schwelle als kritisch gilt.

Die Komponenten bewerten bei jedem Takt und setzen den Stil nur bei einem Stufenwechsel neu. Der Grundstil von Wert und Einheit wird in `wertStil`/`einheitStil` gehalten; die Farbe wird angehängt und hat damit Vorrang, auch vor dem `color: white` im Stil der Hover-Anzeige. Beim Neuaufbau und bei Größenänderungen bleibt die Farbe erhalten.

#### Einstellungen

Abschnitt „Warnschwellen“ je Komponente (getrennt, Entscheidung vom 18.09.2026): Schalter „Warnfarben anzeigen“, Hinweistext und Liste mit Messwert, Warnung, Kritisch, Aktiv. Hinweistext und Liste hängen über `dependency` am Schalter und klappen bei ausgeschaltetem Schalter ein. In der Liste sind Hinzufügen, Entfernen und die Pfeile ausgeblendet, da die Reihenfolge dort keine Wirkung hat (Wunsch des Nutzers); bearbeitet wird über Doppelklick oder Stift. „Zurücksetzen“ stellt Schalter und Vorgaben wieder her.

#### Fehlende Zeilen ergänzen

Fehlt in einer gespeicherten Liste eine Zeile, wurde der Messwert zwar mit der Vorgabe angezeigt bzw. bewertet, erschien aber nicht in der Liste und war nicht einstellbar. `_vervollstaendigeListen()` ergänzt beim Start fehlende Messwerte mit ihrer Vorgabe am Ende, für Messwertliste und Warnschwellen. Vorhandene Einträge bleiben unverändert. Das greift auch, wenn ein Update neue Messwerte bringt. Gespeicherte Werte werden nie durch geänderte Vorgaben überschrieben; neue Vorgaben gelten nach „Zurücksetzen“.

#### Lesbarkeit im Desklet

Das Desklet hatte weiße Schrift ohne Schatten und Hintergrund; auf hellem Hintergrundbild waren Schrift und Warnfarben schlecht lesbar. `stylesheet.css` gibt Beschriftung, Wert und Einheit nun `text-shadow: 0px 0px 6px rgba(0,0,0,0.9)` (Entscheidung vom 18.09.2026). Auf hellem Hintergrund noch praktisch zu prüfen.

Ein zusätzliches Zeichen für Farbenblinde wurde vorerst nicht umgesetzt (Entscheidung vom 18.09.2026).

#### Fehler während der Umsetzung

- **Applet stürzte beim Laden ab:** Die Bewertung verwendete die Namen `cpu` und `ssd` aus dem Desklet; im Applet heißen die Werte `hardware.cpu` und `hardware.ssd`. Die Syntaxprüfung mit `cjs` erkennt undefinierte Namen nicht. Regel seit AP18: Vor jeder Installation prüfen, dass alle neu verwendeten Namen in der jeweiligen Datei definiert oder importiert sind.
- **Testwerte in den Einstellungen des Nutzers:** Beim Selbsttest wurden gebundene Eigenschaften (`warnListe`, `warnAktiv`) direkt gesetzt. Cinnamon speichert solche Zuweisungen sofort in die Einstellungsdatei; die Testschwellen erschienen danach in den Einstellungen. Behoben durch „Zurücksetzen“. Regel seit AP18: Gebundene Werte im Test nicht direkt setzen; wenn nötig, Einstellungsdatei vorher sichern und danach die gespeicherten Werte vergleichen. Ein Vergleich der Prüfsumme der ganzen Datei ist ungeeignet, da beim Laden die Auswahlfelder mit aktuellen Messwerten neu geschrieben werden.

#### Prüfung

- Syntaxprüfung mit `cjs`, Prüfsummen der vier gemeinsamen Module, Namensprüfung
- Bewertung mit `cjs`: Folgen für Temperatur, pendelnde Auslastung, Speicherplatz, Akku ohne Wert, vertauschte und beschädigte Listen
- In Cinnamon: Einfärbung in beiden Komponenten, Schalter aus, Aktiv aus, Akku im Netzbetrieb, Schriftschatten gemessen; Ergänzen fehlender Zeilen mit Sicherung und Vergleich der gespeicherten Werte
- Funktionstest durch den Nutzer in Applet und Desklet, einschließlich Akku im Akkubetrieb

## 7. Aktuelle Quellcode-Architektur des Desklets

Wesentliche Dateien:

- `desklet.js` – UI, Refresh, Darstellung, Popup-Handoff; baut die Anzeigezeilen aus `METRIC_ORDER` auf
- `metrics.js` – Messwertmodell und Reihenfolge
- `measurement.js` – Messlogik und Laufzeitwerte
- `hardwareDetection.js` – dynamische Hardware-/Sensorerkennung, Akku- und Netzteilerkennung, Verfügbarkeitsmeldung
- `speedtest.js` – Ausführung, Ablage und Rückmeldung des Internet-Speedtests
- `settings-schema.json` – Einstellungen
- `stylesheet.css` – Darstellung
- `metadata.json` – Cinnamon-Metadaten

Verantwortlichkeiten sollen sauber getrennt bleiben. Neue Funktionen nicht wieder direkt in `desklet.js` bündeln, wenn sie logisch in Messung, Hardwareerkennung oder ein eigenes Modul gehören.

Das Applet enthält dieselben Module zusätzlich als Kopie:

- `applet.js` – Panel-Symbol, Hover-Anzeige, Speedtest
- `metrics.js`, `measurement.js`, `hardwareDetection.js`, `speedtest.js` – identisch mit dem Desklet
- `icon.png`, `panel-icon.png`, `panel-icon-symbolic.png`

Änderungen an den vier gemeinsamen Modulen sind stets in beide Verzeichnisse zu übernehmen und anschließend per Prüfsumme zu kontrollieren.

## 7a. Grafiken und Logo

Die C-1-Designrichtung ist in `01_PROJEKT_ROADMAP/ROADMAP_V2.md`, Abschnitt 15,
festgelegt.

Im Repository liegt dazu:

`03_GRAFIK_ICONS/01_V_SIGNAL_ICONSET/`

- `00_Referenz/` – originales Referenzlogo
- `01_PNG_Iconset/` – PNG-Größen 16, 22, 24, 32, 48, 64, 96, 128, 192, 256, 512, 1024
- `02_Varianten/` – Entwurfsvarianten auf Basis des V-Signal-Logos

Diese Dateien sind Entwurfs- und Referenzmaterial. Laut Roadmap soll daraus vor
einer Veröffentlichung ein technisch sauberes, eigenständiges Vektorlogo (SVG)
erstellt und auf Lesbarkeit bei 16, 20, 24, 32 und 64 Pixel geprüft werden.

Eine Lizenz- und Rechteprüfung der Grafiken steht noch aus.

Seit AP08 verwendet das Applet als Panel-Symbol das C-1-Logo aus `03_Panel/`
(`panel-icon.png`, `panel-icon-symbolic.png`), seit AP09 wählbar in vier Varianten.
Das frühere Unicode-Zeichen `⚡` wird nicht mehr verwendet.

## 8. Technische Regeln

### Cinnamon / GJS

Das Projekt läuft im Cinnamon-/GJS-Umfeld.

Module werden über die Cinnamon-Desklet-Struktur importiert. Beispielprinzip:

`imports.desklets['avincepulse-desklet@avince']...`

Änderungen an importierten GJS-Modulen können von Cinnamon zwischengespeichert werden. Ein bloßes Entfernen und erneutes Hinzufügen des Desklets reicht daher nicht immer aus. Unter X11 kann ein Cinnamon-Neustart über `Alt+F2`, anschließend `r`, für einen vollständigen Reload notwendig sein.

Es wurde bewusst keine zusätzliche Node.js- oder separate GJS-Testlaufzeit nur für Entwicklungsprüfungen installiert.

Auf dem Referenzsystem ist jedoch die Cinnamon-eigene JavaScript-Laufzeit `cjs` vorhanden (`/usr/bin/cjs`). Sie eignet sich für reine Syntaxprüfungen, ohne das Desklet zu starten und ohne zusätzliche Installation. Dazu wird der Dateiinhalt in eine nicht aufgerufene Funktion eingeschlossen, damit er vollständig geparst, aber nicht ausgeführt wird:

```bash
{ echo "(function(){"; cat desklet.js; echo "});"; } > /tmp/syntaxcheck.js
cjs /tmp/syntaxcheck.js && echo "SYNTAX OK"
```

Diese Prüfung ersetzt keinen Funktionstest im laufenden Cinnamon.

### Fenster

Festgelegt vom Nutzer am 18.09.2026: aVincePulse öffnet oder schließt Fenster nur nach einer Benutzeraktion und nur mit vorherigem Hinweis bzw. Rückfrage. Meldungen in der Bildschirmmitte (`StatusAnzeige`) sind davon ausgenommen. Die Regel gilt auch für künftige Funktionen, etwa den zeitgesteuerten Speedtest oder Benachrichtigungen.

### Sichtbare Texte

Sichtbare deutsche Texte verwenden Umlaute und ß (Meldungen, Dialoge, Einstellungen, Berichte, Dateiköpfe). Code-Kommentare und Protokollzeilen bleiben in der Umschreibung (ae, oe, ue, ss). Festgelegt vom Nutzer am 18.09.2026.

### Symbole in der Anzeige

Emoji dürfen nicht als Anzeigesymbole verwendet werden. Zeichen wie `🔋` oder `⚡` besitzen laut Unicode-Standard eine Emoji-Voreinstellung und werden von Cinnamon farbig aus `Noto Color Emoji` gerendert, auch wenn `fc-match` eine einfarbige Schrift meldet. Das wurde am Referenzsystem bestätigt.

Verwendet werden dürfen nur Zeichen aus den geometrischen Unicode-Blöcken, die in der Standardschrift enthalten sind, zum Beispiel `⛁`, `▤`, `↓` oder `↑`.

Vor der Verwendung eines neuen Zeichens ist zu prüfen, aus welcher Schrift es stammt:

```bash
fc-list ":charset=26C1" family
```

### Spaltenbreiten

Spaltenbreiten werden nicht fest vorgegeben, sondern in `_berechneSpaltenbreiten()` aus der Schriftgröße und den tatsächlich angezeigten Beschriftungen berechnet (seit AP10, in beiden Komponenten). Die früheren festen Breiten 70/58/50 px aus der Baseline sind entfernt. In AP19 bei Schriftgröße 10, 14 und 30 geprüft: nichts abgeschnitten.

### Hardwareerkennung

- keine Abhängigkeit von festen `hwmonN`-Pfaden
- keine ausschließliche Ausrichtung auf den Latitude-5285
- Sensoren nach Chip, Label und geeigneten Merkmalen bewerten
- fehlende Sensoren dürfen keinen Programmfehler verursachen
- normale Nutzung möglichst ohne Root-Rechte

### Applet und Desklet

Langfristig gilt weiterhin:

**EIGENSTÄNDIG + KOOPERATIV**

Keine Architektur einführen, bei der eine Komponente zwingend die andere benötigt, sofern dies nicht ausdrücklich neu beschlossen und dokumentiert wird.

## 9. Entwicklungsworkflow

Die aktive Entwicklungsbasis auf der NAS befindet sich unter:

`/mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Development`

Der Git-Root liegt genau auf dieser Ebene.

Normaler Workflow:

1. Projektstatus prüfen
2. Änderungen durchführen
3. lokal testen
4. `git status`
5. `git add ...`
6. sinnvoller Commit
7. `git push`
8. nach abgeschlossenem Arbeitspaket passenden AP-END-Tag setzen und pushen

Beispiel:

```bash
git status
git add .
git commit -m "AP06: Beschreibung"
git push
git tag -a 0.1.0-dev_AP06-END -m "aVincePulse 0.1.0-dev - AP06 completed"
git push origin 0.1.0-dev_AP06-END
```

Vor größeren oder riskanten Änderungen soll zusätzlich ein NAS-Snapshot erhalten bleiben.

### Sicherung nach jedem Arbeitspaket

Festgelegt am 17.09.2026. Nach jedem abgeschlossenen und geprüften Arbeitspaket erfolgt ohne weitere Rückfrage:

0. Versionsnummer in `02_QUELLCODE/Applet/metadata.json` und `02_QUELLCODE/Desklet/metadata.json` auf `0.1.0-dev.xx` setzen (xx = Nummer des Arbeitspakets) und in beide Testinstallationen übertragen. Festgelegt am 18.09.2026, erstmals mit AP19; bis AP18 stand dort unverändert `0.1.0-dev`. Das Info-Fenster von Applet und Desklet zeigt dadurch, welcher Stand installiert ist.
1. Snapshot unter `06_TESTVERSIONEN/0.1.0-dev_APxx-END/`
2. Fortschreibung dieses Dokuments
3. Commit und Push auf `main`
4. Tag `0.1.0-dev_APxx-END` setzen und pushen
5. Vollbackup auf der NAS unter `aVincePulse_Backups/<Zeitstempel>/` mit `tar.gz`, Git-Bundle, `SHA256SUMS.txt` und `BACKUP-INFO.txt`
6. Wiederherstellungsprobe: Prüfsummen vergleichen, Bundle in ein temporäres Verzeichnis klonen, Quellcode gegen das Original vergleichen
7. GitHub-Release zum Tag anlegen

### Arbeitsregeln für Tests

Aus AP16 bis AP18 abgeleitet, verbindlich:

- **Namensprüfung vor jeder Installation:** Alle neu verwendeten Namen müssen in der jeweiligen Datei definiert oder importiert sein. Die Syntaxprüfung mit `cjs` erkennt undefinierte Namen nicht (AP18: Applet-Absturz).
- **Gebundene Einstellungen im Test nicht direkt setzen:** Cinnamon speichert Zuweisungen an gebundene Eigenschaften sofort in die Einstellungsdatei (AP18). Wenn ein Test Einstellungen verändern muss: Datei vorher sichern, danach wiederherstellen und die gespeicherten Werte (`value`) vergleichen. Die Prüfsumme der ganzen Datei ist ungeeignet, da beim Laden die Auswahlfelder mit aktuellen Messwerten neu geschrieben werden.
- **Abläufe über denselben Weg auslösen wie der Nutzer:** über die Schaltfläche und eine echte bzw. realistisch nachgestellte Änderung, nicht durch direkten Aufruf innerer Funktionen (AP16).
- **Sichtbares messen, nicht nur Inhalte:** Größe, Position und Deckkraft einer Anzeige prüfen; kurzlebige Überlagerungen durch Aufzeichnung der sichtbaren Flächen in `Main.uiGroup` (AP17).
- **Nach Änderungen an gemeinsamen Modulen oder am Stylesheet** ist ein Cinnamon-Neustart nötig (`Alt+F2`, `r`); das Neuladen einer Komponente über `ReloadExtension` genügt nur für `desklet.js`/`applet.js` und die Schemata. Den Neustart löst der Nutzer aus.
- **Sichern direkt vor dem Eingriff** (AP19): Eine Sicherung, die vor weiteren Tests angelegt wurde, kann beim Zurückspielen neuere Stände überschreiben (so geschehen mit `speedtest-values`).
- **Messschleife von außen zählen** (AP19): Jeder Durchlauf von Applet und Desklet liest `~/.local/share/avincepulse/speedtest-values` einmal, das Desklet schreibt zusätzlich `/tmp/avince-hwmonitor-values`. Beides lässt sich per inotify zählen, ohne in Cinnamon einzugreifen (Skripte in `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/langzeit/`). Soll bei gleichem Intervall: je Taktmarke ein Durchlauf je Komponente. Entfällt das Schreiben der `/tmp`-Datei (Befund M3), ist die Zählung anzupassen.
- **Kurzlebige Anzeigen** (AP19): Wiederholte lesende `Eval`-Abfragen aus Python erreichen etwa 300 Abfragen je Sekunde und erfassen auch Ein- und Ausblendvorgänge. Neben `Main.uiGroup` auch die Fenster (`global.get_window_actors()`) mit aufzeichnen; ein durchscheinendes Fenster hinter einer halbtransparenten Meldung wirkt für den Nutzer wie „anderer Text in der Meldung“ (H15).
- **Werkzeuge:** `org.Cinnamon.Eval` für Zugriff auf laufende Komponenten, **aus Python über `Gio.DBusConnection.call_sync`** statt über `gdbus call`: `gdbus` wertet den übergebenen Text als GVariant aus und zerlegt Code mit einfachen Anführungszeichen oder `\n` (AP19). Der Cinnamon-Neustart über `Alt+F2`, `r` behält unter X11 die Prozessnummer bei; der Neustart ist am Protokoll („About to start Cinnamon“) oder an den Komponenten zu erkennen, nicht an der PID. `pkill -f` mit einem Muster, das in der eigenen Befehlszeile vorkommt, beendet die eigene Shell; Applet-Instanz über `imports.ui.appletManager.getRunningInstancesForUuid(uuid)[0]`, Desklet-Instanz über `imports.ui.main.deskletContainer.actor.get_children().map(a => a._delegate)`. `grep` ist auf dem Referenzsystem durch `ugrep` ersetzt; für verwickelte Suchmuster Python verwenden.

### Neustart des Referenzgeräts

Vor einem Neustart die Claude-App über ihr Leistensymbol beenden (Rechtsklick → „Beenden“); das Schließen des Fensters genügt nicht. Das Projektverzeichnis liegt auf dem NAS-Laufwerk `/mnt/LX-NAS-linux`. Läuft die App noch, kann es beim Herunterfahren nicht ausgehängt werden; das System schaltet dann das WLAN ab und bleibt stehen. Am 18.09.2026 zweimal aufgetreten und durch Beenden der App bestätigt behoben.

Für Schritt 7 wird die GitHub-CLI `gh` verwendet. Sie ist auf dem Referenzsystem eingerichtet; der Zugangstoken liegt im System-Schlüsselbund und ist auf das Repository `aVincePulse` mit den Rechten `Contents: Read and write` und `Metadata: Read-only` beschränkt.

## 10. Sicherungskonzept

Abschlussbackups nach AP05:

`/mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Backups/2026-09-16_14-50-08/`

- `aVincePulse_Development_AP05_COMPLETE.tar.gz`
- `aVincePulse_Git_AP05.bundle`
- `SHA256SUMS.txt`

`/mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Backups/2026-09-16_14-59-24/` (maßgebliches finales AP05-Backup)

- `aVincePulse_Development_AP05_FINAL.tar.gz`
- `aVincePulse_Git_AP05_FINAL.bundle`
- `SHA256SUMS.txt`

Abschlussbackup nach AP07 (maßgeblicher aktueller Sicherungsstand):

`/mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Backups/2026-09-17_00-22-37/`

- `aVincePulse_Development_AP07_FINAL.tar.gz` – vollständiges Entwicklungsprojekt einschließlich `.git` und `06_TESTVERSIONEN/`
- `aVincePulse_Git_AP07_FINAL.bundle` – komplette Git-Historie mit allen Branches und Tags
- `SHA256SUMS.txt`
- `BACKUP-INFO.txt` – Commit, Tag und Zeitpunkt der Sicherung

### Aktueller Sicherungsstand

Nach jedem abgeschlossenen Arbeitspaket entsteht ein Vollbackup unter:

`/mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Backups/<Zeitstempel>/`

Das jeweils jüngste Verzeichnis ist der maßgebliche Stand. Welchem Arbeitspaket und welchem Commit es entspricht, steht in der enthaltenen `BACKUP-INFO.txt`; diese Datei wird hier bewusst nicht dupliziert, damit die Angaben nicht auseinanderlaufen.

Jedes Backup enthält:

- `aVincePulse_Development_<AP>_FINAL.tar.gz` – vollständiges Entwicklungsprojekt einschließlich `.git` und `06_TESTVERSIONEN/`
- `aVincePulse_Git_<AP>_FINAL.bundle` – komplette Git-Historie mit allen Branches und Tags
- `SHA256SUMS.txt`
- `BACKUP-INFO.txt` – Arbeitspaket, Commit, Zeitpunkt und Anleitung zur Wiederherstellung

Letztes Backup zum Zeitpunkt dieser Fortschreibung: `2026-09-18_21-31-48` (AP18).

Jedes Backup wird nach dem Anlegen überprüft: Prüfsummen vergleichen, das Bundle in ein temporäres Verzeichnis klonen und den Quellcode gegen das Original vergleichen. Ein Backup gilt erst nach bestandener Probe als gültig.

### Verhältnis von NAS-Sicherung und GitHub

Beide Wege sichern unterschiedliche Dinge und ersetzen einander nicht.

GitHub enthält den vollständigen versionierten Projektstand mit Historie und Tags. Über einen Tag lässt sich jeder Entwicklungsstand als Archiv abrufen, ohne dass dafür ein Release angelegt werden muss:

`https://github.com/aVince-Industrietechnik/aVincePulse/archive/refs/tags/<TAG>.tar.gz`

Nicht in GitHub enthalten sind die per `.gitignore` ausgeschlossenen Inhalte, insbesondere `06_TESTVERSIONEN/` mit den manuellen AP-Snapshots sowie die lokalen Git-Metadaten-Sicherungen. Diese liegen ausschließlich auf der NAS.

Die NAS-Sicherung ist zudem unabhängig von der Erreichbarkeit und vom Fortbestand des GitHub-Kontos.

Die SHA-256-Prüfung des Bundles und des vollständigen Entwicklungsarchivs war erfolgreich.

## 11. GitHub-Regeln

GitHub ist die gemeinsame, modellunabhängige Entwicklungsbasis für versionierte Projektinhalte.

Nicht in GitHub gehören insbesondere:

- private SSH-Schlüssel
- Zugangsdaten
- Passwörter
- lokale temporäre Laufzeitdateien
- alte `.bak*`-Dateien
- komplette lokale AP-Snapshot-Verzeichnisse unter `06_TESTVERSIONEN/`
- lokale Git-Metadaten-Backups

Die `.gitignore` ist entsprechend eingerichtet.

## 12. Lokale Testinstallation

Aktive Cinnamon-Testinstallationen:

- Desklet: `~/.local/share/cinnamon/desklets/avincepulse-desklet@avince`
- Applet: `~/.local/share/cinnamon/applets/avincepulse-applet@avince`

Einstellungen: `~/.config/cinnamon/spices/<uuid>/<uuid>.json` (je Komponente eine Datei, `max-instances` 1).

Die installierte Testkopie ist nicht automatisch identisch mit dem Git-Repository. Vor Tests bewusst prüfen, welche Dateien installiert bzw. synchronisiert wurden:

```bash
diff -rq -x '*.bak*' 02_QUELLCODE/Applet ~/.local/share/cinnamon/applets/avincepulse-applet@avince
diff -rq -x '*.bak*' 02_QUELLCODE/Desklet ~/.local/share/cinnamon/desklets/avincepulse-desklet@avince
```

Ebenfalls installiert, aber nicht aktiv: die Altstände `avince-hwpopup@angelo` (Applet) und `avince-hwmonitor@angelo` (Desklet). Deren Einstellungsordner enthält noch eine alte `speedtest-values`, auf die aVincePulse bei beschädigter neuer Datei zurückgreift (Befund G10 aus AP19).

## 13. Roadmap und Funktionsumfang

Die maßgebliche Projektplanung steht in:

- `01_PROJEKT_ROADMAP/ROADMAP_V2.md`

Dort sind unter anderem festgelegt:

- Hardware- und Netzwerkmonitoring
- automatische Hardware- und Sensorerkennung
- Applet + Desklet
- konfigurierbare Darstellung
- Deutsch und Englisch
- Speedtest
- spätere Cinnamon-Spices-Veröffentlichung
- Lizenz- und Rechteprüfung
- optionales Logging/CSV-Konzept
- C-1-Designrichtung für das aVincePulse-Logo

Bei Widersprüchen zwischen älteren Zwischenständen und der neueren Roadmap soll die aktuellere dokumentierte Entscheidung bevorzugt und ein Konflikt ausdrücklich kenntlich gemacht werden.

## 14. Nächster Entwicklungsstand

AP01 bis AP18 sind abgeschlossen.

Die Reihenfolge der nächsten Arbeitspakete ist in `ROADMAP_V2.md`, Abschnitt 24, festgelegt (18.09.2026).

**AP19 – Zwischenprüfung: Phase 1 abgeschlossen (19.09.2026), Phase 2 wartet auf Freigabe je Befund.**

Stand Phase 1:

- Snapshot `06_TESTVERSIONEN/0.1.0-dev_AP19-START/` angelegt (18.09.2026).
- Prüfbericht `05_DOKUMENTATION/PRUEFBERICHT_AP19.md`: Code-Durchsicht (Claude und unabhängiger Prüfer, Befunde nachgeprüft), Langzeittest über Nacht (18./19.09.), Funktionstest Applet A1–A13 und Desklet D1–D10, Robustheit R1–R6, Wertevergleich der Einstellungen (identisch).
- Prüfdaten, Sicherungen und Testprotokolle lokal unter `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/` (nicht versioniert).
- Wichtigster Befund **K1 (kritisch):** Nach jedem Speedtest läuft die Messschleife zusätzlich einmal mehr; im Applet werden LOAD, DOWN und UP dadurch falsch (einschließlich Fehlalarmen der Warnfarben), im Desklet laufen die zusätzlichen Schleifen nach dem Entfernen weiter und füllen das Sitzungsprotokoll (etwa 20 MB/h) bis zum Cinnamon-Neustart.
- Übrige Befunde: M1–M3 (mittel), G1–G10 (gering, G9 mittel), H1–H15 (Hinweise); Übersicht in Abschnitt 2 des Prüfberichts.

Entscheidung des Nutzers vom 19.09.2026 zu Befund G9 (Warnfarben im Desklet auf hellem Hintergrund schlecht lesbar): eigenes Arbeitspaket **AP20 – Lesbarkeit**, eingeschoben vor der Übersetzung:

- Einstellung „Hintergrundfläche“ (Deckkraft 0–85 %) in Desklet **und** Applet.
- Ab 45 %: Fläche, normaler Schatten, normale Warnfarben. Unter 45 % automatisch kräftigerer Schatten und angepasste Warnfarben, ohne eigenen Schalter.
- Für das Applet wird damit die Festlegung aus AP09 („Deckkraft nicht unter 45 %“) bewusst aufgehoben.
- Schatten und Farben werden zuerst auf hellem und dunklem Hintergrund praktisch erprobt; der Nutzer wählt nach Augenschein.
- Ziel und Akzeptanzkriterien werden nach Abschluss von AP19 schriftlich festgelegt.

Entscheidung des Nutzers vom 19.09.2026 im Anschluss an Befund H14 (Speedtest im Applet nur noch über das Rechtsklick-Menü): eigenes Arbeitspaket **AP21 – Aktion bei Linksklick**, direkt nach AP20 und vor der Übersetzung. Einstellung im Applet mit „Anzeige ein/aus“ (Vorgabe; Hover-Anzeige bleibt stehen, schließen per Klick, Klick daneben oder `Esc`), „Systemüberwachung öffnen“ und „Nichts“. Begründung der Vorgabe: Der Latitude-5285 ist ein 2-in-1 mit Touchscreen, ohne Maus war die Anzeige bisher nicht erreichbar. Einzelheiten in `ROADMAP_V2.md`, Abschnitt 24.

Ursprüngliche Festlegung von AP19 (18.09.2026):

Ziel: Applet und Desklet vor der Übersetzung vollständig prüfen. Zwei Phasen:

- **Phase 1 – Prüfen, ohne Codeänderung.** Ergebnis ist der Prüfbericht `05_DOKUMENTATION/PRUEFBERICHT_AP19.md` (versioniert). Jeder Befund mit Ort (Datei, Zeile), Beschreibung, Schwere (kritisch / mittel / gering / Hinweis), Nachweis (durch Dateien belegt / durch Test belegt / abgeleitet / muss praktisch getestet werden) und Vorschlag.
- **Phase 2 – Beheben nach Freigabe je Befund.** Kleine Korrekturen in AP19, größere als eigenes Arbeitspaket vorschlagen.

Umfang Phase 1:

1. Code-Durchsicht aller Dateien beider Komponenten, zusätzlich durch einen unabhängigen Prüfer (Unteragent ohne Kenntnis der bisherigen Annahmen; vom Nutzer freigegeben). Schwerpunkte: Fehler nur in einer Komponente, undefinierte Namen, nicht aufgeräumte Zeitgeber, Fehlerbehandlung, tote Stellen, Unterschiede Applet/Desklet.
2. Funktionstest jeder Einstellung und Schaltfläche in beiden Komponenten, mit Ergebnisliste.
3. Robustheit: beschädigte/unvollständige Listen in der Einstellungsdatei; fehlender Sensor, fehlende Schnittstelle, fehlendes Laufwerk; fehlendes Speedtest-Programm (nachgestellt); beschädigte `speedtest-values`; Entfernen und Wiederhinzufügen von Applet/Desklet (keine zurückbleibenden Zeitgeber, Meldungen, Dialoge). Jeweils mit Sicherung der Einstellungen und Wertevergleich.
4. Langzeittest **über Nacht** (Entscheidung des Nutzers): Speicher und CPU-Zeit von Cinnamon, Messschleife je Komponente nur einmal pro Takt. Der Rechner bleibt eingeschaltet, die Sitzung läuft.
5. Dokumentation: veraltete Stellen in diesem Dokument korrigieren (siehe „Weitere bekannte offene Punkte“). Aufräumvorschläge (`.bak`-Dateien in `02_QUELLCODE`, nie angezeigte Tooltips) nur als Vorschlag im Bericht; nichts löschen ohne Freigabe.
6. Versionsnummer: erstmals `0.1.0-dev.19` bei der Sicherung von AP19 (siehe Abschnitt 9, Schritt 0).

Akzeptanzkriterien:

1. Prüfbericht liegt vor, alle Befunde im beschriebenen Format.
2. Alle Dateien beider Komponenten durchgesehen, von Claude und vom unabhängigen Prüfer; Befunde des Prüfers nachgeprüft und als bestätigt oder widerlegt gekennzeichnet.
3. Jede Einstellung und Schaltfläche in beiden Komponenten getestet, mit Ergebnisliste.
4. Robustheitsfälle getestet, mit Ergebnis.
5. Langzeittest über Nacht ausgewertet: Speicher- und CPU-Verlauf, keine vervielfachte Messschleife.
6. Einstellungen des Nutzers nach allen Tests nachweislich unverändert (Wertevergleich).
7. Veraltete Stellen in `PROJECT-STATUS.md` korrigiert.
8. Phase 2: freigegebene Befunde behoben und erneut geprüft (Syntax, Namen, Prüfsummen, gezielter Test); geänderte Stellen vom Nutzer getestet.
9. Gemeinsame Module am Ende identisch.

Offen aus AP18, in AP19 geprüft (19.09.2026, Funktionstest D10): Weiße Schrift auf hellem Hintergrund „relativ gut“, Warnfarben schlecht lesbar → Befund G9, AP20.

Danach: AP20 – Lesbarkeit, AP21 – Aktion bei Linksklick, anschließend laut Roadmap Übersetzung Deutsch/Englisch. Vor dem Einreichen bei Cinnamon Spices folgt eine Abschlussprüfung.

Weitere bekannte offene Punkte:

- Das Desklet schreibt weiterhin `/tmp/avince-hwmonitor-values`. Das alte Applet `avince-hwpopup@angelo` ist installiert, aber nicht aktiv (geprüft 19.09.2026); die Datei liest damit niemand mehr (Befund M3 aus AP19). Der Langzeittest von AP19 nutzt sie als Zähler.
- Eine selbsttätige Erkennung heller Panel-Themes gibt es weiterhin nicht. Sie ist entbehrlich geworden, da die Fassung seit AP09 über die Einstellungen wählbar ist.
- Das Desklet besitzt noch keine Einstellungen für Deckkraft und Anzeigegröße. Die Deckkraft kommt mit AP20.
- Die Speedtest-Lösung LibreSpeed ist vor einer Veröffentlichung auf Lizenz, Verteilbarkeit und Cinnamon-Spices-Konformität zu prüfen.
- GPU-Temperatur und GPU-Auslastung fehlen weiterhin im Messwertmodell. Auf dem Latitude-5285 stellt die Intel-iGPU keinen eigenen Temperatursensor bereit; `coretemp / Package id 0` ist dort bereits die GPU-Temperatur. Eine belastbare Auslastungsanzeige ist über die reinen Kernel-Schnittstellen nicht möglich, `/sys/class/drm/card1` liefert nur Taktfrequenzen. Dieses Thema sollte an einem Gerät mit dedizierter AMD- oder NVIDIA-Grafik bearbeitet werden.
- Das C-1-Iconset liegt als PNG-Entwurfsmaterial vor. Ein eigenständiges Vektorlogo (SVG) und die Lizenz- und Rechteprüfung stehen noch aus. Als Panel-Symbol ist es seit AP09 eingebunden.
- Übersetzung Deutsch/Englisch über gettext. Cinnamon übersetzt auch das Einstellungsfenster, wenn die Komponente eigene Übersetzungsdateien mitbringt; es folgt dabei immer der Systemsprache. Cinnamon Spices erwartet üblicherweise englische Ausgangstexte, derzeit sind sie deutsch. Sinnvoll erst nach AP14, da dort weitere Texte entstehen. Dabei auch die englischen Reste im Hardwarebericht übersetzen („unlabeled“, „NOT FOUND“, „none“; Entscheidung vom 18.09.2026). Der Titelvergleich des Einstellungsfensters (AP15) ist dann anzupassen.
- Tooltips an Schaltflächen im Einstellungsschema werden von Cinnamon nicht angezeigt (siehe AP17). Bei Gelegenheit entfernen oder durch Hinweistexte ersetzen.
- Die in AP19 genannten veralteten Stellen dieses Dokuments (Abschnitt 5, 7, 7a, 8, 10, 12 sowie AP07, AP08, AP09) wurden am 19.09.2026 korrigiert.

Fortsetzung von AP19 (Phase 2):

1. `PROJECT-STATUS.md`, `ROADMAP_V2.md` und `PRUEFBERICHT_AP19.md` lesen
2. `git status` prüfen, `main` und GitHub synchron
3. Befunde nur nach Freigabe des Nutzers je Befund beheben; Freigaben im Prüfbericht vermerken
4. nach jeder Änderung: Syntax (`cjs`), Namensprüfung, Prüfsummen der vier gemeinsamen Module, gezielter Test, Test durch den Nutzer
5. Abschluss mit der Sicherungsroutine aus Abschnitt 9, erstmals mit Versionsnummer `0.1.0-dev.19`

Keine Aufgabe aus Vermutungen ableiten, wenn sie noch nicht gemeinsam festgelegt wurde.

## 15. Hinweise für KI-Assistenten

Wenn ein KI-Assistent dieses Projekt übernimmt:

- zuerst Projektstatus und Roadmap lesen
- bestehenden Quellcode untersuchen, bevor Änderungen vorgeschlagen werden
- keine funktionierende Architektur ohne konkreten Grund neu schreiben
- Änderungen klein, nachvollziehbar und rückrollbar halten
- keine geheimen Daten oder Schlüssel anfordern
- Git-Historie nicht überschreiben
- keine Force-Pushes ohne ausdrückliche Zustimmung
- keine bestehenden Backups löschen
- keine NAS-Snapshots als Ersatz für Git betrachten und umgekehrt
- bei Unsicherheit erst prüfen, nicht raten
- technische Entscheidungen nach Möglichkeit dokumentieren

Der Nutzer arbeitet nicht primär als Softwareentwickler. Terminalschritte sollen daher reproduzierbar, klar und kontrolliert formuliert werden.

## 16. Wiederaufnahme-Checkliste

Bei Fortsetzung der Arbeit:

```bash
cd /mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Development
git status
git log -3 --oneline
git tag --list
```

Erwarteter Ausgangspunkt während AP19:

- Branch: `main`
- Arbeitsverzeichnis: sauber
- Referenz-Tag: `0.1.0-dev_AP18-END` (Quellcode unverändert seit AP18)
- AP19 Phase 1 abgeschlossen, Prüfbericht und Dokumentation committet
- AP19 Phase 2: Behebung nach Freigabe je Befund, siehe Abschnitt 14 und `PRUEFBERICHT_AP19.md`

---

Dieses Dokument soll nach jedem abgeschlossenen Arbeitspaket aktualisiert werden, damit ein Wechsel zwischen Entwicklungsumgebungen oder KI-Assistenten ohne Verlust des Projektkontexts möglich bleibt.
