# aVincePulse – Entwicklungsroadmap

Stand: 15.09.2026
Projektstatus: Entwicklungsphase
Arbeitsname: aVincePulse

## 1. Baseline 1

Ausgangssystem:
- Linux Mint Cinnamon
- Referenzrechner: Dell Latitude-5285
- Linux-Mint-Master-Referenz: 2026-09-15_21-10-41

Die Baseline ist vollständig funktionsfähig und wird nicht direkt für Experimente verändert.

Aktuelle Komponenten:
- aVince Hardware Monitor Desklet
- aVince Hardware Popup Applet

Aktuelle Funktionen:
- CPU-Temperatur
- CPU-Auslastung (LOAD)
- RAM-Auslastung
- SSD-Temperatur
- Lüfterdrehzahl
- Netzwerk Download/Upload in Echtzeit
- Internet-Speedtest Download
- Internet-Speedtest Upload
- Ping
- Jitter
- Hover-Anzeige über Panel-Applet
- Speedtest per Klick auf das Applet
- persistente Speicherung des letzten erfolgreichen Speedtests
- konfigurierbare Desklet-Schriftgröße, Schriftstärke und Aktualisierungsintervall

## 2. Ziel aVincePulse 1.0

Entwicklung eines kostenlosen, einfach installierbaren Hardware- und Netzwerkmonitors für Linux Mint Cinnamon.

aVincePulse soll aus zwei zusammengehörigen, aber eigenständig nutzbaren Komponenten bestehen:
1. aVincePulse Applet
2. aVincePulse Desklet

Grundprinzip: EIGENSTÄNDIG + KOOPERATIV.

Applet und Desklet sollen unabhängig voneinander installiert und verwendet werden können. Gleichzeitig sollen sie eine konsistente technische Architektur, Messwerttypen und Bedienlogik verwenden und – soweit technisch sinnvoll und Cinnamon-Spices-konform – Messdaten effizient gemeinsam nutzen.

## 3. Hardware- und Sensorerkennung

Geplant:
- automatische Erkennung verfügbarer Sensoren
- CPU-Temperatursensoren
- SSD/NVMe-Temperatursensoren
- Lüfter und Drehzahlen
- automatische Vorauswahl sinnvoller Sensoren
- manuelle Auswahl durch den Benutzer
- nicht vorhandene Sensoren werden nicht angezeigt
- Unterstützung unterschiedlicher Desktop-PCs, Notebooks und Mini-PCs

## 4. Anzeige und Einstellungen

Geplant:
- einzelne Messwerte ein-/ausblendbar
- Desklet ein-/ausblendbar
- Applet konfigurierbar
- Reihenfolge der Werte einstellbar
- Schriftgröße
- Schriftstärke
- Textfarbe
- Schattenstärke
- Abstände
- Aktualisierungsintervall
- Einheiten
- Applet-Symbol/Design
- optionale Farbvarianten

## 5. Sprachen

Version 1.0:
- Deutsch
- Englisch

Technische Umsetzung über gettext bzw. die für Cinnamon Spices vorgesehene Übersetzungsstruktur.

Spätere Versionen sollen weitere Übersetzungen ermöglichen.

## 6. Applet-Symbol und Design

Für aVincePulse soll ein eigenständiges, wiedererkennbares Symbol entwickelt werden.

Anforderungen:
- auch bei kleiner Panel-Darstellung gut erkennbar
- eigenes Design statt reinem Unicode-Symbol
- SVG als bevorzugtes Format
- klare Verbindung zu Hardware, Systemzustand oder Pulse/Messung
- Varianten für unterschiedliche Panel-/Theme-Hintergründe

## 7. Installation

Ziel:
- Applet und Desklet gehören funktional zur Produktfamilie aVincePulse
- Applet und Desklet bleiben eigenständig installierbare Cinnamon-Komponenten
- jede Komponente muss auch ohne die jeweils andere funktionsfähig sein
- möglichst einfache Installation über die Cinnamon-Spices-Infrastruktur
- keine zwingende gemeinsame Core-Installation
- Prüfung notwendiger und optionaler Abhängigkeiten
- automatische Sensorerkennung bei Ersteinrichtung
- sinnvolle automatische Vorauswahl der Messwerte
- manuelle Anpassung durch den Benutzer
- saubere Deinstallation
- keine unnötigen Systemänderungen

Die jeweils aktuellen Anforderungen der offiziellen Cinnamon-Spices-Infrastruktur werden berücksichtigt.

## 8. Speedtest

Aktuelle Entwicklungsbasis:
- LibreSpeed CLI

Zu prüfen:
- Lizenz
- Distribution/Installation
- Abhängigkeiten
- Cinnamon-Spices-Konformität
- Fehlerbehandlung
- Serverauswahl
- Datenschutz
- Portabilität auf andere Systeme

## 9. Lizenz und Rechte

Vor Veröffentlichung vollständig zu prüfen:
- Lizenz des eigenen Quellcodes
- Cinnamon-/Linux-Mint-Vorgaben
- LibreSpeed-Lizenz
- verwendete Icons und Grafiken
- Bibliotheken und Abhängigkeiten
- übernommene Codebestandteile
- Marken- und Namensrechte

Ziel:
Keine Verletzung von Rechten Dritter.

Als mögliche Projektlizenz wird GPL-3.0 geprüft.

## 10. Kostenloses Projekt / Unterstützung

aVincePulse soll grundsätzlich kostenlos nutzbar sein.

Geplant:
- freiwilliger Support-/Spenden-Link
- keine Funktionseinschränkung bei Nichtspende
- keine störenden Nag-Screens
- Cinnamon-Spices-Regeln beachten
- dezenter Hinweis innerhalb der Einstellungen bzw. Projektdokumentation

## 11. GitHub

Geplant:
- öffentliches GitHub-Repository
- README
- LICENSE
- CHANGELOG
- Screenshots
- Quellcode
- Übersetzungen
- Dokumentation
- Issues
- Releases
- Versionsverwaltung

## 12. Cinnamon Spices

Langfristiges Ziel:
Aufnahme von Applet und Desklet in die offizielle Cinnamon-Spices-Infrastruktur.

Vor Einreichung:
- Cinnamon-Richtlinien prüfen
- UUIDs festlegen
- Metadaten vervollständigen
- Übersetzungen integrieren
- Validierung durchführen
- Tests auf mehreren Rechnern
- Installations-/Deinstallationstest
- Lizenzprüfung
- Dokumentation fertigstellen

## 13. Entwicklungsphasen

### Phase 1 – Produktkonzept
- endgültiger Name
- Logo/Applet-Symbol
- Zielgruppe
- Funktionsumfang Version 1.0
- Abgrenzung späterer Funktionen

### Phase 2 – Technische Architektur
- Architekturprinzip EIGENSTÄNDIG + KOOPERATIV
- eigenständig funktionsfähiges Applet und Desklet
- einheitliche Messwert- und Sensorarchitektur
- automatische Hardware- und Sensorerkennung
- stabile Sensoridentifikation
- optionale effiziente gemeinsame Nutzung von Messdaten
- Cinnamon-konforme Applet-/Desklet-Kommunikation
- Einstellungen über Cinnamon Xlet-Settings
- Deutsch/Englisch und vorbereitete Übersetzungsstruktur
- Abhängigkeits- und Berechtigungskonzept
- Daten-, Cache- und Statuskonzept
- Fehlerbehandlung und Ausfallsicherheit

