# aVincePulse 0.1.0-dev – Baseline-Prüfung

Datum: 16.09.2026
Referenzsystem: Dell Latitude-5285
Desktop: Linux Mint Cinnamon

## Zweck

Diese Datei dokumentiert den geprüften Ausgangszustand der Entwicklungsbasis 0.1.0-dev vor den ersten Änderungen am Quellcode.

Die produktiv verwendete Installation sowie die Linux-Mint-Master-Referenz bleiben von der Entwicklung getrennt.

## Herkunft

Ausgangsquelle:

02_QUELLCODE/Applet
02_QUELLCODE/Desklet

Entwicklungsstand:

06_TESTVERSIONEN/0.1.0-dev

Der Vergleich mit:

diff -qr

ergab vor Beginn der Entwicklung keine Unterschiede zwischen Ausgangsquelle und Entwicklungsstand.

## Dateien

### Applet

- applet.js
- metadata.json
- vorhandene historische .bak-Dateien

### Desklet

- desklet.js
- metadata.json
- settings-schema.json
- stylesheet.css
- vorhandene historische .bak-Dateien

## Quellcode-Baseline

Applet/applet.js:
- 496 Zeilen
- 14.476 Byte

Desklet/desklet.js:
- 503 Zeilen
- 14.009 Byte

Gesamt:
- 999 Zeilen
- 28.485 Byte

## SHA-256 Ausgangsstand

Applet/applet.js:

5a2cf30f50e21a56b2190f66e30e269c967eecd46f2cea0076a997eef084c45d

Desklet/desklet.js:

51c686be7e1cd24d81cc62305a4492591afe46c9cfb7593650e557b231a4055

Diese Prüfsummen dokumentieren den unveränderten Entwicklungs-Ausgangsstand.

## Aktuelle UUIDs der Baseline

Applet:

avince-hwpopup@angelo

Desklet:

avince-hwmonitor@angelo

Diese UUIDs stammen aus der privaten Ausgangsversion und sind noch nicht die endgültigen öffentlichen aVincePulse-UUIDs.

## Aktuelle Namen der Baseline

Applet:

aVince Hardware Popup

Desklet:

aVince Hardware Monitor

Die öffentliche Produktbezeichnung soll aVincePulse verwenden.

## Erkannte Einstellungen

Das Desklet besitzt aktuell Einstellungen für:

- Schriftgröße
- Schriftstärke
- Aktualisierungsintervall

Das Applet besitzt in dieser Baseline noch kein eigenes settings-schema.json.

## Erkannte Datenquellen

Die Baseline verwendet unter anderem:

- /proc/stat
- /proc/meminfo
- /sys/class/net
- lm-sensors bzw. Befehl sensors
- LibreSpeed CLI
- Cinnamon/GLib/GIO

## Gute portable Ansätze der Baseline

Folgende Ansätze können grundsätzlich als Basis für die weitere Entwicklung dienen:

- CPU-Auslastung über /proc/stat
- RAM-Auslastung über /proc/meminfo
- Netzwerkzähler über /sys/class/net
- Cinnamon-native Applet-/Desklet-Strukturen
- GLib/GIO für geeignete Systemzugriffe

Die endgültige Implementierung wird trotzdem auf Portabilität und Cinnamon-Spices-Konformität geprüft.

## Erkannte Portabilitätsprobleme

Folgende Baseline-Lösungen dürfen nicht ungeprüft als allgemeine aVincePulse-Lösung übernommen werden:

### CPU-Temperatur

Festes Sensorlabel:

Package id 0

Dieses Label ist hardwareabhängig.

### SSD/NVMe-Temperatur

Festes Sensorlabel:

Composite

Dieses Label ist nicht als allgemeingültige Geräteidentifikation geeignet.

### Lüfter

Festes Sensorlabel:

fan1

Dieses Label ist hardwareabhängig.

### LibreSpeed

Aktuell fest codierter Pfad:

/usr/local/bin/librespeed-cli

Dieser Pfad darf für eine öffentliche Version nicht vorausgesetzt werden.

### Gemeinsame Laufzeitdaten

Aktuelle Datei:

/tmp/avince-hwmonitor-values

Diese Lösung gehört zur funktionierenden privaten Baseline und wird nicht automatisch als endgültige öffentliche Architektur übernommen.

## Architekturbeobachtung

Applet und Desklet enthalten derzeit teilweise doppelte Logik für:

- Sensorzugriff
- Netzwerkerkennung
- Netzwerkberechnung
- Formatierung

Für aVincePulse gilt laut Roadmap:

EIGENSTÄNDIG + KOOPERATIV

Beide Komponenten müssen eigenständig funktionieren, sollen jedoch konsistente technische Konzepte und Messwertdefinitionen verwenden.

## Speedtest

Die Baseline verwendet LibreSpeed CLI.

Der letzte erfolgreiche Speedtest wird persistent gespeichert.

Fehlgeschlagene Tests sollen gültige vorherige Ergebnisse nicht überschreiben.

Für die öffentliche Version ist LibreSpeed noch nicht als zwingende endgültige Abhängigkeit festgelegt.

## JSON-Prüfung

Geprüft wurden:

- Applet/metadata.json
- Desklet/metadata.json
- Desklet/settings-schema.json

Ergebnis:

ALLE JSON-DATEIEN SYNTAKTISCH GÜLTIG

## Entwicklungsregel

Ab diesem dokumentierten Stand erfolgen Änderungen ausschließlich innerhalb des Entwicklungsprojekts.

Nicht direkt verändern:

- produktive Applet-/Desklet-Installation des Latitude-5285
- Linux-Mint-Master-Referenz
- 02_QUELLCODE als gesicherte Ausgangsquelle

Arbeitsbereich:

06_TESTVERSIONEN/0.1.0-dev

## Prüfstatus

DATEIVOLLSTÄNDIGKEIT: OK
QUELLVERGLEICH: OK
PRÜFSUMMEN: ERFASST
ABHÄNGIGKEITEN: ERFASST
PORTABILITÄTSPUNKTE: ERFASST
METADATEN: GEPRÜFT
SETTINGS: GEPRÜFT
CODESTRUKTUR: ERFASST
JSON-SYNTAX: OK

Status:

BASELINE 0.1.0-dev – GEPRÜFT UND DOKUMENTIERT
