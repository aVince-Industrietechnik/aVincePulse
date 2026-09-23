# aVincePulse

**Hardware- und Netzwerkmonitor für Linux Mint Cinnamon.**

*[This page in English](README.md)*

aVincePulse zeigt CPU- und Speichertemperatur, Auslastung, Arbeits-
speicher, freien Plattenplatz, Lüfterdrehzahl, Akku, die laufende
Netzwerkgeschwindigkeit und die Ergebnisse eines Internet-Speedtests —
als Applet im Panel, als Desklet auf dem Schreibtisch oder beides.

> **Entwicklungsfassung.** Dies ist `0.1.0-dev.25`. Das Programm
> funktioniert, wird täglich benutzt und hat eine vollständige
> Abschlussprüfung hinter sich: 35 Befunde aus der Code-Durchsicht,
> keiner kritisch, dazu eine Prüfliste auf einem zweiten Rechner —
> einem Desktop mit AMD-Prozessor, ohne Akku und mit zwei
> gleichartigen NVMe-Laufwerken —, die neun weitere ergab. Die
> Oberfläche spricht Deutsch und Englisch. Noch nicht bei Cinnamon
> Spices eingereicht.

![Das Applet mit geöffneter Hover-Anzeige](docs/screenshot-applet.png)

## Zwei Bestandteile, jeder für sich

aVincePulse besteht aus zwei getrennten Teilen nach einem Grundsatz:
**eigenständig und trotzdem kooperativ.**

| | |
|---|---|
| **Applet** | Ein Symbol im Cinnamon-Panel. Wer mit der Maus darüberfährt — oder auf einem Touchscreen darauf tippt — bekommt eine große, gut lesbare Anzeige aller Werte in der Bildschirmmitte. |
| **Desklet** | Eine dauerhafte Anzeige auf dem Schreibtisch. |

Du kannst eins von beiden oder beide installieren. Keins braucht das
andere: Jedes liest seine Sensoren selbst und jedes kann den Speedtest
auslösen. Geteilt wird nur das letzte Speedtest-Ergebnis — ein Test aus
dem einen ist also im anderen zu sehen.

![Das Desklet auf dem Schreibtisch](docs/screenshot-desklet.png)

## Was gemessen wird

15 Werte, jeder einzeln ausblendbar, umbenennbar und in der Reihenfolge
verschiebbar:

| Wert | Anzeige | Quelle |
|---|---|---|
| CPU-Temperatur | `CPU` | `/sys/class/hwmon` |
| CPU-Auslastung | `LOAD` | `/proc/stat` |
| Arbeitsspeicher | `RAM` | `/proc/meminfo` |
| Datenträgertemperatur | `SSD` | `/sys/class/hwmon` |
| Freier Speicherplatz | `FREE ⛁` | gewähltes Laufwerk |
| Lüfterdrehzahl | `FAN` | `/sys/class/hwmon` |
| Akku-Ladezustand | `BATT` | `/sys/class/power_supply` |
| Stromversorgung | `STATUS` | `/sys/class/power_supply` |
| Netzwerk empfangen | `DOWN` | gewählte Schnittstelle |
| Netzwerk gesendet | `UP` | gewählte Schnittstelle |
| Speedtest empfangen | `SPEED ↓` | Speedtest-Programm |
| Speedtest gesendet | `SPEED ↑` | Speedtest-Programm |
| Ping | `PING` | Speedtest-Programm |
| Jitter | `JITTER` | Speedtest-Programm |
| Alter des letzten Tests | `LAST ◷` | gespeichertes Ergebnis |

Werte, deren Sensor auf deinem Rechner nicht vorhanden ist, werden
einfach nicht angezeigt. Ein Desktop-PC ohne Akku bekommt keine leere
Akkuzeile, und ein fehlender Sensor führt nie zu einem Fehler.

## Was es kann

**Sensoren werden selbst gefunden, lassen sich aber von Hand wählen.**
aVincePulse durchsucht `/sys/class/hwmon` und sucht sich passende
Sensoren. Die `hwmonN`-Nummern ändern sich nach einem Neustart, deshalb
wird jeder Sensor über Chip, Gerät und Nummer wiedererkannt. Passt die
automatische Wahl nicht, kannst du aus einer Liste wählen, die zu jedem
Sensor seinen aktuellen Wert zeigt. Dasselbe gilt für die
Netzwerkschnittstelle und das Laufwerk, dessen freier Platz angezeigt
wird.

**Die Hardware lässt sich neu erkennen**, ohne Cinnamon neu zu starten
— nützlich nach dem Einbau einer neuen SSD oder wenn ein Treiber erst
spät geladen wurde.

**Warnfarben.** Ein Wert wird orange und dann rot, sobald er eine
Schwelle erreicht. Die Schwellen bestimmst du:

| Wert | Warnung | Kritisch |
|---|---|---|
| CPU-Temperatur | 80 °C | 90 °C |
| Datenträgertemperatur | 70 °C | 80 °C |
| CPU-Auslastung | 85 % | 95 % |
| Arbeitsspeicher | 85 % | 95 % |
| Freier Speicherplatz | unter 10 % | unter 5 % |
| Akku-Ladezustand | unter 20 % | unter 10 % |

Es gibt zwei Farbsätze — leuchtend für dunkle Hintergrundbilder,
gedämpft für helle —, weil das Programm nicht wissen kann, was hinter
seiner Anzeige liegt.

**Für helle und dunkle Hintergründe ausgelegt.** Für gute Lesbarkeit
sorgt ein kräftiger Schriftschatten. Zusätzlich lässt sich eine
abgedunkelte Fläche hinter der Schrift verstärken oder ganz
abschalten.

**Beide Teile laufen im Gleichtakt.** Der Messtakt richtet sich nach
der Systemuhr. Bei gleichem Intervall messen Applet und Desklet im
selben Moment, ohne voneinander zu wissen.

**Nichts öffnet sich von selbst.** aVincePulse öffnet und schließt kein
Fenster ohne deine Aufforderung und zeigt keine Benachrichtigung, um
die du nicht gebeten hast.

## Voraussetzungen

- Linux Mint mit Cinnamon 6.x — entwickelt und geprüft mit 6.6 unter X11
- Keine Root-Rechte, keine Hintergrunddienste, keine zusätzlichen
  Pakete für die Überwachung selbst

All das läuft sofort. Nur der Internet-Speedtest braucht ein eigenes
Programm.

## Der Internet-Speedtest

Für den Speedtest wird eines von zwei Befehlszeilenprogrammen
gebraucht, je nachdem, welches vorhanden ist:

| Programm | Anmerkung |
|---|---|
| **librespeed-cli** | Bevorzugt. Misst gegen die freien Server von LibreSpeed und liefert als einziges der beiden einen Jitter-Wert. |
| **speedtest-cli** | Aus den Standardquellen von Mint und Ubuntu. Liefert keinen Jitter und misst bei schnellen Anschlüssen ungenauer. |

Sind beide installiert, kannst du wählen. Ist nur eines da, wird es
verwendet. **Ist keines installiert, verschwindet die Speedtest-
Schaltfläche einfach**, und alles andere läuft weiter — der Speedtest
ist eine Zugabe, keine Voraussetzung.

aVincePulse übernimmt von dem verwendeten Programm ausschließlich die
Messwerte für Download, Upload und Ping sowie – sofern verfügbar –
Jitter. Die IP-Adresse, ungefähre Koordinaten und Anbieterinformationen
werden nicht gespeichert, weder in den gespeicherten Werten noch in den
bleibenden Berichten.

## Installation

Noch nicht über Cinnamon Spices erhältlich. Vorläufig werden die beiden
Verzeichnisse von Hand kopiert:

```bash
git clone https://github.com/aVince-Industrietechnik/aVincePulse.git
cd aVincePulse
mkdir -p ~/.local/share/cinnamon/applets/avincepulse-applet@avince
mkdir -p ~/.local/share/cinnamon/desklets/avincepulse-desklet@avince
rsync -a --delete 02_QUELLCODE/Applet/  ~/.local/share/cinnamon/applets/avincepulse-applet@avince/
rsync -a --delete 02_QUELLCODE/Desklet/ ~/.local/share/cinnamon/desklets/avincepulse-desklet@avince/
```

Dieselben Befehle gelten für ein Update: Ein `git pull` holt die neue
Fassung, danach werden sie einfach erneut ausgeführt. `rsync` ersetzt
geänderte Dateien und entfernt solche, die es nicht mehr gibt. Die
abschließenden Schrägstriche sind wichtig — sie sorgen dafür, dass der
*Inhalt* der Verzeichnisse kopiert wird und nicht die Verzeichnisse
selbst. Deine Einstellungen, Berichte und Speedtest-Werte liegen
außerhalb dieser Verzeichnisse und werden dabei nicht berührt.

Danach Cinnamon neu starten (`Alt`+`F2`, dann `r`, dann Eingabetaste)
und das Applet bzw. Desklet wie gewohnt über *Systemeinstellungen →
Applets* oder *Desklets* hinzufügen.

In einer Wayland-Sitzung ist dieser Neustart nicht möglich; dort
stattdessen abmelden und neu anmelden. Geprüft ist aVincePulse
ausschließlich unter X11.

Du brauchst nur den Teil, den du wirklich willst — für das Applet
genügt das Applet-Verzeichnis.

### Wieder entfernen

Applet oder Desklet über die Systemeinstellungen entfernen, dann das
kopierte Verzeichnis löschen.

Die Einstellungen behandelt Cinnamon selbst: Wird nur das Applet aus
dem Panel genommen, bleiben sie erhalten; wird das Xlet vollständig
entfernt, löscht Cinnamon auch seine Einstellungsdatei.