### Phase 3 – Testversion
- Tests Latitude-5285
- Tests Tower-PC
- weitere unterschiedliche Hardware
- Sensorerkennung testen
- Installationsassistent testen
- Stabilitäts- und Ressourcentests

### Phase 4 – Veröffentlichung
- GitHub
- Dokumentation
- Lizenz
- Release-Paket
- Cinnamon-Spices-Prüfung und Einreichung

## 14. Grundregel für die Entwicklung

Die installierte und funktionierende Baseline auf dem Latitude-5285 bleibt zunächst unangetastet.

Weiterentwicklungen erfolgen kontrolliert im Projekt:
aVincePulse_Development

Vor größeren Änderungen werden funktionsfähige Entwicklungsstände versioniert und gesichert.

## 15. Designentscheidung – aVincePulse Logo

Entscheidung vom 15.09.2026:

Als bevorzugte Designrichtung wurde ausgewählt:

**C-1 – Klassisch / Klar**

Grundelemente:
- stilisiertes V als Bezug zu aVince
- zentraler roter Pulse-Punkt
- zwei blaue Pulse-/Signalbögen oberhalb des Punktes
- weiß-blaue Grundgestaltung
- dunkle Standardvariante
- hoher Wiedererkennungswert auch bei kleinen Darstellungen

Geplante Verwendung:
- aVincePulse Applet
- aVincePulse Desklet
- Anwendungssymbol
- GitHub
- Dokumentation
- spätere Cinnamon-Spices-Darstellung

Für sehr kleine Panelgrößen soll zusätzlich eine vereinfachte Variante geprüft werden.

Wichtig:
Der aktuelle grafische Entwurf dient als Designvorlage.
Vor Veröffentlichung wird daraus ein technisch sauberes, eigenständiges Vektorlogo (SVG) erstellt und auf Lesbarkeit bei 16, 20, 24, 32 und 64 Pixel getestet.

Status:
DESIGNRICHTUNG FESTGELEGT

## 16. Festgelegter Funktionsumfang aVincePulse 1.0

### Hardware
- CPU-Temperatur
- CPU-Auslastung
- RAM-Auslastung
- GPU-Temperatur
- GPU-Auslastung
- SSD/NVMe-Temperatur
- Lüfterdrehzahl, sofern verfügbar
- Akkuinformationen bei mobilen Geräten
- Speicherplatzbelegung ausgewählter Laufwerke/Partitionen

### Netzwerk
- Download live
- Upload live
- Internet-Speedtest
- Download-Speed
- Upload-Speed
- Ping
- Jitter
- persistente Speicherung des letzten erfolgreichen Speedtests

### Darstellung
- aVincePulse Applet
- aVincePulse Desklet
- Hover-Anzeige
- C-1 Logo/Panel-Symbol
- einzelne Messwerte ein-/ausblendbar
- fehlende bzw. nicht verfügbare Sensoren ausblendbar
- konfigurierbare Reihenfolge
- Schriftgröße
- Schriftstärke
- Farben
- Schatten
- Abstände
- Aktualisierungsintervall

### Hardwareerkennung
- automatische Erkennung verfügbarer Sensoren
- sinnvolle automatische Vorauswahl
- manuelle Sensorauswahl durch den Benutzer
- Unterstützung unterschiedlicher PCs, Notebooks und Mini-PCs

### Akku
Soweit vom System zuverlässig bereitgestellt:
- Ladezustand in Prozent
- Laden/Entladen
- Netzbetrieb
- Restlaufzeit
- Akkuzustand

### Sprachen
- Deutsch
- Englisch
- Architektur für weitere Übersetzungen vorbereiten

### Logging und CSV-Export

Logging und CSV-Export werden grundsätzlich in der Softwarearchitektur berücksichtigt.

Für Version 1.0 ist diese Funktion OPTIONAL.

Geplante Möglichkeiten:
- Messwertprotokollierung ein-/ausschaltbar
- wählbares Logging-Intervall
- begrenzte Aufbewahrungsdauer
- CSV-Export
- Protokolldaten löschen
- keine permanente Protokollierung als Standardeinstellung

Ziel:
aVincePulse muss vollständig ohne aktiviertes Logging funktionieren.
Die Logging-Funktion darf die normale Systemüberwachung nicht unnötig belasten.

Status:
FUNKTIONSUMFANG 1.0 – GRUNDKONZEPT FESTGELEGT

## 17. Hardware-, Sensorerkennungs- und Berechtigungskonzept

### Grundprinzip

aVincePulse soll auf unterschiedlichen PCs, Notebooks und Mini-PCs funktionieren und darf nicht auf fest programmierte Sensorbezeichnungen eines bestimmten Rechners angewiesen sein.

Die vorhandene Hardware und die verfügbaren Messwerte werden automatisch erkannt.

### Mögliche Datenquellen

Je nach Hardware und Verfügbarkeit sollen geeignete Linux-Schnittstellen verwendet werden:

- Linux hwmon
- lm-sensors
- /proc und /sys
- DRM-/GPU-Schnittstellen
- NVIDIA-Treiberschnittstellen, sofern vorhanden
- AMD-/Intel-GPU-Schnittstellen
- UPower bzw. Linux-Power-Schnittstellen
- Dateisysteminformationen für Speicherplatz
- Linux-Netzwerkschnittstellen
- geeignete SSD/NVMe-Informationen

Die endgültige Auswahl der Schnittstellen erfolgt nach technischer, lizenzrechtlicher und distributionsbezogener Prüfung.

### Ersteinrichtung

Beim ersten Start soll aVincePulse einen Hardware- und Sensor-Scan durchführen.

Der Benutzer erhält anschließend eine verständliche Übersicht der erkannten Messmöglichkeiten.

Beispiele:

- CPU-Temperatur
- CPU-Auslastung
- RAM-Auslastung
- GPU-Temperatur
- GPU-Auslastung
- SSD/NVMe-Temperatur
- Lüfterdrehzahl
- Akku
- Systemlaufwerk
- weitere Laufwerke/Partitionen
- Netzwerkadapter

### Automatische Vorauswahl

aVincePulse soll sinnvolle Messwerte automatisch vorauswählen.

Beispiele:
- CPU-Package statt unnötiger Einzelwerte aller CPU-Kerne
- primäre GPU
- System-SSD/NVMe
- vorhandener Systemlüfter
- Akku nur bei Geräten mit Akku
- Systempartition /
- aktive Netzwerkschnittstelle

### Manuelle Auswahl

Der Benutzer kann die automatische Auswahl jederzeit ändern.

Mehrere erkannte Sensoren und Laufwerke sollen eindeutig bezeichnet werden, damit der Benutzer den gewünschten Messwert auswählen kann.

### Fehlende Sensoren

Nicht vorhandene oder vom System nicht bereitgestellte Messwerte werden nicht als Programmfehler behandelt.

Sie sollen:
- nicht angezeigt werden oder
- in den Einstellungen als nicht verfügbar gekennzeichnet sein.

aVincePulse muss auch dann stabil funktionieren, wenn einzelne Sensoren fehlen.

### Berechtigungen

Grundregel:

Die normale Hardwareerkennung und Überwachung soll möglichst ohne Root-Rechte funktionieren.

aVincePulse soll für die normale Nutzung:
- kein dauerhaftes sudo benötigen
- nicht als Root laufen
- keine unnötigen Systemrechte anfordern
- keine unnötigen Änderungen am Betriebssystem durchführen

