# aVincePulse – Prüfbericht AP19 (Zwischenprüfung)

Stand: 19.09.2026 – **Phase 1 abgeschlossen**, Phase 2 wartet auf Freigabe je Befund (Abschnitt 8)
Geprüfter Stand: Commit `0641eef` (Quellcode identisch mit `0.1.0-dev_AP18-END`)
Snapshot vor Beginn: `06_TESTVERSIONEN/0.1.0-dev_AP19-START/`
Prüfdaten (lokal, nicht versioniert): `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/`

## 1. Vorgehen

| Schritt | Stand |
|---|---|
| Code-Durchsicht aller Dateien beider Komponenten durch Claude | erledigt |
| Code-Durchsicht durch unabhängigen Prüfer (Unteragent, nur lesend, ohne Projektdoku und ohne Befunde von Claude) | erledigt |
| Befunde des Prüfers nachgeprüft (Code und Cinnamon-Quellen unter `/usr/share/cinnamon`) | erledigt, siehe Spalte „Prüfer“ |
| Einstellungen des Nutzers gesichert (Vergleichsbasis) | erledigt, `einstellungen_vorher/` |
| Langzeittest über Nacht | erledigt (18.09. 22:05 – 19.09. 08:00), siehe Abschnitt 6 |
| Funktionstest jeder Einstellung und Schaltfläche | erledigt (19.09.), Abschnitt 4 |
| Robustheitsfälle | erledigt (19.09.), Abschnitt 5 |
| Wertevergleich der Einstellungen nach allen Tests | erledigt: identisch (19.09. 15:21), Abschnitt 7 |
| Korrektur veralteter Stellen in `PROJECT-STATUS.md` | erledigt (19.09.), Abschnitt 7a dieses Berichts |

Gemeinsame Module: `metrics.js`, `measurement.js`, `hardwareDetection.js` und `speedtest.js` sind in Applet und Desklet identisch (SHA-256 geprüft). Ein Befund in einem dieser Module gilt immer für beide Komponenten.

### Nachweisarten

- **durch Dateien belegt** – aus dem Quellcode bzw. den Cinnamon-Quellen eindeutig ablesbar
- **durch Test belegt** – im laufenden System beobachtet
- **abgeleitet** – folgt aus dem Code, Wirkung aber nicht beobachtet
- **muss praktisch getestet werden**

### Langzeittest – Messverfahren

Freigegeben vom Nutzer am 18.09.2026 (Weg A, rein beobachtend). Das Skript `langzeit/langzeit_beobachtung.py` zeichnet minütlich auf:

- Speicher (`VmRSS`) und CPU-Zeit von Cinnamon aus `/proc`
- Durchläufe der Messschleife: Jeder Durchlauf von Applet und Desklet liest die Datei `speedtest-values` genau einmal, das Desklet schreibt zusätzlich `/tmp/avince-hwmonitor-values`. Beides wird über inotify gezählt. Applet-Durchläufe = Lesezugriffe − Desklet-Schreibvorgänge.
- neue Zeilen von aVincePulse in `~/.xsession-errors`

Soll bei 3 Sekunden Intervall: 20 Durchläufe je Komponente und Minute.

## 2. Befundübersicht

| Nr. | Kurzbeschreibung | Komponente | Schwere | Nachweis | Prüfer |
|---|---|---|---|---|---|
| K1 | Nach jedem Speedtest läuft die Messschleife zusätzlich einmal mehr | beide | kritisch | durch Test belegt (Applet und Desklet) | gefunden von beiden, bestätigt |
| M1 | Desklet meldet seine Einstellungen beim Entfernen nicht ab | Desklet | mittel | durch Test belegt (R1) | Prüfer, bestätigt |
| M2 | Speedtest ohne Zeitgrenze und ohne Abbruch; Rückruf nach dem Entfernen | beide | mittel | durch Dateien belegt, Hänger muss praktisch getestet werden | beide, bestätigt |
| M3 | `/tmp/avince-hwmonitor-values` wird weiter bei jedem Takt geschrieben | Desklet | mittel | durch Dateien belegt | Prüfer, bestätigt (bereits als offener Punkt bekannt) |
| G9 | Warnfarben im Desklet auf hellem Hintergrund schlecht lesbar | Desklet | mittel | durch Test belegt | Nutzer (Funktionstest D10); → AP20 beschlossen |
| G10 | Beschädigte `speedtest-values`: Rückfall auf alte Ablage, ungeprüfte Werte | beide | gering | durch Test belegt | Claude (Robustheit R5) |
| G1 | Applet und Desklet können gleichzeitig einen Speedtest starten | beide | gering | durch Dateien belegt | Prüfer, bestätigt |
| G2 | Eine Ausnahme in `_update()` beendet die Messschleife dauerhaft | beide | gering | abgeleitet | Prüfer, bestätigt |
| G3 | Deckkraft der Meldungen im Applet nur teilweise übernommen | Applet | gering | durch Dateien belegt | Prüfer, bestätigt |
| G4 | Vergrößertes einfarbiges Logo schrumpft nach Änderung der Panelhöhe | Applet | gering | durch Dateien belegt, muss praktisch getestet werden | Prüfer, bestätigt |
| G5 | Ausweichlösung „aVP“ bei fehlender Icondatei greift nie | Applet | gering | durch Dateien belegt | Prüfer, bestätigt |
| G6 | Aufräumen beim Neu-Öffnen des Einstellungsfensters unvollständig | beide | gering | durch Dateien belegt | Prüfer, bestätigt |
| G7 | Tooltip „Zurücksetzen“ nennt nicht alles, was zurückgesetzt wird | beide | Hinweis | durch Dateien belegt | Prüfer, bestätigt, herabgestuft |
| G8 | Alte Applet-Instanz reagiert nach dem Neuladen noch auf die Maus | Applet | gering | durch Test belegt (Protokoll) | Claude |
| H1 | Intervall und Schriftgröße im Desklet ohne Bereichsprüfung | Desklet | Hinweis | durch Test belegt (R3) | Prüfer, bestätigt, erweitert |
| H2 | Kommentar und Doku zu `setValue` sachlich falsch | beide, Doku | Hinweis | durch Dateien belegt | Prüfer, bestätigt |
| H3 | Einstellungsdatei wird bei jedem Start mehrfach geschrieben | beide | Hinweis | durch Dateien belegt | Prüfer, bestätigt |
| H4 | Gewähltes Laufwerk: Einhängeliste zweimal je Takt gelesen | beide | Hinweis | durch Dateien belegt | beide, bestätigt |
| H5 | Abgezogenes gewähltes Laufwerk: FREE zeigt still die Systempartition | beide | Hinweis | durch Dateien belegt | Prüfer, bestätigt (so in AP16 festgelegt) |
| H6 | Jedes Überfahren schreibt Protokollzeilen „popup scaled“ | Applet | Hinweis | durch Test belegt (Protokoll) | beide, bestätigt |
| H7 | Annahme JSON-Array bei librespeed-cli | beide | Hinweis | muss praktisch getestet werden | Prüfer, derzeit widerlegt |
| H8 | KB/MB/GB mit Faktor 1024 | beide | Hinweis | durch Dateien belegt | Prüfer, bestätigt |
| H9 | Fenstererkennung über den unübersetzten Titel | beide | Hinweis | durch Dateien belegt | Prüfer, bestätigt (bereits bekannt) |
| H10 | Tote Stellen und verwaiste Kommentare | beide | Hinweis | durch Dateien belegt | beide, bestätigt |
| H11 | Anzeigegröße nicht maßstabsgetreu (90 % ergibt 79 %) | Applet | Hinweis | durch Test belegt | Claude (Funktionstest) |
| H12 | Hover-Anzeige nach Größenänderung kurz an alter Position | Applet | Hinweis | durch Test belegt | Claude (Funktionstest) |
| H13 | Mausrad verstellt beim Scrollen Werte im Einstellungsfenster | beide (Cinnamon) | Hinweis | durch Test belegt | Nutzer (Funktionstest) |
| H14 | Linksklick auf Panel-Symbol startet sofort Speedtest (versehentlich ausgelöst) | Applet | Hinweis | durch Test belegt | Nutzer (Robustheit) |
| H15 | „Jetzt neu öffnen“: Fenster dahinter scheint kurz durch die Meldung | beide | Hinweis | durch Test belegt | Nutzer, Ursache Claude (R4) |

