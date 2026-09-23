# Rechte an den Grafiken

Stand: 21.09.2026 (AP25, Kriterium 11)
Projekt: aVincePulse, GPL-3.0-only
Urheber des Quellcodes: Angelo Vincenti – aVince Industrietechnik

`ROADMAP_V2.md`, Abschnitt 9, führt „verwendete Icons und Grafiken" als
vor der Veröffentlichung zu klärenden Punkt. Bis AP24 war dazu nichts
festgehalten.

## 1. Was tatsächlich ausgeliefert wird

Nur vier Bilddateien verlassen das Projekt. Alle sind 128×128 Pixel,
RGBA, und stammen nachweislich (SHA-256 abgeglichen) aus
`03_GRAFIK_ICONS/01_V_SIGNAL_ICONSET/`:

| Datei | Komponente | Herkunft im Iconset | Zweck |
|---|---|---|---|
| `icon.png` | Applet **und** Desklet | `01_PNG_Iconset/aVincePulse_icon_128x128.png` | Darstellung in der Xlet-Liste von Cinnamon |
| `panel-icon.png` | nur Applet | `03_Panel/aVincePulse_panel.png` | farbiges Panel-Symbol |
| `panel-icon-symbolic.png` | nur Applet | `03_Panel/aVincePulse_panel_symbolic.png` | einfarbiges Panel-Symbol |

`icon.png` ist in beiden Komponenten bitgenau dieselbe Datei
(SHA-256 `943150d8…`).

Die übrigen 28 Dateien des Iconsets – Referenzlogo, weitere PNG-Größen,
Entwurfsvarianten – liegen im Entwicklungsrepository, werden aber
**nicht** mit ausgeliefert und sind nicht Teil des Einreichungspakets.

## 2. Keine fremden Grafiken

Geprüft am 21.09.2026:

- aVincePulse liefert **keine** Symbole aus Icon-Themen von Cinnamon,
  Linux Mint, GNOME oder Dritten mit.
- Es lädt **keine** Bilder zur Laufzeit nach.
- Es verwendet **keine** Logos oder Wortbildmarken Dritter.
- Die Anzeige verwendet ausschließlich Zeichen aus den geometrischen
  Unicode-Blöcken der Standardschrift (`⛁`, `▤`, `↓`, `↑`); Emoji sind
  seit AP08 ausgeschlossen. Schriftzeichen sind keine Grafiken im Sinne
  dieser Prüfung.
- Das Ko-fi-Profilbild ist dasselbe V-Signal-Logo; es liegt bei Ko-fi,
  nicht im Auslieferungsumfang.

## 3. Herkunft des V-Signal-Logos

**Geklärt am 21.09.2026 durch Auskunft des Urhebers: Das Referenzlogo
wurde mit ChatGPT (OpenAI) erzeugt.** Daraus sind alle Größen des
Iconsets und die drei ausgelieferten Dateien abgeleitet.

Daraus folgen zwei getrennte Fragen, die nicht verwechselt werden
dürfen: Darf aVincePulse das Bild weitergeben? Und: Ist das Bild gegen
Nachahmung geschützt?

**Vorbemerkung:** keine Rechtsberatung. Die folgende Einordnung stellt
zusammen, was belegbar ist.

### 3.1 Weitergabe – unproblematisch

Die Nutzungsbedingungen von OpenAI übertragen dem Nutzer die Rechte an
der Ausgabe. Der Wortlaut: OpenAI „assigns to you all its right, title
and interest, **if any**, in and to Output". Eine kommerzielle Nutzung
ist zulässig; die einzige ausdrückliche Einschränkung betrifft
Sprachausgaben, die hier nicht einschlägig ist.

OpenAI erhebt also **keine Ansprüche** an dem Bild und untersagt weder
Weitergabe noch Veränderung noch kommerzielle Verwendung.