Falls optionale Funktionen zusätzliche Berechtigungen benötigen, müssen diese getrennt behandelt und dem Benutzer verständlich erklärt werden.

### Portabilität

Die Sensorerkennung darf nicht ausschließlich auf die aktuell verwendeten Bezeichnungen des Dell Latitude-5285 abgestimmt sein.

Der Latitude-5285 dient als Entwicklungs- und Referenzsystem, nicht als festes Hardwaremodell für aVincePulse.

Weitere Tests sind mindestens vorgesehen auf:
- Latitude-5285
- Tower-PC
- weiterer Notebook-Hardware
- möglichst Intel-, AMD- und NVIDIA-Systemen

### Ziel

Nach Installation soll aVincePulse möglichst selbstständig erkennen:

1. Welche Hardware ist vorhanden?
2. Welche Messwerte sind verfügbar?
3. Welche Werte sind für den Benutzer sinnvoll?
4. Welche Werte sollen standardmäßig angezeigt werden?

Der Benutzer behält jederzeit die Kontrolle über die endgültige Auswahl.

Status:
HARDWARE- UND SENSORERKENNUNG – GRUNDKONZEPT FESTGELEGT

## 18. Einstellungsoberfläche aVincePulse

Die Einstellungen sollen übersichtlich gegliedert sein und sowohl einfache Standardnutzung als auch individuelle Anpassungen ermöglichen.

### 1. Allgemein

Geplant:
- Sprache
- Aktualisierungsintervall
- allgemeines Programmverhalten
- Standardwerte wiederherstellen
- Versionsinformationen

### 2. Sensoren und Messwerte

Geplant:
- erkannte Hardware anzeigen
- verfügbare Sensoren anzeigen
- CPU-Sensor auswählen
- GPU-Sensor auswählen
- SSD/NVMe-Sensor auswählen
- Lüfter auswählen
- Akkuinformationen auswählen
- Laufwerke/Partitionen auswählen
- Netzwerkadapter auswählen
- einzelne Messwerte ein-/ausblenden
- automatische Vorauswahl übernehmen oder manuell ändern

### 3. Desklet

Geplant:
- Desklet ein-/ausblenden
- angezeigte Messwerte auswählen
- Reihenfolge der Messwerte
- Schriftgröße
- Schriftstärke
- Textfarbe
- Schatten
- Abstände
- Einheiten
- Aktualisierungsintervall, soweit sinnvoll

Das Desklet muss nicht dauerhaft sichtbar sein.
Ein Benutzer kann aVincePulse ausschließlich über Applet und Hover verwenden.

### 4. Applet und Hover

Geplant:
- Applet aktivieren/deaktivieren
- aVincePulse C-1 Panel-Symbol
- Hover-Anzeige aktivieren/deaktivieren
- angezeigte Hover-Werte auswählen
- Reihenfolge der Werte
- Schriftgröße
- Schriftstärke
- Textfarbe
- Schatten
- Abstände
- Einheiten

Applet und Desklet sollen grundsätzlich unabhängig voneinander konfigurierbar sein.

### 5. Netzwerk und Speedtest

Geplant:
- aktive Netzwerkschnittstelle automatisch erkennen
- Netzwerkschnittstelle manuell auswählen
- Live-Download ein-/ausblenden
- Live-Upload ein-/ausblenden
- Internet-Speedtest
- Download-Speed
- Upload-Speed
- Ping
- Jitter
- letzten erfolgreichen Speedtest anzeigen
- Speedtest-Einstellungen
- mögliche Serverauswahl später technisch prüfen

### 6. Erweitert, Diagnose und Support

Geplant:
- Schaltfläche "Hardware neu erkennen"
- erneuter Sensor-Scan
- erkannte Hardware anzeigen
- Diagnoseinformationen
- optionale Logging-Einstellungen
- optionaler CSV-Export
- Protokolldaten löschen
- Versionsnummer
- Lizenzinformationen
- GitHub-Projekt
- Dokumentation
- freiwillige Unterstützung/Spende

### Hardware neu erkennen

Eine manuelle Neuerkennung soll möglich sein, wenn sich die Hardware ändert.

Beispiele:
- neue SSD/NVMe
- neue GPU
- anderer Netzwerkadapter
- zusätzliche Laufwerke
- geänderte Sensorverfügbarkeit

Nach einer Neuerkennung sollen vorhandene Benutzereinstellungen möglichst erhalten bleiben.

### Bedienkonzept

Ziel ist eine verständliche Oberfläche für normale Anwender.

Grundprinzip:
- sinnvolle Standardeinstellungen
- automatische Erkennung
- automatische Vorauswahl
- erweiterte manuelle Konfiguration bei Bedarf

Der Benutzer soll nicht gezwungen sein, technische Sensorbezeichnungen verstehen zu müssen.

Status:
EINSTELLUNGSOBERFLÄCHE – GRUNDKONZEPT FESTGELEGT

## 19. Architektur – Applet, Desklet und gemeinsame Datenbasis

### Grundprinzip

aVincePulse besteht aus zwei eigenständig nutzbaren Cinnamon-Komponenten:

- aVincePulse Applet
- aVincePulse Desklet

Beide Komponenten sollen unabhängig voneinander installiert, gestartet, konfiguriert und verwendet werden können.

Grundsatz:

EIGENSTÄNDIG + KOOPERATIV

### Eigenständigkeit

Das Applet darf nicht voraussetzen, dass das Desklet installiert oder aktiv ist.

Das Desklet darf nicht voraussetzen, dass das Applet installiert oder aktiv ist.

Fehlt eine der beiden Komponenten, muss die jeweils andere vollständig funktionsfähig bleiben.

### Gemeinsame technische Architektur

Applet und Desklet sollen möglichst dieselben von aVincePulse entwickelten Konzepte und Module verwenden für:

- Hardwareerkennung
- Sensorerkennung
- CPU-Messwerte
- GPU-Messwerte
- RAM
- SSD/NVMe
- Lüfter
- Akku
- Laufwerke
- Netzwerk
- Speedtest
- Ping
- Jitter
- Einheiten und Formatierung

Damit soll verhindert werden, dass sich die technische Logik von Applet und Desklet langfristig unterschiedlich entwickelt.

### Cinnamon-Spices-Kompatibilität

Applet und Desklet werden als getrennte Cinnamon Spices betrachtet.

Für die öffentliche Veröffentlichung erhält jede Komponente:

- eigene UUID
- eigene Metadaten
- eigene Installationsstruktur
- alle für den eigenständigen Betrieb notwendigen Bestandteile

Es soll keine zwingende externe aVincePulse-Core-Installation erforderlich sein.

Die veröffentlichten Komponenten müssen mit den jeweils aktuellen Cinnamon-Spices-Regeln vereinbar sein.

### Gemeinsame Messwerte

Wenn Applet und Desklet gleichzeitig installiert und aktiv sind, soll geprüft werden, ob Messwerte effizient gemeinsam genutzt werden können.

Ziel:

Sensoren möglichst nicht unnötig doppelt auslesen.

Eine mögliche gemeinsame Datenbasis darf jedoch niemals Voraussetzung für den Betrieb einer einzelnen Komponente sein.

### Gemeinsamer Benutzer-Datenbereich

Für gemeinsam nutzbare Laufzeit- oder Statusinformationen kann ein geeigneter Benutzer-Datenbereich vorgesehen werden.

Dieser kann beispielsweise verwendet werden für:

