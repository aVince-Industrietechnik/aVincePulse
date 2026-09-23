# aVincePulse auf einem zweiten Gerät testen

Stand: 23.09.2026, angelegt für AP25.

Vor der Veröffentlichung verlangt `ROADMAP_V2.md`, Abschnitt 23,
ausdrücklich „Tests auf mehreren unterschiedlichen Rechnern". Bisher ist
aVincePulse **ausschließlich** auf dem Referenzgerät geprüft – einem
Dell Latitude 5285, also einem 2-in-1-Notebook mit Akku, Touchscreen,
WLAN und Intel-Grafik.

Ein Desktop-Rechner prüft genau das, was dort nicht vorkommt.

## 1. Warum dieser Test wertvoll ist

Vier der in AP25 gefundenen Befunde lassen sich **nur** auf anderer
Hardware beobachten:

| Befund | Tritt auf bei |
|---|---|
| **P1** | Gerät ohne `capacity`, aber mit `charge_full` – zeigt „0 %" statt „--" |
| **P11** | mehrere `mains`-Schnittstellen, etwa Netzteil plus USB-C-PD |
| **P10** | Treiber-Neuladen oder abweichende `hwmon`-Nummerierung |
| **P7** | Sensoren, die leere Dateien liefern |

Dazu kommt der wichtigste Fall überhaupt: **ein Rechner ohne Akku.**
Dort müssen die Zeilen `BATT` und `STATUS` sauber verschwinden oder
`--` zeigen, statt eine erfundene Zahl anzuzeigen.

## 2. Vorbereitung auf dem Zweitgerät

### 2.1 Umgebung prüfen

Das Skript prüft alles und ändert nichts:

```bash
bash 05_DOKUMENTATION/werkzeuge/zweitgeraet-pruefen.sh
```

Es meldet fehlende Werkzeuge samt passendem `apt`-Befehl, prüft den
Zugang zum Repository und listet am Ende **die Hardware dieses
Rechners** auf – Sensoren, Stromversorgung, Netzwerkschnittstellen.
Diese Liste ist zugleich die Grundlage für den Test.

### 2.2 Zugang zum Repository

**Das Repository ist privat** (Befund P26). Ohne Anmeldung schlägt
`git clone` fehl:

```
fatal: could not read Username for 'https://github.com'
```

Einmalig einrichten:

```bash
gh auth login
```

Danach:

```bash
cd ~
gh repo clone aVince-Industrietechnik/aVincePulse
cd aVincePulse
```

### 2.3 Zugang zur NAS – nur wenn dort gearbeitet werden soll

Für den **Test** genügt der Git-Clone. Die NAS wird nur gebraucht, wenn

- die Prüfdaten unter `06_TESTVERSIONEN/` gelesen werden sollen (sie
  sind per `.gitignore` nicht in GitHub), oder
- die Ergebnisse dorthin zurückgeschrieben werden sollen.

Einbinden wie auf dem Referenzgerät, Pfad
`/mnt/LX-NAS-linux/60_SETUP_INSTALLATION`.

**Ohne NAS ist der Weg:** auf dem Tower testen, die Ergebnisse als
Datei in den Clone legen, committen und pushen; auf dem Referenzgerät
`git pull` und in die Prüfdaten übernehmen.

### 2.4 Speedtest-Programme, beide freiwillig

```bash
sudo apt install speedtest-cli
```

`librespeed-cli` ist **kein** Paket der Mint-Quellen. Es lässt sich von
Hand installieren, muss aber nicht: Ohne jedes Programm verschwindet
der Speedtest, und genau dieses Verhalten ist ein eigener Prüfpunkt
(Z9 unten).

## 3. Installation

Wie im README, aus dem Clone heraus:

```bash
cd ~/aVincePulse
mkdir -p ~/.local/share/cinnamon/applets/avincepulse-applet@avince
mkdir -p ~/.local/share/cinnamon/desklets/avincepulse-desklet@avince
rsync -a --delete 02_QUELLCODE/Applet/  ~/.local/share/cinnamon/applets/avincepulse-applet@avince/
rsync -a --delete 02_QUELLCODE/Desklet/ ~/.local/share/cinnamon/desklets/avincepulse-desklet@avince/
```

Deutsche Übersetzung einspielen:

```bash
cd ~/.local/share/cinnamon
cinnamon-xlet-makepot -i applets/avincepulse-applet@avince/
cinnamon-xlet-makepot -i desklets/avincepulse-desklet@avince/
```

Dann Cinnamon neu starten (`Alt`+`F2`, `r`, Eingabetaste) und beide
Bestandteile über die Systemeinstellungen hinzufügen.

