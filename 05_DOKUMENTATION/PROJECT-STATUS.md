# aVincePulse – Projektstatus und Übergabedokument

Stand: 21.09.2026 (AP24 abgeschlossen)  
Projekt: aVincePulse  
Repository: `aVince-Industrietechnik/aVincePulse`  
Standard-Branch: `main`  
Aktueller Referenzstand: `0.1.0-dev_AP25-END`  
Vorheriger Referenzstand: `0.1.0-dev_AP24-END`  
Versionsnummer in `metadata.json`: `0.1.0-dev.25` (Regel aus Abschnitt 9, Schritt 0)  
Lizenz: GPL-3.0 (seit AP23, Datei `LICENSE` im Wurzelverzeichnis)

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

Im Wurzelverzeichnis liegen seit AP23 zusätzlich `LICENSE` (GPL-3.0),
`README.md` (Englisch), `README.de.md` (Deutsch), `.github/FUNDING.yml`
und `docs/` für die Screenshots des README.

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
- `0.1.0-dev_AP19-END` – Entwicklungsstand nach Abschluss von AP19
- `0.1.0-dev_AP20-END` – Entwicklungsstand nach Abschluss von AP20
- `0.1.0-dev_AP21-END` – Entwicklungsstand nach Abschluss von AP21
- `0.1.0-dev_AP22-END` – Entwicklungsstand nach Abschluss von AP22
- `0.1.0-dev_AP23-END` – Entwicklungsstand nach Abschluss von AP23
- `0.1.0-dev_AP24-END` – Entwicklungsstand nach Abschluss von AP24
- `0.1.0-dev_AP25-END` – Entwicklungsstand nach Abschluss von AP25
- `0.1.0-dev_AP26-END` – Entwicklungsstand nach Abschluss von AP26
- `0.1.0-dev_AP27-END` – Entwicklungsstand nach Abschluss von AP27
- `0.1.0` – **die Fassung, die bei Cinnamon Spices eingereicht wird** (AP28)

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

Zur Deckkraft siehe `DEFAULT_POPUP_OPACITY` in `applet.js`. Der damalige Standardwert 0.55 ergibt gegenüber weißer Schrift im ungünstigsten Fall – reinweißer Inhalt dahinter – einen Kontrast von 4.7 : 1. **Abgelöst durch AP20:** Die Skala reicht dort von 0 bis 55 Prozent bei einer Vorgabe von 35 Prozent; die Lesbarkeit trägt seither der Schriftschatten, und die Warnfarben sind je nach Hintergrund wählbar.

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
| Deckkraft der Hintergrundfläche | scale | 45–85 % (seit AP20: 0–55 %) | 55 (seit AP20: 35) |
| Panel-Symbol | combobox | vier Varianten | Logo farbig |

Die Untergrenze der Deckkraft von 45 Prozent war bewusst gesetzt: Darunter unterschreitet weiße Schrift auf hellem Bildschirminhalt den Mindestkontrast von 3.0 : 1. **Abgelöst durch AP20:** Die Skala reicht dort von 0 bis 55 Prozent, die Vorgabe liegt bei 35 Prozent, und die Lesbarkeit trägt der Schriftschatten. Zusätzlich begrenzt `_gueltig()` alle Werte im Code, sodass eine beschädigte oder von Hand bearbeitete Einstellungsdatei nicht zu einer unbrauchbaren Darstellung führt.

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

- Applet: Klick auf das Panel-Symbol, zusätzlich eine Schaltfläche in den Einstellungen (seit AP19, Befund H14: nicht mehr per Klick, sondern über den Eintrag „Internet-Speedtest starten“ im Rechtsklick-Menü)
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

### AP19 – Zwischenprüfung

Abgeschlossen.

Vollständiger Prüfbericht: `05_DOKUMENTATION/PRUEFBERICHT_AP19.md` (Befunde, Testprotokolle, Freigaben). Prüfdaten und Sicherungen lokal unter `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/`.

#### Phase 1 – Prüfen ohne Codeänderung

Code-Durchsicht durch Claude und einen unabhängigen Prüfer, Langzeittest über Nacht, Funktionstest jeder Einstellung und Schaltfläche in beiden Komponenten (A1–A13, D1–D10) sowie sechs Robustheitsfälle (R1–R6). Ergebnis: 29 Befunde, davon 1 kritisch, 5 mittel, 9 gering und 14 Hinweise.

#### Phase 2 – Behobene Befunde

Alle vom Nutzer freigegebenen Befunde wurden behoben und geprüft. Geändert wurden `applet.js`, `desklet.js`, das gemeinsame Modul `speedtest.js` und das Applet-Schema.

- **K1 (kritisch):** Jeder Speedtest startete eine zusätzliche, dauerhaft laufende Messschleife. Folgen: falsche CPU-Last und Netzwerkwerte im Applet, Fehlalarme der Warnfarben, nach dem Entfernen des Desklets etwa 20 MB Fehlerzeilen je Stunde im Sitzungsprotokoll. Behoben durch `_starteMessungNeu()`, das den laufenden Zeitgeber immer zuerst entfernt.
- **G2:** Der nächste Takt wird in `finally` gesetzt; ein Fehler beim Messen beendet die Anzeige nicht mehr.
- **M1:** Das Desklet meldet seine Einstellungen beim Entfernen ab (`settings.finalize()`), wie das Applet.
- **M2:** Speedtest mit Zeitgrenze (120 s), `Gio.Cancellable` und `verwerfe()` beim Entfernen; Rückmeldung außerhalb des `try`.
- **M3:** Das Desklet schreibt `/tmp/avince-hwmonitor-values` nicht mehr.
- **G1:** Sperrdatei `~/.local/share/avincepulse/speedtest.lock` verhindert gleichzeitige Tests aus Applet und Desklet.
- **G5:** Fehlt die Icondatei, erscheint das Textkürzel „aVP“ statt einer leeren Stelle.
- **G6:** Fensterzeitgeber und das Signal `unmanaged` werden beim Neu-Öffnen und beim Entfernen aufgeräumt.
- **G8:** Die Maussignale des Panel-Symbols werden beim Entfernen getrennt.
- **G10:** Die alte Ablage aus der Baseline wird nur noch übernommen, wenn die neue Datei fehlt; unbrauchbare Werte und ein fehlender Zeitstempel erscheinen als `--`.
- **H1:** Das Desklet prüft Schriftgröße, Schriftstärke und Intervall auf ihren zulässigen Bereich.
- **H6:** „popup scaled“ wird nur noch bei geänderter Skalierung protokolliert.
- **H14:** Der Speedtest des Applets startet nicht mehr per Linksklick, sondern über das Rechtsklick-Menü und die Schaltfläche in den Einstellungen, wie beim Desklet seit AP11.
- **H15:** Nach „Jetzt neu öffnen“ erscheint die Meldung erst, wenn das neue Einstellungsfenster wieder steht.

#### Nicht in AP19 behoben

- **G9** (Warnfarben im Desklet auf hellem Hintergrund schlecht lesbar) und **G3** (Deckkraft der Meldungen) gehen in **AP20 – Lesbarkeit**.
- **H14** hat den Linksklick frei gemacht; seine Belegung ist **AP21**.
- Übrige Hinweise siehe Prüfbericht, Abschnitt 8, Gruppe C.

#### Nachweis

- Nachtest 19.09. 16:49 bis 20.09. 08:00: 912 Minuten, in keiner Minute mehr als zwei Messdurchläufe je Taktmarke, keine Protokollzeile von aVincePulse, Speicher 394 → 419 MB, CPU nachts konstant 4 %.
- Ein CPU-Plateau von etwa 40 %, das während der Tests auffiel, stammt nachweislich **nicht** von aVincePulse (Gegenprobe mit entfernten Komponenten).
- Die Einstellungen des Nutzers waren nach allen Tests unverändert (Wertevergleich).

### AP20 – Lesbarkeit

Abgeschlossen.

Dateien: gemeinsame Module `metrics.js` (Schatten, Warnfarben) und `speedtest.js` (Meldungen), `applet.js`, `desklet.js`, beide `settings-schema.json`, `Desklet/stylesheet.css`.

Ausgelöst durch Befund G9 aus AP19: Die Warnfarben des Desklets waren auf hellem Hintergrund schlecht lesbar, womit die Roadmap-Anforderung „Farben müssen auf hellem und dunklem Hintergrund lesbar bleiben“ nicht erfüllt war. Ziel, Akzeptanzkriterien und Verlauf stehen in Abschnitt 14.

#### Hintergrundfläche

Beide Komponenten haben jetzt die Einstellung „Hintergrundfläche“. Das Desklet bekommt damit erstmals eine abgedunkelte Fläche hinter den Messwerten; Ecken und Innenabstände richten sich nach der Schriftgröße, bei 0 Prozent sieht es aus wie vor AP20. Beim Applet ersetzt die Einstellung die frühere Skala von 45 bis 85 Prozent.

Die Bereiche sind je Komponente verschieden (Nachtrag vom 20.09.2026, siehe unten):

| Komponente | Skala | Vorgabe |
|---|---|---|
| Applet (Hover-Anzeige) | 0–55 % | 35 % |
| Desklet | 0–35 % | 0 % |

Der Höchstwert von 35 Prozent kam aus der praktischen Erprobung. Über hellem Bildschirminhalt wird eine stärkere Fläche mittelgrau, und darauf verlieren gerade die Warnfarben: Bei 55 Prozent über reinweißem Inhalt erreicht `#FF5252` nur 1,49 : 1 und `#FFA726` nur 2,44 : 1.

Damit ist die Festlegung aus AP09 („Deckkraft im Applet nicht unter 45 Prozent“) bewusst aufgehoben. Sie beruhte darauf, dass die Fläche allein die Lesbarkeit tragen sollte; diese Aufgabe hat seit AP20 der Schriftschatten.

#### Nachtrag vom 20.09.2026: größerer Bereich im Applet

Nach dem Abschluss von AP20 hat der Nutzer entschieden, die Skala des **Applets** wieder bis 55 Prozent zu öffnen und die Vorgabe auf 35 Prozent zu setzen. Das Desklet bleibt bei 0 bis 35 Prozent mit der Vorgabe 0 Prozent.

Begründung: Die Hover-Anzeige des Applets deckt einen großen Teil des Bildschirms ab und soll den Inhalt dahinter auch verdecken dürfen. Das Desklet liegt dagegen dauerhaft auf dem Schreibtisch, wo eine kräftige Fläche stört.

Zu bedenken bleibt der Zielkonflikt, den die Erprobung gezeigt hat: Mit steigender Deckkraft wird die weiße Schrift über hellem Inhalt besser lesbar, die Warnfarben aber schlechter. Kontraste über reinweißem Bildschirminhalt:

| Deckkraft | weiße Schrift | leuchtend (Warnung / kritisch) | gedämpft (Warnung / kritisch) |
|---|---|---|---|
| 0 % | 1,00 : 1 | 1,94 / 3,19 | 3,79 / 5,62 |
| 25 % | 1,84 : 1 | 1,06 / 1,74 | 2,06 / 3,06 |
| 35 % | 2,43 : 1 | 1,25 / 1,31 | 1,56 / 2,31 |
| 45 % | 3,36 : 1 | 1,73 / 1,05 | 1,13 / 1,67 |
| 55 % | 4,74 : 1 | 2,44 / 1,49 | 1,25 / 1,19 |

Der Schriftschatten ist darin nicht enthalten. Wer die Anzeige stärker abdunkelt, wählt für die Warnfarben sinnvollerweise den Satz, der sich vom jeweiligen Grauton abhebt.

Der Nachtrag betrifft nur `Applet/applet.js` und `Applet/settings-schema.json`; die vier gemeinsamen Module blieben unberührt. Der Tag `0.1.0-dev_AP20-END` zeigt weiterhin auf den Stand vor dem Nachtrag, die Versionsnummer bleibt `0.1.0-dev.20`.

#### Schriftschatten

`SCHRIFTSCHATTEN` in `metrics.js` gilt für beide Komponenten: `0px 0px 8px rgba(0,0,0,1)`. Bis AP19 lagen Desklet und Applet bei 6 bzw. 8 Pixeln mit 0.9. Der Wert steht im gemeinsamen Modul und wird im Code gesetzt, nicht im Stylesheet – so sehen beide Komponenten gleich aus, und eine Änderung erfordert keinen Cinnamon-Neustart. `stylesheet.css` behält eine gleichlautende Angabe für den Fall, dass noch kein Stil gesetzt ist.

Erprobt wurden 8 px voll deckend, 3 px voll deckend und ein Doppelschatten aus beidem. Der Nutzer wählte auf hellem wie auf dunklem Hintergrund die erste Fassung.

#### Warnfarben wählbar

Neue Einstellung „Warnfarben“ je Komponente, im Abschnitt „Warnschwellen“ und abhängig vom Schalter „Warnfarben anzeigen“:

| Auswahl | Warnung | Kritisch | gegen Weiß | gegen Schwarz |
|---|---|---|---|---|
| Für dunkle Hintergründe (leuchtend), Vorgabe | `#FFA726` | `#FF5252` | 1,94 / 3,19 : 1 | 10,81 / 6,58 : 1 |
| Für helle Hintergründe (gedämpft) | `#E65100` | `#C62828` | 3,79 / 5,62 : 1 | 5,54 / 3,74 : 1 |

Grund für eine Einstellung statt einer festen Farbe: Der Nutzer wählte bei der Erprobung auf hellem Hintergrund die gedämpfte und auf dunklem die leuchtende Fassung. aVincePulse kennt den Bildschirminhalt nicht – die Auswertung über `global.stage.read_pixels` wurde in AP08 bewusst verworfen, weil die Umschaltung beim Verschieben von Fenstern springen würde.

Die Vorgabe „dunkel“ entspricht den Farben seit AP18; für Bestandsnutzer ändert sich damit nichts ungefragt.

#### Meldungen (Befund G3)

`StatusAnzeige.zeige()` verwendet jetzt immer 0,55 und nimmt keinen Deckkraftwert mehr entgegen. Zuvor übergaben nur zwei von zehn Aufrufen im Applet einen Wert, im Desklet keiner. Meldungen sind kurzlebig und wichtig; sie sollen unabhängig davon lesbar sein, wie durchsichtig die Anzeige eingestellt ist (Entscheidung vom 20.09.2026).

#### Verworfen: Umschaltung bei 45 Prozent

Ursprünglich sollte ab 45 Prozent die Fläche und darunter ein kräftigerer Schatten gelten. Mit dem Höchstwert von 35 Prozent wäre dieser Punkt nicht mehr erreichbar und damit toter Code. `WARN_FLAECHE_GRENZE`, `mitFlaeche()` und `schattenFuer()` aus der Erprobungsfassung wurden wieder entfernt.

#### Vorgehen und Prüfung

Die Varianten wurden zuerst in einer Erprobungsfassung installiert, mit vorübergehenden Einstellungen für Schatten, Warnfarben, eine Farbvorschau ohne Eingriff in die Warnschwellen und einen Schalter für die Farbvarianten mit Fläche. Der Nutzer verglich sie auf hellem und dunklem Hintergrundbild und entschied nach Augenschein; danach wurden die Erprobungseinstellungen restlos entfernt (Commit `6b42c7a` für die Erprobungsfassung, `37f0562` für die Endfassung).

Geprüft: Syntax mit `cjs`, Namensprüfung, Prüfsummen der vier gemeinsamen Module, Schemata als JSON, Verhalten der neuen Funktionen in `metrics.js` mit `cjs` einschließlich beschädigter Eingaben, Kontrastnachweis mit `06_TESTVERSIONEN/0.1.0-dev_AP20-PRUEFDATEN/kontrast.py`.

Funktionstest durch den Nutzer am 20.09.2026, bestanden: Umschalten der Warnfarben wirkt sofort in beiden Komponenten; „Auf Standardwerte zurücksetzen“ stellt Deckkraft und Warnfarben mit zurück; die Warnschwellen-Liste blieb unverändert; ein gespeicherter Wert außerhalb der neuen Skala (Applet 55 Prozent) wird auf 35 begrenzt, Regler und Fläche passen dazu.

Zum Wertevergleich: Nach den Tests standen alle 13 Werte je Komponente exakt auf den Vorgaben des Schemas. Die Abweichungen gegenüber der Sicherung – Applet 55 → 25 Prozent, Desklet 10 → 0 Prozent – stammen aus dem Funktionstest der Schaltfläche „Auf Standardwerte zurücksetzen“ und nicht aus einem ungewollten Eingriff.

### AP21 – Aktion bei Linksklick auf das Applet

Abgeschlossen.

Dateien: `Applet/applet.js`, `Applet/settings-schema.json`. Die vier gemeinsamen Module und das Desklet blieben unberührt.

Ziel, Akzeptanzkriterien und die verworfenen Alternativen stehen in Abschnitt 14.

#### Warum

Die große Messwert-Anzeige erschien bisher nur, solange der Mauszeiger auf dem Panel-Symbol stand. Auf dem Referenzgerät, einem 2-in-1 mit Touchscreen, gibt es im Tablet-Betrieb kein Überfahren – ein Finger tippt und ist wieder weg. Die Anzeige war dort **überhaupt nicht erreichbar**. Der Linksklick war seit AP19 frei, weil der Speedtest ins Rechtsklick-Menü gewandert ist (Befund H14).

#### Die Einstellung

Neu im Abschnitt „Hover-Anzeige“: „Aktion bei Linksklick“ mit „Anzeige ein/aus“ (Vorgabe), „Systemüberwachung öffnen“ und „Nichts“.

Bei „Anzeige ein/aus“ bleibt die Anzeige nach einem Klick stehen. Sie schließt durch erneuten Klick auf das Panel-Symbol, Klick auf die Anzeige selbst, Klick daneben oder `Esc`. Die ersten drei Wege funktionieren auch per Fingertipp; ein Touchscreen hat kein `Esc`.

#### Wie das Schließen abgesichert ist

Zwei voneinander unabhängige Mittel:

- Ein unsichtbarer **Klickfänger** spannt sich über die gesamte Zeichenfläche – nicht nur über den primären Monitor – und nimmt Klick und Fingertipp entgegen.
- Zusätzlich greift `Main.pushModal()` die Tastatur, allein für `Esc`. Schlägt das fehl, liefert es `false`; dann bleibt die Anzeige über den Klickfänger bedienbar, nur `Esc` entfällt, und eine Protokollzeile hält das fest.

Das Popup wird nur während der Anhaftung `reactive`. Sonst finge es beim bloßen Überfahren Mausereignisse ab, die den darunter liegenden Fenstern zustehen.

#### Systemüberwachung

Gesucht wird über mehrere Arbeitsumgebungen hinweg – GNOME, MATE, Xfce, KDE, LXDE – zuerst über den Programmeintrag (`Gio.DesktopAppInfo`), danach über den Befehlsnamen (`GLib.find_program_in_path`). Ist nichts vorhanden, erscheint eine Meldung, ohne zur Installation aus Fremdquellen aufzufordern (Regel von Cinnamon Spices). Mit `cjs` belegt: Ein fehlender Eintrag liefert `null`, das Referenzgerät löst `org.gnome.SystemMonitor.desktop` auf.

#### Zusammenspiel mit dem Übrigen

- Ein Speedtest löst die Anhaftung, damit die Meldung in der Bildschirmmitte nicht mit der Anzeige zusammenfällt.
- Das Verlassen des Panel-Symbols verbirgt eine angeheftete Anzeige nicht mehr (`_hidePopup()` prüft den Zustand).
- Eine Änderung der Einstellung löst die Anhaftung, damit niemand mit einer stehenden Anzeige zurückbleibt, die er über den Klick nicht mehr schließen kann.
- Beim Entfernen des Applets wird zuerst gelöst, danach alles abgeräumt.

#### Prüfung

Syntax mit `cjs`, Namensprüfung, Prüfsummen der vier gemeinsamen Module, Schema als JSON. Die verwendeten Namen `Clutter.KEY_Escape`, `Clutter.EVENT_STOP`, `Gio.DesktopAppInfo` und `Gio.AppInfoCreateFlags` wurden mit `cjs` belegt statt angenommen.