## 3. Befunde im Einzelnen

### K1 – Nach jedem Speedtest läuft die Messschleife zusätzlich einmal mehr

- **Ort:** `Applet/applet.js:1519`, `Desklet/desklet.js:1362` (Speedtest-Rückruf); Zeitgeber in `applet.js:1627`, `desklet.js:673`
- **Beschreibung:** Nach erfolgreichem Speedtest wird `_update()` aufgerufen, ohne den laufenden Zeitgeber `_timeout` zu entfernen. `_update()` setzt einen neuen Zeitgeber, der alte läuft weiter. Ab dann laufen zwei Ketten, nach n Speedtests n+1. `_baueZeilenNeu()`, `_onRefreshIntervalChanged()` und das Entfernen der Komponente entfernen jeweils nur den zuletzt gemerkten Zeitgeber; die übrigen Ketten laufen weiter.
- **Folgen:** Beide Ketten laufen auf derselben Taktmarke. Der zweite Durchlauf misst CPU-Last und Netzwerk über wenige Millisekunden: LOAD springt auf `--` oder einen Zufallswert, DOWN/UP auf 0 oder Unsinn. Doppelte Last für Cinnamon. Nach dem Entfernen des Desklets laufen die verwaisten Ketten weiter (durch Test belegt, R1); im Applet brechen sie beim ersten Takt mit einem TypeError ab (durch Test belegt, R2).
- **Schwere:** kritisch
- **Nachweis:** durch Test belegt für das Applet. Speedtest am 18.09.2026 um 22:04:32 über das Panel-Symbol; danach je Taktmarke ein Lesezugriff des Desklets und **zwei** des Applets innerhalb von ~20 ms (inotify-Protokoll 22:07:21–22:07:51), Langzeitaufzeichnung: Applet 40 statt 20 Durchläufe je Minute, Desklet 20. Für das Desklet durch Dateien belegt (identischer Code). Sichtbare Folge, gemessen am 19.09.2026 09:53–09:54 (sechs Stichproben über `org.Cinnamon.Eval`, lesend): LOAD im Applet 33, 0, 100, 13, 22, 0 % gegenüber 25–38 % im Desklet; DOWN und UP im Applet durchgehend 0 B/s, im Desklet 7–56 KB/s. **Die Anzeige des Applets ist damit nach einem Speedtest für LOAD, DOWN und UP unbrauchbar.** Im Desklet laufen die zusätzlichen Schleifen nach dem Entfernen weiter, bis Cinnamon neu gestartet wird, und schreiben je Takt etwa 19 Fehlerzeilen je Schleife ins Sitzungsprotokoll (R1: etwa 20 MB/h); siehe Abschnitt 5.
- **Vorschlag:** Vor `_update()` im Speedtest-Rückruf den Zeitgeber entfernen, wie in `_baueZeilenNeu()`. Besser eine gemeinsame Methode (z. B. `_starteMessungNeu()`), die überall verwendet wird. Klein, Phase 2.

### M1 – Desklet meldet seine Einstellungen beim Entfernen nicht ab

- **Ort:** `Desklet/desklet.js:1376–1396` (`on_desklet_removed`); Applet richtig in `applet.js:1648–1651`
- **Beschreibung:** Das Desklet ruft `this.settings.finalize()` nicht auf. Cinnamon leitet Änderungen aus dem Einstellungsfenster über `Main.settingsManager.uuids[uuid][id]` weiter (`cinnamonDBus.js:381–388`); ohne `finalize()` bleibt die entfernte Instanz dort eingetragen. Der Schutz `if (!this._container)` greift nicht, da `_container` nicht auf null gesetzt wird.
- **Folgen:** Wird das Desklet bei offenem Einstellungsfenster entfernt und danach eine Einstellung geändert, baut die entfernte Instanz ihre Zeilen neu auf und startet eine Messschleife ohne Besitzer. Eine Schaltfläche im Fenster führt zu einem TypeError. Wird das Desklet wieder hinzugefügt, überschreibt die neue Instanz den Eintrag; die Wirkung ist dann auf den Zeitraum dazwischen begrenzt.
- **Schwere:** mittel
- **Nachweis:** durch Dateien belegt (`settings.js:913`, `cinnamonDBus.js:381–388`, `deskletManager.js:261–272`) und **durch Test belegt** (R1, 19.09.2026 14:19:48: Wertänderung erreichte das entfernte Desklet, Fehler „item.name.clutter_text is null“; beim Applet dagegen von Cinnamon abgewiesen, R2)
- **Vorschlag:** In `on_desklet_removed` `settings.finalize()` aufrufen und `_container` auf null setzen; `_update()` bricht ohne `_container` ab. Klein, Phase 2.

### M2 – Speedtest ohne Zeitgrenze und ohne Abbruch

- **Ort:** `speedtest.js:357–455`; Rückrufe `applet.js:1507–1526`, `desklet.js:1350–1369`
- **Beschreibung:**
  - a) Der Prozess läuft nach dem Entfernen der Komponente weiter. Sein Rückruf greift auf `this._statusAnzeige` zu (dann null) und wirft einen TypeError. Dieser wird im `catch` von `speedtest.js:436` gefangen, der erneut `rueckmeldung()` aufruft und damit ein zweites Mal wirft.
  - b) Wirft der Erfolgszweig des Rückrufs (etwa `_update()`), meldet der `catch` „Der Speedtest ist fehlgeschlagen.“, obwohl die Werte gespeichert sind.
  - c) Hängt `librespeed-cli`, bleibt `_laeuft` dauerhaft true, die Meldung „Internet-Speedtest läuft …“ bleibt ohne Ausblenden stehen und jeder weitere Klick wird stillschweigend ignoriert.
- **Schwere:** mittel
- **Nachweis:** a und b durch Dateien belegt; c muss praktisch getestet werden
- **Vorschlag:** Zeitgrenze (z. B. 120 s) mit `force_exit()`, `Gio.Cancellable` beim Entfernen abbrechen, Rückruf nur ausführen, wenn die Komponente noch besteht; `rueckmeldung()` außerhalb des `try`. Mittelgroß, als eigenes kleines Paket oder in Phase 2 nach Absprache.

