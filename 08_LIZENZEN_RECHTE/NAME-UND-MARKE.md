# Name, Marke und Nennung fremder Kennzeichen

Stand: 21.09.2026 (AP25, Kriterium 12)
Projekt: aVincePulse, GPL-3.0-only
Urheber: Angelo Vincenti – aVince Industrietechnik

**Vorbemerkung.** Dieses Dokument sammelt Tatsachen und ordnet sie für
die Einreichung bei Cinnamon Spices ein. Es ist **keine
Rechtsberatung**. Eine verbindliche Aussage zur Markenlage setzt eine
Recherche in den Registern (DPMA, EUIPO, WIPO) durch eine dafür
qualifizierte Stelle voraus. Wo eine solche Aussage nötig ist, steht das
ausdrücklich dabei.

## 1. Der eigene Name

**„aVincePulse"** setzt sich zusammen aus dem Firmennamen des Urhebers
(**aVince Industrietechnik**) und dem Sachbegriff **Pulse**.

Damit gilt:

- Der erste Bestandteil ist der **eigene Unternehmensname**. Ein Recht
  Dritter wird durch dessen Verwendung nicht neu begründet, und das
  Risiko einer Kollision ist bei einem selbst geführten Firmennamen
  geringer als bei einem frei erfundenen.
- Der zweite Bestandteil **„Pulse"** ist ein verbreiteter Sachbegriff
  und Bestandteil zahlreicher Produktnamen im IT-Umfeld. Marken mit
  diesem Bestandteil existieren; ob eine davon in der einschlägigen
  Nizza-Klasse für Software Schutz genießt und ob Verwechslungsgefahr
  zu „aVincePulse" besteht, ist **ohne Registerrecherche nicht zu
  beantworten**.

**Zu entscheiden vom Nutzer:** ob vor der Veröffentlichung eine
Markenrecherche beauftragt wird. Für ein kostenloses, quelloffenes
Projekt unter GPL-3.0 ohne eigene Markenanmeldung ist das Risiko
überschaubar; es ist aber eine unternehmerische Entscheidung, keine
technische.

## 2. Kein Zusammenstoß im Spices-Bestand

Geprüft am 21.09.2026 über die GitHub-API gegen den vollständigen
Verzeichnisbestand beider Repositories:

| | Zahl der veröffentlichten Xlets |
|---|---|
| `cinnamon-spices-applets` | 275 |
| `cinnamon-spices-desklets` | 80 |

Ergebnis:

- **`avincepulse-applet@avince`** – nicht vergeben.
- **`avincepulse-desklet@avince`** – nicht vergeben.
- **Kein vorhandenes Xlet** enthält „pulse", „vince" oder „avince" im
  Namen.

Damit ist die für die Einreichung entscheidende Frage – eine
UUID-Kollision führt zur Ablehnung des Pull Requests – beantwortet.

## 3. Sachlich verwandte Xlets

Im Applet-Bestand finden sich mindestens zwanzig Xlets zur Hardware-
und Systemüberwachung, darunter `hwmonitor@sylfurd`, `Sensors@claudiux`,
`multicore-sys-monitor@ccadeptic23`, `combined-monitor@danipin`,
`gpumonitor@axel358` und `netusagemonitor@pdcurtis`.

Das ist **kein Rechtsproblem**, aber für die Einreichung erheblich: Die
Regeln nennen als Grund für eine Ablehnung oder spätere Entfernung
ausdrücklich, dass die Funktionen „already provided … by another spice
which is more successful" seien.

**Folgerung für die Einreichung:** Die `README.md` je Komponente sollte
knapp sagen, was aVincePulse anders macht – Applet und Desklet als
aufeinander abgestimmtes Paar mit gemeinsamer Mess- und Sensorlogik,
Warnschwellen mit Farbwechsel, Internet-Speedtest mit Berichten,
durchgängige Sensorauswahl. Nicht als Abgrenzung gegen andere, sondern
damit der Prüfer den eigenen Zweck erkennt.

## 4. Nennung fremder Kennzeichen

aVincePulse nennt in Oberfläche, Berichten und Dokumentation folgende
Namen Dritter:

| Name | Inhaber | Wo genannt | Zweck |
|---|---|---|---|
| Linux Mint, Cinnamon | Linux Mint Team | README, Metadaten | Zielsystem |
| Speedtest.net | Ookla | Programmname im Auswahlfeld, Bericht | Benennung des Messdienstes |
| LibreSpeed | LibreSpeed-Projekt | Programmname im Auswahlfeld, Bericht | Benennung des Messdienstes |
| Ko-fi | Ko-fi Labs | Einstellungen, README, FUNDING.yml | Unterstützungsseite |

Alle vier werden **beschreibend** verwendet: Sie benennen, womit
gemessen wird beziehungsweise wofür aVincePulse gemacht ist. aVincePulse

- tritt nicht als Produkt eines dieser Anbieter auf,
- behauptet keine Zusammenarbeit oder Billigung,
- verwendet keine fremden Logos, Wortbildmarken oder Schriftzüge,
- leitet seinen eigenen Namen von keinem dieser Namen ab.

Das entspricht der zulässigen beschreibenden Benutzung. **Eine Stelle
ist zu schärfen:** Dass `speedtest-cli` ein **inoffizieller** Client der
Server von Speedtest.net ist, steht bisher nur in
`SPEEDTEST-PROGRAMME.md`, nicht in den READMEs. Der Bericht sagt es
bereits. Ergänzung empfohlen, siehe dort.

## 5. Ergebnis

| Frage | Stand |
|---|---|
| UUID-Kollision bei Cinnamon Spices | **geprüft, keine** |
| Namenskollision im Spices-Bestand | **geprüft, keine** |
| Fremde Kennzeichen korrekt verwendet | **ja**, eine Ergänzung empfohlen |
| Fremde Logos oder Marken verwendet | **nein** |
| Markenrechtliche Lage zu „Pulse" | **offen** – Entscheidung des Nutzers, ob eine Registerrecherche beauftragt wird |