Funktionstest durch den Nutzer am 20.09.2026, alle Punkte bestanden: Überfahren mit der Maus unverändert; Anheften per Klick; Schließen über Symbol, Anzeige, daneben und `Esc`; weiterlaufende Messwerte; **Bedienung per Fingertipp im Tablet-Betrieb**; „Systemüberwachung öffnen“ und „Nichts“.

**Akzeptanzkriterium 7 – Entfernen bei angehefteter Anzeige.** Über die Bedienung nicht auslösbar, da der Klickfänger bei jedem Klick zuerst schließt. Geprüft über ein Neuladen des Applets per DBus, das denselben Code durchläuft (`removeAppletFromPanels` → `on_applet_removed_from_panel`), mit `deleteConfig = false`, sodass die Einstellungen erhalten bleiben. Skript: `06_TESTVERSIONEN/0.1.0-dev_AP21-PRUEFDATEN/test_entfernen.py`.

Ergebnis (20.09.2026, durch Test belegt):

| Zeitpunkt | `modalCount` | angeheftet | Tastaturgriff | Klickfänger |
|---|---|---|---|---|
| vor dem Entfernen | 1 | ja | ja | ja |
| nach dem Entfernen | **0** | nein | nein | nein |

Kein hängender Tastaturgriff, keine Protokollzeile von aVincePulse, das Applet lud sich in 193 ms wieder. Damit ist das Restrisiko dieser Bauweise praktisch widerlegt.

Die Einstellungen des Nutzers waren nach allen Tests unverändert; hinzugekommen ist allein der neue Schlüssel `linksklick-aktion`.

### AP22 – Speedtest-Programm vor der Veröffentlichung

Abgeschlossen.

Dateien: gemeinsames Modul `speedtest.js`, `applet.js`, `desklet.js`, beide `settings-schema.json`, beide `metadata.json`. Neu: `08_LIZENZEN_RECHTE/SPEEDTEST-PROGRAMME.md`.

Ziel, Akzeptanzkriterien und Verlauf stehen in Abschnitt 14.

#### Warum

`librespeed-cli` ist kein Paket der Mint-Quellen; auf dem Referenzgerät liegt es von Hand unter `/usr/local/bin`. Die Einreichungsregeln von Cinnamon Spices verbieten es, Nutzer zur Installation aus Fremdquellen anzuleiten. Ohne ein Programm aus den Paketquellen wäre eine Veröffentlichung nicht möglich gewesen.

#### Berichtigung: `speedtest-cli` stammt nicht von Ookla

Die Roadmap sprach von „`speedtest-cli` (Ookla)". Das trifft nicht zu und wurde am 20.09.2026 berichtigt.

Das Paket `speedtest-cli` 2.1.3-2 aus `universe` ist `sivel/speedtest-cli` von Matt Martz, in Python, unter Apache-2.0. Es nutzt die Server von Speedtest.net als **inoffizieller** Client. Ooklas eigener Befehlszeilenclient heißt `speedtest` und kommt ausschließlich aus einem Paket-Repository von Ookla – also aus genau der Art Fremdquelle, die ausgeschlossen ist. Er scheidet damit aus.

`speedtest-cli` ist zugleich das **einzige** Speedtest-Werkzeug in den Quellen von Mint und Ubuntu (geprüft mit `apt-cache search speedtest` sowie gezielt für `librespeed`, `librespeed-cli`, `speedtest`, `fast-cli`, `python3-speedtest-cli`).

#### Unterstützte Programme

`speedtest.js` führt die Programme nun in einer Liste `PROGRAMME`, deren Reihenfolge den Vorrang bestimmt. Je Programm stehen dort Name, Ablageorte, Aufrufparameter und eine eigene Auswertefunktion.

| | librespeed-cli | speedtest-cli |
|---|---|---|
| Vorrang | 1 | 2 |
| Aufruf | `--json` | `--json --secure` |
| Ausgabe | Array | Objekt |
| Geschwindigkeit | MBit/s | **Bit/s** |
| Jitter | ja | **nein** |
| Lizenz | LGPL-3.0 | Apache-2.0 |
| In den Paketquellen | nein | ja |

Der Vorrang von `librespeed-cli` hat drei Gründe: freie Server, Ergebnis bereits in MBit/s und als einziges ein Jitter-Wert. Hinzu kommt die Genauigkeit – Paketbeschreibung und Projekt von `speedtest-cli` warnen selbst, dass die Messung über HTTP bei schnellen Anschlüssen zunehmend ungenau wird. Zwei Läufe innerhalb weniger Minuten am 20.09.2026 zeigten das deutlich:

| Programm | Download | Upload | Ping | Jitter |
|---|---|---|---|---|
| librespeed-cli | 57,94 MBit/s | 12,37 MBit/s | 13,36 ms | 0,87 ms |
| speedtest-cli | 33,35 MBit/s | 11,25 MBit/s | 56,38 ms | – |

`--secure` ist bei `speedtest-cli` nötig, da es sonst unverschlüsselt über HTTP misst. `--timeout` bleibt beim Standard von 10 Sekunden: Es begrenzt den einzelnen HTTP-Abruf, nicht den gesamten Test; ein hoher Wert würde einen hängenden Abruf nur verlängern. Für den Gesamtablauf gilt weiterhin die Zeitgrenze von 120 Sekunden aus AP19 (Befund M2).

#### Jitter bei `speedtest-cli`

Die Zeichenkette `jitter` kommt im gesamten Programm nicht vor; die Ergebnisstruktur führt nur `download`, `upload`, `ping`, `server`, `timestamp`, `bytes_sent`, `bytes_received`, `share` und `client`.

Die Jitter-Zeile bleibt deshalb sichtbar und zeigt `--`. Sie auszublenden hätte die Zeilenzahl vom verwendeten Programm abhängig gemacht – genau das, was AP07 für die Speedtest-Zeilen bewusst vermeidet, damit das Desklet seine Höhe nicht ändert. Ein Eigenbau-Jitter aus mehreren Pings wurde verworfen.

#### Auswahl des Programms

Neue Einstellung „Speedtest-Programm" je Komponente, im Abschnitt „Internet-Speedtest". Aufbau wie die Sensorauswahl seit AP14: Die Liste kann nicht im Schema stehen, da sie vom Rechner abhängt, und wird über `setOptions()` geschrieben – beim Laden und nach „Hardware neu erkennen".

- erster Eintrag „Automatisch (…)" mit dem Programm, das die automatische Wahl gerade verwendet
- danach jedes vorhandene Programm
- ein gewähltes, aber nicht vorhandenes Programm erscheint als „Nicht gefunden: …"; die Wahl bleibt gespeichert und greift wieder, sobald das Programm zurück ist
- ein beschädigter Wert fällt auf „Automatisch" zurück
- „Zurücksetzen" stellt „Automatisch" wieder her

#### Verhalten ohne Programm

`istVerfuegbar()` war seit AP11 vorhanden, wurde aber **nirgends aufgerufen** – es gab also gar keine Verfügbarkeitsprüfung. Das ist behoben.

Cinnamon bietet keine Möglichkeit, ein Bedienelement zur Laufzeit auszublenden; `setSensitive` oder `setVisible` gibt es in der Einstellungs-API nicht. Ausgewertet wird ausschließlich `dependency` im Schema, und zwar gegen gespeicherte Einstellungswerte – über einen `Gtk.Revealer`, der ein- und ausblendet, statt auszugrauen. Negation mit `!schluessel` wird unterstützt (`JSONSettingsRevealer` in `/usr/share/cinnamon/cinnamon-settings/bin/JsonSettingsWidgets.py`).

Deshalb gibt es den Schlüssel `speedtest-vorhanden` vom Typ `generic`, also ohne eigenes Bedienelement. `_aktualisiereSpeedtestVerfuegbarkeit()` setzt ihn. Daran hängen:

| Element | mit Programm | ohne Programm |
|---|---|---|
| Auswahlfeld „Speedtest-Programm" | sichtbar | verborgen |
| Bedienhinweis (Rechtsklick …) | sichtbar | verborgen |
| „Speedtest jetzt starten" | sichtbar | verborgen |
| Hinweis, dass ein Programm fehlt | verborgen | sichtbar |
| „Speedtest-Berichte öffnen" | sichtbar | sichtbar |

Die Berichte bleiben erreichbar, damit ältere Messungen lesbar sind. Ebenso wird der Menüeintrag „Internet-Speedtest starten" ein- und ausgeblendet, damit ein Klick nicht ins Leere läuft. Der Aufruf dafür steht nach dem Menüaufbau: `_aktualisiereSensorOptionen()` läuft früher, das Menü entsteht erst danach.

Der Hinweistext nennt beide Programmnamen als reine Tatsachenangabe – **ohne** Installationsbefehl, Paketquelle oder Verweis auf eine Webseite. Die Zeilen SPEED, PING, JITTER und LAST bleiben sichtbar; sie haben in `metrics.js` ohnehin `defaultValue: "--"`.

#### Datensparsamkeit

Die Ausgabe von `speedtest-cli` enthält im Feld `client` die **öffentliche IP-Adresse**, ungefähre Koordinaten und den Anbieter, im Feld `server` dessen Standort und Kennung. `librespeed-cli` führt dieselben Felder, füllt sie ohne Telemetrie aber nicht.

Das ist erheblich, weil Speedtest-Berichte seit AP12 dauerhaft und ungelöscht unter `~/.local/share/avincepulse/berichte/Speedtest/` liegen. Übernommen werden ausschließlich Download, Upload, Ping und Jitter. Weder Wertedatei noch Bericht enthalten Angaben zum Anschluss oder zum Messserver. Der bisherige Code war zufällig sauber, weil er vier Felder herausgriff; das ist nun festgeschrieben und geprüft.

#### Bericht und Wertedatei

Beide vermerken zusätzlich das verwendete Programm. Der Bericht nennt es mit lesbarem Namen und Pfad, dazu die Herkunft der Wahl („automatisch gewählt" bzw. „manuell gewählt"), und hängt bei `speedtest-cli` einen Absatz über dessen Einschränkungen an. Eine ältere Wertedatei ohne den Schlüssel `PROGRAMM` bleibt gültig.

#### Fehler während der Umsetzung

- **`Number(null)` ist `0`.** Die erste Fassung prüfte Messwerte mit `Number(wert)`. Da `null`, `true`, `false`, ein leerer Text und ein leeres Array damit zu `0` werden, wäre ein fehlendes Feld in der Programmausgabe als „0.00 MBit/s" erschienen statt als Fehler. Beim Test der Auswertung aufgefallen und behoben: Nur Zahlen und nicht leere Texte gelten noch als brauchbar. **Regel für künftige Arbeiten:** `Number()` allein genügt nie zur Prüfung fremder Eingaben.
- **`Jitter : -- ms`** las sich im Bericht wie ein Fehler. Im Funktionstest aufgefallen; ein nicht gemessener Wert erscheint nun als „nicht gemessen" ohne Einheit.

#### Prüfung

Syntax mit `cjs`, Namensprüfung, Prüfsummen der vier gemeinsamen Module, beide Schemata als JSON. Die verwendeten Namen `settings.getValue()` und `PopupBaseMenuItem.actor` wurden in den Cinnamon-Quellen belegt statt angenommen (`settings.js` Zeile 494, `popupMenu.js` Zeile 110).

121 Prüfungen mit `cjs`, alle bestanden, Skripte unter `06_TESTVERSIONEN/0.1.0-dev_AP22-PRUEFDATEN/`:

| Prüfung | Zahl |
|---|---|
| Auswertung gegen erdachte und beschädigte Ausgaben | 49 |
| Programmsuche, Vorrang, Wahl, Angebot | 30 |
| Auswertung gegen die **echten** Ausgaben beider Programme | 14 |
| Verhalten ohne Programm | 13 |
| Ältere Wertedatei ohne `PROGRAMM` | 6 |
| Berichtstext mit und ohne Jitter | 9 |

Für die Prüfung der Programmauswahl wurde die ganze `speedtest.js` verwendet; ersetzt wurden nur die drei Cinnamon-Importe `St`, `Main` und `Mainloop` durch Attrappen. Die echten Programmausgaben liegen anonymisiert unter `rohausgaben/` – die IP-Adresse ist durch `203.0.113.7` aus dem Dokumentationsbereich nach RFC 5737 ersetzt, Koordinaten und Anbieter durch Platzhalter.

Funktionstest durch den Nutzer am 20.09.2026 im Applet, alle sechs Punkte bestanden: Auswahlfeld und Hinweis im Einstellungsfenster; Messung mit `speedtest-cli` einschließlich Jitter `--` und passendem Bericht; Messung mit „Automatisch" und wieder vorhandenem Jitter; **beide Programme beiseitegeschoben** und „Hardware neu erkennen" – Auswahlfeld, Bedienhinweis, Schaltfläche und Menüeintrag verschwunden, Hinweis erschienen, Berichte weiter erreichbar, übrige Messwerte unberührt; Programme zurück und alles wieder da; Zurücksetzen.

Im **Desklet** anschließend geprüft: Auswahlfeld und Hinweis wie im Applet; eine Messung mit von Hand gewähltem `speedtest-cli` über das Rechtsklick-Menü. Der Bericht wies `Gemessen von : aVincePulse Desklet`, `Programm : speedtest-cli (Speedtest.net)`, `Programmwahl : manuell gewählt` und `Jitter : nicht gemessen` aus; die Wertedatei enthielt `PROGRAMM=speedtest-cli` und `JITTER=--`.

Die Einstellungen des Nutzers waren nach allen Tests unverändert; hinzugekommen sind allein die beiden neuen Schlüssel `speedtest-programm` und `speedtest-vorhanden`, beide auf `auto`.

#### Lizenz- und Rechteprüfung

`08_LIZENZEN_RECHTE/SPEEDTEST-PROGRAMME.md` (Kriterium 11). Kernpunkte:

- aVincePulse **verteilt** keines der beiden Programme, sondern ruft ein vorhandenes Systemprogramm als eigenen Prozess auf. Eine Lizenzkopplung entsteht dadurch nicht; GPL-3.0 für den eigenen Code bleibt möglich. LGPL-3.0 und Apache-2.0 wären ohnehin beide GPLv3-vereinbar.
- **Offen geblieben:** Der Wortlaut der Nutzungsbedingungen von Ookla konnte am 20.09.2026 nicht geprüft werden – weder `speedtest.net/about/terms` noch `ookla.com/terms-of-use` waren aus der Entwicklungsumgebung erreichbar. Bewertung: Das Risiko liegt beim Betreiber des Programms, nicht beim Aufrufer; die Beziehung besteht zwischen dem Nutzer und Ookla. Vor der Einreichung nachzuholen.
- **Offen geblieben:** Das Projekt `sivel/speedtest-cli` wurde am **30.04.2026 archiviert** und wird nicht mehr gepflegt. Ändert Ookla seine Schnittstelle, hört es auf zu arbeiten. Das Ubuntu-Paket bleibt davon zunächst unberührt, und für aVincePulse ist der Ausfall verkraftbar – dann greift genau das Verhalten, das AP22 geschaffen hat.

### AP23 – Unterstützen-Hinweis, README und Lizenz

Abgeschlossen.

Dateien: `LICENSE` (neu), `README.md` und `README.de.md` (neu), `.github/FUNDING.yml` (neu), `docs/LIESMICH-SCREENSHOTS.txt` (neu), gemeinsames Modul `metrics.js`, `applet.js`, `desklet.js`, beide `settings-schema.json`, beide `metadata.json`.

Ziel, Akzeptanzkriterien und Verlauf stehen in Abschnitt 14.

#### Warum

Für eine Veröffentlichung fehlten die Projektunterlagen: Das Repository hatte **kein README und keine Lizenz** (`gh repo view` meldete `licenseInfo: null`). Ohne Lizenz gilt das volle Urheberrecht – niemand hätte den Code verwenden dürfen, und Cinnamon Spices nimmt nur freie Software auf. Die Texte entstehen vor der Übersetzung, weil sie mitübersetzt werden.

#### Lizenz

`LICENSE` enthält den unveränderten Text der GNU General Public License Version 3, 674 Zeilen. Die Fassung stammt aus `/usr/share/common-licenses/GPL-3` und wurde gegen `gnu.org/licenses/gpl-3.0.txt` geprüft: bitgenau identisch, SHA-256 `3972dc97…`.

Jede der zehn Quelldateien trägt nun einen Lizenzkopf mit Urheberzeile und der üblichen Kurzform. Gewählt wurde **GPL-3.0-only** – „version 3, as published by the Free Software Foundation", ohne die verbreitete Ergänzung „or any later version". Das entspricht genau dem, was der Nutzer freigegeben hat, und bindet nicht an künftige Lizenzfassungen, die heute niemand kennt.

Urheberzeile: `Copyright (C) 2026 Angelo Vincenti - aVince Industrietechnik`.

Nach dem Einsetzen sind die vier gemeinsamen Module weiterhin bitgenau identisch.

#### README in zwei Sprachen

`README.md` auf Englisch, `README.de.md` auf Deutsch, gegenseitig verlinkt. Englisch als Hauptfassung, weil GitHub und Cinnamon Spices es als Ausgangssprache erwarten; die deutsche Fassung ist die maßgebliche für den Nutzer.

Inhalt beider: Kurzbeschreibung, die beiden Bestandteile, Tabelle aller 15 Messwerte mit Quelle, Funktionsumfang, Warnschwellen, Voraussetzungen, der Speedtest und seine beiden Programme, Installation und Deinstallation, Ablageorte, Einstellungen, Support, Mitwirken, Lizenz.

Ausdrücklich genannt wird der Entwicklungsstand: Entwicklungsfassung, bisher nur auf einem Gerät geprüft, Oberfläche derzeit nur Deutsch, noch nicht eingereicht.

Die Installationsanleitung wurde trocken geprüft – lokaler Clone, die genannten Befehle ausgeführt, Ergebnis mit den erwarteten Dateien verglichen, Testverzeichnis wieder entfernt.

Die Screenshots fehlen noch. Ihre Bildverweise stehen in HTML-Kommentaren, damit GitHub keine kaputten Bilder anzeigt; `docs/LIESMICH-SCREENSHOTS.txt` sagt, welche Dateien erwartet werden und was danach zu tun ist.

#### Unterstützen-Hinweis

Neuer Abschnitt „Unterstützung" ganz unten in beiden Einstellungsfenstern, nach „Zurücksetzen": ein erklärendes `label` und die Schaltfläche „Unterstützen …". Kein Tooltip, da dieser bei Schaltflächen nie angezeigt wird (Befund aus AP17).

Der Browser öffnet nur nach einem Klick, über `Gio.AppInfo.launch_default_for_uri`. Das entspricht der Fensterregel aus Abschnitt 8 und der Regel von Cinnamon Spices, die einen Unterstützen-Link ausdrücklich erlaubt, sofern er den Benutzer nicht unterbricht: „no nag screens, pop-ups, repeated prompts, or features held back behind it inside the spice itself."

Sonst erscheint der Hinweis nirgends – keine Einblendung, keine Benachrichtigung, kein zeitgesteuerter Hinweis, keine Nutzungszählung, keine gesperrte Funktion.

Die Adresse steht als `UNTERSTUETZEN_URL` in `metrics.js` und damit an genau einer Stelle im Code, damit Applet und Desklet nicht auseinanderlaufen können.

`unterstuetzenUrlFehlt()` prüft den **Aufbau** der Adresse, nicht ihre Erreichbarkeit: Das Programm ruft nichts ab, um festzustellen, ob es etwas anzeigen darf. Ist die Adresse unbrauchbar, meldet die Schaltfläche das, statt einen Browser irgendwohin zu schicken.

#### Plattform

Ko-fi, Seite `ko-fi.com/avince`, Anzeigename „aVince Industrietechnik" (Entscheidung des Nutzers vom 20./21.09.2026). Die Abwicklung läuft über aVince Industrietechnik; **deutsche Umsatzsteuer fällt an**. Daraus folgt die durchgängige Wortwahl „Unterstützung" statt „Spende" – es handelt sich ohnehin nicht um eine Spende im steuerlichen Sinn.