### M3 – `/tmp/avince-hwmonitor-values` wird bei jedem Takt geschrieben

- **Ort:** `desklet.js:643–667`
- **Beschreibung:** Die Datei wird nur noch vom alten Applet `avince-hwpopup@angelo` gelesen. Es ist installiert, aber nicht aktiv (`enabled-applets`, geprüft 18.09.2026). Der feste Name in `/tmp` gilt für alle Benutzer; bei einem zweiten Benutzer mit Desklet scheitert das Schreiben und erzeugt bei jedem Takt einen Protokolleintrag (abgeleitet).
- **Schwere:** mittel (unnötiger Schreibvorgang alle 3 s, Mehrbenutzerfall)
- **Nachweis:** durch Dateien belegt; bereits als offener Punkt in `PROJECT-STATUS.md` geführt
- **Vorschlag:** Block entfernen, sofern der Nutzer das alte Applet nicht mehr braucht. **Hinweis:** Der Langzeittest verwendet die Datei als Zähler; erst nach AP19 entfernen.

### G9 – Warnfarben im Desklet auf hellem Hintergrund schlecht lesbar

- **Ort:** `Desklet/stylesheet.css` (`text-shadow: 0px 0px 6px rgba(0,0,0,0.9)`), Farben `WARNFARBEN` in `metrics.js:288–291`
- **Beschreibung:** Das Desklet hat keine Hintergrundfläche. Der in AP18 ergänzte weiche Schatten reicht für weiße Schrift knapp, für Orange (`#FFA726`) und Rot (`#FF5252`) auf hellem Hintergrund nicht. Die Roadmap (Abschnitt 24) verlangt: „Farben müssen auf hellem und dunklem Hintergrund lesbar bleiben.“ Offener Punkt aus AP18 damit geklärt.
- **Schwere:** mittel (Anforderung der Roadmap nicht erfüllt; betrifft nur das Desklet, die Hover-Anzeige des Applets hat eine abgedunkelte Fläche)
- **Nachweis:** durch Test belegt (Nutzer, 19.09.2026, helles Hintergrundbild: „weiße Schrift relativ gut, Warnfarben nicht so gut lesbar, man sieht den Schatten kaum“)
- **Vorschlag:** a) wahlweise abgedunkelte Hintergrundfläche wie beim Applet, mit Deckkraft-Einstellung (steht ohnehin als offener Punkt „Desklet besitzt noch keine Einstellungen für Deckkraft“ in `PROJECT-STATUS.md`); b) kräftigerer Schatten; c) dunklere Warnfarben.
- **Entscheidung des Nutzers (19.09.2026):** Nicht in Phase 2, sondern als eigenes Arbeitspaket **AP20 – Lesbarkeit**, eingeschoben **vor der Übersetzung** (neue Einstellungstexte). Inhalt:
  - Einstellung „Hintergrundfläche“ (Deckkraft 0–85 %) in **Desklet und Applet**.
  - Ab 45 %: Fläche, normaler Schatten, normale Warnfarben. **Unter 45 % automatisch** kräftigerer Schatten und angepasste Warnfarben; kein eigener Schalter.
  - Für das Applet hebt das die Festlegung aus AP09 auf („Werte unter 45 % nicht anbieten“); bewusst neu entschieden, in `PROJECT-STATUS.md` zu vermerken.
  - Schatten und Farben werden im AP zuerst auf hellem und dunklem Hintergrundbild praktisch erprobt, der Nutzer wählt nach Augenschein. Hintergrund: Ein kräftiger dunkler Schatten verträgt sich eher mit hellen Warnfarben; ob Cinnamon mehrere Schatten je Text darstellt, muss praktisch getestet werden.
  - Ziel und Akzeptanzkriterien werden nach Abschluss von AP19 schriftlich festgelegt.

### G10 – Beschädigte `speedtest-values`: Rückfall auf alte Ablage, ungeprüfte Werte

- **Ort:** `speedtest.js:119–131` (`leseWerte`), `133–169` (`_leseDatei`), `305–312` (`alterDesErgebnisses`); Anzeige `applet.js:1602–1615`, `desklet.js:628–641`
- **Beschreibung:** Ist die Datei leer, unvollständig oder unlesbar, liest `leseWerte()` bei **jedem** Takt die alte Ablage aus der Baseline und schreibt deren Werte in die neue Datei. Gedacht war eine einmalige Übernahme. Die alte Datei existiert auf dem Referenzgerät noch (Werte ohne Zeitstempel). Zahlenwerte werden nicht geprüft. Fehlt ein gültiger Zeitstempel, wird LAST nicht aktualisiert und zeigt das vorherige Alter weiter.
- **Folgen:** Veraltete Messwerte erscheinen als aktuell; die neue Datei wird ungefragt überschrieben. Unsinnige Werte werden unverändert angezeigt.
- **Schwere:** gering (nur bei beschädigter Datei)
- **Nachweis:** durch Test belegt (R5)
- **Vorschlag:** Alte Ablage nur übernehmen, wenn die neue Datei **fehlt**, danach nicht mehr lesen (oder nach Übernahme umbenennen, nur mit Freigabe); Werte als Zahl prüfen, sonst `--`; LAST ohne gültigen Zeitstempel auf `--`.

### G1 – Gleichzeitiger Speedtest aus Applet und Desklet

- **Ort:** `speedtest.js:39, 358`; `applet.js:202`, `desklet.js:79`
- **Beschreibung:** Die Sperre `_laeuft` gilt je `SpeedtestRunner`, jede Komponente hat einen eigenen. Zwei Tests teilen sich die Bandbreite und liefern etwa halbe Werte; der spätere überschreibt `speedtest-values`.
- **Schwere:** gering · **Nachweis:** durch Dateien belegt
- **Vorschlag:** Sperrdatei im Datenverzeichnis (mit Zeitstempel, damit eine verwaiste Sperre verfällt).

### G2 – Eine Ausnahme in `_update()` beendet die Messschleife

- **Ort:** `applet.js:1545–1634`, `desklet.js:564–681`
- **Beschreibung:** Der nächste Zeitgeber wird erst am Ende von `_update()` gesetzt. Die Leseroutinen fangen ihre Fehler ab, die Anzeigeaufrufe nicht. Eine Ausnahme dort lässt die Anzeige stehen, bis die Komponente neu geladen wird.
- **Schwere:** gering · **Nachweis:** abgeleitet
- **Vorschlag:** Zeitgeber in `try … finally` setzen. Klein, zusammen mit K1.

### G3 – Deckkraft der Meldungen im Applet nur teilweise

- **Ort:** `applet.js:1504, 1523` (mit Deckkraft) gegenüber `1509, 654, 839, 1014, 936` (ohne)
- **Beschreibung:** Nur „läuft …“ und die Fehlermeldung des Speedtests verwenden die eingestellte Deckkraft, alle anderen Meldungen fest 0,55.
- **Schwere:** gering · **Nachweis:** durch Dateien belegt
- **Vorschlag:** Entweder überall übergeben oder festlegen, dass Meldungen immer 0,55 verwenden (Entscheidung des Nutzers).

### G4 – Einfarbiges Logo schrumpft nach Änderung der Panelhöhe

