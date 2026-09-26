# Übernahmetext für die Homepage avince.de

**Angelegt am 26.09.2026.** Gehört nicht zum Programm, sondern zu dem,
was danach kommt: eine Inhaltsseite auf **avince.de**, die aVincePulse
vorstellt, und ein Bereich, in dem später weitere eigene Programme
dazukommen – für Linux und in Zukunft für Windows.

## Wozu diese Datei

Der Text unten ist zum **Kopieren in eine neue Claude-Sitzung** gedacht.
Er enthält alles über aVincePulse, was für die Seite gebraucht wird,
damit die Sitzung nicht erst das Projekt durchsuchen muss – und er
benennt, was noch offen ist.

Die Datei liegt hier, weil hier alles zum Thema zu finden ist. Sie
liegt in Git und ist deshalb auch am Zweitgerät lesbar:

```bash
cd ~/aVincePulse && cat 05_DOKUMENTATION/HOMEPAGE-PROMPT-avince-de.md
```

## Was der Text bewusst offen lässt

Über avince.de selbst ist hier nichts bekannt: nicht, womit die Seite
gebaut ist, nicht, wie Änderungen eingespielt werden, nicht, wie sie
aussieht. Der Text fordert deshalb ausdrücklich, **zuerst zu fragen**,
statt etwas zu vermuten und darauf aufzubauen.

## Vor dem Einfügen prüfen

**Der Stand bei Cinnamon Spices.** Im Text steht „NOCH NICHT
AUFGENOMMEN". Sobald die beiden Pull Requests angenommen sind, gehört
dort die Adresse des Eintrags hin – und auf der Seite selbst ein
Installationsweg über die Systemeinstellungen statt über GitHub.

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

WAS ICH NOCH NICHT GESAGT HABE UND WAS DU WISSEN MUSST

- Womit avince.de gebaut ist (WordPress, Baukasten, statisches HTML,
  etwas anderes?)
- Wie ich Änderungen einspiele (FTP, Git, Admin-Oberfläche?)
- Wo die Seite liegt und ob es eine Testumgebung gibt
- Wie das jetzige Design aussieht und welche Seiten es schon gibt
- Ob die Seite ein- oder mehrsprachig sein soll

Frag mich das ab, bevor du etwas vorschlägst.

WAS ENTSTEHEN SOLL

1. Eine Übersichtsseite "Programme" oder "Software", die später
   mehrere Einträge trägt – ausbaufähig angelegt, nicht auf einen
   Eintrag zugeschnitten.

2. Eine eigene Inhaltsseite für aVincePulse mit Beschreibung,
   Bildern, Installationshinweis und den Links unten.

3. Ein Muster, nach dem ich weitere Programme ergänzen kann, ohne
   jedes Mal von vorn anzufangen.

WAS aVincePulse IST – für die Texte

Ein Hardware- und Netzwerkmonitor für Linux Mint mit Cinnamon,
Version 6.6 oder neuer. Zwei Bestandteile:

- ein APPLET für die Leiste: zeigt dort nur ein kleines Symbol,
  die Messwerte erscheinen groß in der Bildschirmmitte, wenn man
  darauf zeigt oder klickt. Die Leiste bleibt aufgeräumt, die Werte
  sind quer durch den Raum lesbar.
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

MATERIAL

Drei Bildschirmfotos liegen im Projekt unter
/mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Development/docs/
  screenshot-applet.png    das Applet mit geöffneter Anzeige
  screenshot-desklet.png   das Desklet auf dem Schreibtisch
  screenshot-settings.png  das Einstellungsfenster

Logo und Symbole in verschiedenen Größen:
  .../03_GRAFIK_ICONS/01_V_SIGNAL_ICONSET/

Die englische und die deutsche Projektbeschreibung als Vorlage:
  .../README.md und README.de.md

LINKS FÜR DIE SEITE

- Quellcode: https://github.com/aVince-Industrietechnik/aVincePulse
- Unterstützen: https://ko-fi.com/avince
- Bei Cinnamon Spices: NOCH NICHT AUFGENOMMEN. Frag mich nach dem
  Stand, bevor du darauf verlinkst.

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

Zwei Stellen im Text sind dann zu ändern:

1. **Der Spices-Link.** Statt „NOCH NICHT AUFGENOMMEN" die Adresse des
   Eintrags auf `cinnamon-spices.linuxmint.com`.
2. **Der Installationsweg.** Dann ist der übliche Weg
   *Systemeinstellungen → Applets → Herunterladen*, nicht mehr der
   Umweg über GitHub. Das gehört auf die Seite, weil es für Nutzer der
   einfachere Weg ist.

Ebenso zu berichtigen ist dann der Satz „Noch nicht bei Cinnamon Spices
eingereicht" in `README.md` und `README.de.md` – er steht als
Merkposten in `PROJECT-STATUS.md`, Abschnitt 14.