- aktuelle Messwerte
- letzten erfolgreichen Speedtest
- erkannte Hardware
- Sensorzuordnungen
- optionale Diagnoseinformationen

Die endgültigen Pfade und Speichermechanismen werden erst nach technischer Prüfung festgelegt.

Installationsverzeichnisse der Cinnamon Spices sollen nicht als Speicherort für veränderliche Laufzeitdaten verwendet werden.

### Einstellungen

Die Einstellungen sollen über die von Cinnamon vorgesehenen Xlet-Settings-Mechanismen erfolgen.

Direkte Manipulation interner Cinnamon-Konfigurationsdateien soll in der öffentlichen Version vermieden werden.

Applet und Desklet können eigene Darstellungsoptionen besitzen.

Gemeinsam relevante Einstellungen sollen möglichst konsistent aufgebaut und bezeichnet werden.

### Ausfallsicherheit

Kann eine gemeinsame Datenquelle nicht gelesen werden:

- kein Absturz
- keine dauerhafte Fehlermeldung
- automatische lokale Ermittlung der benötigten Messwerte, soweit möglich

Kann ein einzelner Sensor nicht gelesen werden, bleiben die übrigen Funktionen aktiv.

### Speedtest

Der letzte erfolgreiche Speedtest soll persistent gespeichert werden.

Ein fehlgeschlagener Speedtest darf vorhandene gültige Ergebnisse nicht überschreiben.

Die Speedtest-Architektur und mögliche externe Abhängigkeiten werden vor Veröffentlichung gesondert auf Portabilität, Lizenz und Cinnamon-Spices-Konformität geprüft.

### Logging und CSV

Das optionale spätere Logging soll dieselbe Messwertarchitektur verwenden.

Dadurch sollen Sensoren nicht zusätzlich nur für die Protokollierung abgefragt werden.

Logging bleibt für Version 1.0 optional und standardmäßig deaktiviert.

### Entwicklungsprinzip

Die derzeit funktionierende Latitude-5285-Version bleibt unverändert als Referenz erhalten.

Die neue Architektur wird ausschließlich innerhalb von:

/mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Development/

entwickelt und getestet.

Erst nach erfolgreichen Tests werden neue Funktionen als stabile aVincePulse-Version betrachtet.

Status:
APPLET-/DESKLET-ARCHITEKTUR – GRUNDKONZEPT FESTGELEGT

## 20. Messwert- und Sensorarchitektur

### Ziel

aVincePulse soll Messwerte verschiedener Hardwareplattformen einheitlich verarbeiten können.

Die interne Messwertarchitektur darf nicht von den Sensorbezeichnungen eines bestimmten Rechners abhängig sein.

Bezeichnungen wie:

- Package id 0
- Composite
- fan1
- temp1
- hwmon0

dürfen deshalb nicht fest im Programmcode als allgemeingültige Sensoren hinterlegt werden.

### Trennung von Sensor und Anzeige

Intern wird zwischen folgenden Informationen unterschieden:

1. technische Sensoridentifikation
2. Art des Messwertes
3. aktuellem Messwert
4. Einheit
5. benutzerfreundlicher Bezeichnung
6. Datenquelle

Beispiel:

Technische Quelle:
Intel CPU / hwmon / temp

Interner Typ:
cpu_temperature

Anzeige:
CPU

Wert:
58

Einheit:
°C

Dadurch kann sich die technische Sensorbezeichnung zwischen verschiedenen Rechnern unterscheiden, während die Anzeige für den Benutzer gleich bleibt.

### Interne Messwerttypen

Für aVincePulse 1.0 sind mindestens folgende interne Messwerttypen vorgesehen:

- cpu_temperature
- cpu_load
- ram_usage
- gpu_temperature
- gpu_load
- storage_temperature
- fan_speed
- battery_charge
- battery_state
- battery_runtime
- battery_health
- storage_usage
- network_download
- network_upload
- speedtest_download
- speedtest_upload
- ping
- jitter

Die Liste kann während der Entwicklung erweitert werden.

### Physische Sensoren und berechnete Messwerte

aVincePulse unterscheidet zwischen direkt ausgelesenen Hardwarewerten und vom System berechneten Messwerten.

Physische bzw. hardwarebezogene Werte können beispielsweise sein:

- CPU-Temperatur
- GPU-Temperatur
- SSD/NVMe-Temperatur
- Lüfterdrehzahl
- Akkuzustand

Berechnete bzw. systembezogene Werte können beispielsweise sein:

- CPU-Auslastung
- RAM-Auslastung
- Laufwerksbelegung
- Netzwerk Down/Up
- verbleibende Akkulaufzeit, soweit vom System bereitgestellt oder zuverlässig bestimmbar

Diese Unterscheidung soll intern erhalten bleiben.

### Stabile Sensoridentifikation

Wo technisch möglich, sollen Sensoren nicht ausschließlich über ihre sichtbaren Namen identifiziert werden.

Stattdessen sollen möglichst stabile Merkmale verwendet werden, beispielsweise:

- Gerät
- Hardwarepfad
- Treiber
- Sensortyp
- Schnittstelle
- Gerätekennung
- weitere geeignete Linux-Systeminformationen

Die genaue technische Umsetzung wird während der Entwicklung geprüft.

Ziel ist, dass ein Sensor nach Neustart möglichst zuverlässig wiedererkannt wird.

### Benutzerfreundliche Namen

Technische Sensorbezeichnungen sollen für normale Benutzer übersetzt bzw. vereinfacht werden.

Beispiele:

Package id 0
→ CPU

Composite einer NVMe
→ NVMe / SSD

fan1
→ Systemlüfter

Technische Detailinformationen können zusätzlich in einer erweiterten Ansicht oder Diagnose angezeigt werden.

### Einheiten

Intern sollen eindeutige Standardwerte verwendet werden.

Vorgesehene Anzeigeeinheiten:

Temperatur:
°C

Auslastung:
%

Lüfter:
rpm

Netzwerk aktuell:
B/s, KB/s, MB/s oder geeignete automatische Skalierung

Internet-Speedtest:
MBit/s

Ping:
ms

Jitter:
ms

Speicher:
GB/TB und %

Akku:
% und gegebenenfalls Zeit

Einheiten und automatische Skalierung sollen zentral und konsistent behandelt werden.

### Aktualisierungsintervalle

Nicht alle Messwerte müssen gleich häufig aktualisiert werden.

Schnell veränderliche Werte:

- CPU-Auslastung
- RAM
- Netzwerk Down/Up

können in kurzen Intervallen aktualisiert werden.

Langsamer veränderliche Werte:

- Temperaturen
- Lüfter
- Akku
- Speicherbelegung

können gegebenenfalls in größeren Intervallen aktualisiert werden.

Speedtest-Werte werden nicht permanent neu gemessen.

Der Speedtest erfolgt:
- manuell oder
- später optional nach ausdrücklich konfiguriertem Zeitplan.

Ziel ist ein sinnvoller Kompromiss zwischen Aktualität und geringer Systembelastung.

### Fehlende und ungültige Werte

Ein Messwert kann folgende Zustände besitzen:

- verfügbar
- momentan nicht verfügbar
- Sensor nicht vorhanden
- Sensor nicht lesbar
- Wert ungültig

Ein einzelner ungültiger Sensor darf aVincePulse nicht beeinträchtigen.

Nicht verfügbare Werte werden standardmäßig ausgeblendet oder verständlich als nicht verfügbar gekennzeichnet.

### Sensorwechsel

