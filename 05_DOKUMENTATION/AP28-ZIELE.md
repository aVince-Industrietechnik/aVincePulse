# AP28 – Einreichungsfassung 0.1.0

**Festgelegt und freigegeben am 26.09.2026.**

Anlass: die Frage des Nutzers, ob Texte und Übersetzungen fertig sind.
Die Übersetzungen waren es – die Texte nicht ganz.

## Ziel

Den Stand so benennen, wie er nach außen gehen soll. Kein Code.

## Was geprüft wurde

**Übersetzungen: vollständig, nichts zu tun.** Mit
`cinnamon-xlet-makepot` wurde in einer Kopie eine frische `.pot`
erzeugt und gegen das Projekt verglichen:

| | Applet | Desklet |
|---|---|---|
| Texte im Code | 180 | 171 |
| in der `.pot` | 180 | 171 |
| übersetzt in `de.po` | **180** | **171** |
| unübersetzt / fuzzy | 0 / 0 | 0 / 0 |
| neu im Code, fehlt in der `.pot` | 0 | 0 |
| in der `.pot`, nicht mehr im Code | 0 | 0 |

AP26 und AP27 haben daran nichts geändert; die drei in AP26
umbrochenen Meldungen ergeben zeichengleich dieselben `msgid`.

## Was geändert wurde

### 1. Version `0.1.0-dev.27` → `0.1.0`

Cinnamon zeigt diese Nummer in den Systemeinstellungen. „dev.27" hätte
dort gestanden: *Entwicklungsfassung, 27. Zwischenstand* – eine
Aussage, die für ein veröffentlichtes Spice nicht taugt.

`0.1.0` nach Semantic Versioning: erste Fassung, noch nicht stabil.
Damit endet die Konvention `0.1.0-dev.xx`; Abschnitt 9 des
Statusdokuments ist entsprechend nachgezogen.

### 2. Die Versionsnummer ist aus beiden READMEs verschwunden

Sie stand dort **zweimal veraltet**: in AP25 als `.23`, obwohl `.25`
galt, und jetzt als `.25`, obwohl `.27` galt. Die Stelle wird von der
Abschlussroutine nicht mitgezogen und veraltet deshalb bei jedem
Paket erneut.

Statt einer Nummer steht dort jetzt ein Verweis auf die
Releases-Seite. Der Hinweis heißt außerdem nicht mehr
„Entwicklungsfassung", sondern „Erste Fassung".

### 3. „Cinnamon 6.x" → „Cinnamon 6.6 oder neuer"

Vier Stellen: beide Haupt-READMEs und beide Paket-READMEs. Seit AP27
tragen die Metadaten `"cinnamon-version": ["6.6"]`. Ein Nutzer mit
Mint 22.1 hätte „6.x" gelesen und trotzdem nicht installieren können.

### 4. Changelog

`## [Unreleased]` wird zu `## [0.1.0] - 2026-09-26`. Der Prüfumfang
nennt jetzt zwei Rechner statt einem – seit AP25 stimmt das nicht mehr –
und die Cinnamon-Anforderung.

### 5. Release-Tag `0.1.0`

Bisher heißen alle Tags `0.1.0-dev_APxx-END` und bezeichnen
Arbeitsstände. Was eingereicht wird, bekommt ein eigenes Tag ohne
`-dev`, damit später nachvollziehbar bleibt, welcher Stand bei Spices
liegt. Die AP-Tags bleiben unberührt.

## Akzeptanzkriterien

1. Beide `metadata.json` tragen `"version": "0.1.0"`, JSON gültig,
   `cinnamon-version` unverändert.
2. In beiden READMEs steht **keine** Versionsnummer mehr.
3. Keine Stelle sagt mehr „Cinnamon 6.x".
4. Changelog trägt `[0.1.0] - 2026-09-26` und nennt zwei Rechner.
5. Übersetzungen unverändert vollständig (180/180, 171/171).
6. Einreichungspakete neu gebaut, `validate-spice` „No errors found".
7. Abschnitt 9 des Statusdokuments nennt die neue Zählung.
8. Tag `0.1.0` gesetzt, dazu die übliche Abschlussroutine.

## Nicht geändert

**„Noch nicht bei Cinnamon Spices eingereicht"** bleibt in beiden
READMEs stehen. Der Satz stimmt bis zur Einreichung und ist erst nach
der Aufnahme zu ändern.

## Was das nicht ist

Kein Code wurde angefasst. Die 494 Prüfungen aus AP27 gelten
unverändert; ein Cinnamon-Neustart ist nicht nötig.