- **Ort:** `applet.js:349–371`; Cinnamon `applet.js` (`IconApplet.on_panel_height_changed_internal` → `_setStyle()`)
- **Beschreibung:** Bei einer Änderung der Panelhöhe setzt Cinnamon die Symbolgröße über `_setStyle()` zurück und ruft danach `on_panel_height_changed()` auf. aVincePulse gleicht die Größe nur in `on_panel_icon_size_changed()` an, das nur bei geänderter Zonengröße folgt.
- **Schwere:** gering · **Nachweis:** durch Dateien belegt; muss praktisch getestet werden (Panelhöhe ändern bei Variante „Logo einfarbig“)
- **Vorschlag:** `on_panel_height_changed() { this._angleicheIconGroesse(); }` ergänzen.

### G5 – Ausweichlösung „aVP“ bei fehlender Icondatei greift nie

- **Ort:** `applet.js:318–336`
- **Beschreibung:** `set_applet_icon_path()` fängt Fehler selbst ab (Cinnamon `applet.js`, `global.log(e)`), und `Gio.FileIcon` prüft die Datei nicht. Fehlt die PNG, bleibt das Applet unsichtbar statt „aVP“ zu zeigen.
- **Schwere:** gering · **Nachweis:** durch Dateien belegt
- **Vorschlag:** Vorher `GLib.file_test(pfad, GLib.FileTest.EXISTS)` prüfen.

### G6 – Aufräumen beim Neu-Öffnen des Einstellungsfensters

- **Ort:** `applet.js:699–708`, `desklet.js:1030–1039`
- **Beschreibung:** Der 2-Sekunden-Zeitgeber überschreibt `_fensterZeitgeber`, ohne eine noch laufende Positionierung zu entfernen. Der `unmanaged`-Handler wird beim Entfernen der Komponente nicht getrennt; wird das alte Fenster erst danach geschlossen, öffnet sich das Einstellungsfenster der entfernten Instanz.
- **Schwere:** gering (seltener Ablauf, kurze Wirkung) · **Nachweis:** durch Dateien belegt
- **Vorschlag:** Vorhandenen Zeitgeber vor dem Neusetzen entfernen, Signal-ID merken und beim Entfernen trennen.

### G7 – Tooltip „Zurücksetzen“ unvollständig

- **Ort:** Schemata, Schaltfläche `btn-standardwerte`
- **Beschreibung:** Der Tooltip nennt nicht alle zurückgesetzten Einstellungen. Da Cinnamon Tooltips an Schaltflächen nicht anzeigt (AP17), sieht der Nutzer ihn ohnehin nicht. Wirksam ist allein der Hinweis im Einstellungsfenster; dieser ist in Phase 1 zu prüfen.
- **Schwere:** Hinweis (vom Prüfer als gering eingestuft, herabgestuft) · **Nachweis:** durch Dateien belegt
- **Vorschlag:** Zusammen mit dem Aufräumen der Tooltips erledigen.

### G8 – Alte Applet-Instanz reagiert nach dem Neuladen noch auf die Maus

- **Ort:** `applet.js:227–233` (Signale), `1460–1462` (`_hidePopup`), `1637–1667` (Entfernen)
- **Beschreibung:** Die Signale `enter-event`/`leave-event` am Panel-Symbol werden beim Entfernen nicht getrennt, `_popup` ist dann null.
- **Nachweis:** durch Test belegt: `~/.xsession-errors`, 18.09.2026 21:28:52, eine Sekunde nach „Reloading applet“: `TypeError: this._popup is null` in `_hidePopup` (applet.js:1463), ausgelöst aus applet.js:234.
- **Schwere:** gering (nur Protokolleintrag)
- **Vorschlag:** Signal-IDs merken und in `on_applet_removed_from_panel` trennen; zusätzlich `_showPopup`/`_hidePopup` gegen `null` absichern.

### Hinweise