Ändert sich die Hardware oder Sensorzuordnung, soll aVincePulse versuchen, den passenden Sensor automatisch wiederzufinden.

Ist keine eindeutige Zuordnung möglich, kann der Benutzer den Sensor in den Einstellungen neu auswählen.

Zusätzlich steht die Funktion:

Hardware neu erkennen

zur Verfügung.

### Gemeinsames Datenmodell

Applet, Desklet und optionales Logging sollen dieselben internen Messwerttypen und Formatierungsregeln verwenden.

Dadurch sollen beispielsweise CPU-Temperatur oder Netzwerkgeschwindigkeit in Applet, Hover, Desklet und CSV immer dieselbe Bedeutung besitzen.

### Erweiterbarkeit

Die Architektur soll spätere Messwerte ermöglichen, ohne das bestehende Grundsystem neu entwickeln zu müssen.

Denkbare spätere Erweiterungen:

- mehrere GPUs
- mehrere Lüfter
- mehrere SSDs/NVMes
- CPU-Takt
- GPU-Takt
- CPU-Leistungsaufnahme
- GPU-Leistungsaufnahme
- weitere Akkuinformationen
- Netzwerkstatistiken
- zusätzliche Hardwareklassen

Diese Erweiterungen gehören nicht automatisch zum verpflichtenden Funktionsumfang von Version 1.0.

Status:
MESSWERT- UND SENSORARCHITEKTUR – GRUNDKONZEPT FESTGELEGT

## 21. Installation, Abhängigkeiten und Berechtigungen

### Ziel

aVincePulse soll sich auf Linux Mint Cinnamon möglichst einfach installieren und verwenden lassen.

Grundprinzipien:

- möglichst wenige externe Abhängigkeiten
- möglichst keine Root-Rechte im normalen Betrieb
- keine unnötigen Hintergrunddienste
- keine zwingende externe aVincePulse-Core-Installation
- Applet und Desklet bleiben eigenständig installierbar
- fehlende optionale Funktionen dürfen die Grundfunktion nicht beeinträchtigen

### Priorität der Datenquellen

Bei der Entwicklung gilt folgende Reihenfolge:

1. vorhandene Linux-/Kernel-Schnittstellen
2. vorhandene Cinnamon-/GLib-/GIO-Schnittstellen
3. standardmäßig verfügbare Systemwerkzeuge
4. Pakete aus offiziellen Linux-Mint-/Ubuntu-Repositories
5. externe Werkzeuge nur, wenn technisch notwendig und für eine Veröffentlichung vertretbar

Ziel ist, möglichst viele Funktionen ohne zusätzliche Installation bereitzustellen.

### Hardware- und Sensordaten

Für Hardware- und Sensordaten werden zunächst native Linux-Schnittstellen geprüft.

Dazu gehören insbesondere:

- /proc
- /sys
- hwmon
- DRM
- Power-/Battery-Schnittstellen
- Dateisysteminformationen
- Netzwerkschnittstellen

lm-sensors kann ergänzend verwendet werden, wenn dadurch Hardware zuverlässiger erkannt oder verständlicher zugeordnet werden kann.

Es soll jedoch geprüft werden, welche Funktionen auch ohne lm-sensors möglich sind.

### GPU-Unterstützung

GPU-Unterstützung muss unterschiedliche Hardware berücksichtigen:

- Intel
- AMD
- NVIDIA

Dabei soll zunächst geprüft werden, welche Messwerte über Kernel-, DRM- und hwmon-Schnittstellen verfügbar sind.

Herstellerspezifische Werkzeuge sollen nur verwendet werden, wenn sie für bestimmte Funktionen erforderlich sind.

Fehlt ein benötigtes GPU-Werkzeug, bleiben alle übrigen Funktionen von aVincePulse verfügbar.

### SSD und NVMe

Temperatur- und Laufwerksinformationen sollen möglichst über vorhandene Linux-Schnittstellen ermittelt werden.

Zusätzliche SMART-/NVMe-Werkzeuge werden nur dann vorausgesetzt, wenn bestimmte Informationen anders nicht zuverlässig verfügbar sind.

Normale Anzeige- und Überwachungsfunktionen sollen keine unnötigen administrativen Rechte benötigen.

### Akku

Akkuinformationen sollen möglichst über vorhandene Linux-Power-Schnittstellen bzw. geeignete Systemdienste ermittelt werden.

Je nach Hardware können verfügbar sein:

- Ladezustand
- Laden/Entladen
- Netzbetrieb
- Restlaufzeit
- Akkuzustand

Nicht verfügbare Akkuinformationen werden ausgeblendet.

### Netzwerk

Live-Netzwerkwerte sollen möglichst direkt aus Linux-Systeminformationen ermittelt werden.

Für die normale Anzeige von:

- Download
- Upload

soll keine zusätzliche Software erforderlich sein.

### Internet-Speedtest

Der derzeitige Entwicklungsstand verwendet LibreSpeed CLI.

Vor der öffentlichen Veröffentlichung wird gesondert geprüft:

- Lizenz
- Verteilbarkeit
- Cinnamon-Spices-Konformität
- Installationsweg
- Verfügbarkeit auf unterstützten Distributionen
- mögliche Alternativen
- Verhalten bei fehlendem Speedtest-Werkzeug

Der Speedtest ist eine Zusatzfunktion.

Fehlt die dafür notwendige Komponente, müssen Hardwaremonitoring, Netzwerk-Livewerte, Applet und Desklet weiterhin funktionieren.

### Abhängigkeitsprüfung

aVincePulse soll benötigte und optionale Komponenten erkennen können.

Dabei soll unterschieden werden zwischen:

- vorhanden
- nicht vorhanden
- optional
- für eine bestimmte Funktion erforderlich

Fehlende optionale Komponenten dürfen keinen Programmabsturz verursachen.

### Benutzerinformation

Falls für eine gewünschte Funktion ein zusätzliches Paket benötigt wird, soll aVincePulse dies verständlich anzeigen.

Beispiel:

"Für diese Funktion wird eine zusätzliche Systemkomponente benötigt."

Technische Paketnamen und Installationshinweise können ergänzend angezeigt werden.

### Keine ungefragten Systemänderungen

aVincePulse soll:

- keine Pakete ungefragt installieren
- keine Systemkonfiguration ungefragt verändern
- keine Root-Rechte dauerhaft anfordern
- keine externen Programme ungefragt herunterladen
- keine Hintergrunddienste ohne Notwendigkeit einrichten

Der Benutzer behält die Kontrolle über zusätzliche Installationen.

### Cinnamon-Spices-Veröffentlichung

Vor einer Veröffentlichung werden die dann aktuellen Cinnamon-Spices-Regeln erneut geprüft.

Insbesondere zu prüfen:

- zulässige Abhängigkeiten
- Installationsstruktur
- UUID
- Metadaten
- Settings
- externe Programme
- Dateispeicherung
- Netzwerkzugriffe
- Lizenzierung
- Dokumentation

Die Roadmap legt deshalb heute keine externe Abhängigkeit als endgültig verpflichtend fest.

### Installation

Ziel für die öffentliche Version:

Applet und Desklet sollen über den für Cinnamon Spices vorgesehenen Installationsweg installierbar sein.

Zusätzlich kann für Entwicklung und Tests eine manuelle Installation vorgesehen werden.

Die öffentliche Installation soll keine Terminalkenntnisse voraussetzen, soweit dies technisch innerhalb der Cinnamon-Spices-Regeln möglich ist.