**Wichtig:** Der Clone hat den Stand des letzten Commits. Läuft auf dem
Referenzgerät gerade Phase 2 weiter, vorher `git pull`.

## 4. Die Prüfliste für das Zweitgerät

Kurz gehalten – der vollständige Funktionstest ist auf dem
Referenzgerät gelaufen. Hier geht es um **das, was dort nicht prüfbar
war**.

| Nr | Prüfung | Erwartet | Ergebnis |
|---|---|---|---|
| **Z1** | Beide Bestandteile lassen sich hinzufügen | erscheinen ohne Fehler | |
| **Z2** | Sitzungsprotokoll nach dem Start | keine Zeile von aVincePulse mit `error`, `exception` oder `warning` | |
| **Z3** | **Akku** – hat dieser Rechner keinen: BATT und STATUS | zeigen `--` oder sind ausgeblendet, **keine erfundene Zahl, keine 0 %** | |
| **Z4** | Netzteil – mehrere `mains`-Schnittstellen? | STATUS zeigt `ON`, solange der Rechner am Netz hängt (Befund P11) | |
| **Z5** | Temperaturen | plausible Werte, keine `0 °C`, kein `NaN` | |
| **Z6** | Lüfter – hat der Rechner mehrere? | eine Drehzahl wird angezeigt oder `----` | |
| **Z7** | Sensorauswahl öffnen | zeigt die Sensoren **dieses** Rechners mit Messwert | |
| **Z8** | Laufwerksauswahl | zeigt die eingehängten Laufwerke mit freiem Platz | |
| **Z9** | **Ohne Speedtest-Programm** (falls keines installiert) | Auswahlfeld, Schaltfläche und Menüeintrag verborgen, Hinweis sichtbar, Berichte weiter erreichbar | |
| **Z10** | Warnschwellen | eine Schwelle tief setzen, Farbe erscheint; zurücksetzen | |
| **Z11** | Hardware neu erkennen | Bericht entsteht, nennt die Sensoren dieses Rechners | |
| **Z12** | Zurücksetzen | alle Werte auf Vorgabe | |
| **Z13** | Bildschirmauflösung | Hover-Anzeige passt sich an, nichts abgeschnitten | |
| **Z14** | Panel-Symbol | bei der hier eingestellten Leistenhöhe erkennbar | |
| **Z15** | Zwei Stunden laufen lassen | keine neuen Protokollzeilen, Anzeige stimmt weiter | |

### Regeln wie auf dem Referenzgerät

- **Im Einstellungsfenster nicht mit dem Mausrad scrollen** – das Rad
  verstellt Auswahlfelder. Rollbalken ziehen.
- Nach jedem Abschnitt die gespeicherten Werte gegen die
  Schema-Vorgaben vergleichen:
  ```bash
  python3 06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/werte_pruefen.py
  ```
  (nur mit NAS-Zugriff; sonst per Hand gegen
  `02_QUELLCODE/*/settings-schema.json`)
- Protokoll ansehen: `~/.xsession-errors`

## 5. Was mitzubringen ist

Für die Auswertung auf dem Referenzgerät:

1. **Die Ausgabe von `zweitgeraet-pruefen.sh`** – sie beschreibt die
   Hardware vollständig.
2. **Ein Hardwarebericht** dieses Rechners, erzeugt über „Hardware neu
   erkennen", zu finden unter
   `~/.local/share/avincepulse/berichte/Hardware/`.
3. **Die ausgefüllte Prüfliste** Z1 bis Z15.
4. **Auffällige Protokollzeilen**, falls welche auftraten.

Am einfachsten in einer Datei sammeln, in den Clone legen und pushen:

```bash
mkdir -p 06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/zweitgeraet
# Dateien dort ablegen, dann:
git add -f 06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/zweitgeraet
git commit -m "AP25: test results from the second machine"
git push
```

Das `-f` ist nötig, weil `06_TESTVERSIONEN/` sonst ignoriert wird.

## 6. Wenn etwas nicht stimmt

Kein Grund zur Eile – ein Befund auf dem Zweitgerät ist **der Zweck**
dieses Tests, kein Rückschlag. Festhalten:

- Was genau war zu sehen (Wortlaut, nicht sinngemäß)?
- Welcher Messwert, welcher Bestandteil?
- Was sagt `~/.xsession-errors`?
- Lässt es sich wiederholen?

Der Befund wird auf dem Referenzgerät in
`PRUEFDATEN/codedurchsicht/BEFUNDE.md` aufgenommen und in Phase 2
bewertet.
