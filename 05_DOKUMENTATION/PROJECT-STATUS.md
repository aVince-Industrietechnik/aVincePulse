# aVincePulse – Projektstatus und Übergabedokument

Stand: 17.09.2026 (AP07)  
Projekt: aVincePulse  
Repository: `aVince-Industrietechnik/aVincePulse`  
Standard-Branch: `main`  
Aktueller Referenzstand: `0.1.0-dev_AP07-END`  
Vorheriger Referenzstand: `0.1.0-dev_AP06-END`

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
- `04_UEBERSETZUNGEN/` – Übersetzungen
- `05_DOKUMENTATION/` – technische und projektbezogene Dokumentation
- `06_TESTVERSIONEN/` – lokale Entwicklungsstände und AP-Snapshots auf der NAS; absichtlich nicht in GitHub versioniert
- `07_RELEASES/` – spätere Release-Artefakte
- `08_LIZENZEN_RECHTE/` – Lizenz- und Rechteprüfung
- `09_GITHUB/` – GitHub-bezogene lokale Hilfsdaten

Wichtig: `06_TESTVERSIONEN/` bleibt lokal auf der Synology/NAS und ist per `.gitignore` ausgeschlossen. Historische Entwicklungsstände werden in GitHub über Commits und Tags abgebildet.

## 5. Aktueller Git-Stand

Bisherige relevante Commits:

- `f0f7854` – Initial import: aVincePulse 0.1.0-dev through AP05
- `e4cb758` – Restructure repository: use full aVincePulse development project
- `6cb4ad6` – Add project handoff status for model-independent development

Tags:

- `0.1.0-dev_AP05-END` – Entwicklungsstand nach Abschluss von AP05
- `0.1.0-dev_AP06-END` – Entwicklungsstand nach Abschluss von AP06
- `0.1.0-dev_AP07-END` – Entwicklungsstand nach Abschluss von AP07

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

Die Erkennung läuft einmalig beim Laden des Desklets. Ändert sich die Hardware oder wird ein Treiber verzögert geladen, ist ein Neuladen erforderlich. Die in der Roadmap vorgesehene Funktion „Hardware neu erkennen" ist noch nicht umgesetzt.

#### Geprüfte Hardwarefälle

Auf dem Referenzsystem real geprüft, zusätzlich per Simulation der Sensorverfügbarkeit:

- Latitude-5285, alle Sensoren vorhanden: 14 Zeilen
- Desktop-PC ohne Lüftersensor und ohne Akku: 11 Zeilen
- Mini-PC zusätzlich ohne Storage-Temperatur: 10 Zeilen
- virtuelle Maschine ohne jeden Sensor: 9 Zeilen, stabil

## 7. Aktuelle Quellcode-Architektur des Desklets

Wesentliche Dateien:

- `desklet.js` – UI, Refresh, Darstellung, Popup-Handoff; baut die Anzeigezeilen aus `METRIC_ORDER` auf
- `metrics.js` – Messwertmodell und Reihenfolge
- `measurement.js` – Messlogik und Laufzeitwerte
- `hardwareDetection.js` – dynamische Hardware-/Sensorerkennung, Akku- und Netzteilerkennung, Verfügbarkeitsmeldung
- `settings-schema.json` – Einstellungen
- `stylesheet.css` – Darstellung
- `metadata.json` – Cinnamon-Metadaten

Verantwortlichkeiten sollen sauber getrennt bleiben. Neue Funktionen nicht wieder direkt in `desklet.js` bündeln, wenn sie logisch in Messung, Hardwareerkennung oder ein eigenes Modul gehören.

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

### Symbole in der Anzeige

Emoji dürfen nicht als Anzeigesymbole verwendet werden. Zeichen wie `🔋` oder `⚡` besitzen laut Unicode-Standard eine Emoji-Voreinstellung und werden von Cinnamon farbig aus `Noto Color Emoji` gerendert, auch wenn `fc-match` eine einfarbige Schrift meldet. Das wurde am Referenzsystem bestätigt.

Verwendet werden dürfen nur Zeichen aus den geometrischen Unicode-Blöcken, die in der Standardschrift enthalten sind, zum Beispiel `⛁`, `▤`, `↓` oder `↑`.