Gegen Liberapay sprach, dass es laut eigener Auskunft nur für echte Spenden gedacht ist und nicht für Geschäftstransaktionen. Gegen GitHub Sponsors sprach der Zwang zu Stripe. Ko-fi nimmt auf Trinkgelder keine Plattformgebühr und lässt PayPal wie Stripe zu.

Der Benutzername ist bewusst `avince` und nicht `avincepulse`: Die Seite soll auch künftige Projekte tragen. Ebenso bewusst kleingeschrieben, da die Adresse dauerhaft in veröffentlichtem Code steht; die Schreibweise „aVince" erscheint im Anzeigenamen.

Als Profilbild dient das V-Signal-Logo aus `01_PNG_Iconset/aVincePulse_icon_512x512.png`. Der runde Beschnitt, den Ko-fi anwendet, wurde vorher nachgestellt und geprüft. Das Firmenlogo von avince.de schied aus: Es ist ein reiner Schriftzug, breit angelegt, und wäre im Kreis unlesbar.

**Zum Zeitpunkt des Abschlusses ist bei Ko-fi noch keine Zahlungsmethode verbunden.** Die Seite besteht, die Adresse ist gültig; Zahlungen sind erst möglich, wenn der Nutzer Stripe oder PayPal verbindet. Auf die Arbeit an aVincePulse hat das keinen Einfluss.

#### Nebenbefund zu Cinnamon

Cinnamon bietet keine Möglichkeit, ein Bedienelement des Einstellungsfensters zur Laufzeit auszublenden oder auszugrauen. Das ist in Abschnitt 8 unter „Bedienelemente der Einstellungen ein- und ausblenden" festgehalten; in AP23 wurde es nicht gebraucht, da der Unterstützen-Abschnitt immer sichtbar ist.

#### Prüfung

Syntax mit `cjs`, Namensprüfung, Prüfsummen der vier gemeinsamen Module, beide Schemata und `metadata.json` als JSON, `FUNDING.yml` als YAML.

Belegt statt angenommen: dass eine `function`-Deklaration in `metrics.js` wirklich aus dem Modul heraus erreichbar ist. Geprüft wurde das nicht am Vorbild bestehender Exporte allein, sondern durch Laden des Moduls mit `cjs`.

29 Prüfungen mit `cjs`, alle bestanden:

| Prüfung | Zahl |
|---|---|
| Modulexporte und Adresse, übrige Exporte unberührt | 16 |
| Neue Prüfung der Adresse, einschließlich unbrauchbarer Werte | 13 |

Beide READMEs wurden auf ihre Verweise geprüft: Jeder Verweis auf eine Datei im Repository trifft ein vorhandenes Ziel, und kein Bildverweis steht außerhalb eines Kommentars – die noch fehlenden Screenshots können deshalb keine kaputten Bilder erzeugen.

Funktionstest durch den Nutzer am 20./21.09.2026 in Applet und Desklet, alle vier Punkte bestanden: Abschnitt „Unterstützung" vorhanden und an der richtigen Stelle; Schaltfläche meldete bei noch fehlender Adresse verständlich, dass die Seite nicht eingerichtet ist, ohne einen Browser zu öffnen; „Zurücksetzen" lässt den Abschnitt unberührt; im laufenden Betrieb drängt sich nichts auf.

Die Einstellungen des Nutzers waren nach allen Tests unverändert. Eine Abweichung – Deckkraft der Hintergrundfläche im Desklet von 30 auf 0 Prozent – stammt nachweislich aus dem Funktionstest der Schaltfläche „Auf Standardwerte zurücksetzen"; danach standen alle 13 Werte genau auf den Vorgaben des Schemas.

#### Befund während des Funktionstests: das Mausrad verstellt Auswahlfelder

Der Wertevergleich nach dem Test zeigte zwei Änderungen, die weder
geplant noch bewusst vorgenommen waren: Im Applet stand `sensor-cpu`
auf `pch_skylake` und `sensor-storage` auf `coretemp` statt jeweils auf
„Automatisch". Das Applet zeigte damit als „SSD" die CPU-Temperatur.

Ursache: Beim Scrollen zum Unterstützen-Abschnitt lief das Mausrad über
die Auswahlfelder. Vom Nutzer bestätigt. Einzelheiten und Folgen für
künftige Arbeiten stehen in Abschnitt 8 unter „Das Mausrad verstellt
Auswahlfelder".

Behoben durch „Auf Standardwerte zurücksetzen" in beiden Bestandteilen;
danach standen alle 16 bzw. 15 Werte genau auf den Schema-Vorgaben.

Der Befund ist keine Folge von AP23 – er bestand seit AP09, als die
ersten Auswahlfelder hinzukamen, und fiel erst jetzt auf, weil das
Einstellungsfenster durch den neuen Abschnitt am unteren Ende länger
wurde und deshalb gescrollt werden musste.

#### Nachtrag vom 21.09.2026: README-Prüfung und Bereinigung

Auf Wunsch des Nutzers wurden beide READMEs Abschnitt für Abschnitt
gegen den Quellcode geprüft. Struktur, Umfang und Stil blieben
unverändert; geändert wurde nur, wo eine Aussage nicht stimmte oder zu
weit ging. Dabei fielen drei Sachfehler auf.

**Die Installationsanleitung war fehlerhaft.** `cp -r quelle ziel`
kopiert **in** das Ziel hinein, sobald dieses existiert. Beim zweiten
Aufruf – also bei jedem Update – entstand ein Unterverzeichnis
`Applet/` bzw. `Desklet/` mit einer vollständigen zweiten Kopie.
Praktisch nachgestellt:

```
1. Aufruf:  …/avincepulse-applet@avince/applet.js          richtig
2. Aufruf:  …/avincepulse-applet@avince/Applet/applet.js   verschachtelt
```

Ersetzt durch `rsync -a --delete` mit abschließenden Schrägstrichen.
Das löst zugleich das zweite Problem: Dateien, die es in einer neuen
Fassung nicht mehr gibt, blieben bisher liegen. Dass `rsync` auf Mint
ab Werk vorhanden ist, wurde über `/var/log/installer/initial-status.gz`
belegt. Einstellungen, Berichte und Speedtest-Werte sind nicht
gefährdet, da sie außerhalb der Programmverzeichnisse liegen.

**Widerspruch beim Jitter.** Die READMEs sagten, aVincePulse übernehme
„ausschließlich die vier Messwerte". Bei `speedtest-cli` werden aber
nur drei gemessen; `JITTER` wird als `"--"` geschrieben. Jetzt
präzisiert: Download, Upload und Ping sowie Jitter, sofern verfügbar.

**„Speicher-Temperatur" war zu eng und mehrdeutig.** Die
Sensorbewertung erkennt neben `nvme` auch den Chip `drivetemp`, also
SATA-SSDs und klassische Festplatten. Zudem stand der Begriff direkt
neben „Arbeitsspeicher". Jetzt **„Datenträgertemperatur"**.