Für die Auslieferung unter GPL-3.0 und für die Einreichung bei Cinnamon
Spices ist das die maßgebliche Frage, und sie ist **beantwortet**: Es
gibt keine Lizenz eines Dritten, die verletzt werden könnte, und keine
Bedingung, die der Weitergabe entgegensteht.

### 3.2 Schutz gegen Nachahmung – vermutlich nicht gegeben

Die Formulierung **„if any"** ist kein Zufall. OpenAI überträgt, was es
hat – und ob daran überhaupt ein Recht entsteht, hängt vom Anteil des
Menschen ab.

**Angaben des Urhebers vom 21.09.2026:**

| Frage | Antwort |
|---|---|
| Gestalterische Vorgaben | Grundform, Farbwahl, Anordnung der Elemente und Proportionen wurden vorgegeben und nachjustiert |
| Eigene Bildbearbeitung am Ergebnis | **nein** |
| Abgeleitete Fassungen (PNG-Größen, Panel, einfarbig) | ebenfalls von ChatGPT nach Vorgaben erzeugt |

Das Logo wurde also **nicht** aus einer einzelnen Eingabe übernommen,
sondern über mehrere Schritte nach inhaltlichen Vorgaben entwickelt.
Der Beitrag des Urhebers besteht dabei ausschließlich aus Vorgaben und
Nachjustierung; die zeichnerische Ausführung lag durchgehend beim
Bildgenerator.

**Bewertung.** Genau diese Fallgestaltung gilt nach überwiegender
Auffassung als **nicht schutzbegründend**:

- Nach deutschem Recht entsteht Urheberrecht an einer „persönlichen
  geistigen Schöpfung" (§ 2 Abs. 2 UrhG). Vorgaben bestimmen, **was**
  dargestellt wird; die schutzbegründende Gestaltung liegt aber im
  **Wie** – Linienführung, Kurvenverlauf, konkrete Umsetzung. Diese
  besorgte die Maschine.
- Auch **mehrfaches Nachjustieren** ändert daran nach überwiegender
  Auffassung nichts: Der Mensch steuert mittelbar, er gestaltet nicht
  unmittelbar.
- Das US Copyright Office hält fest, dass Prompts – auch detaillierte
  und wiederholte – keine hinreichende menschliche Kontrolle über die
  Ausführung begründen. Schutzfähig sind menschlich geschaffene oder
  **bearbeitete** Bestandteile; eine eigene Bearbeitung hat hier nicht
  stattgefunden.
- Dasselbe gilt für die abgeleiteten Fassungen einschließlich des
  einfarbigen `panel-icon-symbolic.png`. Wäre es von Hand erstellt
  worden, käme ein eigener Schutz dafür in Betracht; so nicht.

**Die Grenze ist nicht abschließend geklärt**, und eine verbindliche
Aussage setzt eine anwaltliche Prüfung voraus. Die hier zusammengefasste
Linie ist aber die vorherrschende.

### 3.2a Was das praktisch bedeutet – und was nicht

**Für aVincePulse ändert sich nichts.** Weitergabe, GPL-3.0 und die
Einreichung bei Cinnamon Spices sind unberührt (Abschnitt 3.1). Der
fehlende Urheberrechtsschutz ist kein Mangel des Projekts.

**Für ein Logo ist das Urheberrecht ohnehin nicht der sachgerechte
Schutz.** Unternehmen schützen ihre Zeichen über das **Markenrecht**,
nicht über das Urheberrecht. Markenschutz entsteht durch Eintragung und
setzt **kein Urheberrecht voraus** – ein Zeichen ist auch dann als
Bildmarke eintragbar, wenn daran kein Urheberrecht besteht. Der übliche
und wirksame Weg steht also unverändert offen.

Damit stehen zwei voneinander unabhängige Möglichkeiten zur Wahl, falls
dem Urheber an Schutz gelegen ist:

1. **Bildmarke anmelden.** Unabhängig vom Urheberrecht, schützt das
   Zeichen für die angemeldeten Waren und Dienstleistungen.
   Kostenpflichtig; unternehmerische Entscheidung.
2. **Das Vektorlogo von Hand gestalten**, wie `ROADMAP_V2.md`,
   Abschnitt 15, es ohnehin vorsieht. Am eigenhändig gezeichneten
   Ergebnis entsteht ein eigenes Urheberrecht, und es beträfe genau die
   Fassung, die künftig ausgeliefert wird.

Beide Wege lassen sich verbinden.

### 3.3 Restrisiko

Bildgeneratoren können Ausgaben erzeugen, die geschützten Werken
Dritter ähneln. Bei einem schlichten geometrischen Zeichen – ein V, zwei
Bögen, ein Punkt – ist dieses Risiko gering, aber nicht null. Eine
Ähnlichkeitsprüfung gegen bestehende Bildmarken wäre Teil einer
Markenrecherche (siehe `NAME-UND-MARKE.md`) und ist bisher nicht
erfolgt.

### 3.4 Was in die Dokumentation gehört

Empfohlen wird ein kurzer, sachlicher Satz – nicht im README für
Anwender, sondern hier und in der Einreichung, falls gefragt wird: Das
Logo entstand unter Mitwirkung eines Bildgenerators nach den Vorgaben
des Urhebers; OpenAI überträgt die Rechte an der Ausgabe und erhebt
keine Ansprüche.

**Zurückhaltung** ist bei einer Angabe wie „© 2026 Angelo Vincenti,
alle Rechte vorbehalten" für die Bilddateien geboten, solange 3.2
offen ist. Sie behauptete ein Recht, dessen Bestand nicht feststeht.
Mit einem eigenständig gestalteten Vektorlogo entfiele dieser
Vorbehalt.

## 4. Vektorlogo

`ROADMAP_V2.md`, Abschnitt 15, verlangt vor der Veröffentlichung ein
eigenständiges Vektorlogo (SVG), geprüft bei 16, 20, 24, 32 und 64
Pixel. Im Repository liegt **kein SVG**; ausgeliefert werden 128×128-PNG,
die Cinnamon auf die Panelhöhe herunterrechnet.

Für die Einreichung ist SVG **nicht erforderlich** – Cinnamon Spices
nimmt PNG, und `validate-spice` prüft allein, ob `icon.png` quadratisch
ist (erfüllt).

Entscheidung des Nutzers vom 21.09.2026: In AP25 wird die Lesbarkeit
praktisch erprobt (Kriterium 20); das Messergebnis entscheidet, ob ein
eigenes Paket für ein Vektorlogo nötig ist.

## 5. Ergebnis

| Frage | Stand |
|---|---|
| Welche Bilddateien werden ausgeliefert | **geklärt**, vier Dateien, Herkunft im Iconset per Prüfsumme belegt |
| Fremde Grafiken oder Icon-Themen enthalten | **nein** |
| Nachladen von Bildern zur Laufzeit | **nein** |
| Logos Dritter verwendet | **nein** |
| Herkunft des V-Signal-Logos | **geklärt** – mit ChatGPT (OpenAI) erzeugt |
| Weitergabe unter GPL-3.0 zulässig | **ja** – OpenAI überträgt die Rechte an der Ausgabe, keine Einschränkung einschlägig |
| Urheberrechtlicher Schutz des Logos | **vermutlich nicht gegeben** – nach Vorgaben entwickelt, aber ohne eigene Bearbeitung; siehe 3.2. **Für die Einreichung ohne Belang.** |
| Schutz über eine Bildmarke | **möglich und vom Urheberrecht unabhängig** – siehe 3.2a |
| Ähnlichkeitsprüfung gegen Bildmarken | nicht erfolgt, Teil einer etwaigen Markenrecherche |
| Vektorlogo | in AP25 durch Erprobung entschieden |