Vor der Verwendung eines neuen Zeichens ist zu prüfen, aus welcher Schrift es stammt:

```bash
fc-list ":charset=26C1" family
```

### Feste Spaltenbreiten

`stylesheet.css` verwendet feste Pixelbreiten für Bezeichnung, Wert und Einheit (70/58/50 px). Die Schriftgröße ist über die Einstellungen jedoch bis 30 px veränderbar. Ab etwa 20 px können dadurch auch Zahlen abgeschnitten werden.

Dieser Punkt stammt aus der Baseline und ist noch offen. Die Breiten sollten aus der eingestellten Schriftgröße berechnet werden.

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

Das Git-Bundle wurde verifiziert und enthält die komplette Git-Historie einschließlich `main` und Tag `0.1.0-dev_AP05-END`.

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

Aktive bzw. verwendete Cinnamon-Testinstallation des Desklets:

`~/.local/share/cinnamon/desklets/avincepulse-desklet@avince`

Die installierte Testkopie ist nicht automatisch identisch mit dem Git-Repository. Vor Tests bewusst prüfen, welche Dateien installiert bzw. synchronisiert wurden.

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

AP01 bis AP07 sind abgeschlossen.

**AP08 ist noch nicht verbindlich definiert.**

Aus der bisherigen Prüfung bekannte offene Punkte, die als Grundlage für die Festlegung dienen können:

- Das Applet entspricht weiterhin dem Baseline-Stand und bezieht seine Werte ausschließlich aus `/tmp/avince-hwmonitor-values`. Ohne laufendes Desklet zeigt es keine Werte an. Das widerspricht dem Grundsatz EIGENSTÄNDIG + KOOPERATIV.
- Speedtest-Werte werden weiterhin unter der alten UUID `avince-hwmonitor@angelo` gespeichert und gelesen.
- Der LibreSpeed-Pfad ist im Applet fest codiert.
- Der Zeitpunkt des letzten erfolgreichen Speedtests wird nicht gespeichert, ist für Version 1.0 aber verbindlich vorgesehen.
- GPU-Temperatur und GPU-Auslastung fehlen weiterhin im Messwertmodell. Auf dem Latitude-5285 stellt die Intel-iGPU keinen eigenen Temperatursensor bereit; `coretemp / Package id 0` ist dort bereits die GPU-Temperatur. Eine belastbare Auslastungsanzeige ist über die reinen Kernel-Schnittstellen nicht möglich, `/sys/class/drm/card1` liefert nur Taktfrequenzen. Dieses Thema sollte an einem Gerät mit dedizierter AMD- oder NVIDIA-Grafik bearbeitet werden.
- Die festen Spaltenbreiten in `stylesheet.css` passen nicht zur einstellbaren Schriftgröße.
- Die Funktion „Hardware neu erkennen" aus der Roadmap ist noch nicht umgesetzt.
- Ein- und Ausblenden einzelner Messwerte sowie eine benutzerdefinierte Reihenfolge sind noch nicht über die Einstellungen möglich. Die technische Voraussetzung dafür besteht seit AP06.

Vor Beginn von AP08:

1. `PROJECT-STATUS.md` lesen
2. `ROADMAP_V2.md` lesen
3. `git status` prüfen
4. sicherstellen, dass `main` und GitHub synchron sind
5. Ziel und Akzeptanzkriterien für AP08 definieren
6. erst danach Code ändern

Keine neue AP08-Aufgabe aus Vermutungen ableiten, wenn sie noch nicht gemeinsam festgelegt wurde.

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

Erwarteter Ausgangspunkt nach AP07:

- Branch: `main`
- Arbeitsverzeichnis: sauber
- Referenz-Tag: `0.1.0-dev_AP07-END`
- AP07 abgeschlossen
- AP08 noch zu definieren

---

Dieses Dokument soll nach jedem abgeschlossenen Arbeitspaket aktualisiert werden, damit ein Wechsel zwischen Entwicklungsumgebungen oder KI-Assistenten ohne Verlust des Projektkontexts möglich bleibt.