Weiter ergänzt: die Einschränkung, dass `Alt`+`F2`, `r` unter Wayland
nicht funktioniert (belegt in `/usr/share/cinnamon/js/ui/main.js:1616`,
„Cinnamon restart not supported with Wayland") und dass nur X11 geprüft
ist; die Sperrdatei und die beiden Berichtsunterordner in der
Ablagetabelle; ein Absatz dazu, was Cinnamon beim Entfernen mit den
Einstellungen macht (sie bleiben beim Entfernen aus dem Panel, da
`max-instances` 1 ist, und werden beim vollständigen Entladen
gelöscht). Die Formulierung „Auf jedem Hintergrund lesbar" wurde
zurückgenommen – ein absolutes Versprechen, das die Kontrastmessungen
aus AP20 nicht decken.

Die englische Fassung wich an zwei Stellen inhaltlich ab: Sie kündigte
„English **and German** translations" an, obwohl Deutsch bereits
vorliegt, und beschrieb die Touchscreen-Bedienung unnatürlich. Beides
an die deutsche Master-Fassung angeglichen. Geprüft wurde außerdem die
Sprachvariante: durchgängig britisch (`colour`, `centre`; die drei
„license"-Treffer sind das Verb, der Eigenname der GPL und der
Dateiname).

**Codeänderung: Zugriff auf einen fremden Einstellungsordner
entfernt.** `speedtest.js` las bei fehlender eigener Wertedatei aus
`~/.config/cinnamon/spices/avince-hwmonitor@angelo/speedtest-values` –
dem Altstand der Baseline. Das war eine Übergangshilfe für die
Entwicklungsmaschine; auf jedem anderen Rechner existiert das
Verzeichnis nicht, und in den Einstellungsordner eines fremden Xlets zu
greifen wäre für eine Einreichung bei Cinnamon Spices nicht angebracht.
`leseWerte()` schrumpft damit von zwölf auf eine Zeile, `_alterPfad()`
entfällt. Fehlt die eigene Datei, wird schlicht noch nichts angezeigt.

Geprüft: Syntax, vier gemeinsame Module weiterhin bitgenau identisch,
fünf `cjs`-Prüfungen für `leseWerte()` einschließlich des Falls, dass
die Datei fehlt; Installationsbefehle gegen einen frischen Clone
zweimal hintereinander ausgeführt; Abschnittsvergleich beider READMEs
(13 Abschnitte, gleiche Reihenfolge, gleiche Zahl an Tabellen,
Codeblöcken und Verweisen). Funktionstest durch den Nutzer: Nach einem
Cinnamon-Neustart zeigten Applet und Desklet die gespeicherten
Speedtest-Werte unverändert, keine Zeile sprang auf `--`.

Version, Tag und Backup bleiben unberührt: Das Backup von 06:51 Uhr
enthält den Code bereits, und die Änderung ist zu klein für ein eigenes
Arbeitspaket (Vorgehen wie beim Nachtrag zu AP20).

#### Offen geblieben

- **Screenshots** für beide READMEs; der Nutzer liefert sie nach. Bis dahin sind die Bildverweise auskommentiert.
- **Zahlungsmethode bei Ko-fi** noch nicht verbunden.
- **Changelog** bewusst nicht angelegt; die GitHub-Releases erfüllen den Zweck vorläufig.
- **`Entwicklungsstand: 0.1.0-dev`** steht unverändert im Kopf aller zehn Quelldateien und ist seit AP01 nicht mitgezogen worden. Die richtige Version steht in `metadata.json`. Vorschlag für ein späteres Paket: die Zeile ersatzlos streichen, statt sie bei jedem Arbeitspaket an zehn Stellen nachzuziehen.

### AP24 – Übersetzung Deutsch/Englisch

Abgeschlossen.

Dateien: beide `settings-schema.json`, beide `metadata.json`, `applet.js`, `desklet.js`, alle vier gemeinsamen Module; neu `02_QUELLCODE/Applet/po/` und `02_QUELLCODE/Desklet/po/` mit je `<uuid>.pot` und `de.po`.

Ziel und Akzeptanzkriterien stehen in Abschnitt 14.

#### Umfang

**442 Textstellen** wurden auf Englisch umgestellt: 191 in Schemata und Metadaten, 251 im Quellcode. Die Schätzung vorab lag bei 310 und war zu niedrig – das erste Suchmuster hatte nur Zeichenketten mit deutschen Merkmalen erfasst und einzelne Wörter wie „verbunden", „getrennt" oder „automatisch" übersehen.

#### Gerüst

Applet und Desklet binden gettext mit der UUID als Domäne. Die vier gemeinsamen Module kennen die UUID nicht und dürfen sie nicht kennen, da sie bitgenau identisch bleiben müssen; sie bekommen die Übersetzungsfunktion deshalb übergeben – dasselbe Muster wie beim HardwareDetector seit AP08. Ohne gesetzten Übersetzer bleibt der englische Ausgangstext stehen.

`fuelle(_("… %s …"), wert)` ersetzt die früheren Verkettungen. Meldungen werden als ganzer Satz übersetzt, nicht in Stücken – nur so kann eine andere Sprache die Wortstellung ändern. Geschrieben wird stets `_()` direkt, damit xgettext die Vorlage findet.

#### Berichte

Trennlinien und Spaltenbreiten standen fest im Code – 22 Striche unter einer Überschrift mit 22 Zeichen, `padEnd(16)` für eine Spalte. Sobald ein Text übersetzt wird, ändert sich seine Länge und die Formatierung verrutscht. Beides wird jetzt aus dem Inhalt berechnet (`unterstreiche()` und `tabelle()` in den drei Berichtsmodulen). Entscheidung des Nutzers vom 21.09.2026: Berichte werden mitübersetzt, mit sauberer Formatierung.

#### Nicht übersetzbar: die Listenspalten

**Cinnamon kann die Beschriftungen in den Spalten einer Liste nicht übersetzen.** Betroffen sind 21 Texte je Komponente: die 15 Messwertnamen der Messwertliste („CPU temperature (default: CPU)") und die 6 Namen der Warnschwellenliste.

Beide denkbaren Wege wurden geprüft und scheitern:

- **`setOptions()`** setzt `settingsData[key].options`, also die Optionen des Schlüssels selbst. Eine Liste hat dort keine, nur in ihren Spalten; der Aufruf liefe in `options_not_supported_error`.
- **Über die `.pot`** geht es nicht, weil `xlet-settings.py` bei Spalten ausschließlich `column["title"]` durch `translate()` schickt. In `TreeListWidgets.py`, das die Listen zeichnet, kommt `translate` kein einziges Mal vor. `cinnamon-xlet-makepot` erfasst die Texte folgerichtig gar nicht erst: Die Rekursion in die Spalten scheitert an einem `AttributeError`, weil Spalten eine Liste und kein Objekt sind, und wird stillschweigend abgefangen.

Praktisch belegt: `dgettext("Drive temperature  (default: SSD)")` kommt unübersetzt zurück, weil der Text nicht in der `.mo` steht.

Die Namen bleiben deshalb englisch. Das betrifft jedes Spice mit Listen, nicht nur aVincePulse. Vom Nutzer am 21.09.2026 geprüft und als hinnehmbar bezeichnet.

#### Cinnamon übersetzt bekannte Begriffe selbst

Findet `translate()` im Katalog des Xlets nichts, greift es am Ende auf Cinnamons eigenen Katalog zurück (`return _(string)`). Begriffe, die Cinnamon selbst kennt – *Appearance*, *Panel*, *Hardware*, *Font size*, *seconds* – erscheinen dadurch in der Systemsprache, auch ohne eigene Übersetzung. Das ist derselbe Effekt wie der Nebenbefund aus AP12, wo aus `Hardware` von allein `Geräte` wurde.

Im Betrieb ist das erwünscht: Diese Begriffe lauten dann wie überall sonst in Cinnamon. Es bedeutet aber, dass ein Test über `cinnamon-xlet-makepot -r` kein reines Englisch zeigt, solange die Systemsprache Deutsch ist.

#### Zwei Fehler, die die Übersetzung erzeugt hätte

- **Ein Filter hing am deutschen Wortlaut.** `_auswahlKennzeichen()` filterte mit `text.startsWith("Nicht ")`. Nach der Übersetzung hätte das nicht mehr gegriffen, und ein „Not found"-Eintrag wäre ins Änderungskennzeichen eingegangen – mit der Folge grundloser Rückfragen „Fenster neu öffnen?". Erkannt wird er jetzt daran, dass die Beschriftung genau der übersetzten Vorlage mit diesem Wert entspricht. Das funktioniert auch in Sprachen, die den Platzhalter voranstellen.
- **„Speicher-Temperatur" war im Schema stehen geblieben.** Der Nachtrag zu AP23 hatte den Begriff nur in den READMEs zu „Datenträgertemperatur" geändert. Beim Erzeugen der `de.po` fiel auf, dass die Rückübersetzung wieder den alten Begriff ergab; jetzt einheitlich.

#### Vom Funktionstest des Nutzers gefunden

Der Menüeintrag „Internet-Speedtest starten" stand ohne `_()` im Code – in beiden Komponenten. Das erste Suchmuster hatte ihn übersehen, weil der Text keinen Umlaut enthält. Beim gründlichen Nachsuchen kamen vier weitere Stellen zutage: die Meldung „Die Hardwareerkennung ist fehlgeschlagen.", `NOT FOUND`, `NOT FOUND (system without battery)` und `unlabeled` im Hardwarebericht.

**Lehre:** Nach einer Umstellung nicht nach deutschen Merkmalen suchen, sondern nach allen Zeichenketten, die **außerhalb** eines `_()`-Aufrufs stehen. Protokollzeilen (`global.log`) sind dabei auszunehmen, sie bleiben unübersetzt.

#### Prüfung

Syntax mit `cjs`, Namensprüfung, Prüfsummen der vier gemeinsamen Module, Schemata und Metadaten als JSON, beide `de.po` mit `msgfmt -c`.

| Prüfung | Applet | Desklet |
|---|---|---|
| Einträge in der `.pot` | 179 | 170 |
| davon übersetzt | 100 % | 100 % |
| leere oder `fuzzy` Einträge | 0 | 0 |
| Platzhalter `%s` stimmen überein | ja | ja |
| `_()`-Aufrufe im Code, alle in der `.pot` | 109 | 107 |
| Schema-Texte, alle in der `.pot` | 69 | 62 |

Die gespeicherten Einstellungen haben die Umstellung unverändert überstanden: In den Listen stehen Messwert-IDs, keine Beschriftungen. Alle 16 bzw. 15 Werte waren nach dem Neustart identisch mit der Sicherung.

Funktionstest durch den Nutzer am 21.09.2026 in beiden Komponenten, umgeschaltet über `cinnamon-xlet-makepot -i` und `-r` ohne Eingriff in die Systemsprache.

#### Nicht enthalten

Weitere Sprachen außer Deutsch und Englisch (Entscheidung des Nutzers vom 21.09.2026). Die `.pot` ist die Einladung an Muttersprachler; Cinnamon Spices hat dafür ein eigenes Verfahren.

### AP25 – Abschlussprüfung vor der Einreichung

21. bis 23.09.2026. **Prüfung abgeschlossen, Phase 3 offen.**

Umfang wie AP19, zusätzlich Installation und Deinstallation, Abgleich
gegen die Cinnamon-Spices-Vorgaben, Rechte- und Namensfragen, ein
echter Speedtest je Programm – und erstmals ein **Test auf einem
zweiten Gerät**.

35 Befunde aus der Code-Durchsicht, keiner kritisch; neun weitere vom
Zweitgerät. Einzelheiten in Abschnitt 14, vollständig in
`PRUEFBERICHT_AP25.md`.

Aus diesem Paket stammen drei Regeln in Abschnitt 8: das gemessene
Laufwerk gehört zur Hardwareerkennung, Gerätenamen aus `/sys` sind
nicht zugesichert, und eine zurückgespielte Einstellungsdatei erreicht
die laufende Komponente nicht.

### AP26 – die drei Punkte aus der Spices-Prüfliste

**Abgeschlossen am 23.09.2026.** Ziele, Akzeptanzkriterien und
Ergebnis in `05_DOKUMENTATION/AP26-ZIELE.md`.

Das letzte Paket vor der Einreichung. Es arbeitet die drei in AP25
zurückgestellten Befunde ab, die wörtlich in der Prüfliste der
Gutachter stehen, ergänzt das Lizenzfeld und trifft die offene
Entscheidung zu den übersetzten Protokollzeilen.

| Punkt | Inhalt |
|---|---|
| **S1/P14** | alle Dateisystemabfragen asynchron; die beiden Abfragen je Takt zu einer zusammengefasst |
| **S3** | 16 Rückgabewerte in 15 Zeitgebern auf `GLib.SOURCE_REMOVE`/`SOURCE_CONTINUE` |
| **S4** | **nicht geändert**, nur im Code begründet – der Takt folgt der Systemuhr (AP15) |
| Protokollzeilen | `_quelleKennung` (fest) fürs Protokoll, `_quelle` (übersetzt) bleibt im Bericht |
| Lizenzfeld | `"license": "GPL-3.0-only"` in beide `info.json` |

Geprüft: Syntax 10/10, **430 Prüfungen in acht Skripten, 0 Fehler**,
Funktionstest im laufenden Cinnamon, beide Einreichungspakete neu
gebaut mit „No errors found".

**Der wertvollste Einzelnachweis:** Applet und Desklet messen mit
einem Versatz von **0 ms**. Damit ist die Entscheidung, den
Takt-Zeitgeber nicht auf einen periodischen umzustellen (S4), nicht
nur begründet, sondern belegt.

Aus diesem Paket stammen drei Regeln in Abschnitt 8: Dateisystem­
abfragen laufen asynchron, ein übersetzter Text taugt nicht als
Protokollwert, und Zeitgeber-Rückgabewerte werden benannt.

### AP27 – die beiden Punkte aus dem Abschluss-Audit

**Abgeschlossen am 26.09.2026.** Ziele, Akzeptanzkriterien und
Ergebnis in `05_DOKUMENTATION/AP27-ZIELE.md`, der Zweitgerätelauf in
`AP27-TOWERTEST.md`.

Vor der Einreichung wurde der gesamte Quellcode einem unabhängigen
technischen Abschluss-Audit unterzogen – 6.900 Zeilen, beide Schemata,
beide Übersetzungen, Metadaten und Einreichungspakete. Ergebnis: zwei
Punkte, die vor der Veröffentlichung besser aufgehoben sind als danach.

| Punkt | Inhalt |
|---|---|
| **Cinnamon-Untergrenze** | `"cinnamon-version": ["6.6"]` in beide `metadata.json` |
| **Akku-Zeile** | `_readBatteryCharge()` gegen eine leere `capacity`-Datei abgesichert |

**Zur Untergrenze.** Das Feld ist eine Untergrenze, kein Bereich:
`versionCheck()` liefert `true`, sobald die laufende Fassung größer
oder gleich **einer** der angegebenen ist. Ohne das Feld wird gar
nichts geprüft. 6.6 statt 6.2, weil sich eine Grenze später gefahrlos
**senken** lässt – sie anzuheben entzöge das Spice Nutzern, die es
bereits haben. Pflicht ist das Feld für Applets und Desklets nicht.

**Zur Akku-Zeile.** `_readFile()` endet auf `trim()` und liefert bei
einer leeren Datei `""`, nicht `null`. Die Prüfung auf `!== null` ließ
das durch, `Number("")` war `0`, und die Anzeige stand auf „0 %" –
im Akkubetrieb dauerhaft kritisch rot. Dieselbe Falle wie P1, P6, P7,
P8 und P9 aus AP25; diese Stelle war dort übersehen worden.

**Der Fix ist belegt, nicht behauptet.** `gegenprobe.js` führt
dieselben Fälle gegen die Fassung vor der Änderung: leere `capacity`
ergab „0", Leerzeichen ergaben „0", und leere `capacity` mit gültigen
`charge_now`/`charge_full` ergab „0" statt „50" – die Ersatzrechnung
wurde nie erreicht.

Geprüft: Syntax 10/10, **494 Prüfungen in neun Skripten, 0 Fehler**,
Funktionstest auf beiden Geräten, beide Einreichungspakete neu gebaut
mit „No errors found".

**Auf dem Tower kam ein ungeplanter Nachweis dazu:** Die
hwmon-Nummerierung hatte sich gegenüber dem 23.09.2026 erneut
verschoben – Linux-SSD von `hwmon2` auf `hwmon1` –, und die Automatik
traf beide Male die richtige Platte. Ein dritter unabhängiger Beleg
für B1, B9 und P10.

## 7. Aktuelle Quellcode-Architektur des Desklets

Wesentliche Dateien:

- `desklet.js` – UI, Refresh, Darstellung, Popup-Handoff; baut die Anzeigezeilen aus `METRIC_ORDER` auf
- `metrics.js` – Messwertmodell und Reihenfolge
- `measurement.js` – Messlogik und Laufzeitwerte
- `hardwareDetection.js` – dynamische Hardware-/Sensorerkennung, Akku- und Netzteilerkennung, Verfügbarkeitsmeldung
- `speedtest.js` – Ausführung, Ablage und Rückmeldung des Internet-Speedtests; kennt seit AP22 mehrere unterstützte Programme mit je eigener Auswertung
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

### Prüfung fremder Eingaben

`Number()` allein genügt nie, um einen Wert aus einer fremden Quelle zu
prüfen: `Number(null)`, `Number(false)`, `Number("")` und `Number([])`
ergeben jeweils `0`. Ein fehlendes Feld in der Ausgabe eines externen
Programms erschiene damit als gültige Null. Zu prüfen ist zusätzlich der
Typ – Zahl oder nicht leerer Text. Festgestellt in AP22 beim Test der
Speedtest-Auswertung.

### Fenster

Festgelegt vom Nutzer am 18.09.2026: aVincePulse öffnet oder schließt Fenster nur nach einer Benutzeraktion und nur mit vorherigem Hinweis bzw. Rückfrage. Meldungen in der Bildschirmmitte (`StatusAnzeige`) sind davon ausgenommen. Die Regel gilt auch für künftige Funktionen, etwa den zeitgesteuerten Speedtest oder Benachrichtigungen.

### Übersetzung: worauf zu achten ist

Aus AP24, verbindlich für jeden neuen sichtbaren Text:

- **Jeder sichtbare Text läuft über `_()`.** Protokollzeilen (`global.log`)
  und Code-Kommentare bleiben unübersetzt.
- **Ganze Sätze übersetzen, keine Fragmente.** `fuelle(_("… %s …"), wert)`
  statt Verkettung mit `+`. Eine andere Sprache muss die Wortstellung
  ändern können.
- **Kein Vergleich auf sichtbaren Text.** Ein `startsWith("Nicht ")`
  bricht, sobald übersetzt wird. Wo eine Beschriftung wiedererkannt
  werden muss, gegen die gefüllte Vorlage vergleichen.
- **Keine festen Trennlinien und Spaltenbreiten** in Berichten. Beides
  aus dem Inhalt berechnen, sonst verrutscht die Formatierung mit
  jeder Sprache.
- **Nach einer Umstellung nach Zeichenketten außerhalb von `_()`
  suchen**, nicht nach deutschen Merkmalen. Ein Text ohne Umlaut wird
  sonst übersehen – so geschehen mit dem Menüeintrag.
- **Cinnamon kann Beschriftungen in Listenspalten nicht übersetzen**
  (`options` innerhalb von `columns`). Weder `setOptions()` noch die
  `.pot` helfen. Neue Listen dieser Art sollten das berücksichtigen.
- **Cinnamon übersetzt bekannte Begriffe selbst**, wenn das Xlet keine
  eigene Übersetzung dafür hat (`translate()` fällt auf `_(string)`
  zurück). *Appearance*, *Panel*, *Hardware* und Ähnliches erscheinen
  deshalb auch ohne eigenen Eintrag in der Systemsprache.

Die Übersetzung erproben, ohne die Systemsprache umzustellen:

```bash
cinnamon-xlet-makepot -i <uuid>/     # Übersetzung installieren
cinnamon-xlet-makepot -r <uuid>/     # wieder entfernen
```

Danach jeweils Cinnamon neu starten. Werkzeug: `cinnamon-xlet-makepot`
braucht das Paket `python3-polib`.

### Verzeichnisse kopieren: `cp -r` ist nicht wiederholbar

Festgestellt am 21.09.2026 bei der Prüfung der Installationsanleitung.

`cp -r quelle ziel` legt das Ziel an, wenn es fehlt – kopiert aber
**in** das Ziel hinein, sobald es existiert. Ein zweiter Aufruf erzeugt
deshalb `ziel/quelle/…`. Für Anleitungen, die auch als Update taugen
sollen, ist der Befehl damit ungeeignet. Ebenso wenig entfernt er
Dateien, die es in der neuen Fassung nicht mehr gibt.

Richtig ist `rsync -a --delete quelle/ ziel/` mit abschließenden
Schrägstrichen: Er kopiert den Inhalt, räumt Veraltetes weg und liefert
bei jedem Aufruf dasselbe Ergebnis. `rsync` gehört auf Linux Mint zur
Erstinstallation (nachprüfbar in `/var/log/installer/initial-status.gz`).

### Das Mausrad verstellt Auswahlfelder

Festgestellt am 21.09.2026 in AP23, vom Nutzer bestätigt.

Fährt das Mausrad im Einstellungsfenster über ein Auswahlfeld, einen
Regler oder ein Zahlenfeld, **verstellt es dessen Wert**, statt die
Seite zu scrollen. Das ist Standardverhalten von GTK3 und betrifft
jedes Spice; Cinnamon unternimmt nichts dagegen. In
`JsonSettingsWidgets.py`, `SettingsWidgets.py` und `xlet-settings.py`
gibt es keine einzige Behandlung von Scroll-Ereignissen.

aVincePulse ist davon besonders betroffen: Das Applet hat neun
Auswahlfelder und drei Regler bzw. Zahlenfelder, das Desklet acht und
drei, alle in einem scrollbaren Fenster.

Der Fall in AP23: Beim Scrollen zum Unterstützen-Abschnitt sprang
`sensor-cpu` auf den letzten Eintrag seiner Liste (`pch_skylake`) und
`sensor-storage` zwei Einträge weiter auf `coretemp`. Das Applet zeigte
danach als „SSD" die CPU-Temperatur — 77 statt 38 °C, was zusätzlich
die Warnschwelle der SSD (70/80 °C) grundlos ausgelöst hätte.

**Behebbar ist das in aVincePulse nicht.** Das Einstellungsfenster
gehört Cinnamon; das Projekt liefert nur das Schema.

Folgen für die Arbeit:

- **Beim Testen nicht mit dem Mausrad im Einstellungsfenster scrollen.**
  Stattdessen den Rollbalken ziehen oder das Fenster vergrößern.
- **Nach jedem Test im Einstellungsfenster die gespeicherten Werte
  gegen die Schema-Vorgaben vergleichen**, nicht nur gegen die
  Sicherung. Sonst bleibt eine versehentliche Verstellung unbemerkt.
- Vor der Einreichung zu bewerten, ob sich die Zahl der Auswahlfelder
  verringern lässt oder ob ein Hinweis im README angebracht ist.

### Bedienelemente der Einstellungen ein- und ausblenden

Cinnamon bietet keine Möglichkeit, ein Bedienelement des
Einstellungsfensters zur Laufzeit auszublenden oder auszugrauen;
`setSensitive` und `setVisible` gibt es in der Einstellungs-API nicht
(`/usr/share/cinnamon/js/ui/settings.js` kennt nur `getValue`,
`setValue` und `setOptions`).

Ausgewertet wird ausschließlich `dependency` im Schema, und zwar gegen
gespeicherte Einstellungswerte. Dahinter steht ein `Gtk.Revealer`, der
ein- und ausblendet statt auszugrauen; Negation mit `!schluessel` und
Vergleiche wie `schluessel=wert` werden unterstützt
(`JSONSettingsRevealer` in
`/usr/share/cinnamon/cinnamon-settings/bin/JsonSettingsWidgets.py`).

Soll etwas von einem Zustand abhängen, den nur der Code kennt, braucht
es deshalb einen Schlüssel vom Typ `generic` – ohne eigenes
Bedienelement –, den die Komponente mit `setValue()` setzt. So gelöst in
AP22 für `speedtest-vorhanden`.

### Hardwareerkennung: das gemessene Laufwerk gehört dazu

Aus AP25, Befund B8. **Wer einen `HardwareDetector` erzeugt, muss ihm
auch das gemessene Laufwerk nennen:**

```js
detector.setzeLaufwerkGeraet(this._measurement.laufwerkGeraet());
```

Sonst fällt die Wahl des Speichersensors bei zwei gleichartigen
Platten auf den zuerst gefundenen zurück, und angezeigt werden
Temperatur und freier Platz **verschiedener** Laufwerke – ohne jeden
Hinweis darauf.

Es gibt zwei Erzeugungsstellen je Komponente: im Konstruktor und in
`on_hardware_neu_erkennen()`. Die zweite wurde beim Einbau übersehen.
`test_b7_b8.js` zählt deshalb Erzeugungsstellen gegen Zuordnungen und
schlägt an, wenn eine dritte ohne Zuordnung hinzukommt.

Der Aufruf gehört **vor** `_aktualisiereSensorOptionen()`, sonst trägt
das Auswahlfeld den Eintrag „Automatisch (…)" noch mit dem falschen
Sensor ein.

### Gerätenamen aus `/sys` sind nicht zugesichert

Aus AP25, Befund B9. Der Kernel vergibt Namen wie `nvme0` oder
`hidpp_battery_22` **in der Reihenfolge, in der er die Geräte findet**.
Beides wurde im Betrieb beobachtet:

- Auf dem Zweitgerät war `nvme0` am Vormittag die Linux-SSD, nach
  einem Neustart die Windows-SSD.
- Auf dem Referenzgerät hieß der Maus-Akku am Vormittag
  `hidpp_battery_22`, am Abend `hidpp_battery_24`.

**Was gespeichert wird, braucht ein Merkmal der Hardware**, keine
Zählung. `_stabileKennung()` bevorzugt deshalb die Seriennummer aus
`<hwmon>/device/serial` und fällt nur ohne sie auf den Gerätenamen
zurück.

Der Gerätename bleibt daneben erhalten – für die Anzeige und für den
Laufwerksabgleich aus B1. Beides sind verschiedene Aufgaben und
brauchen verschiedene Angaben.

**Ein Text, der dem Nutzer Stabilität zusagt, muss diese Bedingung
nennen.** Der Hardwarebericht behauptete bis zum 23.09.2026
„Kennung: bleibt nach einem Neustart gleich" – auf einem Rechner mit
zwei NVMe war das falsch.

### Eine Einstellungsdatei zurückzuspielen erreicht die laufende Komponente nicht

Aus AP25, Phase 2. Beim Versuch, einen Wert nach einem Test wieder zu
setzen, standen Datei und laufendes Applet auseinander; auch
`settings.getValue()` lieferte den alten Wert. Die Formatierung schied
als Ursache aus – die Datei blieb bis auf den einen Wert zeichengleich.

Cinnamon hält die Einstellungen im Speicher und liest die Datei für
eine gebundene Einstellung im laufenden Betrieb nicht neu.

**Gefährlich daran:** Der nächste Schreibvorgang Cinnamons kippt die
Datei zurück. Die Regel aus Abschnitt 9 „Datei vorher sichern, danach
wiederherstellen" ist deshalb zu ergänzen: Das Zurückspielen allein
genügt nicht. Entweder die Komponente danach neu laden, oder den Wert
über das Einstellungsfenster setzen – also über denselben Weg wie der
Nutzer, was die bestehende Regel ohnehin verlangt.

### Dateisystemabfragen laufen asynchron

Aus AP26, Befunde S1 und P14. Die Prüfliste der Cinnamon-Spices-
Gutachter sagt zu synchronen Zugriffen: „avoided **at all costs** –
this includes file operations, network calls, subprocess execution and
dbus/ipc calls."

Der Grund ist bei `query_filesystem_info()` greifbar: Der Aufruf läuft
im Hauptthread, und bei einem hängenden USB- oder Netzlaufwerk fror
die Oberfläche ein – alle drei Sekunden erneut.

**Für jede neue Dateisystemabfrage gilt deshalb:**

- `query_filesystem_info_async()` statt `query_filesystem_info()`
- **alle benötigten Attribute in einem Aufruf.** Vorher fragten
  `readStorageFree()` und `readStorageFreeAnteil()` getrennt ab, also
  zweimal je Takt und zweimal über `_laufwerk()`.
- Das Ergebnis in einen Zwischenspeicher (`_platzSpeicher`), aus dem
  alles liest, was synchron bleiben muss.

**Was synchron bleiben darf**, sind `/proc`, `/sys` und kleine eigene
Dateien – sie fallen unter dieselbe Regel, sind aber praktisch
unbedenklich. In AP25 unter S1 ausdrücklich so bewertet.

**Nicht jede Stelle muss asynchron werden, um asynchron zu sein.** Wo
ein Wert nur in einer *Beschriftung* steht und nicht in einem *Wert*,
genügt es, die Beschriftung nachzuziehen. So gelöst beim
Laufwerk-Auswahlfeld: `_auswahlKennzeichen()` vergleicht ausschließlich
Werte, und die Rückfrage zum Neu-Öffnen des Fensters (AP16) musste
deshalb nicht in einen Rückruf wandern.

### Ein übersetzter Text taugt nicht als Protokollwert

Aus AP26. `_quelle[art]` in `hardwareDetection.js` diente zwei Zwecken:
dem Hardwarebericht, den der Nutzer liest, und den Protokollzeilen
`AP05` und `AP14`. Der Bericht soll übersetzt sein, das Protokoll nicht
– auf einem englischen System stand dort `automatic`, auf einem
deutschen `automatisch`. Wer ein Protokoll nach einem festen Wort
durchsucht, fand es nicht.

**Wer einen Wert sowohl anzeigt als auch protokolliert, braucht zwei
Fassungen:** einen übersetzten für die Anzeige und eine feste,
unübersetzte Kennung fürs Protokoll (`_quelleKennung`: `auto`,
`manual`, `auto-fallback`).

Das ergänzt die Regel „Protokollzeilen bleiben unübersetzt": Sie gilt
nicht nur für den Satzbau, sondern auch für jeden **Wert** darin.

### Zeitgeber geben benannte Werte zurück

Aus AP26, Befund S3. `return false` und `return true` in einem
Zeitgeber-Rückruf sind zwar richtig, sagen aber nicht, was sie
bewirken. Die Prüfliste der Gutachter verlangt
`GLib.SOURCE_REMOVE` und `GLib.SOURCE_CONTINUE`.

Zu unterscheiden ist der Rückgabewert des **Rückrufs** vom Rückgabewert
der **umgebenden Funktion**: In `applet.js` und `desklet.js` steht je
ein `return true`, das nicht zum Zeitgeber gehört und unverändert
bleibt.

`test_ap26.js` schneidet jeden `timeout_add`- und `idle_add`-Aufruf
aus dem Quelltext und prüft seinen Rückgabewert einzeln. Kommt ein
Zeitgeber hinzu, schlägt die Zählung an.

### Eine Datei kann vorhanden und trotzdem leer sein

Aus AP27. `_readFile()` endet auf `trim()`. Bei einer **fehlenden**
Datei liefert es `null`, bei einer **vorhandenen, aber leeren** einen
leeren Text. Eine Prüfung auf `!== null` fängt deshalb nur den ersten
Fall.

```js
// falsch - "" kommt durch, Number("") ist 0
const roh = this._readFile(pfad);
if (roh !== null) { const w = Number(roh); ... }

// richtig
const w = this._zahlOderNull(this._readFile(pfad));
if (w !== null) { ... }
```

**Jeder Rohwert aus `/proc` oder `/sys` gehört durch
`_zahlOderNull()`**, nie durch `Number()` allein. Das gilt auch dort,
wo vorher schon auf `null` geprüft wird.

Im Abschluss-Audit vor der Einreichung wurden alle 30
`Number()`-Aufrufe einzeln durchgesehen. Ein einziger war ungeschützt –
der Ladezustand des Akkus –, und er hätte auf einem Gerät mit leerer
`capacity`-Datei dauerhaft „0 %" und kritisch rot gezeigt.

### Deklarierte Cinnamon-Untergrenze

Aus AP27. `"cinnamon-version"` in `metadata.json` ist eine
**Untergrenze, kein Bereich**: `versionCheck()` in
`/usr/share/cinnamon/js/ui/extension.js` liefert `true`, sobald die
laufende Fassung größer oder gleich **einer** der angegebenen ist. Ein
einziger Eintrag genügt, und nach oben wird nie etwas ausgeschlossen.

Fehlt das Feld, wird gar nichts geprüft – `extension.js` wertet es nur
aus, wenn es da ist, und `ExtensionCore.py` fällt im Zweifel auf
„kompatibel" zurück.

**Pflicht ist es für Applets und Desklets nicht.** Nur
`Type.EXTENSION` führt es unter `requiredProperties`, und
`validate-spice` verlangt es nicht.

**Beim Ändern gilt:** Senken ist gefahrlos und lässt mehr Nutzer
hinzu. Anheben entzieht das Spice denen, die es schon verwenden. Im
Zweifel eng anfangen.

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

0. Versionsnummer in `02_QUELLCODE/Applet/metadata.json` und `02_QUELLCODE/Desklet/metadata.json` setzen und in beide Testinstallationen übertragen. Das Info-Fenster von Applet und Desklet zeigt dadurch, welcher Stand installiert ist.

   **Seit AP28 gilt die Zählung nach Semantic Versioning.** Die Einreichungsfassung trägt `0.1.0`; darauf folgen `0.1.1` für Fehlerbehebungen, `0.2.0` für neue Funktionen. Die Nummer wechselt also nicht mehr mit jedem Arbeitspaket, sondern mit jeder Fassung, die nach außen geht.

   Bis AP27 hieß die Regel `0.1.0-dev.xx` mit xx als Nummer des Arbeitspakets (festgelegt am 18.09.2026, erstmals mit AP19; bis AP18 stand dort unverändert `0.1.0-dev`). Sie hat ihren Zweck erfüllt, solange nichts veröffentlicht war – ein Nutzer hätte mit „dev.27" nichts anfangen können.

   **Die Versionsnummer gehört nicht in die READMEs.** Sie stand dort zweimal veraltet (AP25: `.23` statt `.25`, AP28: `.25` statt `.27`), weil die Stelle bei der Abschlussroutine nicht mitgezogen wird. Die READMEs verweisen jetzt auf die Releases-Seite.
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
- **Im Einstellungsfenster nicht mit dem Mausrad scrollen** (AP23): Das Rad verstellt Auswahlfelder, Regler und Zahlenfelder, statt zu scrollen. Rollbalken ziehen oder Fenster vergrößern. Nach dem Test die gespeicherten Werte **gegen die Schema-Vorgaben** vergleichen, nicht nur gegen die Sicherung; siehe Abschnitt 8.
- **Sichern direkt vor dem Eingriff** (AP19): Eine Sicherung, die vor weiteren Tests angelegt wurde, kann beim Zurückspielen neuere Stände überschreiben (so geschehen mit `speedtest-values`).
- **Messschleife von außen zählen** (AP19): Jeder Durchlauf von Applet und Desklet liest `~/.local/share/avincepulse/speedtest-values` einmal, das Desklet schreibt zusätzlich `/tmp/avince-hwmonitor-values`. Beides lässt sich per inotify zählen, ohne in Cinnamon einzugreifen (Skripte in `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/langzeit/`). Soll bei gleichem Intervall: je Taktmarke ein Durchlauf je Komponente. Entfällt das Schreiben der `/tmp`-Datei (Befund M3), ist die Zählung anzupassen.
- **Kurzlebige Anzeigen** (AP19): Wiederholte lesende `Eval`-Abfragen aus Python erreichen etwa 300 Abfragen je Sekunde und erfassen auch Ein- und Ausblendvorgänge. Sie belasten aber Cinnamon selbst: nur **eine** solche Aufzeichnung gleichzeitig und nur für die Dauer des Tests laufen lassen, danach beenden (am 19.09.2026 liefen versehentlich zwei parallel, der Rechner reagierte träge). Neben `Main.uiGroup` auch die Fenster (`global.get_window_actors()`) mit aufzeichnen; ein durchscheinendes Fenster hinter einer halbtransparenten Meldung wirkt für den Nutzer wie „anderer Text in der Meldung“ (H15).
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

Letztes Backup zum Zeitpunkt dieser Fortschreibung: `2026-09-26_18-02-52` – **der eingereichte Stand**, Version `0.1.0`, einschließlich der Dokumentation der Einreichung selbst. Wiederherstellungsprobe bestanden (Prüfsummen beider Dateien, Klon aus dem Bundle mit 24 Tags und Version `0.1.0` in den Metadaten, Archiv entpackt und Datei für Datei über SHA-256 verglichen: **3391 von 3391 zeichengleich**, keine Datei nur auf einer Seite). Die 45 Dateien der beiden Einreichungspakete sind enthalten; die Klone der Spices-Forks unter `~/cinnamon-spices-*` bewusst nicht – sie liegen außerhalb des Projekts und sind jederzeit neu herstellbar.

**Achtung beim Anlegen des Archivs:** `tar` nicht mit `--exclude-vcs-ignores` aufrufen. Die Option lässt die per `.gitignore` ausgeschlossenen Dateien weg – darunter die `.bak`-Dateien in `02_QUELLCODE` und `05_DOKUMENTATION`, die es ausschließlich auf der NAS gibt. Beim AP20-Backup ist das zunächst passiert und wurde vor der Freigabe berichtigt; die Backups bis AP19 sind davon nicht betroffen (nachgeprüft am 20.09.2026). Richtig ist der einfache Aufruf:

```bash
cd /mnt/LX-NAS-linux/60_SETUP_INSTALLATION
tar -czf aVincePulse_Backups/<Zeitstempel>/aVincePulse_Development_<AP>_FINAL.tar.gz aVincePulse_Development
```

Die Probe deckt das auf, wenn sie das Archiv wirklich entpackt und vollständig vergleicht – ein Vergleich allein gegen den Klon aus dem Bundle würde den Fehler nicht zeigen, da dort dieselben Dateien fehlen.

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

**AP01 bis AP28 sind abgeschlossen.** Version **`0.1.0`**, Tag
`0.1.0` – die Fassung, die eingereicht wird.

**Vor der Einreichung ist nichts mehr offen.** Vor AP27 stand ein
unabhängiger technischer Abschluss-Audit über den gesamten Quellcode;
seine beiden Punkte der Kategorie A sind erledigt, alles Übrige ist
nach der Veröffentlichung vorgemerkt.

### Nächster Schritt: die Einreichung

Zwei **getrennte** Pull Requests gegen die beiden
Spices-Repositories. Was sie verlangen, steht vollständig in
`06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/spices/EINREICHUNG-ANFORDERUNGEN.md`
(nur lokal und im Backup, per `.gitignore` nicht auf GitHub).

| Vorgabe | Bedeutung |
|---|---|
| **Ein PR – ein Spice** | zwei getrennte Pull Requests, keiner darf beide enthalten |
| Titel `spice name: beschreibung` | etwa `avincepulse-applet@avince: add new applet` |
| gilt auch für die **Commit-Nachricht** | nicht nur für den PR-Titel |

> „Pull Requests that don't follow this format will be closed."

Die fertigen Pakete liegen unter
`06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/einreichung/`, in AP28 aus
dem heutigen Quellcode neu gebaut, beide mit „No errors found".

**Nach der Aufnahme zu ändern:** In beiden READMEs steht „Noch nicht
bei Cinnamon Spices eingereicht". Der Satz stimmt bis dahin und ist
danach zu berichtigen.

**Zwei Punkte für die Einreichung selbst:**

- **S2 begründen.** Die Vorgabe empfiehlt `get_user_state_dir()` plus
  UUID als Ablageort. aVincePulse nutzt `~/.local/share/avincepulse/`
  und teilt den Ordner bewusst zwischen Applet und Desklet (Grundsatz
  EIGENSTÄNDIG + KOOPERATIV); eine UUID im Pfad würde das verhindern.
  Das **Verbot** – nichts ins eigene Installationsverzeichnis
  schreiben – ist eingehalten und im Audit nachgeprüft.
  Reihenfolge im Text: erst feststellen, dass das Verbot eingehalten
  ist, dann die Abweichung von der Empfehlung, dann die Begründung.
- **Den Autor auf GitHub mit `@` erwähnen** entfällt bei einer
  Neuaufnahme; es gibt noch keinen Autoreneintrag.

### Nach der Veröffentlichung vorgemerkt

Aus dem Abschluss-Audit vom 26.09.2026, nach Dringlichkeit:

1. **Atomare Speedtest-Sperre** (`speedtest.js`, `_setzeSperre()`).
   Heute ohne Risiko, weil beide Tests per Mausklick ausgelöst werden.
   Das ändert sich, **sobald es einen zeitgesteuerten Speedtest gibt** –
   seit AP15 messen beide Komponenten im selben Moment und träfen das
   Zeitfenster zuverlässig. Vor jener Funktion zu erledigen.
2. **Laufwerksliste zwischenspeichern** (`measurement.js`,
   `_laufwerke()`). Bei manuell gewähltem Laufwerk liest jeder Takt
   `/proc/self/mounts` und zählt `/dev/disk/by-uuid` auf – etwa 19
   statt 12 Dateizugriffe. Bei „auto" entfällt es ganz.
3. **Berichte asynchron schreiben** (`_berichtsVerzeichnis()`). Der
   einzige Schreibpfad, der auf einem Netz-Homeverzeichnis hängen
   könnte.
4. **P10, S2, P17** aus AP25 sowie **P15** (Teilung durch 1024,
   Beschriftung „TB"/„KB/s" statt „TiB"/„KiB/s").
5. **Cinnamon 6.2 in einer virtuellen Maschine erproben.** Läuft es
   dort, kann die Untergrenze aus AP27 gefahrlos gesenkt werden und
   die gesamte Mint-22-Reihe kommt hinzu.

Ohne Dringlichkeit: **B9 im Betrieb nachweisen** (freiwillig, erst
nach einem Neustart des Zweitgeräts aussagekräftig) und **P1/P11** –
die nötige Hardware gibt es auf keinem der beiden Geräte.

Bewusst verschoben: das Vektorlogo (mit Messergebnis auf „nach 1.0"),
das Mausrad im Einstellungsfenster (Cinnamon-Verhalten, nicht im Xlet
lösbar) und die 21 Beschriftungen in den Listenspalten, die Cinnamon
nicht übersetzen kann.

Für jedes Paket gilt wie bisher: Ziel und Akzeptanzkriterien vorher
schriftlich festlegen und freigeben lassen.

### AP27 – Ergebnis vom 26.09.2026

**Vollständiger Bericht: `05_DOKUMENTATION/AP27-ZIELE.md`**, der
Zweitgerätelauf in `AP27-TOWERTEST.md`.

| | |
|---|---|
| Punkte des Audits, Kategorie A | **2** – beide erledigt |
| geänderte Quelldateien | **4** |
| Prüfungen | **494 in neun Skripten, 0 Fehler** (430 + 64 neu) |
| Funktionstest | beide Geräte, **0 eigene Fehlerzeilen** |
| Einreichungspakete | neu gebaut, beide **„No errors found"** |

**Der Fix ist belegt, nicht behauptet:** `gegenprobe.js` zeigt, dass
die Fassung vor der Änderung in drei von fünf Fällen durchfiel.

**Ungeplanter Nebengewinn vom Tower:** Die hwmon-Nummerierung hatte
sich erneut verschoben, die Automatik traf trotzdem die richtige
Platte – ein dritter unabhängiger Beleg für B1, B9 und P10.

### AP28 – Einreichungsfassung 0.1.0, vom 26.09.2026

**Bericht: `05_DOKUMENTATION/AP28-ZIELE.md`.** Kein Code angefasst.

Anlass war die Frage, ob Texte und Übersetzungen fertig sind. Die
Übersetzungen waren es – nachgeprüft mit einer frisch erzeugten `.pot`
gegen das Projekt: **180/180 und 171/171, kein neuer Text, kein
verwaister, nichts fuzzy.**

Die Texte nicht ganz:

| Stelle | war | ist |
|---|---|---|
| Version | `0.1.0-dev.27` | **`0.1.0`** |
| Versionsnummer in den READMEs | `0.1.0-dev.25` | **entfernt**, Verweis auf die Releases |
| „Cinnamon 6.x" an vier Stellen | widersprach `["6.6"]` | „6.6 oder neuer" |
| Changelog | `[Unreleased]`, „on one machine" | `[0.1.0] - 2026-09-26`, zwei Rechner |

**Zur Versionsnummer in den READMEs:** Sie stand dort **zweimal**
veraltet – in AP25 als `.23`, in AP28 als `.25`. Die Stelle wird von
der Abschlussroutine nicht mitgezogen. Sie ist deshalb entfernt, nicht
berichtigt.

Damit endet die Zählung `0.1.0-dev.xx`; Abschnitt 9 nennt die neue
Regel nach Semantic Versioning.

### AP26 – Ergebnis vom 23.09.2026

**Vollständiger Bericht: `05_DOKUMENTATION/AP26-ZIELE.md`** – dort
stehen Ziele, Akzeptanzkriterien und Nachweise beieinander.

| | |
|---|---|
| Punkte der Spices-Prüfliste | **3** – S1/P14 und S3 behoben, S4 bewusst nicht geändert |
| dazu | Lizenzfeld, unübersetzte Protokollkennung |
| geänderte Quelldateien | **8** |
| Prüfungen | **430 in acht Skripten, 0 Fehler** (345 aus AP25 + 85 neu) |
| Funktionstest | im laufenden Cinnamon, **0 Fehlerzeilen** |
| Einreichungspakete | neu gebaut, beide **„No errors found"** |
| Einstellungswerte | **0 geänderte Werte** |

**Gleichlauf Applet/Desklet: 0 ms.** Der Betriebsnachweis für S4.

**Eine Berichtigung zu AP25:** Abschnitt 9 des Prüfberichts nennt fünf
Protokollzeilen mit übersetztem Wert. Nachgezählt sind es **vier** –
die `AP14`-Schleife läuft über drei Sensorarten, dazu die eine
`AP05`-Zeile. An Ursache und Behebung ändert das nichts.

### AP25 – Abschlussprüfung: Ergebnis vom 23.09.2026

**Die Prüfung ist abgeschlossen. Offen ist Phase 3** – Version,
Snapshot, Tag, Vollbackup und Release.

**Vollständiger Bericht: `05_DOKUMENTATION/PRUEFBERICHT_AP25.md`.**
Er ist der Einstiegspunkt für alles Weitere; hier steht nur die
Zusammenfassung. Alle Nachweise liegen in
`06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/`.

#### Ergebnis in Zahlen

| | |
|---|---|
| Befunde der Code-Durchsicht | **35, keiner kritisch** – 20 behoben, 15 einzeln entschieden |
| Befunde vom Zweitgerät | **9** (B1 bis B9) – 6 am Programm behoben, 1 am Prüfwerkzeug, 2 ohne Handlungsbedarf |
| Prüfliste Zweitgerät Z1–Z15 | 14 bestanden, Z4 dort nicht prüfbar, **keiner abweichend** |
| Funktionstest Referenzgerät | 75 Prüfpunkte, **kein Punkt abweichend** |
| Langzeittest | 613 Minuten, 39,99 Lesezugriffe je Minute, **0 Protokollzeilen** |
| Funktionsprüfungen mit `cjs` | über 300 in sieben Skripten, alle bestanden |
| Akzeptanzkriterien | 17 von 23 erfüllt, 4 teilweise, 2 in Phase 3 |
| Release-Regel, Abschnitt 23 | **alle acht Punkte erfüllt** |

Stufenverteilung der 35 Befunde: mittel 11, gering 13, Hinweis 9,
zur Kenntnis 1, Verbesserungsvorschlag 1.

#### Der Test auf dem Zweitgerät war der wertvollste Teil

Geprüft wurde ein Desktop-Tower mit AMD-Prozessor, NVIDIA-Karte, ohne
Akku, ohne auslesbare Lüfter und mit **zwei gleichartigen
NVMe-Laufwerken**. Ohne ihn wären **vier stillschweigend falsche
Anzeigen** in die Einreichung gegangen:

| Befund | Was passiert wäre |
|---|---|
| **B1** | Temperatur der einen, freier Platz der anderen Platte – in einer Anzeige, ohne Hinweis |
| **B8** | „Hardware neu erkennen" hob die Behebung von B1 wieder auf |
| **B9** | eine von Hand gewählte Platte war nach einem Neustart eine andere |
| **B6** | Cinnamon legte eine dunkle Fläche hinter das Desklet und hebelte die eigene Deckkraft-Einstellung aus |

Dazu kamen die Betriebsnachweise für **P7** (Sensor ohne Wert zeigt
`--`, nicht `0`) und **P10** (die `nvme`-Nummerierung wechselte
zwischen zwei Starts, die Automatik traf beide Male die richtige
Platte) – beide auf dem Referenzgerät nicht herstellbar.

**Die Entscheidung vom 23.09.2026, vor dem Abschluss zu testen und
nicht danach, hat sich bewährt.** Jeder dieser Befunde hätte nach
gesetztem Tag ein eigenes Arbeitspaket erzwungen.

#### Was bewusst offen bleibt

- **P1 und P11 ohne Betriebsnachweis** – die nötige Hardware gibt es
  auf keinem der beiden Geräte. Der Tower hat gar keinen Akku und
  keine Einträge unter `/sys/class/power_supply`.
- **Nur eine Cinnamon-Fassung geprüft** – beide Geräte laufen
  Mint 22.3 mit Cinnamon 6.6.9. Der Tower prüft andere **Hardware**,
  nicht eine andere Cinnamon-Fassung.
- **P10, S1/P14, P17** – eigenes Paket nach der Einreichung.
- **Übersetzte Werte in fünf Protokollzeilen** – Abschnitt 8 verlangt
  unübersetzte Protokolle; noch zu entscheiden.

Die vollständige Liste dessen, was vor der Einreichung noch zu tun
ist, steht in Abschnitt 9 des Prüfberichts – darunter drei Punkte,
die nur der Nutzer erledigen kann: Repository öffentlich stellen,
Screenshots für beide READMEs, Ko-fi-Zahlungsweg.

#### Berichtigung des Zwischenstands vom 22.09.2026

Der frühere Zwischenstand an dieser Stelle enthielt zwei Zählfehler,
die beim Auszählen aus `BEFUNDE.md` auffielen. Beide betrafen die
Zählweise, nicht den Inhalt.

- Die Stufentabelle nannte „mittel 10, gering 14, Hinweis 10". Richtig
  ist **mittel 11, gering 13, Hinweis 9, zur Kenntnis 1**: **P18** ist
  „gering bis mittel" eingestuft und gehört in die höhere Stufe, und
  „zur Kenntnis" war mit „Hinweis" zusammengefasst. Die Summe blieb 35.
- Gruppe A war als „elf Befunde" beschrieben. Das war die Zahl der
  **Zeilen** ihrer Änderungstabelle; die erste fasst P1, P6 und P7
  zusammen. Betroffen waren **13 Befunde**.

#### Erkenntnisse zur Prüfmethodik

Für künftige Arbeiten festgehalten:

- **Das Einstellungsfenster überlebt einen Cinnamon-Neustart.** Es ist
  ein eigener Prozess und lädt den Übersetzungskatalog einmal beim
  Öffnen. Nach einem Sprachwechsel muss es geschlossen und neu
  geöffnet werden; ein Cinnamon-Neustart genügt nicht.
- **`_getMenuItems()` liefert auch verborgene Einträge.** Sichtbarkeit
  über `actor.visible` prüfen, nicht über das Vorhandensein.
- **Gebundene Eigenschaften zeigen den Rohwert**, nicht das Ergebnis
  von `_gueltig()`. Wirksamkeit von außen messen – etwa die Taktzahl
  über inotify.
- **Wird ein Vorgabewert im Schema geändert**, ist
  `on_standardwerte_zuruecksetzen()` in beiden Komponenten zu prüfen
  (P28). Seit der Behebung von P28 liest die Funktion die Vorgaben aus
  dem Schema; die Regel gilt weiter für die beiden Listen.
- **Quelltext lässt sich ohne laufendes Cinnamon prüfen.** Methoden
  werden über Klammernzählung als Text aus der Datei geschnitten und
  mit `cjs` ausgewertet – geprüft wird dann der ausgelieferte Code,
  nicht eine Nachbildung. Gemeinsame Module lassen sich als Modul
  laden, wenn `imports.ui.main` durch eine Attrappe ersetzt und
  `GI_TYPELIB_PATH` auf die Typelibs von Cinnamon und Muffin gesetzt
  wird.
- **Eine Prüfung kann selbst falsch sein.** In AP25 schlugen drei
  Prüfungen an, obwohl der Code richtig war – zweimal, weil eine
  Annahme über Pfadglieder nicht stimmte, einmal, weil `indexOf` einen
  Methodennamen im **Kommentar** fand. Wer eine Prüfung schreibt, muss
  bei einem Fehlschlag zuerst die Prüfung prüfen.

### AP25 – Abschlussprüfung vor der Einreichung: Ziel und Akzeptanzkriterien (freigegeben am 21.09.2026)

Grundlage: `ROADMAP_V2.md`, Abschnitt 23 („Veröffentlichung", „Release-Regel") und Abschnitt 24 („Abschlussprüfung vor der Veröffentlichung").

#### Ziel

aVincePulse ist nachweislich einreichungsreif. Applet und Desklet werden vollständig geprüft – Code, Funktion, Robustheit, Langzeitverhalten –, dazu erstmals Installation und Deinstallation nach der Anleitung im README, die Prüfung gegen die heute gültigen Regeln von Cinnamon Spices und die verbliebenen Rechtefragen. Am Ende steht ein Prüfbericht, der zu jedem Punkt der Release-Regel eine belegte Antwort gibt, und eine Liste dessen, was vor dem Einreichen noch vom Nutzer kommen muss.

AP25 prüft und behebt Befunde. Es fügt **keine neuen Funktionen** hinzu.

#### Zwei Punkte, die in Abschnitt 14 bisher fehlten

Bei der Bestandsaufnahme am 21.09.2026 fielen zwei offene Forderungen der Roadmap auf, die hier nicht geführt waren:

- **Rechte an den Grafiken sowie Marken- und Namensfrage.** `ROADMAP_V2.md`, Abschnitt 9, führt beides ausdrücklich als „noch offen"; `08_LIZENZEN_RECHTE/` enthielt bis dahin nur die Prüfung der Speedtest-Programme. Aufgenommen als Kriterien 11 und 12.
- **Vektorlogo (SVG).** `ROADMAP_V2.md`, Abschnitt 15: „Vor Veröffentlichung wird daraus ein technisch sauberes, eigenständiges Vektorlogo (SVG) erstellt und auf Lesbarkeit bei 16, 20, 24, 32 und 64 Pixel getestet." Im Repository liegt kein SVG. Behandelt über Kriterium 20, siehe unten.

#### Entscheidungen des Nutzers vom 21.09.2026

- **Kopfzeile:** Die seit AP01 veraltete Zeile `Entwicklungsstand: 0.1.0-dev` wird aus allen zehn Quelldateien **ersatzlos gestrichen**. Die Version steht in `metadata.json` und wird dort nach Abschnitt 9, Schritt 0 gepflegt.
- **Changelog:** `CHANGELOG.md` wird angelegt, zunächst mit einem einzigen Eintrag. Begründung: Der Nutzen entsteht ab dem ersten Update nach der Veröffentlichung; später nachzutragen, was Monate zurückliegt, gelingt erfahrungsgemäß nicht.
- **`.bak`-Dateien:** Die 37 `.bak`-Dateien des Arbeitsverzeichnisses werden gelöscht, aber erst in **Phase 3**. Während der Prüfung bleiben sie greifbar. Sie sind im Snapshot `0.1.0-dev_AP25-START/BAK-DATEIEN/` gesondert gesichert.
- **Vektorlogo:** In AP25 wird nur **erprobt**, nicht gezeichnet. Das Messergebnis entscheidet danach.
- **Langzeittest:** in der Nacht vom 21. auf den 22.09.2026.

**Berichtigung zum Prüfbericht AP19.** Dort heißt es zu Befund H10, die `.bak`-Dateien lägen „in Git-Historie und Snapshots". Das trifft nicht zu. `.gitignore` schließt `*.bak*` aus; am 21.09.2026 mit `git ls-files` und `git log --all --diff-filter=A` geprüft: **keine einzige `.bak`-Datei war jemals im Repository.** Auch die bisherigen AP-Snapshots enthalten keine. Sie liegen ausschließlich in den Vollbackups (`tar.gz`) – und seit AP25-START zusätzlich im Snapshot.

#### Umfang in vier Phasen

**Phase 0 – Vorbereitung.** Snapshot `06_TESTVERSIONEN/0.1.0-dev_AP25-START/`, Prüfdatenverzeichnis `…AP25-PRUEFDATEN/`, Sicherung beider Einstellungsdateien, Werteprüfskript.

**Phase 1 – Prüfen ohne Codeänderung**

| Block | Inhalt |
|---|---|
| 1.1 | Vollständige Code-Durchsicht, 8.106 Zeilen, zusätzlich durch einen unabhängigen Prüfer ohne Kenntnis der bisherigen Annahmen (wie AP19) |
| 1.2 | Funktionstest jeder Einstellung, Schaltfläche und Meldung in beiden Komponenten, **in beiden Sprachen**, umgeschaltet über `cinnamon-xlet-makepot -i` und `-r` |
| 1.3 | Robustheit: beschädigte Einstellungsdatei, fehlende Sensoren, fehlendes Speedtest-Programm, abgezogenes Laufwerk, fehlende `.mo`, beschädigte Wertedatei, beschädigte Sperrdatei |
| 1.4 | Langzeittest über Nacht mit Zählung der Messdurchläufe von außen (inotify), Speicher und CPU |
| 1.5 | Installation und Deinstallation nach beiden READMEs, aus einem frischen Clone, zweimal hintereinander (Update-Fall), einschließlich des Verbleibs von Einstellungen, Berichten und Speedtest-Werten |
| 1.6 | Cinnamon-Spices-Regeln, heute abgerufen aus `linuxmint/cinnamon-spices-applets` und `-desklets`, Punkt für Punkt gegengeprüft |
| 1.7 | Struktur des Einreichungspakets trocken aufgebaut und geprüft |
| 1.8 | Übereinstimmung von Applet und Desklet in Verhalten, Texten und Schemata |
| 1.9 | Die offen gebliebenen Hinweise aus AP19, Gruppe C, erneut bewertet: G4, G7, H2, H3, H4, H5, H7, H8, H9, H10, H11, H12, H13 |
| 1.10 | Rechte: Grafiken, Marken- und Namensfrage, Nachholen der Ookla-Nutzungsbedingungen |

**Phase 2 – Befunde bewerten und beheben.** Befundliste mit Schweregrad wie in AP19, Vorschlag zur Einordnung, Freigabe des Nutzers je Gruppe, dann Umsetzung. Größere Änderungen werden als eigenes Paket vorgeschlagen statt hier eingeschoben.

**Phase 3 – Nachweis und Abschluss.** Nachtest, Löschen der `.bak`-Dateien, Prüfbericht `05_DOKUMENTATION/PRUEFBERICHT_AP25.md`, Sicherungsroutine nach Abschnitt 9.

#### Akzeptanzkriterien

1. **Code-Durchsicht** aller zehn Quelldateien abgeschlossen, zusätzlich durch einen unabhängigen Prüfer; jeder Befund mit Datei, Zeile und Nachweisart.
2. **Funktionstest** jeder Einstellung, Schaltfläche und Meldung in beiden Komponenten bestanden, protokolliert mit Uhrzeit.
3. **Beide Sprachen geprüft:** Jede sichtbare Zeichenkette erscheint in Deutsch und in Englisch richtig; kein abgeschnittener Text, keine verrutschte Tabelle, keine leere Stelle. Umgeschaltet ohne Eingriff in die Systemsprache.
4. **Robustheit:** Keiner der Fälle aus Block 1.3 führt zu einem Absturz, zu einer Fehlerflut im Protokoll oder zu stillschweigend falschen Werten.
5. **Langzeittest:** mindestens acht Stunden, je Taktmarke ein Durchlauf je Komponente, keine Protokollzeile von aVincePulse, Speicherzuwachs belegt und bewertet.
6. **Installation** nach beiden READMEs erfolgreich, zweimal hintereinander mit gleichem Ergebnis; **Deinstallation** entfernt die Programmverzeichnisse vollständig; was mit Einstellungen, Berichten und Speedtest-Werten geschieht, ist geprüft und im README richtig beschrieben.
7. **Cinnamon-Spices-Regeln:** Die heute gültigen Vorgaben beider Repositories sind abgerufen, und zu jeder Regel steht in einer Tabelle, ob aVincePulse sie erfüllt und woran das belegt ist. Jede Abweichung ist benannt.
8. **Einreichungsstruktur** je Komponente vollständig aufgebaut und geprüft; `info.json` mit dem GitHub-Benutzernamen, `README.md` der Komponente, `po/` enthalten, keine vorkompilierten Programme außer Bildern, keine GSettings-Schemas, kein Nachladen fremden Codes.
9. **Applet und Desklet stimmen überein**, wo sie übereinstimmen sollen; jede bewusste Abweichung ist dokumentiert.
10. **Die offenen Hinweise aus AP19** sind einzeln entschieden: behoben, in ein späteres Paket verschoben oder mit Begründung geschlossen. Keiner bleibt unbewertet.
11. **Rechte an den Grafiken** geklärt und in `08_LIZENZEN_RECHTE/GRAFIKEN.md` belegt: Herkunft jeder ausgelieferten Bilddatei, Nutzungsrecht, Lizenzangabe für die Einreichung.
12. **Marken- und Namensfrage** geprüft und in `08_LIZENZEN_RECHTE/NAME-UND-MARKE.md` festgehalten: der Name „aVincePulse", das Verhältnis zu bestehenden Marken sowie die Nennung von „Speedtest.net" und „LibreSpeed" in den Texten.
13. **Ookla-Nutzungsbedingungen** nachgeholt oder der erneute Fehlschlag dokumentiert; `SPEEDTEST-PROGRAMME.md` entsprechend fortgeschrieben.
14. **Ein echter Speedtest je Programm** in je einer Komponente ausgeführt, Bericht und Wertedatei geprüft. Der Nutzer wird vorher informiert, was gemessen wird.
15. **Einstellungen unverändert:** Nach allen Tests werden die gespeicherten Werte **gegen die Schema-Vorgaben** verglichen, nicht nur gegen die Sicherung. Jede Abweichung ist erklärt.
16. **Prüfbericht** `PRUEFBERICHT_AP25.md` mit Vorgehen, Befundübersicht, Einzelbefunden, Testprotokollen, der Spices-Tabelle und dem Stand jedes Kriteriums.
17. **Release-Regel beantwortet:** Zu jedem der acht Punkte aus `ROADMAP_V2.md`, Abschnitt 23, steht im Bericht eine belegte Aussage.
18. **Liste „Vor der Einreichung noch offen"** mit allem, was nur der Nutzer erledigen kann: Screenshots, Ko-fi-Zahlungsweg, Tests auf weiteren Geräten.
19. **Changelog** `CHANGELOG.md` angelegt, mit einem Eintrag für die erste Veröffentlichung.
20. **Panel-Symbol erprobt:** bei allen einstellbaren Panelhöhen, in beiden Varianten (farbig und einfarbig), dazu die Darstellung in der Applet-Liste und im Desklet-Verzeichnis, mit Bildschirmaufnahmen belegt. Befund G4 aus AP19 ist damit entschieden. Das Ergebnis trägt die Entscheidung über das Vektorlogo: Trägt PNG, wird die Forderung aus Roadmap-Abschnitt 15 mit dem Messergebnis begründet auf „nach 1.0" verschoben; trägt es nicht, folgt ein eigenes Paket **AP26 – Logo als Vektor** vor der Einreichung.
21. **Kopfzeile entfernt:** `Entwicklungsstand: 0.1.0-dev` ist aus allen zehn Quelldateien gestrichen; die vier gemeinsamen Module sind danach weiterhin bitgenau identisch.
22. **`.bak`-Dateien** in Phase 3 aus dem Arbeitsverzeichnis entfernt, nachdem sie im Snapshot `AP25-START` gesichert sind.
23. **Abschluss:** Version `0.1.0-dev.25`, Snapshot, Fortschreibung von `PROJECT-STATUS.md` und `ROADMAP_V2.md`, Commit, Tag, Vollbackup mit Wiederherstellungsprobe, GitHub-Release.

#### Nicht Bestandteil von AP25

- Das Einreichungspaket tatsächlich abschicken (zwei Pull Requests); das ist das Paket danach.
- Neue Funktionen, auch keine aus der OPTIONAL-Liste.
- Die Screenshots selbst; AP25 bereitet nur vor, was danach zu tun ist.
- Weitere Sprachen.

#### Was AP25 nicht lösen kann

- **Das Mausrad** im Einstellungsfenster (Abschnitt 8). Bewerten lässt sich nur, ob Registerkarten (`layout`) das Fenster verkürzen; das wäre ein eigenes Paket.
- **Die 21 englischen Listenspalten** je Komponente. Bleiben wie in AP24 festgestellt.
- **Tests auf anderen Geräten.** AP25 stellt dafür eine Prüfliste bereit.

**AP24 – Übersetzung: abgeschlossen am 21.09.2026.** Ergebnis in Abschnitt 6 unter „AP24".

### AP24 – Übersetzung Deutsch/Englisch: Ziel und Akzeptanzkriterien (freigegeben und abgeschlossen am 21.09.2026)

Grundlage: `ROADMAP_V2.md`, Abschnitte 5 und 24. Ausgangstexte in Englisch, Übersetzung über gettext, `po/` je Komponente, angezeigte Sprache folgt der Systemsprache.

#### Ziel

aVincePulse spricht die Sprache des Systems. Die Ausgangstexte im Quellcode werden auf Englisch umgestellt, die deutsche Fassung kommt als Übersetzung über gettext hinzu. Damit ist die letzte Voraussetzung für die Einreichung bei Cinnamon Spices erfüllt, und weitere Sprachen lassen sich später ohne Codeänderung ergänzen.

#### Entscheidungen des Nutzers vom 21.09.2026

- Berichte werden **mitübersetzt**, mit sauber berechneter Formatierung.
- **Keine weiteren Sprachen** in AP24; die `.pot` genügt als Einladung.
- Ausgangstexte in Englisch, auch wenn die Oberfläche dadurch zwischenzeitlich englisch ist.
- Die englischen Beschriftungen in den Listenspalten sind hinnehmbar.

#### Akzeptanzkriterien

1. `po/`-Verzeichnis je Komponente mit `<uuid>.pot` und `de.po`, erzeugt mit `cinnamon-xlet-makepot`.
2. Gettext im Code eingebunden, Domäne gleich der UUID.
3. Jeder sichtbare Text läuft über `_()`; Kommentare und Protokollzeilen bleiben unverändert.
4. Alle sichtbaren Texte auf Englisch; die gemeinsamen Module danach bitgenau identisch.
5. Verkettete Meldungen werden zu ganzen Sätzen mit Platzhaltern.
6. Die 21 Texte je Komponente aus den Listenspalten werden übersetzbar gemacht – **nicht erfüllbar**, siehe Abschnitt 6.
7. `metadata.json`: `name` und `description` auf Englisch.
8. `de.po` vollständig, keine leeren und keine `fuzzy` Einträge.
9. Die deutschen Texte entsprechen den heutigen.
10. Umlaute und ß bleiben erhalten.
11. `de.po` mit `msgfmt` geprüft.
12. Die angezeigte Sprache folgt der Systemsprache.
13. Gespeicherte Einstellungen überleben einen Sprachwechsel.
14. Fehlt eine Übersetzung, erscheint der englische Ausgangstext.
15. Prüfung einschließlich Abgleich, dass jeder sichtbare Text in der `.pot` steht.
16. Funktionstest in beiden Sprachen, umgeschaltet über `--install` und `--remove`.
17. Abschluss: Version `0.1.0-dev.24`, Snapshot, Dokumentation, Commit, Tag, Vollbackup mit Wiederherstellungsprobe, GitHub-Release.
18. Die Berichte werden mitübersetzt.

#### Abweichung

**Kriterium 6 ist nicht erfüllbar.** Cinnamon übersetzt Beschriftungen in Listenspalten nicht; beide denkbaren Wege wurden geprüft und scheitern. Einzelheiten in Abschnitt 6. Vom Nutzer am 21.09.2026 zur Kenntnis genommen.

### AP23 – Unterstützen-Hinweis, README und Lizenz: Ziel und Akzeptanzkriterien (freigegeben und abgeschlossen am 21.09.2026)

Grundlage: `ROADMAP_V2.md`, Abschnitt 24, „Unterstützen-Hinweis", Festlegung vom 19.09.2026, sowie Abschnitt 9 „Lizenz und Rechte".

#### Ziel

aVincePulse bekommt die Projektunterlagen, die für eine Veröffentlichung nötig sind: eine Lizenz, ein vollständiges README und einen dezenten Unterstützen-Hinweis. Die Texte entstehen jetzt, weil sie in der Übersetzung mitlaufen. Der Hinweis erscheint ausschließlich dort, wo der Nutzer ihn sucht.

#### Ausgangslage (geprüft am 20.09.2026)

- **Kein README** im Repository, nur die GitHub-Beschreibung.
- **Keine Lizenzdatei**; `gh repo view` meldete `licenseInfo: null`. Damit galt das volle Urheberrecht, und eine Einreichung bei Cinnamon Spices wäre abgelehnt worden.
- Kein `.github/`, keine `FUNDING.yml`, keine Screenshots des laufenden Programms.
- Die Einreichungsregeln von Cinnamon Spices erlauben einen Unterstützen-Link ausdrücklich, sofern er nicht unterbricht.

#### Entscheidungen des Nutzers vom 20./21.09.2026

- **Plattform Ko-fi**, Seite `ko-fi.com/avince`, deutsche Umsatzsteuer fällt an.
- **GPL-3.0** wird in diesem Paket mit angelegt.
- **README zweisprachig**, Englisch als Hauptfassung.
- **Screenshots** werden nachgeliefert; das README entsteht mit Platzhaltern.
- Der Ko-fi-Name lautet `avince`, nicht `avincepulse`, damit die Seite auch künftige Projekte trägt.

#### Akzeptanzkriterien

1. **`LICENSE`** im Wurzelverzeichnis, unveränderter Text der GPL-3.
2. **Lizenzkopf in jeder Quelldatei**, die vier gemeinsamen Module danach bitgenau identisch.
3. **Urheberzeile** `Copyright (C) 2026 Angelo Vincenti - aVince Industrietechnik`.
4. **`README.md`** mit Kurzbeschreibung, Screenshots, Funktionsumfang, Voraussetzungen, Installation, Speedtest, Einstellungen, Entwicklungsstand, Support, Lizenz, Mitwirken.
5. **Abschnitt „Support"** nennt den Ko-fi-Link und sagt, dass aVincePulse kostenlos und vollständig bleibt.
6. **Ehrlicher Entwicklungsstand** im README: Entwicklungsfassung, ein Gerät, Oberfläche Deutsch.
7. **Abschnitt „Unterstützung"** ganz unten in beiden Einstellungsfenstern, mit `label` und Schaltfläche, ohne Tooltip.
8. **Der Browser öffnet nur nach einem Klick**; schlägt es fehl, erscheint eine verständliche Meldung.
9. **Nichts sonst:** keine Einblendung, Benachrichtigung, Zeitsteuerung, Zählung oder gesperrte Funktion.
10. **Die Adresse steht an genau einer Stelle im Code**, im gemeinsamen Modul.
11. **`.github/FUNDING.yml`** mit `ko_fi`.
12. **Repository-Angaben:** GitHub erkennt die Lizenz.
13. **Prüfung:** Syntax, Namen, Prüfsummen, Schemata als JSON, `FUNDING.yml` als YAML. Der Link wird geprüft, ohne ihn abzurufen.
14. **Funktionstest** durch den Nutzer in beiden Bestandteilen.
15. **Abschluss:** Version `0.1.0-dev.23`, Snapshot, Dokumentation, Commit, Tag, Vollbackup mit Wiederherstellungsprobe, GitHub-Release.

#### Nicht Bestandteil von AP23

Changelog, die komponentenweisen `README.md` und `info.json` für die Spices-Einreichung, die Übersetzung selbst, Änderungen an der Messfunktion.

#### Geprüft und bewusst verworfen

**Liberapay und GitHub Sponsors** als Plattform. Liberapay ist laut eigener Auskunft nur für echte Spenden gedacht und nicht für Geschäftstransaktionen; GitHub Sponsors setzt Stripe zwingend voraus. Ko-fi erlaubt beides und nimmt auf Trinkgelder keine Plattformgebühr.

**Das Firmenlogo von avince.de als Profilbild.** Es ist ein reiner Schriftzug in breiter Anlage. Ko-fi beschneidet Profilbilder rund; ein Schriftzug wäre darin entweder winzig oder angeschnitten und in der kleinen Darstellung unlesbar. Stattdessen das V-Signal-Logo, dessen runder Beschnitt vorher nachgestellt und geprüft wurde.

**`GPL-3.0-or-later`.** Die von der FSF empfohlene Ergänzung „or any later version" wurde weggelassen, da der Nutzer „GPL-3.0" freigegeben hat und eine Bindung an künftige, heute unbekannte Lizenzfassungen nicht Teil dieser Freigabe war.

**AP22 – Speedtest-Programm: abgeschlossen am 20.09.2026.** Ergebnis in Abschnitt 6 unter „AP22". Die folgenden Absätze halten Ziel, Akzeptanzkriterien und Verlauf fest.

### AP22 – Speedtest-Programm: Ziel und Akzeptanzkriterien (freigegeben und abgeschlossen am 20.09.2026)

Grundlage: `ROADMAP_V2.md`, Abschnitt 24, „Speedtest-Programm vor der Veröffentlichung", Festlegung vom 19.09.2026.

#### Ziel

aVincePulse soll den Internet-Speedtest ohne ein Programm aus Fremdquellen anbieten können. Dazu wird `speedtest-cli` aus den Paketquellen als zweites unterstütztes Programm aufgenommen, `librespeed-cli` bleibt bevorzugt, wenn es vorhanden ist. Fehlt beides, verhält sich aVincePulse verständlich und ohne Installationsanleitung für Fremdquellen. Damit fällt das letzte technische Hindernis für die Einreichung bei Cinnamon Spices.

#### Ausgangslage im Code (geprüft am 20.09.2026)

- `PROGRAMM_NAMEN` in `speedtest.js` enthielt nur `librespeed-cli`, dazu vier feste Ablageorte. Der Aufruf lautete fest `[programm, "--json"]`, die Auswertung erwartete `{download, upload, ping, jitter}` in MBit/s.
- Die Fehlermeldung bei fehlendem Programm nannte „librespeed-cli" namentlich.
- **`istVerfuegbar()` war definiert, wurde aber in keiner Komponente aufgerufen.** Eine Verfügbarkeitsprüfung gab es also nicht.
- Die Speedtest-Zeilen werden seit AP07 bewusst nie ausgeblendet, damit das Desklet seine Höhe nicht ändert; alle fünf haben `defaultValue: "--"`.

#### Akzeptanzkriterien

1. **Programmliste statt festem Namen** in `speedtest.js`, mit je eigenem Aufruf und eigener Auswertung. Vorrang: `librespeed-cli`, danach `speedtest-cli`.
2. **Suche** zuerst über `GLib.find_program_in_path()`, danach in den üblichen Ablageorten.
3. **Neue Einstellung „Speedtest-Programm"** je Komponente, gefüllt über `setOptions()` wie die Sensorauswahl seit AP14. Ein gespeichertes, nicht vorhandenes Programm fällt auf „Automatisch" zurück, bleibt aber gespeichert.
4. **Eigene Auswertefunktion je Programm.** Für `speedtest-cli`: `--json`, Umrechnung von Bit/s in MBit/s.
5. **Jitter bei `speedtest-cli`** erscheint als `--`, die Zeile bleibt sichtbar. Kein Eigenbau-Jitter.
6. **Wertedatei und Bericht** vermerken das verwendete Programm; der Bericht nennt bei `speedtest-cli` dessen Einschränkungen.
7. **Ein Programmwechsel** macht gespeicherte Werte nicht ungültig.
8. **`istVerfuegbar()` wird verwendet.** Ohne Programm sind Schaltfläche und Menüeintrag nicht anwählbar.
9. **Hinweis im Einstellungsfenster** als `label`, nennt die Programmnamen ohne Installationsbefehl, Paketquelle oder Link.
10. **Die Speedtest-Zeilen bleiben sichtbar** und zeigen `--`; alles Übrige läuft unverändert.
11. **Schriftliche Lizenz- und Rechteprüfung** in `08_LIZENZEN_RECHTE/` zu LibreSpeed, `speedtest-cli` und den Nutzungsbedingungen von Speedtest.net.
12. **Ergibt Kriterium 11 ein Hindernis**, wird das Ergebnis vorgelegt, bevor `speedtest-cli` eingebaut bleibt.
13. **Die Roadmap wird berichtigt** („speedtest-cli (Ookla)").
14. **Prüfung:** Syntax mit `cjs`, Namensprüfung, Prüfsummen der vier gemeinsamen Module, Schemata als JSON, beide JSON-Formate gegen aufgezeichnete Beispiele einschließlich beschädigter Antworten; Einstellungen unmittelbar vor jedem Eingriff sichern und danach vergleichen.
15. **Funktionstest** durch den Nutzer in beiden Komponenten. Version `0.1.0-dev.22`, Snapshot, Fortschreibung der Dokumentation, Commit, Tag, Vollbackup mit Wiederherstellungsprobe, GitHub-Release.
16. **Datensparsamkeit** (ergänzt am 20.09.2026 nach Durchsicht des Programmquelltextes): Übernommen werden ausschließlich Download, Upload, Ping und Jitter. IP-Adresse, Koordinaten, Anbieter, Servername und Serverstandort erscheinen weder in `speedtest-values` noch im Bericht. Geprüft gegen eine echte JSON-Antwort beider Programme.
17. **Verschlüsselte Verbindung** (ebenfalls ergänzt am 20.09.2026): `speedtest-cli` wird mit `--secure` aufgerufen, da es sonst über HTTP misst.

#### Abweichung von Kriterium 17

`--timeout` wurde nicht auf die Zeitgrenze von 120 Sekunden gesetzt, sondern beim Standard von 10 Sekunden belassen. Grund: Die Option begrenzt den einzelnen HTTP-Abruf, nicht die Gesamtlaufzeit; ein hoher Wert würde einen hängenden Abruf nur verlängern statt ihn zu beenden. Für den Gesamtablauf gilt weiterhin `ZEITGRENZE_SEKUNDEN`.

#### Nicht Bestandteil von AP22

Manuelle Serverauswahl, zeitgesteuerter Speedtest (beide OPTIONAL 1.0), ein eigener HTTP-Speedtest in GJS ohne externes Programm, Änderungen an Messwertmodell oder Anzeige.

#### Geprüft und bewusst verworfen (20.09.2026)

**Ooklas offizieller CLI `speedtest`.** Wird ausschließlich über ein Paket-Repository von Ookla verteilt und scheidet damit nach den Regeln von Cinnamon Spices aus.

**Ein eigener Speedtest in GJS ohne externes Programm.** Technisch möglich über HTTP-Download und -Upload gegen die öffentlichen LibreSpeed-Server; es würde die Abhängigkeit vollständig beseitigen. **Entscheidung des Nutzers: abgelehnt**, wegen des erheblichen Umbaus, der selbst zu pflegenden Serverliste und der Fragen zu Datenschutz und Fairness gegenüber fremden Servern. Bleibt als Rückfallebene im ungünstigsten Fall vermerkt.

**Die Jitter-Zeile bei `speedtest-cli` ausblenden.** Verworfen, da die Zeilenzahl dann vom verwendeten Programm abhinge – genau das, was AP07 für die Speedtest-Zeilen vermeidet.

**AP21 – Aktion bei Linksklick: abgeschlossen am 20.09.2026.** Ergebnis in Abschnitt 6 unter „AP21“. Die folgenden Absätze halten Ziel, Akzeptanzkriterien und Verlauf fest.

### AP21 – Aktion bei Linksklick: Ziel und Akzeptanzkriterien (freigegeben und abgeschlossen am 20.09.2026)

Grundlage: Festlegung vom 19.09.2026 in `ROADMAP_V2.md`, Abschnitt 24, entstanden aus Befund H14 von AP19.

#### Ziel

Das Applet soll auch ohne Maus bedienbar sein. Die große Messwert-Anzeige erscheint bisher nur, solange der Mauszeiger über dem Panel-Symbol steht. Auf dem Referenzgerät, einem 2-in-1 mit Touchscreen, gibt es im Tablet-Betrieb kein Überfahren – ein Finger tippt und ist wieder weg. Die Anzeige ist dort deshalb überhaupt nicht erreichbar.

Der seit AP19 freie Linksklick bekommt darum eine wählbare Aktion, voreingestellt auf das Ein- und Ausschalten der Anzeige.

#### Ausgangslage im Code (geprüft am 20.09.2026)

- `on_applet_clicked()` gibt es im Applet nicht; der Linksklick ist seit Befund H14 ohne Wirkung. Bis AP19 startete er den Speedtest, was versehentlich geschah, etwa beim Verschieben des Applets.
- Die Anzeige hängt an `enter-event` und `leave-event` auf `this.actor`. Das Popup selbst ist `reactive: false` und fängt heute keine Klicks.
- `Main.pushModal()` ist in Cinnamon 6.6 vorhanden (`/usr/share/cinnamon/js/ui/main.js`) und wird von Cinnamons eigenen Menüs verwendet. Es verbindet sich mit dem `destroy`-Signal des übergebenen Actors und ruft dann selbst `popModal()`.
- Systemüberwachung auf dem Referenzgerät: `gnome-system-monitor` (`org.gnome.SystemMonitor.desktop`). Für externe Programme gibt es mit `_oeffneBerichte()` bereits ein Muster über `Gio.AppInfo`.

#### Akzeptanzkriterien

1. **Neue Einstellung „Aktion bei Linksklick“** im Applet, Abschnitt „Hover-Anzeige“, mit drei Möglichkeiten: „Anzeige ein/aus“ (Vorgabe), „Systemüberwachung öffnen“ und „Nichts“ (Verhalten wie bisher).
2. **Angeheftete Anzeige:** Ein Linksklick lässt die Anzeige stehen, bis sie geschlossen wird. Sie schließt durch erneuten Klick auf das Panel-Symbol, Klick auf die Anzeige selbst, Klick daneben oder `Esc`. Die ersten drei Wege funktionieren auch per Fingertipp; auf einem Touchscreen gibt es kein `Esc`. Entscheidung des Nutzers vom 20.09.2026: `Esc` wird umgesetzt.
3. **Das Überfahren mit der Maus bleibt unverändert.** Solange die Anzeige angeheftet ist, darf das Verlassen des Symbols sie nicht verbergen.
4. **Die Messwerte laufen weiter**, solange die Anzeige steht – im eingestellten Takt und ohne zusätzliche Messschleife (Regel aus Befund K1).
5. **Systemüberwachung portabel finden:** keine feste Bindung an `gnome-system-monitor`. Gesucht wird über eine Kandidatenliste (GNOME, MATE, Xfce, KDE, LXDE) mit `Gio.DesktopAppInfo` und ersatzweise `GLib.find_program_in_path()`. Ist nichts vorhanden, erscheint eine verständliche Meldung – kein Fehler und keine Installationsanleitung für Fremdquellen (Regel von Cinnamon Spices).
6. **Fensterregel eingehalten** (Abschnitt 8): Die Systemüberwachung öffnet nur nach einem Klick des Benutzers.
7. **Sauberes Aufräumen:** Beim Entfernen des Applets werden der Modalzustand, der Klickfänger und alle neuen Signale getrennt. Geprüft wird ausdrücklich der Fall, dass das Applet entfernt wird, **während** die Anzeige angeheftet ist; danach darf nichts zurückbleiben und der Bildschirm muss bedienbar sein.
8. **Verträglich mit dem Übrigen:** Ein Speedtest löst die Anhaftung, damit die Meldung in der Bildschirmmitte nicht mit der Anzeige zusammenfällt. Das Rechtsklick-Menü bleibt erreichbar – bei stehender Anzeige über einen zweiten Klick, siehe unten. *Nachtrag nach dem Test: Der Speedtest ist bei angehefteter Anzeige über die Bedienung gar nicht auslösbar, da jeder Klick zuvor schließt. Die Absicherung bleibt trotzdem, weil der in der Roadmap vorgesehene zeitgesteuerte Speedtest ohne Klick auslöst; sie ist durch Dateien belegt, nicht durch einen Test.*
9. **Mehrere Bildschirme:** Der Klickfänger deckt die gesamte Zeichenfläche ab, nicht nur den primären Monitor.
10. **Robustheit:** Ein beschädigter Wert der neuen Einstellung fällt auf die Vorgabe zurück. Schlägt `Main.pushModal()` fehl – es liefert dann `false` –, bleibt die Anzeige bedienbar und schließt über den Klickfänger; nur `Esc` entfällt in diesem Fall.
11. **„Zurücksetzen“** stellt auch die neue Einstellung auf die Vorgabe zurück.
12. **Prüfung:** Syntax mit `cjs`, Namensprüfung, Prüfsummen der vier gemeinsamen Module, Einstellungen unmittelbar vor jedem Eingriff sichern und danach vergleichen. Funktionstest durch den Nutzer am Schreibtisch mit Maus **und** im Tablet-Betrieb per Fingertipp.
13. **Abschluss:** Versionsnummer `0.1.0-dev.21`, Snapshot, Fortschreibung der Dokumentation, Commit, Tag, Vollbackup mit Wiederherstellungsprobe, GitHub-Release.

#### Umsetzung

Die Anhaftung bekommt zwei voneinander unabhängige Sicherungen: einen unsichtbaren, bildschirmfüllenden Klickfänger unterhalb der Anzeige, der Klick und Fingertipp zuverlässig abfängt, und zusätzlich `Main.pushModal()` für die `Esc`-Taste. Das Popup wird dafür `reactive: true`.

Das Modal ist die einzige Stelle mit einem Restrisiko: Ein Modalzustand, der nicht beendet wird, ließe den Bildschirm nicht mehr auf Eingaben reagieren. Abgesichert ist das dreifach – Cinnamon beendet ihn selbst, sobald der Actor zerstört wird, das Applet beendet ihn beim Entfernen, und der Klickfänger arbeitet unabhängig davon.

#### Geprüft und bewusst verworfen (20.09.2026)

**Klick neben der Anzeige soll nichts bewirken.** Der Nutzer fragte, ob die angeheftete Anzeige auch stehen bleiben kann, während man den Inhalt dahinter normal bedient und scrollt – schließen dann nur über `Esc`, Linksklick auf das Panel-Symbol oder Linksklick auf die Anzeige.

Technisch umsetzbar, aber nicht mit der jetzigen Bauweise vereinbar: `Main.pushModal()` fängt zwangsläufig **alle** Eingaben ab, genau deshalb schließt heute jeder Klick die Anzeige. Damit der Inhalt dahinter bedienbar bleibt, müssten der Tastaturgriff und der Klickfänger entfallen und `Esc` über ein globales Tastenkürzel kommen (`Main.keybindingManager.addHotKey`, zur Laufzeit registrierbar, meldet mit `false`, wenn ein Kürzel nicht belegbar ist).

Abwägung: Der Umbau hätte das Restrisiko eines hängenden Tastaturgriffs vollständig beseitigt, dafür aber zwei Nebenwirkungen – `Esc` wäre für alle anderen Programme abgefangen, solange die Anzeige steht, und über der Anzeigefläche ließe sich nicht mehr scrollen. Zudem ist nicht gesichert, ob Muffin `Esc` ohne Modifikatortaste überhaupt als globales Kürzel annimmt.

**Entscheidung des Nutzers: nicht umbauen, alles so belassen.**

**Doppelter Rechtsklick bei stehender Anzeige.** Solange die Anzeige angeheftet ist, liegt der Klickfänger über dem gesamten Bildschirm, auch über dem Panel. Ein Rechtsklick schließt deshalb zuerst die Anzeige, ohne das Kontextmenü zu öffnen; erst der zweite öffnet es. Das entspricht dem Verhalten von Cinnamons eigenen Menüs. Der Nutzer hat das geprüft und ausdrücklich als nicht störend bezeichnet.

**Systemüberwachung mittig öffnen.** Ein Applet sollte fremde Fenster nicht verschieben; das ist Sache der Fensterverwaltung, bei Cinnamon Spices unüblich, und es würde die Systemüberwachung auch dann verschieben, wenn sie anders geöffnet wird. Cinnamon kann das systemweit selbst: `org.cinnamon.muffin placement-mode` auf `'center'`, erreichbar auch über die Systemeinstellungen unter „Fenster“. Der naheliegendere Schlüssel `center-new-windows` ist in Cinnamon 6.6 als veraltet gekennzeichnet und wirkungslos. **Entscheidung des Nutzers: nichts ändern.**

#### Nicht Bestandteil von AP21

Das Tastenkürzel für die Hover-Anzeige (eigener Punkt in Abschnitt 24 der Roadmap), ein Klick auf einzelne Messwertzeilen, Änderungen am Desklet.

**AP20 – Lesbarkeit: abgeschlossen am 20.09.2026.** Ergebnis in Abschnitt 6 unter „AP20“. Die folgenden Absätze halten Ziel, Akzeptanzkriterien und Verlauf des Arbeitspakets fest.

Die Reihenfolge der nächsten Arbeitspakete ist in `ROADMAP_V2.md`, Abschnitt 24, festgelegt (18.09.2026).

### AP20 – Lesbarkeit: Ziel und Akzeptanzkriterien (freigegeben am 20.09.2026, abgeschlossen am 20.09.2026)

Grundlage: Befund G9 aus AP19 (Warnfarben im Desklet auf hellem Hintergrund schlecht lesbar), Entscheidung des Nutzers vom 19.09.2026, Roadmap Abschnitt 24.

#### Ziel

Applet und Desklet sollen auf jedem Bildschirminhalt lesbar sein – weiße Schrift **und** Warnfarben, auf hellem wie auf dunklem Hintergrundbild. Damit ist die Anforderung der Roadmap erfüllt: „Farben müssen auf hellem und dunklem Hintergrund lesbar bleiben.“

Der Weg dorthin stand am Anfang so fest: beide Komponenten erhalten dieselbe Einstellung „Hintergrundfläche“ mit einer Deckkraft von 0 bis 85 Prozent; ab 45 Prozent trägt die abgedunkelte Fläche die Lesbarkeit, darunter übernehmen ein kräftigerer Schatten und angepasste Warnfarben, automatisch und ohne eigenen Schalter. **Die Erprobung hat das geändert** – siehe „Ergebnis der Erprobung vom 20.09.2026“ weiter unten: Die Skala endet bei 35 Prozent, der Schatten ist fest, die Warnfarben sind wählbar, und die Umschaltung bei 45 Prozent entfällt. Das Ziel selbst blieb unverändert.

#### Ausgangslage im Code (geprüft am 20.09.2026)

- Desklet: keine Hintergrundfläche, keine Deckkraft-Einstellung. Der Schatten von Beschriftung, Wert und Einheit steht fest in `stylesheet.css` (`text-shadow: 0px 0px 6px rgba(0,0,0,0.9)`), die Warnfarbe wird im Code an `wertStil`/`einheitStil` angehängt.
- Applet: `popup-opacity` als Skala 45–85 Prozent, Vorgabe 55; zusätzlich an drei Stellen im Code über `_gueltig()` auf 45–85 begrenzt. Schatten der Hover-Anzeige fest `0px 0px 8px rgba(0,0,0,0.9)`.
- `StatusAnzeige.zeige()` in `speedtest.js` begrenzt die Deckkraft selbst auf 0,45–0,85 und verwendet ohne Parameter 0,55. Nur zwei von zehn Aufrufen im Applet übergeben einen Wert, im Desklet keiner (Befund G3).
- Nachgerechnet gegen reinweißen Hintergrund: Orange `#FFA726` erreicht 1,95 : 1. Das bestätigt G9 rechnerisch.

#### Ablauf

0. Snapshot `06_TESTVERSIONEN/0.1.0-dev_AP20-START/`, erst danach Codeänderungen.
1. **Erprobung vor der Festlegung.** Eine Testfassung mit einer vorübergehenden Zusatzeinstellung „Variante“ (A/B/C) wird installiert. Der Nutzer schaltet bei hellem und bei dunklem Hintergrundbild durch die Varianten und entscheidet nach Augenschein. Erprobt werden Schatten (Radius und Deckkraft, sowie die Frage, ob Cinnamon mehrere Schatten je Text darstellt – in St nicht gesichert), Warnfarben unter 45 Prozent sowie die Deckkraftstufen 0, 25, 45, 55 und 85 Prozent. Die Zusatzeinstellung wird nach der Entscheidung wieder entfernt. `org.Cinnamon.Eval` wird dabei nur lesend verwendet.
2. **Umsetzung** nach der Entscheidung aus Schritt 1.
3. **Prüfung und Abschluss** nach der Sicherungsroutine aus Abschnitt 9.

#### Entscheidungen des Nutzers vom 20.09.2026

- **Meldungen in der Bildschirmmitte (Befund G3):** fest 55 Prozent Deckkraft, unabhängig von der Einstellung, in beiden Komponenten einheitlich. Begründung: Meldungen sind kurzlebig und wichtig und sollen immer lesbar sein. `StatusAnzeige.zeige()` bekommt damit keinen Deckkraftwert mehr übergeben; die beiden Aufrufe im Applet, die das bisher tun, werden angeglichen. G3 ist damit geschlossen.
- **Vorgabewert der Hintergrundfläche im Desklet:** 0 Prozent. Das Desklet sieht nach dem Update unverändert aus; die Fläche wird bewusst eingeschaltet.
- **Umfang der Erprobung:** drei Varianten A/B/C je Bereich.

#### Ergebnis der Erprobung vom 20.09.2026

Der Nutzer hat die Varianten auf hellem und auf dunklem Hintergrundbild verglichen und entschieden:

| Bereich | helles Hintergrundbild | dunkles Hintergrundbild | Festlegung |
|---|---|---|---|
| Deckkraft | 25 % gut | 25 % gut | Skala **0–35 %**, mehr wird nicht mehr angeboten (Applet später auf 0–55 % erweitert, siehe Nachtrag) |
| Schatten | Variante A | Variante A | **A**: `0px 0px 8px rgba(0,0,0,1)`, fest für beide Komponenten |
| Warnfarben | Variante A (gedämpft) | Variante B (leuchtend) | **beide**, über eine neue Einstellung wählbar |

Daraus folgen drei Änderungen gegenüber der ursprünglichen Festlegung:

1. **Höchstwert 35 statt 85 Prozent** (Entscheidung des Nutzers). Grund: Oberhalb davon wird die Fläche über hellem Bildschirminhalt mittelgrau, und gerade die Warnfarben verlieren darauf. Der Kontrastnachweis bestätigt das: Bei 55 % über reinweißem Inhalt erreicht `#FF5252` nur 1,49 : 1, `#FFA726` nur 2,44 : 1; brauchbar würden sie erst bei 85 % (4,74 bzw. 7,79 : 1).
2. **Die Umschaltung bei 45 Prozent entfällt.** Sie wäre mit der neuen Skala nicht mehr erreichbar und damit toter Code. An ihre Stelle treten ein fester, kräftiger Schriftschatten und der wählbare Warnfarbensatz. `WARN_FLAECHE_GRENZE`, `mitFlaeche()` und `schattenFuer()` aus der Erprobungsfassung sind wieder entfernt.
3. **Neue Einstellung „Warnfarben“** je Komponente, im Abschnitt „Warnschwellen“ und abhängig vom Schalter „Warnfarben anzeigen“: „Für dunkle Hintergründe (leuchtend)“ = `#FFA726` / `#FF5252` wie seit AP18, „Für helle Hintergründe (gedämpft)“ = `#E65100` / `#C62828`. Vorgabe ist „dunkel“, damit sich für Bestandsnutzer nichts ungefragt ändert. Begründung für die Einstellung statt einer festen Farbe: Der Nutzer hat je Hintergrund eine andere Variante gewählt, und aVincePulse kennt den Bildschirminhalt nicht – die Auswertung über `global.stage.read_pixels` wurde in AP08 bewusst verworfen, weil die Umschaltung beim Verschieben von Fenstern springen würde.

Die Applet-Vorgabe von 55 % war mit der neuen Skala nicht mehr zulässig und liegt jetzt bei 25 %. Ein bereits gespeicherter Wert oberhalb von 35 % wird nicht überschrieben, sondern bei der Anwendung auf den zulässigen Bereich begrenzt (`_gueltig()`, wie bei Befund H1).

Offen geblieben und nicht mehr geklärt: ob Cinnamon (St) mehrere Schatten je Text darstellt. Variante C hätte das beantwortet, wurde aber nicht gewählt. St-Quellen liegen auf dem Referenzgerät nicht vor. Für AP20 ohne Bedeutung, da ein einzelner Schatten genügt.

#### Akzeptanzkriterien

Die Kriterien 1 bis 5 wurden am 20.09.2026 nach der Erprobung fortgeschrieben; die ursprüngliche Fassung steht in der Git-Historie (Commit `6b42c7a`). Grund sind die drei Änderungen aus dem Abschnitt darüber, alle auf Entscheidung des Nutzers.

1. **Desklet:** neue Einstellung „Hintergrundfläche“ (Skala 0–35 Prozent) im Abschnitt „Darstellung“. Ab dem ersten Schritt über 0 liegt hinter den Zeilen eine abgedunkelte Fläche mit abgerundeten Ecken und Innenabstand; Ecken und Abstände richten sich nach der Schriftgröße. Bei 0 Prozent ist das Desklet optisch wie bisher.
2. **Applet:** Skala der Einstellung „Hintergrundfläche“ auf 0–55 Prozent (Nachtrag vom 20.09.2026, zunächst 0–35), im Schema und an jeder Stelle im Code, die den Wert begrenzt. Die Festlegung aus AP09 („nicht unter 45 Prozent“) ist damit ausdrücklich aufgehoben. Ein gespeicherter Wert außerhalb des Bereichs wird nicht überschrieben, sondern bei der Anwendung begrenzt.
3. **Schrift und Farben:** Der Schriftschatten ist fest und für beide Komponenten gleich (`SCHRIFTSCHATTEN` in `metrics.js`, `0px 0px 8px rgba(0,0,0,1)`); er trägt die Lesbarkeit, da die Fläche nur noch schwach sein kann. Die Warnfarben sind über die neue Einstellung „Warnfarben“ wählbar (hell/dunkel) und wirken sofort, ohne Neuladen.
4. **Vorgabewerte:** Applet 35 Prozent bei einer Skala bis 55 Prozent, Desklet 0 Prozent bei einer Skala bis 35 Prozent (Nachtrag vom 20.09.2026; zunächst waren es 25 Prozent und 35 Prozent für beide), Warnfarben „dunkel“ in beiden Komponenten. Gespeicherte Werte werden nicht überschrieben.
5. **Kontrastnachweis:** Die Kontraste beider Farbsätze und der weißen Schrift sind für den ungünstigsten Fall – reinweißer und reinschwarzer Inhalt – rechnerisch belegt und in `metrics.js` sowie in `06_TESTVERSIONEN/0.1.0-dev_AP20-PRUEFDATEN/kontrast.py` festgehalten. Ein Mindestwert von 3,0 : 1 wird **nicht** als Bedingung gesetzt: Im Bereich bis 35 Prozent Deckkraft trägt der Schriftschatten wesentlich zur Lesbarkeit bei, und seine Wirkung lässt sich nicht in eine Kontrastzahl fassen. Maßgeblich ist der Augenschein des Nutzers auf hellem und dunklem Hintergrundbild; die Zahlen dienen der Nachvollziehbarkeit und der Auswahl der Farbwerte.
6. **Befund G3:** Die Meldungen in der Bildschirmmitte verwenden in beiden Komponenten fest 55 Prozent.
7. **Warnfarben und Schatten bleiben zentral** in `metrics.js`; keine zweite Farbtabelle im UI-Code. Der Schatten des Desklets wandert aus `stylesheet.css` in den Code, damit beide Komponenten denselben Wert verwenden und eine Änderung keinen Cinnamon-Neustart erfordert; das Stylesheet behält eine gleichlautende Angabe für den Fall, dass noch kein Stil gesetzt ist.
8. **„Zurücksetzen“** stellt in beiden Komponenten auch den neuen Wert auf die Vorgabe zurück, sichtbar wirksam.
9. **Robustheit:** ein beschädigter oder außerhalb des Bereichs liegender Wert in der Einstellungsdatei führt zum Vorgabewert, nicht zu einer unbrauchbaren Anzeige (`_gueltig()`, auch im Desklet).
10. **Prüfung vor jeder Installation:** Syntax mit `cjs`, Namensprüfung, Prüfsummen der vier gemeinsamen Module identisch. Einstellungsdateien unmittelbar vor jedem Eingriff sichern, danach mit `wertevergleich.py` vergleichen; am Ende nachweislich unverändert.
11. **Funktionstest durch den Nutzer** in beiden Komponenten, auf hellem und dunklem Hintergrundbild, mit ausgelöster Warn- und Kritisch-Farbe.
12. **Abschluss:** Version `0.1.0-dev.20` in beiden `metadata.json` und in beiden Testinstallationen, Snapshot `AP20-END`, Fortschreibung dieses Dokuments und der Roadmap, Commit, Tag, Vollbackup mit Wiederherstellungsprobe, GitHub-Release.

#### Nicht Bestandteil von AP20

Aktion bei Linksklick (AP21), Übersetzung, Aufräumen der nie angezeigten Tooltips, Befund G4 (Panelhöhe bei einfarbigem Logo).

**AP19 – Zwischenprüfung: abgeschlossen am 20.09.2026.** Ergebnis und behobene Befunde stehen in Abschnitt 6 unter „AP19“, alle Einzelheiten im Prüfbericht. Die folgenden Absätze halten den Ablauf und die Festlegungen des Arbeitspakets fest.

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

- Erledigt mit AP19 (Befund M3): Das Desklet schreibt `/tmp/avince-hwmonitor-values` nicht mehr. Die alten Komponenten `avince-hwpopup@angelo` und `avince-hwmonitor@angelo` sind installiert, aber nicht aktiv; der Nutzer behält sie vorerst. Ihr Quellcode liegt in `05_DOKUMENTATION/QUELLCODE_VOR_AP05_SYNC_2026-09-16/`, eine Kopie ihres Einstellungsordners in `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/altstaende/`. **Achtung:** Beide Verzeichnisse sind per `.gitignore` von GitHub ausgeschlossen und liegen nur auf der NAS sowie in den Vollbackups (im Archiv `…_FINAL.tar.gz` enthalten, geprüft am 20.09.2026). Vor einer Deinstallation der Altstände ist das zu beachten.
- Eine selbsttätige Erkennung heller Panel-Themes gibt es weiterhin nicht. Sie ist entbehrlich geworden, da die Fassung seit AP09 über die Einstellungen wählbar ist.
- Erledigt mit AP20: Das Desklet besitzt jetzt die Einstellung „Hintergrundfläche“. Eine Einstellung für die Anzeigegröße hat es weiterhin nicht; sie wird über Schriftgröße und Schriftstärke geregelt.
- Die Speedtest-Lösung LibreSpeed ist vor einer Veröffentlichung auf Lizenz, Verteilbarkeit und Cinnamon-Spices-Konformität zu prüfen. **Ergebnis der Vorprüfung vom 19.09.2026:** `librespeed-cli` ist kein Paket der Mint-Quellen, die Spices-Regeln verbieten aber Installationsanweisungen für Quellen außerhalb des Spices-Umfelds. Dafür ist ein eigenes Arbeitspaket vor der Veröffentlichung vorgesehen (`ROADMAP_V2.md`, Abschnitt 24, „Speedtest-Programm vor der Veröffentlichung“): `speedtest-cli` aus den Paketquellen unterstützen, `librespeed-cli` nur verwenden, wenn vorhanden.
- Veröffentlichung, Sprachen und Unterstützen-Hinweis sind in `ROADMAP_V2.md`, Abschnitt 24, festgelegt: zwei Einreichungen bei Cinnamon Spices mit vorgegebener Ordnerstruktur, englische Ausgangstexte mit gettext und Sprachwahl über die Systemsprache, sowie ein dezenter Unterstützen-Hinweis (README, `FUNDING.yml`, Schaltfläche im Einstellungsfenster), abgewickelt über aVince Industrietechnik.
- Ausblick: eine Windows-Fassung ist als eigenes Projekt nach der Veröffentlichung vorgesehen (`ROADMAP_V2.md`, Abschnitt 23, „Ausblick: aVincePulse für Windows“).
- GPU-Temperatur und GPU-Auslastung fehlen weiterhin im Messwertmodell. Auf dem Latitude-5285 stellt die Intel-iGPU keinen eigenen Temperatursensor bereit; `coretemp / Package id 0` ist dort bereits die GPU-Temperatur. Eine belastbare Auslastungsanzeige ist über die reinen Kernel-Schnittstellen nicht möglich, `/sys/class/drm/card1` liefert nur Taktfrequenzen. Dieses Thema sollte an einem Gerät mit dedizierter AMD- oder NVIDIA-Grafik bearbeitet werden.
- Das C-1-Iconset liegt als PNG-Entwurfsmaterial vor. Ein eigenständiges Vektorlogo (SVG) und die Lizenz- und Rechteprüfung stehen noch aus. Als Panel-Symbol ist es seit AP09 eingebunden.
- Übersetzung Deutsch/Englisch über gettext. Cinnamon übersetzt auch das Einstellungsfenster, wenn die Komponente eigene Übersetzungsdateien mitbringt; es folgt dabei immer der Systemsprache. Cinnamon Spices erwartet üblicherweise englische Ausgangstexte, derzeit sind sie deutsch. Sinnvoll erst nach AP14, da dort weitere Texte entstehen. Dabei auch die englischen Reste im Hardwarebericht übersetzen („unlabeled“, „NOT FOUND“, „none“; Entscheidung vom 18.09.2026). Der Titelvergleich des Einstellungsfensters (AP15) ist dann anzupassen.
- Tooltips an Schaltflächen im Einstellungsschema werden von Cinnamon nicht angezeigt (siehe AP17). Bei Gelegenheit entfernen oder durch Hinweistexte ersetzen.
- Die in AP19 genannten veralteten Stellen dieses Dokuments (Abschnitt 5, 7, 7a, 8, 10, 12 sowie AP07, AP08, AP09) wurden am 19.09.2026 korrigiert. Die Angaben zur Deckkraft in AP08 und AP09 gelten seit AP20 nicht mehr; sie bleiben als Stand des jeweiligen Arbeitspakets stehen und sind dort als abgelöst gekennzeichnet.
- Offen geblieben aus AP20: ob Cinnamon (St) mehrere Schatten je Text darstellt. Die Erprobungsvariante mit Doppelschatten wurde nicht gewählt, St-Quellen liegen auf dem Referenzgerät nicht vor. Ohne Bedeutung, solange ein einzelner Schatten genügt.

Ablauf von AP20 (20.09.2026, alle Schritte erledigt):

1. erledigt – `PROJECT-STATUS.md`, `ROADMAP_V2.md` (Abschnitte 23 und 24) und `PRUEFBERICHT_AP19.md` gelesen
2. erledigt – `git status` sauber, `main` und GitHub synchron (`3f904f6`), Version `0.1.0-dev.19`, Prüfsummen der vier gemeinsamen Module identisch, Testinstallation ohne Abweichung zum Repository
3. erledigt – Ziel und Akzeptanzkriterien oben in diesem Abschnitt festgelegt und vom Nutzer freigegeben
4. erledigt – Snapshot `0.1.0-dev_AP20-START` angelegt, erst danach Code geändert
5. erledigt – nach jeder Änderung Syntax (`cjs`), Namensprüfung, Prüfsummen der vier gemeinsamen Module, gezielter Test, Test durch den Nutzer
6. erledigt – Abschluss mit der Sicherungsroutine aus Abschnitt 9, Versionsnummer `0.1.0-dev.20`

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

**Stand 26.09.2026: AP28 ist abgeschlossen. Als Nächstes folgt die
Einreichung bei Cinnamon Spices.** Es ist kein Arbeitspaket mehr nötig.

**Die Einreichungsfassung heißt `0.1.0`** und trägt ein eigenes Tag
ohne `-dev`. Die Zählung `0.1.0-dev.xx` ist damit beendet; künftige
Fassungen zählen `0.1.1`, `0.2.0` weiter (Abschnitt 9).

**Einstiegspunkt ist `05_DOKUMENTATION/AP28-ZIELE.md`**, davor
`AP27-ZIELE.md` – Ziele,
Akzeptanzkriterien und Nachweise des letzten Pakets stehen dort
beieinander, der Zweitgerätelauf in `AP27-TOWERTEST.md`. Abschnitt 14
dieses Dokuments nennt den nächsten Schritt und was danach vorgemerkt
ist. `PRUEFBERICHT_AP25.md` bleibt die Grundlage für alles Frühere.

**Vor AP27 stand ein Abschluss-Audit** über den gesamten Quellcode.
Seine beiden Punkte der Kategorie A sind erledigt; die Punkte der
Kategorien B und C stehen in Abschnitt 14 unter „Nach der
Veröffentlichung vorgemerkt".

**Was die Einreichung verlangt**, steht vollständig in
`06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/spices/EINREICHUNG-ANFORDERUNGEN.md`.
Das Entscheidende: **zwei getrennte Pull Requests**, Titel und
Commit-Nachricht je in der Form `spice name: beschreibung`. Ein PR mit
beiden Spices wird geschlossen.

Die fertigen Pakete liegen unter
`06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/einreichung/`, in AP27 neu
gebaut, beide mit „No errors found".

**Das Repository bleibt öffentlich.** Es privat zu setzen würde Befund
P26 wieder aufmachen, dessen Nachweis – Clone ohne Anmeldung – dann
erneut zu führen wäre.

**Aus AP25 weiterhin gültig:** Die 115 gelöschten `.bak`-Dateien liegen
als `06_TESTVERSIONEN/0.1.0-dev_AP25-BAK-ARCHIV.tar.gz`, mit
Wiederherstellungsprobe belegt.

**Zwei Geräte.** Entwickelt und geprüft wird auf dem Referenzgerät
(Dell Latitude 5285) mit dem Arbeitsverzeichnis auf der NAS. Das
Zweitgerät (`tower-linux`) arbeitet aus einem Git-Clone unter
`~/aVincePulse`.

**Der Tower erreicht die NAS ebenfalls** (bestätigt am 26.09.2026).
Für Tests gilt trotzdem der Clone als Arbeitsgrundlage: Er entspricht
dem, was ein Nutzer bekommt, und er zwingt dazu, alles Nötige
tatsächlich in Git zu haben. **Im NAS-Verzeichnis vom Tower aus nur
lesen** – dort liegt das Git-Repository des Referenzgeräts, und
gleichzeitiges Schreiben von zwei Rechnern bringt es durcheinander.

Anleitung und Einstieg dort:
`ZWEITGERAET-TESTEN.md` und `ZWEITGERAET-EINSTIEG.md`. Bei jeder
Anweisung ist anzugeben, für welches der beiden Geräte sie gilt.

Erwarteter Ausgangspunkt:

- Branch: `main`, Arbeitsverzeichnis sauber
- Referenz-Tag: `0.1.0`, Versionsnummer `0.1.0`
- AP01 bis AP28 abgeschlossen
- Vorhanden: `AP28-ZIELE.md`, `AP27-ZIELE.md`, `AP27-TOWERTEST.md`, `AP26-ZIELE.md`, `PRUEFBERICHT_AP25.md`, `PRUEFBERICHT_AP19.md`, `08_LIZENZEN_RECHTE/SPEEDTEST-PROGRAMME.md`, `LICENSE`, beide READMEs, `po/` je Komponente
- Nächster Schritt: **die Einreichung** – zwei getrennte Pull Requests. Kein weiteres Arbeitspaket ist vorher nötig; für jedes spätere gilt wieder, Ziel und Akzeptanzkriterien vorher schriftlich festzulegen und freigeben zu lassen

---

Dieses Dokument soll nach jedem abgeschlossenen Arbeitspaket aktualisiert werden, damit ein Wechsel zwischen Entwicklungsumgebungen oder KI-Assistenten ohne Verlust des Projektkontexts möglich bleibt.
