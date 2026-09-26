# Übernahmetext für die Homepage avince.de

**Angelegt am 26.09.2026, überarbeitet am selben Tag für die Arbeit am
Zweitgerät.**

Gehört nicht zum Programm, sondern zu dem, was danach kommt: eine
Inhaltsseite auf **avince.de**, die aVincePulse vorstellt, und ein
Bereich, in dem später weitere eigene Programme dazukommen – für Linux
und in Zukunft für Windows.

## Wozu diese Datei

Der Text unten ist zum **Kopieren in eine neue Sitzung** gedacht. Er
enthält alles über aVincePulse, was für die Seite gebraucht wird, und
benennt, was noch offen ist.

**Auf beiden Geräten lesbar**, weil sie in Git liegt:

```bash
cd ~/aVincePulse && git pull && cat 05_DOKUMENTATION/HOMEPAGE-PROMPT-avince-de.md
```

## Zwei mögliche Projektordner

**Der Tower hat Zugriff auf die NAS** (bestätigt am 26.09.2026). Damit
gibt es dort zwei Wege zum Projekt, und der Text unten lässt die
Sitzung selbst herausfinden, welcher greift:

| Weg | Pfad | Inhalt |
|---|---|---|
| NAS | `/mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Development` | **alles**, auch `06_TESTVERSIONEN/` |
| Clone | `~/aVincePulse` | alles außer `06_TESTVERSIONEN/` |

**Für die Homepage genügt der Clone.** Die drei Bildschirmfotos, das
Logo in allen Größen, beide Projektbeschreibungen und die
Lizenzhinweise liegen in Git. Nur `06_TESTVERSIONEN/` fehlt dort –
Prüfdaten und Snapshots, die für eine Webseite keine Rolle spielen.

**Wenn über die NAS gearbeitet wird, gilt eine Regel:** nur lesen.
Dort liegt das Git-Repository des Referenzgeräts. Zwei Rechner, die
gleichzeitig darin committen, bringen es durcheinander. Für die
Homepage wird ohnehin nur gelesen – Bilder und Texte.

---

## Der Text

