# aVincePulse – Projektstatus und Übergabedokument

Stand: 16.09.2026 (AP06)  
Projekt: aVincePulse  
Repository: `aVince-Industrietechnik/aVincePulse`  
Standard-Branch: `main`  
Aktueller Referenzstand: `0.1.0-dev_AP06-END`  
Vorheriger Referenzstand: `0.1.0-dev_AP05-END` (`e4cb758141a55a29f5a46a47fb419520e408316e`)

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

## 7. Aktuelle Quellcode-Architektur des Desklets

Wesentliche Dateien:

- `desklet.js` – UI, Refresh, Darstellung, Popup-Handoff; baut die Anzeigezeilen aus `METRIC_ORDER` auf
- `metrics.js` – Messwertmodell und Reihenfolge
- `measurement.js` – Messlogik und Laufzeitwerte
- `hardwareDetection.js` – dynamische Hardware-/Sensorerkennung
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

AP01 bis AP06 sind abgeschlossen.

**AP07 ist noch nicht verbindlich definiert.**

Aus der bisherigen Prüfung bekannte offene Punkte, die als Grundlage für die Festlegung dienen können:

- Das Applet entspricht weiterhin dem Baseline-Stand und bezieht seine Werte ausschließlich aus `/tmp/avince-hwmonitor-values`. Ohne laufendes Desklet zeigt es keine Werte an. Das widerspricht dem Grundsatz EIGENSTÄNDIG + KOOPERATIV.
- Speedtest-Werte werden weiterhin unter der alten UUID `avince-hwmonitor@angelo` gespeichert und gelesen.
- Der LibreSpeed-Pfad ist im Applet fest codiert.
- Das Messwertmodell enthält noch nicht die für Version 1.0 verbindlichen Messwerte GPU-Temperatur, GPU-Auslastung, Akkuinformationen und Speicherplatzbelegung.

Vor Beginn von AP07:

1. `PROJECT-STATUS.md` lesen
2. `ROADMAP_V2.md` lesen
3. `git status` prüfen
4. sicherstellen, dass `main` und GitHub synchron sind
5. Ziel und Akzeptanzkriterien für AP07 definieren
6. erst danach Code ändern

Keine neue AP07-Aufgabe aus Vermutungen ableiten, wenn sie noch nicht gemeinsam festgelegt wurde.

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

Erwarteter Ausgangspunkt nach AP06:

- Branch: `main`
- Arbeitsverzeichnis: sauber
- Referenz-Tag: `0.1.0-dev_AP06-END`
- AP06 abgeschlossen
- AP07 noch zu definieren

---

Dieses Dokument soll nach jedem abgeschlossenen Arbeitspaket aktualisiert werden, damit ein Wechsel zwischen Entwicklungsumgebungen oder KI-Assistenten ohne Verlust des Projektkontexts möglich bleibt.