### Deinstallation

Bei einer Deinstallation sollen keine unnötigen Systemreste zurückbleiben.

Für eventuell vorhandene:

- Einstellungen
- Speedtest-Ergebnisse
- Logs
- CSV-Daten

wird später ein sauberes Daten- und Löschkonzept definiert.

### Entwicklungsregel

Während der Entwicklung dürfen zusätzliche Werkzeuge zum Testen verwendet werden.

Eine auf dem Latitude-5285 vorhandene Software darf jedoch nicht automatisch als Voraussetzung für alle späteren aVincePulse-Installationen betrachtet werden.

Jede Abhängigkeit muss vor Version 1.0 einzeln auf:

- Notwendigkeit
- Portabilität
- Sicherheit
- Lizenz
- Wartbarkeit
- Cinnamon-Spices-Kompatibilität

geprüft werden.

Status:
INSTALLATION UND ABHÄNGIGKEITEN – GRUNDKONZEPT FESTGELEGT

## 22. Daten-, Cache- und Logging-Konzept

### Ziel

aVincePulse soll Laufzeitdaten, Einstellungen und dauerhaft benötigte Informationen sauber voneinander trennen.

Die heutige Entwicklungsdatei:

/tmp/avince-hwmonitor-values

ist für die aktuelle Referenzversion ausreichend, wird jedoch nicht automatisch als endgültige Speicherarchitektur für die öffentliche Version übernommen.

### Datenklassen

aVincePulse unterscheidet grundsätzlich zwischen:

1. Einstellungen
2. temporären Laufzeitdaten
3. persistenten Statusdaten
4. optionalen Logging-Daten
5. exportierten CSV-Dateien
6. Diagnoseinformationen

Diese Datenarten sollen nicht unnötig miteinander vermischt werden.

### Einstellungen

Benutzereinstellungen werden über die von Cinnamon vorgesehenen Xlet-Settings-Mechanismen verwaltet.

Dazu gehören beispielsweise:

- sichtbare Messwerte
- Reihenfolge
- Sensorzuordnung
- Schriftgröße
- Schriftstärke
- Farben
- Schatten
- Abstände
- Aktualisierungsintervalle
- Netzwerkschnittstelle
- Logging ein/aus

### Temporäre Laufzeitdaten

Kurzlebige Messwerte können in einem geeigneten temporären Benutzerbereich bereitgestellt werden.

Beispiele:

- aktuelle CPU-Temperatur
- CPU-Auslastung
- RAM-Auslastung
- GPU-Werte
- SSD/NVMe-Temperatur
- Lüfter
- Netzwerk Down/Up

Diese Daten müssen nach einem Neustart nicht erhalten bleiben.

Applet und Desklet dürfen nicht von einer dauerhaft vorhandenen temporären Datei abhängig sein.

Fehlt die Datei oder der Cache, muss eine saubere Neuerzeugung bzw. lokale Ermittlung möglich sein.

### Persistente Statusdaten

Bestimmte Informationen sollen Neustarts überleben.

Dazu können gehören:

- letzter erfolgreicher Speedtest
- Speedtest-Zeitpunkt
- erkannte Hardware
- stabile Sensorzuordnungen
- gegebenenfalls letzte funktionierende Auswahl bestimmter Geräte

Diese Informationen werden in einem geeigneten Benutzer-Daten- oder State-Verzeichnis gespeichert.

Der endgültige Speicherort wird während der technischen Umsetzung nach Linux-/Cinnamon-Konventionen festgelegt.

### Speedtest-Daten

Ein erfolgreicher Speedtest kann mindestens folgende Werte speichern:

- Datum und Uhrzeit
- Download
- Upload
- Ping
- Jitter

Ein fehlgeschlagener Speedtest darf den letzten gültigen Datensatz nicht überschreiben.

Der Benutzer soll erkennen können, wann der angezeigte Speedtest zuletzt durchgeführt wurde.

### Logging

Logging ist für aVincePulse 1.0 optional.

Standard:

LOGGING AUS

Ohne aktiviertes Logging darf aVincePulse keine fortlaufende Messwerthistorie erzeugen.

Der normale Betrieb muss vollständig ohne Logging funktionieren.

### Aktivierbares Logging

Wenn der Benutzer Logging aktiviert, sollen auswählbare Messwerte protokolliert werden können.

Beispiele:

- CPU-Temperatur
- CPU-Auslastung
- RAM
- GPU-Temperatur
- GPU-Auslastung
- SSD/NVMe-Temperatur
- Lüfter
- Akku
- Speicherbelegung
- Netzwerk Down/Up

Der Benutzer soll bestimmen können, welche Werte protokolliert werden.

### Logging-Intervall

Das Logging-Intervall soll unabhängig vom normalen Anzeigeintervall konfigurierbar sein.

Beispiele:

- 10 Sekunden
- 30 Sekunden
- 1 Minute
- 5 Minuten
- weitere sinnvolle Intervalle

Sehr kurze Intervalle sollen nicht unnötig als Standard verwendet werden.

### Speicherbegrenzung

Logging darf nicht unbegrenzt Speicherplatz verbrauchen.

Geplant sind konfigurierbare Begrenzungen, beispielsweise nach:

- Zeitraum
- Dateigröße
- Anzahl der Logdateien

Geeignete Standardwerte werden während der Entwicklung festgelegt.

### CSV-Export

Protokollierte Daten sollen in ein allgemein lesbares CSV-Format exportiert werden können.

Mögliche Spalten:

timestamp
cpu_temperature
cpu_load
ram_usage
gpu_temperature
gpu_load
storage_temperature
fan_speed
battery_charge
storage_usage
network_download
network_upload

Nur tatsächlich protokollierte Messwerte müssen enthalten sein.

Das Format soll für Tabellenkalkulationen und weitere Auswertungen geeignet sein.

### Trennung von internem Log und Export

Interne Speicherung und CSV-Export müssen nicht zwingend dasselbe Format verwenden.

Dadurch bleibt offen, intern später ein effizienteres Speicherformat zu verwenden und CSV nur beim Export zu erzeugen.

### Datenschutz

aVincePulse soll nur Daten erfassen, die für die vom Benutzer aktivierten Funktionen erforderlich sind.

Standardmäßig sollen keine Messdaten an externe Server übertragen werden.

Eine notwendige Internetkommunikation für einen ausdrücklich gestarteten Speedtest wird davon getrennt betrachtet.

Logging bleibt lokal, sofern der Benutzer Daten nicht selbst exportiert oder weitergibt.

### Diagnoseinformationen

Für Fehlersuche kann eine Diagnosefunktion vorgesehen werden.

Sie kann beispielsweise enthalten:

- aVincePulse-Version
- Cinnamon-Version
- Betriebssystem
- erkannte Hardwareklassen
- erkannte Sensoren
- verwendete Datenquellen
- fehlende optionale Abhängigkeiten
- Fehlermeldungen von aVincePulse

Vor einem späteren Export von Diagnosedaten soll geprüft werden, ob sensible oder personenbezogene Informationen enthalten sein könnten.

### Daten löschen

Der Benutzer soll von aVincePulse erzeugte Daten gezielt löschen können.

Geplant:

- Speedtest-Historie löschen
- Logs löschen
- Diagnoseinformationen löschen
- Cache zurücksetzen

Ein Zurücksetzen der Einstellungen soll davon getrennt behandelt werden.

### Deinstallation