- **H1** – `desklet.js:669`: `Math.max(1, Number(x) || 3)` ohne Obergrenze und ohne Rundung; Applet begrenzt auf 1–30 und rundet (`applet.js:1620`). Ebenso Schriftgröße `desklet.js:447` ohne Obergrenze: In R3 ergab `font-size: 100` ein Desklet von 1370×1733 px. Wirkt nur bei beschädigter Einstellungsdatei, das Einstellungsfenster lässt nur 10–30 bzw. 1–30 zu. Nachweis: durch Test belegt. Vorschlag: `_gueltig()` wie im Applet auch im Desklet.
- **H2** – Kommentare `applet.js:998–1004`, `desklet.js:703–707` und `PROJECT-STATUS.md` (AP09, „Zurücksetzen“) sagen, `setValue()` aktualisiere die gebundenen Eigenschaften nicht. Tatsächlich lesen gebundene Eigenschaften direkt aus den Einstellungsdaten (Cinnamon `settings.js`, `_getValue`/`_setValue`); nicht ausgelöst werden nur die Rückrufe. Die zusätzlichen Zuweisungen schreiben die Datei bei Listen ein zweites Mal. Harmlos; Doku korrigieren.
- **H3** – `setOptions()` vergleicht Objekte mit `!=` (Cinnamon `settings.js`) und schreibt die Einstellungsdatei deshalb bei jedem Start und jeder Erkennung fünfmal. Kein Handlungsbedarf, Hinweis für Tests (bereits in AP18 beobachtet).
- **H4** – `measurement.js:311–339, 661–671`: Ist ein Laufwerk gewählt, wird je Takt zweimal `/proc/self/mounts` gelesen und `/dev/disk/by-uuid` durchlaufen. `query_filesystem_info` läuft im Hauptthread; ein hängender USB-Datenträger könnte die Oberfläche kurz blockieren (muss praktisch getestet werden). `fuseblk` (NTFS) wird angeboten, das ist gewollt. Vorschlag: Laufwerk einmal je Takt ermitteln.
- **H5** – Ein gewähltes, abgezogenes Laufwerk fällt ohne Kennzeichnung in der Anzeige auf „/“ zurück. So in AP16 festgelegt; nur zur Kenntnis.
- **H6** – `applet.js:1334`: Jedes Überfahren schreibt eine bis fünf Zeilen „AP09: popup scaled“ ins Protokoll (am 18.09.2026 zwischen 21:28 und 22:04 über 40 Zeilen). Vorschlag: nur bei geänderter Größe protokollieren.
- **H7** – `speedtest.js:401` erwartet ein JSON-Array. Das installierte `librespeed-cli` liefert eines: Der Speedtest vom 18.09.2026 22:04:32 war erfolgreich. Als Befund derzeit widerlegt; Absicherung `Array.isArray(x) ? x[0] : x` wäre robust.
- **H8** – `formatRate`/`formatSize` rechnen mit 1024 und schreiben KB/MB/GB. Üblich und mit `df -h` vergleichbar; nur zur Kenntnis.
- **H9** – Fenstererkennung über `metadata.name` (`applet.js:552`, `desklet.js:883`); mit der Übersetzung anzupassen. Bereits in `PROJECT-STATUS.md` vermerkt.
- **H11** – `applet.js:1280–1291`: Die Anzeigegröße ist nicht maßstabsgetreu. Gemessen (19.09.2026, Bildschirmhöhe 1024 px, 15 Zeilen): Einstellung 50 % → 49 %, 70 % → 65 %, 90 % → 79 % der Bildschirmhöhe. Die Schätzung der Zeilenhöhe (1,35 × Schrift + 0,18 × Schrift) liegt über der tatsächlichen. Nachweis: durch Test belegt. Vorschlag: nur bei Bedarf nachjustieren, Wirkung gering.
- **H12** – `applet.js:1445–1458`: Nach einer Größenänderung stand die Anzeige beim nächsten Überfahren kurz an der alten Position (10:00:53.9 bei 461,109 statt 526,178; 0,6 s später mittig). Die Position wird erst im nächsten Leerlauf gesetzt. Dem Nutzer nicht aufgefallen. Nachweis: durch Test belegt. Vorschlag: vor `show()` einmal mit der geschätzten Größe mittig setzen oder die Anzeige bis zur Positionierung unsichtbar lassen (wie bei `StatusAnzeige`).
- **H13** – Einstellungsfenster: Beim Scrollen mit dem Mausrad verstellt sich ein Wert, sobald der Zeiger über einem Zahlenfeld, Schieberegler oder Auswahlfeld liegt. Dem Nutzer am 19.09.2026 im Funktionstest passiert. Verhalten von Cinnamon/GTK (`xlet-settings`), nicht von aVincePulse; durch die Länge des Fensters (Messwertliste, Sensoren, Quellen, Warnschwellen, Schaltflächen) aber naheliegend. Nachweis: durch Test belegt (Nutzerbeobachtung). Vorschlag: keine Codeänderung; bei der Übersetzung prüfen, ob sich das Fenster über Seiten (`layout` mit Registerkarten, von Cinnamon unterstützt) kürzen lässt.
- **H14** – `applet.js:1486–1488`: Ein einfacher Linksklick auf das Panel-Symbol startet sofort einen Speedtest. Dem Nutzer am 19.09.2026 um 14:28:29 versehentlich passiert (beim Verschieben des Applets im Panel). Beim Desklet wurde aus genau diesem Grund in AP11 auf den Klick verzichtet. Nachweis: durch Test belegt. Vorschlag (Entscheidung des Nutzers): a) Start nur über Eintrag im Rechtsklick-Menü wie beim Desklet, b) kurze Rückfrage vor dem Start, c) Mittelklick statt Linksklick.
- **H15** – `desklet.js`/`applet.js`, `_nachRueckfrage()` mit `_oeffneEinstellungenNeu()`: Bei „Jetzt neu öffnen“ erscheint die Meldung sofort, das Einstellungsfenster ist aber für gut eine halbe Sekunde geschlossen (R4, 15:12:05.557–06.114). Durch die halbtransparente Meldung (55 %) scheint in dieser Zeit das Fenster dahinter durch; der Nutzer sah „für kurze Zeit einen anderen Text im Popup“ (dreimal beobachtet, nur bei „Jetzt neu öffnen“). Kein Programmfehler. Nachweis: durch Test belegt (Schnellabfrage). Vorschlag: Meldung erst nach dem Wiedererscheinen des Fensters zeigen oder auf diesem Weg deckender.
- **H10** – Tote Stellen: `SpeedtestRunner.istVerfuegbar()` (`speedtest.js:66`), `HardwareDetector.getMapping()` (`hardwareDetection.js:275`), Felder `type`, `dynamicUnit`, `id` in `METRICS`; verwaiste Kommentarblöcke `applet.js:373–377, 1146–1161`, `desklet.js:329–336, 699–707`, `speedtest.js:339–348`; veralteter Kommentar `desklet.js:643`. `.bak`-Dateien in `02_QUELLCODE/Applet` (4) und `02_QUELLCODE/Desklet` (4). Vorschlag: aufräumen, `.bak`-Dateien nur nach Freigabe löschen (liegen ohnehin im Snapshot und in Git).

Geprüft von beiden Seiten und unauffällig: Einstellungsschlüssel und Rückrufe gegen die Schemata, Imports, Neuaufbau der Zeilen ohne Doppelschleife, Aufräumen des Applets beim Entfernen (außer G8), `StatusAnzeige`, Rückfrage-Dialog, Bereinigung beschädigter Listen (`ordneMesswerte`, `ordneWarnschwellen`), `bewerteStufe` mit Puffer, CPU- und Netzwerkmessung bei Zählersprüngen, Schutz des Schnittstellennamens, Auswertung von `/proc/net/route`, Taktberechnung, Maskierung eigener Bezeichnungen.

## 4. Funktionstest

Verfahren: Der Nutzer bedient, Claude zeichnet parallel über `org.Cinnamon.Eval` (nur lesend, freigegeben am 19.09.2026) zweimal je Sekunde den Zustand auf; zusätzlich werden die Durchläufe der Messschleife über inotify gezählt. Protokolle: `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/funktionstest/`.

### 4.1 Applet (19.09.2026, 09:55–10:19)

| Nr. | Test | Erwartung | Ergebnis |
|---|---|---|---|
| A1 | Hover-Anzeige, 4× | erscheint mittig, verschwindet beim Verlassen | bestanden – 485×667 bei 526,179, pixelgenau mittig |
| A2 | „Konfigurieren …“ 3×, davon einmal minimiert | nur ein Fenster, wird nach vorne geholt bzw. wiederhergestellt | bestanden |
| A3 | Intervall 3 → 5 → 3 s | Takt folgt sofort | bestanden – Takte bei :35, :40, :45 …, danach wieder 3 s; **je Takt weiterhin zwei Durchläufe (K1)** |
| A4 | Anzeigegröße 50 / 90 / 70 % | Anzeige ändert sich | bestanden – Höhe 504 / 808 / 667 px (49 / 79 / 65 % von 1024 px); siehe H11, H12 |
| A5 | Deckkraft 85 / 45 / 55 % | Hintergrund entsprechend | bestanden – rgba 0.85 / 0.45 / 0.55 |
| A6 | Panel-Symbol, alle 4 Varianten | richtige Größe, nie Symbol und Text zugleich | bestanden – 24 px / 16 px / „aVP“ / 24 px; Nutzer bestätigt |
| A7 | Messwertliste: RAM aus, eigene Bezeichnung, JITTER nach oben | Anzeige folgt sofort | bestanden – 14 Zeilen, `PROZESSOR`, JITTER vor PING |
| A8 | CPU-Sensor von Hand, dann Automatisch | Sensor wechselt sofort | bestanden – `coretemp/Core 0`, zurück `Package id 0` |
| A9 | Netzwerk `virbr0`, Laufwerk `/boot/efi`, jeweils zurück | Quelle wechselt sofort | bestanden – FREE ⛁ 505 MB auf `/boot/efi` |
| A10 | Warnschwelle CPU 50/55, Schalter aus/an | orange, rot, weiß | bestanden – 54 °C Warnung, 56 °C kritisch, 49 °C bleibt Warnung (Puffer 2) |
| A11 | Berichtsordner Hardware / Speedtest | Dateimanager im richtigen Ordner | bestanden |
| A11 | Hardware neu erkennen, Fenster offen, keine Änderung | Meldung, keine Rückfrage, Bericht | bestanden – Meldung 909×309 mittig, 6,7 s sichtbar, kein Dialog, Bericht 101 |
| A11 | Speedtest aus den Einstellungen | „läuft …“, Ergebnis, Bericht | bestanden – 34 s, Ergebnis 5,1 s sichtbar, Bericht abgelegt |
| A12 | Klick auf Panel-Symbol, zweiter Klick während des Tests | ein Test, zweiter Klick ohne Wirkung | bestanden – genau zwei Berichte für beide Speedtests |
| A13 | Zurücksetzen | alle Werte auf Vorgabe, Meldung | bestanden – Meldung 2,5 s; zweimal betätigt (10:17:51, 10:18:11), da der Nutzer beim Scrollen versehentlich einen Wert verstellt hatte (siehe H13); Wertevergleich mit der Sicherung danach: identisch |