```
HOMEPAGE-ERWEITERUNG – avince.de

Ich möchte meine Homepage avince.de um einen Bereich erweitern, in dem
ich meine eigenen Programme vorstelle. Den Anfang macht aVincePulse.
Später sollen weitere Programme dazukommen, für Linux und in Zukunft
auch für Windows.

BITTE ZUERST FRAGEN, BEVOR DU ETWAS ÄNDERST

Ich bin kein Programmierer. Sage mir bei jedem Schritt, welche Datei
du anfasst, warum, und was passiert, wenn etwas schiefgeht. Keine
Änderung ohne meine Freigabe, keine Löschung ohne ausdrückliche
Freigabe. Sprich Deutsch, in der Du-Form.

WAS DU NOCH NICHT WEISST UND MICH FRAGEN MUSST

- Womit avince.de gebaut ist (WordPress, Baukasten, statisches HTML,
  etwas anderes?)
- Wie ich Änderungen einspiele (FTP, Git, Admin-Oberfläche?)
- Wo die Seite liegt und ob es eine Testumgebung gibt
- Wie das jetzige Design aussieht und welche Seiten es schon gibt
- Ob die Seite ein- oder mehrsprachig sein soll

Es gibt ein privates GitHub-Repository "aVince-Industrietechnik/
aVince-home". Frag mich, ob das die Homepage ist und ob wir damit
arbeiten.

Frag mich das ab, bevor du etwas vorschlägst.

WO DU DAS MATERIAL FINDEST

Das Projekt aVincePulse liegt auf diesem Rechner an einer von zwei
Stellen. Finde zuerst heraus, an welcher:

    for p in /mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Development ~/aVincePulse; do if [ -d "$p/docs" ]; then echo "gefunden: $p"; fi; done

Beide enthalten alles, was für die Homepage gebraucht wird. Gibt es
beide, nimm den Clone unter ~/aVincePulse und bring ihn auf Stand:

    cd ~/aVincePulse && git pull

WICHTIG, falls du über die NAS arbeitest: dort NUR LESEN. In diesem
Ordner liegt das Git-Repository des anderen Rechners; gleichzeitiges
Schreiben von zwei Geräten bringt es durcheinander. Für die Homepage
brauchst du ohnehin nur Bilder und Texte.

Ist gar nichts da:

    git clone https://github.com/aVince-Industrietechnik/aVincePulse.git ~/aVincePulse

Das Projekt ist öffentlich, ein Zugang wird zum Lesen nicht gebraucht:
https://github.com/aVince-Industrietechnik/aVincePulse

Alle folgenden Pfade sind relativ zu dem Ordner, den du gefunden hast.

  docs/screenshot-applet.png     das Applet mit geöffneter Anzeige
  docs/screenshot-desklet.png    das Desklet auf dem Schreibtisch
  docs/screenshot-settings.png   das Einstellungsfenster
  docs/LIESMICH-SCREENSHOTS.txt  wie die Bilder entstanden sind

  03_GRAFIK_ICONS/01_V_SIGNAL_ICONSET/
      00_Referenz/      das Ursprungslogo
      01_PNG_Iconset/   Symbole von 16 bis 1024 Pixel
      03_Panel/         die Leistensymbole, auch einfarbig

  README.md      die englische Projektbeschreibung
  README.de.md   die deutsche - taugt als Vorlage für die Seitentexte

  08_LIZENZEN_RECHTE/GRAFIKEN.md        Herkunft und Rechte der Bilder
  08_LIZENZEN_RECHTE/NAME-UND-MARKE.md  zum Namen aVincePulse

Lies README.de.md zuerst. Dort steht in ausformulierter Form, was das
Programm tut und was es bewusst nicht tut.

WAS aVincePulse IST – in Kürze

Ein Hardware- und Netzwerkmonitor für Linux Mint mit Cinnamon,
Version 6.6 oder neuer. Zwei Bestandteile:

- ein APPLET für die Leiste: zeigt dort nur ein kleines Symbol, die
  Messwerte erscheinen groß in der Bildschirmmitte, wenn man darauf
  zeigt oder klickt. Die Leiste bleibt aufgeräumt, die Werte sind quer
  durch den Raum lesbar.
- ein DESKLET für den Schreibtisch: zeigt die Werte dauerhaft.

Beide teilen dieselbe Mess- und Sensorlogik und zeigen dieselben
Zahlen, funktionieren aber jedes für sich. Grundsatz: eigenständig,
aber kooperativ.

Bis zu 15 Messwerte, jeder einzeln abschaltbar, frei sortierbar und
umbenennbar: CPU- und Speichertemperatur, Auslastung,
Arbeitsspeicher, freier Plattenplatz, Lüfterdrehzahl, Akku,
Netzteilzustand, laufende Netzwerkgeschwindigkeit und die Ergebnisse
eines Internet-Speedtests. Dazu Warnschwellen mit Farbwechsel.

Oberfläche auf Deutsch und Englisch, folgt der Systemsprache.

Was es bewusst NICHT tut – das ist ein Verkaufsargument, kein
Kleingedrucktes:
- keine Root-Rechte, keine Hintergrunddienste, keine zusätzlichen
  Pakete für die Überwachung selbst
- keine eigenen Netzaufrufe
- öffnet kein Fenster ungefragt, zeigt keine Benachrichtigungen
- vom Speedtest werden nur vier Messwerte gespeichert; die
  öffentliche IP-Adresse und die Koordinaten, die die Messprogramme
  mitliefern, werden verworfen

Kostenlos und vollständig, ohne Bezahlversion und ohne gesperrte
Funktionen. Lizenz GPL-3.0-only.

WAS DAHINTERSTEHT – falls es in einen Absatz passt

28 Arbeitspakete. Eine vollständige Abschlussprüfung mit 35 Befunden
aus der Code-Durchsicht, keiner kritisch, und neun weiteren von einem
zweiten Rechner. Ein unabhängiges technisches Audit vor der
Veröffentlichung. 494 Prüfungen in neun Prüfskripten.

Das ist kein Wochenendprojekt, und das darf man der Seite ansehen –
aber bitte ohne Zahlenprotzerei.

STAND: EINGEREICHT, NOCH NICHT AUFGENOMMEN

Am 26.09.2026 bei Cinnamon Spices eingereicht, Fassung 0.1.0:

  Applet  https://github.com/linuxmint/cinnamon-spices-applets/pull/9073
  Desklet https://github.com/linuxmint/cinnamon-spices-desklets/pull/1910

Beide Anträge sind offen. **Bis zur Aufnahme darf die Seite nicht
behaupten, das Programm sei bei Cinnamon Spices erhältlich.** Der
Installationsweg ist derzeit der über GitHub, wie im README
beschrieben.

Frag mich nach dem Stand, bevor du etwas dazu schreibst.

LINKS FÜR DIE SEITE

- Quellcode: https://github.com/aVince-Industrietechnik/aVincePulse
- Unterstützen: https://ko-fi.com/avince
- Bei Cinnamon Spices: noch nicht aufgenommen, siehe oben

WAS ENTSTEHEN SOLL

1. Eine Übersichtsseite "Programme" oder "Software", die später
   mehrere Einträge trägt – ausbaufähig angelegt, nicht auf einen
   Eintrag zugeschnitten.

2. Eine eigene Inhaltsseite für aVincePulse mit Beschreibung,
   Bildern, Installationshinweis und den Links oben.

3. Ein Muster, nach dem ich weitere Programme ergänzen kann, ohne
   jedes Mal von vorn anzufangen.

WORAUF ICH WERT LEGE

- Ehrliche Texte. Nichts versprechen, was das Programm nicht tut.
- Die Sprache soll erklären, nicht anpreisen.
- Die Seite muss auf dem Telefon lesbar sein.
- Datenschutz: keine fremden Schriften, keine Zählpixel, kein
  eingebettetes Video von fremden Anbietern ohne meine Zustimmung.
- Impressum und Datenschutzerklärung müssen zu dem passen, was die
  neue Seite tut.

Fang damit an, mir die offenen Fragen oben zu stellen.
```

---

## Wenn die Aufnahme durch ist

Drei Stellen sind dann zu ändern:

1. **Im Text oben:** Der Abschnitt „STAND: EINGEREICHT" wird zur
   Adresse des Eintrags auf `cinnamon-spices.linuxmint.com`.
2. **Auf der Seite:** Der Installationsweg wird
   *Systemeinstellungen → Applets → Herunterladen* statt des Umwegs
   über GitHub. Das ist für Nutzer der einfachere Weg und gehört
   dann nach vorn.
3. **In `README.md` und `README.de.md`:** Der Satz „Noch nicht bei
   Cinnamon Spices eingereicht" – er steht als Merkposten auch in
   `PROJECT-STATUS.md`, Abschnitt 14.