Die öffentliche Version soll dokumentieren, welche Benutzerdaten nach einer Deinstallation eventuell erhalten bleiben.

Wenn technisch sinnvoll, soll eine verständliche Möglichkeit bestehen, sämtliche von aVincePulse erzeugten Benutzerdaten zu entfernen.

### Ausfallsicherheit

Beschädigte, fehlende oder nicht lesbare Cache-/Statusdateien dürfen keinen Absturz verursachen.

aVincePulse soll in diesem Fall:

- betroffene Daten ignorieren
- soweit möglich Standardwerte verwenden
- erforderliche Laufzeitdaten neu erzeugen
- weiterhin funktionsfähig bleiben

### Entwicklungsprinzip

Die aktuelle Latitude-5285-Lösung mit:

/tmp/avince-hwmonitor-values

und:

~/.config/cinnamon/spices/avince-hwmonitor@angelo/speedtest-values

bleibt Bestandteil der funktionierenden Referenzversion.

Sie wird erst innerhalb des Projekts aVincePulse_Development durch die neue Architektur ersetzt und nach erfolgreichem Test übernommen.

Status:
DATEN-, CACHE- UND LOGGING-KONZEPT – GRUNDKONZEPT FESTGELEGT

## 23. Prioritäten und Release-Abgrenzung aVincePulse 1.0

### Ziel

Für die Entwicklung wird klar zwischen drei Prioritätsstufen unterschieden:

1. VERBINDLICH 1.0
2. OPTIONAL 1.0
3. SPÄTERE VERSION

Dadurch soll verhindert werden, dass zusätzliche Funktionen die Fertigstellung einer stabilen Version 1.0 unnötig verzögern.

---

### VERBINDLICH 1.0

Diese Funktionen gehören zum festgelegten Kernumfang von aVincePulse 1.0.

#### Komponenten
- aVincePulse Applet
- aVincePulse Desklet
- beide Komponenten eigenständig nutzbar
- Architekturprinzip EIGENSTÄNDIG + KOOPERATIV
- Hover-Anzeige über das Applet

#### Hardware und System
- CPU-Temperatur
- CPU-Auslastung
- RAM-Auslastung
- GPU-Temperatur, sofern vom System verfügbar
- GPU-Auslastung, sofern technisch zuverlässig verfügbar
- SSD/NVMe-Temperatur
- Lüfterdrehzahl, sofern verfügbar
- Akkuinformationen bei mobilen Geräten
- Speicherplatzbelegung ausgewählter Laufwerke/Partitionen

#### Netzwerk
- Live-Download
- Live-Upload
- automatische Erkennung einer geeigneten Netzwerkschnittstelle
- manuelle Auswahl der Netzwerkschnittstelle

#### Internet-Speedtest
- Download-Speed
- Upload-Speed
- Ping
- Jitter
- Speicherung des letzten erfolgreichen Speedtests
- Zeitpunkt des letzten erfolgreichen Speedtests
- fehlgeschlagene Tests überschreiben keine gültigen Ergebnisse

Die endgültige technische Speedtest-Lösung muss vor Veröffentlichung hinsichtlich Lizenz, Portabilität, Abhängigkeiten und Cinnamon-Spices-Konformität festgelegt werden.

#### Hardware- und Sensorerkennung
- automatische Hardwareerkennung
- automatische Sensorerkennung
- sinnvolle automatische Vorauswahl
- manuelle Sensorauswahl
- stabile Sensoridentifikation, soweit technisch möglich
- Hardware neu erkennen
- fehlende Sensoren verursachen keinen Programmfehler
- nicht verfügbare Werte können automatisch ausgeblendet werden

#### Darstellung
- C-1-Designrichtung für Logo und Panel-Symbol
- geeignete vereinfachte Variante für kleine Panelgrößen
- einzelne Messwerte ein-/ausblendbar
- Reihenfolge konfigurierbar
- Schriftgröße
- Schriftstärke
- Farben
- Schatten
- Abstände
- Einheiten
- Aktualisierungsintervalle

#### Einstellungen
- verständliche Einstellungsoberfläche
- Cinnamon-konforme Xlet-Settings
- Applet und Desklet unabhängig konfigurierbar
- sinnvolle Standardeinstellungen
- Standardwerte wiederherstellen

#### Sprachen
- Deutsch
- Englisch
- Übersetzungsarchitektur für weitere Sprachen vorbereitet

#### Stabilität und Sicherheit
- normaler Betrieb möglichst ohne Root-Rechte
- keine ungefragten Paketinstallationen
- keine ungefragten Systemänderungen
- keine zwingende externe aVincePulse-Core-Installation
- fehlende optionale Abhängigkeiten führen nicht zum Absturz
- beschädigte oder fehlende Cache-/Statusdaten führen nicht zum Absturz
- saubere Fehlerbehandlung

#### Veröffentlichung
- eigenständige UUIDs für Applet und Desklet
- vollständige Metadaten
- Lizenzprüfung
- Dokumentation
- GitHub-Projekt
- Installations- und Deinstallationstest
- Tests auf mehreren unterschiedlichen Rechnern
- Prüfung der zum Veröffentlichungszeitpunkt aktuellen Cinnamon-Spices-Regeln

---

### OPTIONAL 1.0

Diese Funktionen dürfen bereits in Version 1.0 enthalten sein, sind jedoch keine Voraussetzung für die Veröffentlichung einer stabilen 1.0.

#### Logging
- Messwertprotokollierung
- Auswahl der zu protokollierenden Werte
- konfigurierbares Logging-Intervall
- Speicherbegrenzung
- Protokolldaten löschen

Standard:
LOGGING AUS

#### CSV
- CSV-Export protokollierter Messwerte
- Auswahl geeigneter Exportdaten

#### Erweiterte Diagnose
- ausführliche Sensorinformationen
- verwendete Datenquellen
- optionale Diagnoseausgabe für Support und Fehlersuche

#### Speedtest-Erweiterungen
- manuelle Serverauswahl
- zusätzliche Speedtest-Einstellungen

Diese Funktionen dürfen die Kernentwicklung von Version 1.0 nicht verzögern.

---

### SPÄTERE VERSION

Folgende Funktionen sind mögliche Erweiterungen nach Version 1.0 und gehören nicht zum verpflichtenden Releaseumfang:

- mehrere GPUs gleichzeitig überwachen
- mehrere Lüfter detailliert überwachen
- mehrere SSDs/NVMes gleichzeitig detailliert darstellen
- CPU-Takt
- GPU-Takt
- CPU-Leistungsaufnahme
- GPU-Leistungsaufnahme
- erweiterte Akkuanalyse
- umfangreiche Netzwerkstatistiken
- Diagramme und historische Messwertgrafiken
- erweiterte Langzeitstatistiken
- weitere Hardwareklassen
- zusätzliche Sprachen
- weitere Darstellungsvarianten

Diese Liste ist offen und stellt keine Verpflichtung für eine bestimmte spätere Version dar.

---

### Release-Regel

Version 1.0 gilt erst dann als releasefähig, wenn:

- alle als VERBINDLICH 1.0 definierten Kernfunktionen ausreichend implementiert und getestet sind
- keine bekannten kritischen Stabilitätsprobleme bestehen
- Applet und Desklet eigenständig funktionieren
- Installation und Deinstallation geprüft wurden
- Abhängigkeiten und Rechte geklärt sind
- Lizenz- und Namensfragen geklärt sind
- Dokumentation vorhanden ist
- die zum Veröffentlichungszeitpunkt geltenden Cinnamon-Spices-Anforderungen geprüft wurden