Alle Meldungen standen mittig und vollständig (Nutzer bestätigt: vollständig lesbar, lang genug sichtbar).

**Zusätzlich durch Test belegt zu K1:** Durchläufe je Taktmarke im Applet 2 → nach dem Speedtest 10:13:53 **3** → nach dem Speedtest 10:17:17 **4**. Weder Intervalländerung (A3) noch Zurücksetzen (A13) räumen die zusätzlichen Schleifen ab. Die falschen LOAD-Werte lösen außerdem **Fehlalarme der Warnfarben** aus (LOAD 100 % „kritisch“, 86–93 % „Warnung“ bei tatsächlich 25–40 %).

### 4.2 Desklet (19.09.2026, 12:15–12:31)

| Nr. | Test | Erwartung | Ergebnis |
|---|---|---|---|
| D1 | „Konfigurieren …“ über Kontextmenü 3×, davon einmal minimiert | nur ein Fenster | bestanden |
| D2 | Schriftgröße 10 / 30 / 14 | Anzeige und Spalten skalieren, nichts abgeschnitten, Symbole auf Höhe | bestanden – Desklet 142×198 / 415×532 / 197×273, Namensspalte 50 / 149 / 69 px; Nutzer bestätigt |
| D3 | Schriftstärke Normal / Mittel / Fett / Halbfett | Stil folgt | bestanden – 400 / 500 / 700 / 600 |
| D4 | Intervall 3 → 5 → 3 s | Takt folgt sofort | bestanden – Takte bei :20, :25 … :40, ab 12:18:42 wieder 3 s; je Takt ein Durchlauf |
| D5 | Messwertliste: RAM aus, `Prozessor`, JITTER nach oben | Anzeige folgt, Spalte passt sich an | bestanden – 14 Zeilen, Namensspalte 69 → 87 px |
| D6 | CPU-Sensor von Hand, dann Automatisch | Wahl wird übernommen | bestanden – gewählt wurde `coretemp / Package id 0` (derselbe Sensor wie automatisch), Protokoll „manuell gewählt“, danach „automatisch“; Sensorwechsel selbst in A8 gezeigt |
| D7 | Netzwerk `virbr0`, Laufwerk `/boot/efi`, jeweils zurück | Quelle wechselt sofort | bestanden |
| D8 | Warnschwelle CPU 50/55, Schalter aus/an | orange, rot, weiß | bestanden |
| D9 | Berichtsordner Hardware / Speedtest | richtiger Ordner | bestanden |
| D9 | Hardware neu erkennen | Meldung, keine Rückfrage, Bericht | bestanden – Meldung mittig, Bericht 102 |
| D9 | Speedtest aus den Einstellungen | „läuft …“, Ergebnis, Bericht | bestanden – 34 s |
| D9 | Speedtest über Kontextmenü | wie oben | bestanden – 34 s; Berichte 16 → 18 |
| D9 | Zurücksetzen | Vorgaben, Meldung | bestanden – Wertevergleich mit der Sicherung: identisch |
| D10 | Lesbarkeit auf hellem Hintergrundbild (offen aus AP18) | Schrift und Warnfarben lesbar | **nicht bestanden für die Warnfarben** – Nutzer: weiße Schrift „relativ gut“, Warnfarben „nicht so gut lesbar, man sieht den Schatten kaum“; siehe G9 |

Einzelner Messaussetzer 12:30:28 („Desklet nicht gefunden“) während des Hintergrundwechsels, ohne Neustart und ohne Protokolleintrag von aVincePulse – vermutlich wurde das Desklet dabei angefasst; kein Befund.

**Zusätzlich durch Test belegt zu K1 (Desklet):** Durchläufe je Taktmarke 1 → nach dem Speedtest 12:26:15 **2** → nach dem Speedtest 12:27:09 **3**. Danach auch im Desklet Fehlalarme der Warnfarben (LOAD „kritisch“/„Warnung“).

## 5. Robustheit

Durchgeführt am 19.09.2026, 14:16–15:21. Vorher Sicherung beider Einstellungsdateien und von `speedtest-values` in `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/einstellungen_block3/`; Protokolle in `…/robustheit/`. Beobachtung über `org.Cinnamon.Eval` (lesend), inotify-Taktzählung, Sitzungsprotokoll und für kurzlebige Anzeigen eine Schnellabfrage der obersten Bildschirmebene und der Fenster (etwa alle 3–4 ms).

| Nr. | Fall | Ergebnis |
|---|---|---|
| R1 | Desklet entfernen (mit 3 Schleifen aus K1), Einstellungsfenster offen, danach Werte ändern und „Hardware neu erkennen“ | **Fehler.** Beim Entfernen wurde nur eine Schleife gestoppt, **zwei liefen weiter** bis zum Cinnamon-Neustart – auch nach erneutem Hinzufügen – und erzeugten je Takt 38 Zeilen „already disposed“ im Sitzungsprotokoll (`~/.xsession-errors` wuchs in 6 min von 0,4 auf 2,6 MB, etwa 20 MB/h). Wertänderung im Fenster erreichte das entfernte Desklet (`_applyStyle` auf zerstörte Anzeige, Fehler „clutter_text is null“); die verwaisten Schleifen übernahmen sogar das geänderte Intervall. „Hardware neu erkennen“: Cinnamon findet das Objekt nicht („activateCallback: obj is null“), keine Wirkung. Auf dem Bildschirm war nichts zu sehen (Nutzer). Belegt K1 und M1 durch Test. |
| R2 | Applet entfernen (mit 4 Schleifen), Fenster offen, Deckkraft ändern, wieder hinzufügen | Die drei zusätzlichen Schleifen brachen beim ersten Takt mit je einem TypeError ab (`applet.js:1619`), danach lief keine Applet-Schleife mehr. Die Wertänderung wies Cinnamon ab („updateSetting: … is null“), da das Applet seine Einstellungen abmeldet. Nach dem Hinzufügen genau eine Schleife. **Bestanden** (mit Protokolleinträgen aus K1). |
| R3 | Beschädigte Einstellungsdatei (beide): Messwertliste doppelt/unbekannt/Text/`null`/RAM fehlt; Warnschwellen `abc`/vertauscht/doppelt/Akku fehlt; Sensor, Schnittstelle (`../../etc` bzw. `gibtsnicht0`), Laufwerk nicht vorhanden; Intervall 99 bzw. 0; Deckkraft 10; Schrift 100 | **Bestanden** bis auf H1: 15 Zeilen ohne Doppelte, RAM und Akku ergänzt, Schwellen 80/90 (Vorgabe statt `abc`), 70/80 (korrigiert), erster doppelter Eintrag gilt; Sensor, Schnittstelle, Laufwerk fallen auf automatisch zurück, Auswahlfelder zeigen „Nicht gefunden …“/„Nicht eingehängt …“; `../../etc` wird abgewiesen; Applet begrenzt Intervall auf 30 s und Deckkraft auf 45 %. **Desklet begrenzt Schriftgröße nicht:** 100 px ergab ein Desklet von 1370×1733 px (größer als der Bildschirm). Nach Rückspielen der Sicherung und Neustart: identisch. |
| R4 | USB-Stick: einstecken, „Hardware neu erkennen“ mit offenem Fenster, Rückfrage, Stick wählen, auswerfen, wieder einstecken | **Bestanden.** Rückfrage erscheint; „Jetzt neu öffnen“ öffnet das Fenster an derselben Stelle (367,117); FREE ⛁ 112,7 GB → nach Auswerfen 1,6 TB (`/`) → nach Einstecken ohne Zutun wieder 112,7 GB. „Nicht jetzt“ ebenfalls geprüft: Meldung erst nach vollständigem Ausblenden der Rückfrage. Nutzerbeobachtung „kurz anderer Text“ bei „Jetzt neu öffnen“ geklärt, siehe H15. |
| R5 | `speedtest-values` leer / unvollständig / Text statt Zahlen / Binärmüll | Kein Absturz, kein Protokolleintrag. **Aber:** bei leer, unvollständig und Binärmüll greift aVincePulse jedes Mal auf die alte Ablage `~/.config/cinnamon/spices/avince-hwmonitor@angelo/speedtest-values` zurück und überschreibt die neue Datei mit deren alten Werten (58,22 / 12,37 / 16,91 / 2,29, ohne Zeitstempel); Text wird ungeprüft angezeigt (`abc`, `<b>fett</b>`, `1e999`); LAST bleibt auf dem vorherigen Alter stehen. Siehe G10. Datei danach wiederhergestellt: identisch. |
| R6 | `librespeed-cli` fehlt (vom Nutzer per `sudo mv` umbenannt und zurückbenannt) | **Bestanden.** Desklet (Kontextmenü) und Applet (Klick): Meldung „Für den Internet-Speedtest wird das Programm librespeed-cli benötigt. Es wurde auf diesem Rechner nicht gefunden.“, 909×106 mittig, im Desklet 8 s sichtbar; kein Bericht, keine zusätzliche Schleife, kein Protokolleintrag. Programm danach wieder vorhanden (`which`). |

