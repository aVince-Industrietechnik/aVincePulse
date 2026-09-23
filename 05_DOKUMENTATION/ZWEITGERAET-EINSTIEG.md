# Einstieg am Zweitgerät (Tower)

Angelegt am 23.09.2026 für AP25, Schritt 2.

Diese Datei ist zum Abtippen gedacht. Sie enthält den Übernahmetext für
eine neue Claude-Sitzung am Tower und die Befehlsfolge, die vor **jedem**
Testlauf zu wiederholen ist.

Die ausführliche Anleitung mit Prüfliste steht in
`ZWEITGERAET-TESTEN.md`. Diese hier ersetzt sie nicht, sondern führt
hinein.

---

## 1. Einmalig – Installation, Anmeldung und Clone

### Zuerst: GitHub-CLI installieren

Auf einem frischen Mint ist `gh` nicht vorhanden – am 23.09.2026 beim
ersten Aufbau aufgefallen.

```bash
sudo apt install gh
```

```bash
gh --version
```

Erwartet: `gh version 2.4x…`. **Kein Snap nehmen**, sondern das Paket
aus den normalen Quellen; Snaps kommen schlechter an den
System-Schlüsselbund, in dem der Zugangstoken liegt.

Das Prüfskript `zweitgeraet-pruefen.sh` meldet ein fehlendes `gh` zwar
auch, liegt aber selbst im Repository – ohne `gh` kommt man gar nicht
so weit.

### Dann: anmelden und klonen

Das Repository ist privat (Befund P26). Ohne Anmeldung scheitert schon
der Clone mit `fatal: could not read Username for 'https://github.com'`.

```bash
gh auth login
```

```bash
cd ~ && gh repo clone aVince-Industrietechnik/aVincePulse && ls aVincePulse
```

Erscheinen danach `01_PROJEKT_ROADMAP`, `02_QUELLCODE` und die übrigen
Ordner, ist der Clone da.

**Claude am Tower auf diesen Ordner stellen.** Eine Sitzung sieht nur
ihr eigenes Arbeitsverzeichnis; steht sie woanders, findet sie den
Quellcode nicht, obwohl er vorhanden ist.

---

## 2. Vor jedem Testlauf – die vier Schritte

Immer alle vier, immer in dieser Reihenfolge. Wer nur zieht und nicht
neu installiert, prüft weiterhin den alten Code aus dem
Zwischenspeicher.

### Schritt 1 – Neuen Stand holen

```bash
cd ~/aVincePulse && git pull && git log -1 --oneline
```

Die letzte Zeile nennt den Stand, der jetzt geprüft wird. Sie gehört in
die Rückmeldung.

### Schritt 2 – Testinstallation erneuern

```bash
cd ~/aVincePulse && rsync -a --delete 02_QUELLCODE/Applet/ ~/.local/share/cinnamon/applets/avincepulse-applet@avince/ && rsync -a --delete 02_QUELLCODE/Desklet/ ~/.local/share/cinnamon/desklets/avincepulse-desklet@avince/
```

### Schritt 3 – Übersetzung einspielen

```bash
cd ~/.local/share/cinnamon && cinnamon-xlet-makepot -i applets/avincepulse-applet@avince/ && cinnamon-xlet-makepot -i desklets/avincepulse-desklet@avince/
```

### Schritt 4 – Cinnamon neu starten

`Alt` + `F2`, dann `r`, dann Eingabetaste.

**Ein offenes Einstellungsfenster danach schließen und neu öffnen.** Es
ist ein eigener Prozess und lädt den Übersetzungskatalog nur beim
Öffnen; ein Cinnamon-Neustart erreicht es nicht.

### Probe, ob alles angekommen ist

Einstellungsfenster öffnen. Der Abschnitt muss
**„Hardwareerkennung"** heißen. Steht dort „Geräte", ist Schritt 3
oder 4 nicht durchgelaufen.

---

## 3. Übernahmetext für eine neue Claude-Sitzung am Tower

Der folgende Text genügt einer Sitzung, die unser Gespräch nicht kennt.

```
PROJEKTÜBERNAHME – aVincePulse, AP25 Schritt 2 (Zweitgerät)

Arbeitsverzeichnis: ~/aVincePulse
Repository: aVince-Industrietechnik/aVincePulse, Branch main

Dies ist der Desktop-Tower, das ZWEITGERÄT. Die Entwicklung läuft auf
einem anderen Rechner (Dell Latitude 5285, Notebook). Hier wird NICHT
entwickelt, sondern nur geprüft. Keine Änderung am Quellcode, kein
Commit am Quellcode.

Bitte zuerst lesen:
1. git log -1 --oneline
2. 05_DOKUMENTATION/ZWEITGERAET-EINSTIEG.md – Befehlsfolge vor jedem
   Testlauf.
3. 05_DOKUMENTATION/ZWEITGERAET-TESTEN.md – die vollständige Anleitung
   mit Prüfliste Z1 bis Z15. Der Abschnitt "Zu Z11 und Z12" erklärt
   zwei Korrekturen, die sonst wie Fehler aussehen.

Aufgabe: Prüfliste Z1 bis Z15 abarbeiten.

Vier Befunde sind nur hier beobachtbar – P1, P7, P10, P11 – dazu der
Fall "kein Akku vorhanden": BATT und STATUS müssen dann "--" zeigen
oder verschwinden, keine 0 %.

Reihenfolge:
  a) bash 05_DOKUMENTATION/werkzeuge/zweitgeraet-pruefen.sh
     (ändert nichts, listet die Hardware dieses Rechners auf)
  b) Installation nach Abschnitt 2 von ZWEITGERAET-EINSTIEG.md
  c) Prüfliste Z1 bis Z15

Zu beachten:
- Vor jedem Testlauf die vier Schritte aus ZWEITGERAET-EINSTIEG.md,
  nicht nur git pull. Sonst wird ein Stand geprüft, den es nicht mehr
  gibt.
- Zunächst KEIN Speedtest-Programm installieren. Der Fall "gar keines
  vorhanden" ist Prüfpunkt Z9 und auf dem Referenzgerät nie unter
  echten Bedingungen geprüft worden. speedtest-cli erst danach
  nachinstallieren und Z9 wiederholen.
- Die Prüfdaten unter 06_TESTVERSIONEN/ sind per .gitignore nicht in
  GitHub. Ohne NAS-Einbindung fehlt werte_pruefen.py; dann von Hand
  gegen 02_QUELLCODE/*/settings-schema.json vergleichen.
- Im Einstellungsfenster nicht mit dem Mausrad scrollen, das verstellt
  Auswahlfelder statt zu scrollen.
- Den Cinnamon-Neustart löse ich aus, nicht du.
- org.Cinnamon.Eval nur lesend, aus Python über Gio, nicht über gdbus.

Ergebnisse nach Abschnitt 5 von ZWEITGERAET-TESTEN.md sammeln und
pushen.

Kommunikation auf Deutsch, in der Du-Form.
```

---

## 4. Ergebnisse zurückgeben

```bash
cd ~/aVincePulse && mkdir -p 06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/zweitgeraet
```

Dateien dort ablegen, dann:

```bash
cd ~/aVincePulse && git add -f 06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/zweitgeraet && git commit -m "AP25: test results from the second machine" && git push
```

Das `-f` ist nötig, weil `06_TESTVERSIONEN/` sonst ignoriert wird.

Mitzugeben sind: die Ausgabe von `zweitgeraet-pruefen.sh`, ein
Hardwarebericht dieses Rechners, die ausgefüllte Liste Z1 bis Z15 und
auffällige Protokollzeilen **im Wortlaut**.