OPTIONALE 1.0-Funktionen dürfen auf eine spätere Version verschoben werden, ohne dadurch Version 1.0 zu blockieren.

Status:
PRIORITÄTEN UND RELEASE-ABGRENZUNG 1.0 – FESTGELEGT

## 24. Erweiterungen – Festlegung vom 18.09.2026

Nach Abschluss von AP13 wurden folgende Funktionen zusätzlich in die Planung aufgenommen. Die Einordnung in die Prioritätsstufen aus Abschnitt 23 wurde am 18.09.2026 bestätigt.

Grundsatz für alle Punkte: Jede Funktion ist abschaltbar oder wahlweise, sinnvoll voreingestellt und in Applet und Desklet unabhängig konfigurierbar, soweit sie beide Komponenten betrifft.

### Warnschwellen mit Farbwechsel

Ein Messwert wechselt die Farbe, sobald er eine Schwelle überschreitet bzw. unterschreitet, zum Beispiel:

- CPU- oder Speicher-Temperatur zu hoch
- freier Speicherplatz zu gering
- Akku-Ladezustand zu gering

Zwei Stufen (Warnung, kritisch), Schwellen einstellbar. Farben müssen auf hellem und dunklem Hintergrund lesbar bleiben.

Vorschlag: OPTIONAL 1.0

### Bis zu drei Werte im Panel

Wahlweise bis zu drei Messwerte direkt neben dem Logo im Panel, zum Beispiel `52° 12%`. Auswahl und Reihenfolge durch den Benutzer, Warnfarben gelten auch hier.

Vorschlag: OPTIONAL 1.0

### Tastenkürzel für die Hover-Anzeige

Die große Hover-Anzeige lässt sich über ein frei wählbares Tastenkürzel ein- und ausblenden, ohne Maus. Cinnamon stellt dafür den Einstellungstyp `keybinding` bereit.

Vorschlag: OPTIONAL 1.0

### Benachrichtigung bei kritischen Werten

Wahlweise eine Systembenachrichtigung bei kritischen Werten, etwa Überhitzung oder fast leerem Akku. Einstellbar, ob sie immer erscheint oder nur, wenn weder Desklet noch Hover-Anzeige sichtbar sind. Wiederholungen werden begrenzt, damit eine anhaltende Überschreitung nicht zu einer Flut von Meldungen führt.

Vorschlag: OPTIONAL 1.0

### Zeitgesteuerter Speedtest

Wahlweise Speedtest nach Zeitplan, zum Beispiel täglich um 3 Uhr. Standard: aus. Ergebnisse landen wie bisher in den Speedtest-Berichten und ergeben so einen Verlauf. Ergänzt die in Abschnitt 20 vorgesehene Option.

Vorschlag: OPTIONAL 1.0 (Speedtest-Erweiterungen)

### Systemüberwachung per Klick

Ein Klick auf eine Zeile der Anzeige öffnet die Systemüberwachung des Systems, sofern installiert. Beim Desklet ist dabei zu beachten, dass ein Klick beim Verschieben nicht versehentlich auslöst (vgl. AP11).

Vorschlag: OPTIONAL 1.0

### Zusatzwerte

- Systemlaufzeit
- CPU-Takt
- WLAN-Signalstärke, nur bei aktiver WLAN-Verbindung

Vorschlag: OPTIONAL 1.0. Der CPU-Takt war in Abschnitt 23 unter SPÄTERE VERSION geführt und wird damit vorgezogen.

### Verlaufsgrafik

Kleine Verlaufskurve je Messwert, etwa über die letzten Minuten.

Vorschlag: bleibt SPÄTERE VERSION wie in Abschnitt 23 („Diagramme und historische Messwertgrafiken“), da der Aufwand groß ist und die Fertigstellung von 1.0 nicht verzögern soll.

### Vorgesehene Reihenfolge

Festgelegt am 18.09.2026, fortgeschrieben mit den tatsächlichen Paketnummern:

1. AP14 – Sensorauswahl (abgeschlossen)
2. AP15 – Messtakt an der Systemuhr, Einstellungsfenster nur einmal öffnen (abgeschlossen)
3. AP16 – Netzwerkschnittstelle und Laufwerk für den Speicherplatz wählbar, VERBINDLICH 1.0 (abgeschlossen)
4. AP17 – eingeschoben: Rückfrage vor dem Neu-Öffnen, Meldungen, Umlaute (abgeschlossen)
5. AP18 – Warnschwellen mit Farbwechsel
6. AP19 – Zwischenprüfung
7. Übersetzung Deutsch/Englisch

Die übrigen Punkte dieses Abschnitts folgen danach in noch festzulegender Reihenfolge.

### Zwischenprüfung (AP19)

Aufgenommen am 18.09.2026. Nach AP18 und vor der Übersetzung werden Applet und Desklet vollständig geprüft. Begründung: Seit AP12 sind mehrere Arbeitspakete hinzugekommen; in AP16 und AP17 fielen Fehler erst im Test auf, einer davon bestand unbemerkt seit AP12. Nach der Übersetzung existiert jeder sichtbare Text doppelt, Korrekturen werden dann aufwendiger.

Umfang:

- vollständige Durchsicht des Quellcodes, zusätzlich durch einen unabhängigen Prüfer ohne Kenntnis der bisherigen Annahmen
- Funktionstest jeder Einstellung, Schaltfläche und Meldung im laufenden Cinnamon
- Robustheit: beschädigte Einstellungsdatei, fehlende Sensoren, fehlendes Speedtest-Programm, abgezogene Laufwerke
- Langzeitverhalten: Speicher- und CPU-Verbrauch über mehrere Stunden
- Übereinstimmung von Applet und Desklet

Gefundene Fehler werden behoben; größere Änderungen werden als eigenes Arbeitspaket vorgeschlagen. Ziel und Akzeptanzkriterien sind vor Beginn schriftlich festzulegen.

### Abschlussprüfung vor der Veröffentlichung

Vor dem Einreichen bei Cinnamon Spices (Abschnitt 12) erfolgt eine Abschlussprüfung: Umfang wie AP19, zusätzlich Installation und Deinstallation, Prüfung gegen die dann gültigen Spices-Vorgaben sowie Tests des Nutzers auf weiteren Geräten (Desktop-PC, AMD- bzw. NVIDIA-Grafik, weitere Notebooks), die nicht vom Entwicklungsrechner aus geprüft werden können.

### Kostenmodell

Am 18.09.2026 bestätigt: aVincePulse bleibt vollständig kostenlos, ohne Bezahlversion und ohne gesperrte Funktionen. Vorgesehen ist ein dezenter, einmalig sichtbarer Unterstützen-Hinweis in den Einstellungen und im README (vgl. Abschnitt 10).

Gründe gegen eine Bezahlversion:

- lesbarer JavaScript-Quellcode, eine Freischaltung wäre ohne Aufwand zu umgehen
- Cinnamon Spices ist auf freie Software ausgelegt; die zum Veröffentlichungszeitpunkt geltenden Regeln sind zu prüfen
- unter der geprüften Lizenz GPL-3.0 dürfte eine freigeschaltete Fassung weitergegeben werden
- Aufwand für Lizenzprüfung, zwei Fassungen und Bezahlabwicklung steht in keinem Verhältnis

Status:
ERWEITERUNGEN UND KOSTENMODELL – FESTGELEGT