Nach allen Fällen: Einstellungen beider Komponenten und `speedtest-values` identisch mit der Sicherung; je Takt genau ein Durchlauf in Applet und Desklet.

## 6. Langzeittest

Zeitraum 18.09.2026 22:05 bis 19.09.2026 08:00, 596 Minuten, Cinnamon ohne Neustart (PID 1714). Aufzeichnung: `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/langzeit/langzeit.csv`.

| Messgröße | Ergebnis |
|---|---|
| Desklet-Durchläufe | in allen 595 vollen Minuten genau 20 (Soll) |
| Applet-Durchläufe | in allen 595 vollen Minuten genau 40 (doppelt seit Speedtest 22:04:32, K1); keine weitere Vervielfachung |
| Speicher Cinnamon (VmRSS) | Start 274,4 MB, Bereich 274,1–275,7 MB, Ende 275,7 MB – kein erkennbares Wachstum (+1,3 MB in 10 h, im Rauschen) |
| CPU Cinnamon | 22–24 Uhr ca. 7 %, 02:35–08:00 konstant 3,0 % eines Kerns |
| CPU-Plateau | 19.09. 00:00–02:34 konstant 42–44 %, Beginn und Ende sprunghaft; siehe unten |
| Fehlerzeilen von aVincePulse | 0 (5 Protokollzeilen „popup scaled“ bei Hover um 23:59 und 01:08) |

**CPU-Plateau 00:00–02:34:** Ursache nicht ermittelt. Die Zahl der Messschleifen-Durchläufe war in dieser Zeit unverändert, der Speicher ebenfalls; ein Zusammenhang mit aVincePulse ist dadurch nicht belegt, aber auch nicht ausgeschlossen. Laut Systemjournal war der Nutzer um 23:58 (Aktualisierungsverwaltung, `mint-refresh-cache`), 23:59 (Hover über dem Applet) und 01:05 (Entsperren) am Gerät; um 02:34 findet sich kein Ereignis. Nachweis: durch Test belegt (Messung), Ursache muss praktisch getestet werden.

**Ergebnis:** Kein Speicherleck erkennbar, Messschleifen stabil; die in K1 belegte Verdopplung bleibt dauerhaft bestehen, vervielfacht sich aber ohne weiteren Speedtest nicht.

## 7. Einstellungen des Nutzers

Vorher gesichert: `06_TESTVERSIONEN/0.1.0-dev_AP19-PRUEFDATEN/einstellungen_vorher/` (18.09.2026) und zusätzlich vor Block 3 `…/einstellungen_block3/` (19.09.2026 14:16). Verglichen werden die gespeicherten Werte (`value`) mit `…/wertevergleich.py`, nicht die Prüfsumme der Datei (siehe Arbeitsregeln).

Ergebnis nach allen Tests (19.09.2026, 15:21): Applet 12 Werte, Desklet 11 Werte – **identisch** mit der Sicherung vom 18.09.2026. `speedtest-values` identisch mit der Sicherung vom 19.09.2026 14:16. **Abweichung vom Ausgangszustand:** Nach dieser Sicherung lief um 14:29:03 noch ein (versehentlich ausgelöster) Applet-Speedtest; durch das Rückspielen der Sicherung in R5 zeigt `speedtest-values` wieder das ältere Ergebnis von 12:27 (43,13 MBit/s) statt 14:29 (45,63 MBit/s). Der Bericht vom 14:29 ist erhalten. Fehler im Testablauf (Sicherung hätte unmittelbar vor R5 erfolgen müssen); Lehre: Dateien immer direkt vor dem Eingriff sichern.

## 7a. Korrigierte Stellen in `PROJECT-STATUS.md`

Am 19.09.2026 korrigiert (Akzeptanzkriterium 7):

| Stelle | Vorher | Jetzt |
|---|---|---|
| Kopf | Stand 18.09.2026 (AP18) | Stand 19.09.2026 (AP19, Phase 1 abgeschlossen) |
| 5 Git-Stand | nur die ersten drei Commits als „bisherige relevante Commits“ | als Anfangscommits gekennzeichnet, Verweis auf `git log` und Tags |
| AP07 | „Hardware neu erkennen … noch nicht umgesetzt“ | Hinweis „seit AP12 vorhanden“ |
| AP08 | „drei gemeinsame Module“, Prüfschleife ohne `speedtest.js`; „130 Zeiten“ | vier Module, Prüfschleife mit `speedtest.js`; „130 Zeilen“ |
| AP09 | `setValue()` aktualisiere gebundene Eigenschaften nicht | berichtigt (H2): nur die Rückrufe werden nicht ausgelöst |
| 7 | „drei gemeinsame Module“ | vier |
| 7a | Applet nutze `⚡` als Panel-Symbol | C-1-Logo seit AP08, vier Varianten seit AP09 |
| 8 | „Feste Spaltenbreiten 70/58/50 px … noch offen“ | Spaltenbreiten berechnet seit AP10, in AP19 geprüft |
| 9 Arbeitsregeln | – | ergänzt: Sichern direkt vor dem Eingriff, Zählen der Messschleife per inotify, Aufzeichnung kurzlebiger Anzeigen, `Eval` über Python statt `gdbus`, PID bleibt beim Neustart gleich, `pkill -f`-Falle |
| 10 | letztes Backup AP17 | letztes Backup AP18 (`2026-09-18_21-31-48`) |
| 12 | nur Desklet-Testinstallation | Applet und Desklet, Einstellungsdateien, Vergleichsbefehl, Altstände |
| 14 | AP19 „noch nicht begonnen“; offene Punkte mit veralteten Angaben | Stand Phase 1, Entscheidung AP20, Fortsetzungsschritte für Phase 2 |
| 16 | Ausgangspunkt nach AP18 | Ausgangspunkt während AP19 |