aVincePulse legt außerdem einige Dateien unter
`~/.local/share/avincepulse/` ab — das letzte Speedtest-Ergebnis und
die geschriebenen Berichte. Diese bleiben in jedem Fall liegen. Wer
nichts zurücklassen will, löscht dieses Verzeichnis; am übrigen System
wird nichts verändert.

## Wo etwas abgelegt wird

| Pfad | Inhalt |
|---|---|
| `~/.config/cinnamon/spices/<uuid>/` | deine Einstellungen, je Bestandteil eine Datei |
| `~/.local/share/avincepulse/speedtest-values` | das jüngste Speedtest-Ergebnis |
| `~/.local/share/avincepulse/berichte/Hardware/` | je Bestandteil ein Bericht der Hardwareerkennung |
| `~/.local/share/avincepulse/berichte/Speedtest/` | Berichte der Speedtests, einer je Messung |
| `~/.local/share/avincepulse/speedtest.lock` | nur während eines laufenden Speedtests |

Außerhalb dieser Pfade schreibt aVincePulse nichts.

Die **Speedtest-Berichte** sammeln sich an und werden nie gelöscht.
Dort ist der Verlauf gerade der Zweck.

Vom **Hardwarebericht** führt jeder Bestandteil genau eine Datei —
`aVP-applet-hardware-bericht.txt` und
`aVP-desklet-hardware-bericht.txt` — und überschreibt sie bei jeder
Erkennung. Die Hardware eines Rechners ändert sich selten; gebraucht
wird der letzte Stand, nicht eine Kette fast gleicher Momentaufnahmen.
Der Zeitpunkt der Erkennung steht im Bericht selbst.

Gelöscht wird keine Datei. Ältere Hardwareberichte aus früheren
Fassungen, deren Name Datum und Uhrzeit trägt, bleiben unangetastet
liegen.

## Einstellungen

Beide Bestandteile werden getrennt eingestellt, über das gewohnte
Einstellungsfenster von Cinnamon, und jeder hat eine Schaltfläche, die
alle Vorgaben wiederherstellt.

![Das Einstellungsfenster](docs/screenshot-settings.png)

Einstellbar sind unter anderem: Aktualisierungsintervall, Anzeigegröße,
Schriftgröße und -stärke, Deckkraft der Hintergrundfläche, das
Panel-Symbol, die Aktion bei Linksklick, welche Werte in welcher
Reihenfolge erscheinen, eigene Bezeichnungen, die Sensorauswahl, die
Netzwerkschnittstelle, das Laufwerk, Warnschwellen und Warnfarben sowie
das Speedtest-Programm.

## Unterstützung

aVincePulse ist kostenlos und vollständig. Es gibt keine Bezahlversion,
kein Abonnement und keine Funktion, die hinter einer Zahlung
zurückgehalten wird — alles hier Beschriebene steckt in der Fassung,
die du herunterladen kannst.

Wenn es dir nützt und du die Weiterentwicklung unterstützen möchtest,
freut mich das. Es ist vollkommen freiwillig und ändert nichts am
Programm.

**[aVincePulse auf Ko-fi unterstützen](https://ko-fi.com/avince)**

Außerdem gibt es eine Schaltfläche ganz unten im Einstellungsfenster.
Das ist die einzige Stelle, an der das Programm davon spricht: keine
Einblendungen, keine Erinnerungen, kein Mitzählen, wie lange du es
schon benutzt.

## Mitwirken

Fehlerberichte und Vorschläge sind willkommen über
[GitHub-Issues](https://github.com/aVince-Industrietechnik/aVincePulse/issues).

Besonders hilfreich wäre im Moment: Rückmeldung von anderer Hardware
als dem Referenzgerät. aVincePulse ist bisher nur auf einem Dell
Latitude 5285 geprüft worden. Wenn auf deinem Rechner ein Sensor nicht
gefunden wird oder der falsche, hilft der Hardwarebericht weiter — im
Einstellungsfenster gibt es eine Schaltfläche, die einen schreibt, und
darin stehen alle Sensoren, die dein System anbietet.

Übersetzungen sind willkommen, sobald die englischen Ausgangstexte
stehen; das ist das nächste Arbeitspaket.

## Lizenz

Copyright © 2026 Angelo Vincenti — aVince Industrietechnik

aVincePulse ist freie Software unter der **GNU General Public License,
Version 3**. Du darfst es benutzen, untersuchen, verändern und
weitergeben; wer eine veränderte Fassung weitergibt, muss sie unter
dieselbe Lizenz stellen und den Quellcode mitliefern. Eine
Gewährleistung gibt es nicht.

Der vollständige Text steht in [LICENSE](LICENSE).

Die Speedtest-Programme sind eigenständige Software mit eigenen
Lizenzen und werden nicht mit aVincePulse ausgeliefert — es ruft sie
nur auf, wenn sie schon installiert sind. Die Prüfung beider steht in
[08_LIZENZEN_RECHTE/SPEEDTEST-PROGRAMME.md](08_LIZENZEN_RECHTE/SPEEDTEST-PROGRAMME.md).