Ebenso fortgeschrieben: `01_PROJEKT_ROADMAP/ROADMAP_V2.md`, Abschnitt 24 (Reihenfolge mit AP20, Ergebnis AP19, neuer Unterabschnitt „Lesbarkeit (AP20)“).

## 8. Vorschlag für Phase 2

Jeder Befund wird nur nach Freigabe des Nutzers behoben. Vorschlag von Claude, gegliedert nach Aufwand:

### A – kleine Korrekturen, in AP19 beheben (empfohlen)

| Befund | Änderung | Dateien |
|---|---|---|
| K1 + G2 | Neustart der Messung über eine gemeinsame Methode, die immer zuerst den Zeitgeber entfernt; nächsten Takt in `try … finally` setzen | `applet.js`, `desklet.js` |
| M1 | `settings.finalize()` beim Entfernen des Desklets; `_container` auf null, `_update()` bricht dann ab | `desklet.js` |
| G8 | Signale `enter-event`/`leave-event` merken und beim Entfernen trennen; `_showPopup`/`_hidePopup` gegen null absichern | `applet.js` |
| H1 | Bereichsprüfung wie im Applet (`_gueltig`) für Intervall und Schriftgröße | `desklet.js` |
| G6 | Fensterzeitgeber vor dem Neusetzen entfernen, `unmanaged`-Signal beim Entfernen trennen | `applet.js`, `desklet.js` |
| G5 | Icondatei vor dem Setzen prüfen, sonst Textkürzel | `applet.js` |
| H6 | Protokollzeile „popup scaled“ nur bei geänderter Größe | `applet.js` |

### B – klein, aber Entscheidung des Nutzers nötig

| Befund | Frage |
|---|---|
| H14 | Speedtest im Applet: a) nur über Rechtsklick-Menü, b) Rückfrage, c) Mittelklick, d) so lassen |
| G10 | Alte Ablage nur übernehmen, wenn die neue Datei fehlt; Werte prüfen; LAST ohne Zeitstempel `--`. Zusätzlich die alte Datei `~/.config/cinnamon/spices/avince-hwmonitor@angelo/speedtest-values` umbenennen? (nur mit Freigabe) |
| M3 | Schreiben von `/tmp/avince-hwmonitor-values` entfernen (altes Applet ist nicht aktiv)? Die Zählmethode des Langzeittests wäre dann anzupassen. |
| H15 | Meldung nach „Jetzt neu öffnen“ erst zeigen, wenn das Fenster wieder steht? |
| G1 | Sperre gegen gleichzeitigen Speedtest aus Applet und Desklet (Sperrdatei)? |
| M2 | Zeitgrenze und Abbruch für den Speedtest (etwa 120 s), Rückruf nach dem Entfernen verhindern. Mittelgroß; in AP19 oder als eigenes kleines Paket? |
| G3 | Deckkraft für alle Meldungen des Applets übernehmen – sinnvoll zusammen mit AP20 |

### C – nicht in AP19 (später, anderes Paket oder nur zur Kenntnis)

| Befund | Einordnung |
|---|---|
| G9 | AP20 – Lesbarkeit (beschlossen) |
| G4 | erst praktisch prüfen (Panelhöhe ändern bei „Logo einfarbig“), dann ggf. kleine Korrektur |
| G7, Tooltips | Aufräumen der nie angezeigten Tooltips, gemeinsam mit der Übersetzung |
| H2, H10 | Kommentare, tote Stellen, verwaiste Kommentarblöcke aufräumen; `.bak`-Dateien in `02_QUELLCODE` nur nach ausdrücklicher Freigabe löschen (liegen in Git-Historie und Snapshots) |
| H9 | Titelvergleich bei der Übersetzung anpassen |
| H3, H4, H5, H7, H8, H11, H12, H13 | zur Kenntnis; H11/H12 bei Gelegenheit, H13 bei der Übersetzung (Registerkarten) |
| CPU-Plateau Nacht | nach Behebung von K1 bei einer weiteren Nachtmessung beobachten |

### Freigabe des Nutzers (19.09.2026)

Vorschlag von Claude vollständig freigegeben („so machen“):

- **Gruppe A** vollständig: K1 + G2, M1, G8, H1, G6, G5, H6.
- **Speedtest-Paket** (gemeinsames Modul `speedtest.js` und beide Komponenten): G10 (alte Ablage nur übernehmen, wenn die neue Datei fehlt; Werte prüfen; LAST ohne Zeitstempel `--`; die alte Datei bleibt unangetastet), G1 (Sperrdatei mit Verfallszeit), M2 (Zeitgrenze und Abbruch), H14 (Speedtest im Applet nur noch über das Rechtsklick-Menü und die Schaltfläche in den Einstellungen, nicht mehr per Linksklick).
- **H15**: Meldung nach „Jetzt neu öffnen“ erst zeigen, wenn das neue Fenster steht.
- **M3**: Schreiben von `/tmp/avince-hwmonitor-values` entfernen – als letzter Codeschritt, nach dem Nachweis, dass K1 behoben ist; Zählverfahren danach anpassen.
- **G3**: nach AP20 verschoben.
- **G4**: im Test praktisch prüfen, nur bei Fehler beheben.
- **Gruppe C** sonst wie vorgeschlagen.

Reihenfolge: Commit Phase 1 → Gruppe A → Speedtest-Paket → H15 → M3 → Nachtest über Nacht → Sicherungsroutine mit `0.1.0-dev.19`.

## 9. Akzeptanzkriterien – Stand

| Nr. | Kriterium | Stand |
|---|---|---|
| 1 | Prüfbericht, Befunde im Format | erfüllt |
| 2 | Alle Dateien von Claude und Prüfer durchgesehen, Prüferbefunde gekennzeichnet | erfüllt |
| 3 | Jede Einstellung und Schaltfläche getestet | erfüllt (Abschnitt 4) |
| 4 | Robustheitsfälle getestet | erfüllt (Abschnitt 5) |
| 5 | Langzeittest ausgewertet | erfüllt (Abschnitt 6); vervielfachte Messschleife gefunden (K1) |
| 6 | Einstellungen nachweislich unverändert | erfüllt (Abschnitt 7); Abweichung `speedtest-values` dokumentiert, vom Nutzer so belassen |
| 7 | Veraltete Stellen korrigiert | erfüllt (Abschnitt 7a) |
| 8 | Phase 2 | offen |
| 9 | Gemeinsame Module am Ende identisch | derzeit erfüllt (unverändert); am Ende von Phase 2 erneut zu prüfen |
