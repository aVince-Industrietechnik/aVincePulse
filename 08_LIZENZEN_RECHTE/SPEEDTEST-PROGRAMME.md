# Lizenz- und Rechteprüfung der Speedtest-Programme

Erstellt im Rahmen von AP22 (Kriterium 11), Stand 20.09.2026.
Geprüft auf dem Referenzgerät Latitude-5285, Linux Mint / Ubuntu noble.

Diese Prüfung betrifft ausschließlich die beiden externen Programme,
mit denen aVincePulse den Internet-Speedtest ausführen kann. Die
Lizenz des eigenen Quellcodes (vorgesehen GPL-3.0) ist Gegenstand
einer eigenen Prüfung.

---

## 1. Grundsätzliche Einordnung

**aVincePulse verteilt keines der beiden Programme.**

Beide werden zur Laufzeit als eigenständiger Prozess aufgerufen
(`Gio.Subprocess`), sofern sie auf dem Rechner bereits vorhanden
sind. Es findet kein Einbinden von Programmbibliotheken statt, kein
Mitliefern von Binärdateien und kein Nachladen zur Laufzeit.

Daraus folgt: Die Frage der Lizenzvereinbarkeit im Sinne einer
Verknüpfung (Linking) stellt sich nicht. Der Aufruf eines
Systemprogramms über eine Befehlszeile begründet nach allgemeinem
Verständnis kein abgeleitetes Werk. aVincePulse kann deshalb unter
GPL-3.0 stehen, unabhängig von der Lizenz des gerufenen Programms.

Diese Einordnung deckt sich mit der Regel von Cinnamon Spices, die
vorkompilierte Programme im eingereichten Paket untersagt.

---

## 2. librespeed-cli

| | |
|---|---|
| Lizenz | GNU Lesser General Public License v3.0 |
| Urheber | LibreSpeed © 2016–2020 Federico Dossena; librespeed-cli © 2020 Maddie Zhan |
| Quelle | https://github.com/librespeed/speedtest-cli |
| Geprüfte Fassung | v1.0.14, gebaut 2026-08-17 |
| Beleg | Ausgabe von `librespeed-cli --version` auf dem Referenzgerät |

**Vereinbarkeit:** LGPL-3.0 ist mit GPL-3.0 vereinbar. Da ohnehin
nur ein Prozessaufruf erfolgt, ist das hier nicht einmal
entscheidungserheblich.

**Verteilbarkeit:** Nicht als Paket in den Quellen von Debian,
Ubuntu oder Linux Mint enthalten (geprüft am 20.09.2026 mit
`apt-cache policy`). Vorhanden sind lediglich Pakete für Arch (AUR),
Homebrew und Windows-Paketverwaltungen. Auf dem Referenzgerät wurde
es von Hand nach `/usr/local/bin` gelegt.

**Folge für die Veröffentlichung:** aVincePulse darf librespeed-cli
verwenden, wenn es vorhanden ist, aber Nutzer nicht zu seiner
Installation anleiten. Genau so ist es umgesetzt.

**Messserver:** Die öffentlichen Server von LibreSpeed. Eigene
Nutzungsbedingungen oder ausdrückliche Fair-Use-Regeln waren in der
Projektdokumentation nicht auffindbar (geprüft am 20.09.2026). Der
Speedtest wird ausschließlich durch eine Handlung des Benutzers
ausgelöst; eine zeitgesteuerte Wiederholung ist derzeit nicht
umgesetzt. Sollte sie später hinzukommen (Roadmap Abschnitt 24),
ist die Belastung fremder Server erneut zu bewerten.

---

## 3. speedtest-cli

| | |
|---|---|
| Lizenz | Apache License 2.0; ein Teil (`print_()`) unter Expat/MIT |
| Urheber | © 2013–2018 Matt Martz; Debian-Paketierung © 2014–2018 Jonathan Carter |
| Quelle | https://github.com/sivel/speedtest-cli |
| Paket | `speedtest-cli` 2.1.3-2, Ubuntu noble, Bereich `universe` |
| Beleg | `/usr/share/doc/speedtest-cli/copyright`, Lizenzkopf in `/usr/lib/python3/dist-packages/speedtest.py` |

**Wichtige Klarstellung:** Dieses Programm stammt **nicht von
Ookla**. Die Roadmap sprach in Abschnitt 24 von „speedtest-cli
(Ookla)"; das war unzutreffend und wurde am 20.09.2026 berichtigt.
Ooklas offizieller Befehlszeilenclient heißt `speedtest` und wird
ausschließlich über ein eigenes Paket-Repository von Ookla
verteilt. Er kommt für aVincePulse deshalb nicht in Betracht:
Cinnamon Spices untersagt es, Nutzer auf solche Fremdquellen zu
verweisen.

**Vereinbarkeit:** Apache-2.0 ist mit GPL-3.0 vereinbar (Apache-2.0
gilt als GPLv3-kompatibel, nicht jedoch mit GPLv2). Auch hier nur
ein Prozessaufruf, daher nicht entscheidungserheblich.

**Verteilbarkeit:** Als Paket in den Standardquellen vorhanden. Es
ist damit das einzige Speedtest-Werkzeug, das ein Nutzer ohne
Fremdquelle bekommt — und zugleich das einzige überhaupt in den
Quellen (geprüft am 20.09.2026 mit `apt-cache search speedtest`
und gezielter Abfrage von `librespeed`, `librespeed-cli`,
`speedtest`, `fast-cli`, `python3-speedtest-cli`).

### 3.1 Offener Punkt: Nutzungsbedingungen von Ookla

speedtest-cli misst gegen die Server von Speedtest.net, die Ookla
gehören, ohne ein offizieller Client zu sein.

**Der Wortlaut der Nutzungsbedingungen konnte am 20.09.2026 nicht
geprüft werden:** Sowohl `speedtest.net/about/terms` als auch
`ookla.com/terms-of-use` waren aus der Entwicklungsumgebung heraus
nicht abrufbar.

Sachlage, soweit belegbar:

- Das Paket ist seit Jahren fester Bestandteil der Quellen von
  Debian und Ubuntu. Eine Beanstandung durch Ookla ist nicht
  bekannt geworden.
- Ookla hat inzwischen einen eigenen offiziellen Client
  veröffentlicht und verweist darauf.
- aVincePulse ruft lediglich ein Programm auf, das der Nutzer
  selbst aus den Quellen seiner Distribution installiert hat. Die
  Beziehung zu Ookla besteht zwischen dem Nutzer und Ookla, nicht
  zwischen aVincePulse und Ookla.

**Bewertung:** Das Risiko liegt beim Betreiber des Programms, nicht
beim Aufrufer. aVincePulse liefert nichts mit und installiert
nichts. Eine abschließende Prüfung des Wortlauts steht aus und
sollte vor der Einreichung bei Cinnamon Spices nachgeholt werden,
wenn die Seiten erreichbar sind.

### 3.2 Offener Punkt: Das Projekt wird nicht mehr gepflegt

Das Repository `sivel/speedtest-cli` wurde **am 30.04.2026 vom
Eigentümer archiviert** und ist schreibgeschützt. Es sind keine
weiteren Fassungen zu erwarten.

Folgen:

- Ändert Ookla seine Schnittstelle, hört speedtest-cli auf zu
  arbeiten, und niemand wird es richten.
- Das Paket bleibt bis auf Weiteres in den Quellen von Ubuntu und
  wird von der Distribution gepflegt, aber ohne Upstream.
- Für aVincePulse ist das verkraftbar: Fällt das Programm aus,
  greift genau das Verhalten, das AP22 geschaffen hat — Hinweis
  statt Fehler, alle übrigen Messwerte laufen weiter.

### 3.3 Genauigkeit

Sowohl die Paketbeschreibung als auch das Projekt selbst warnen:
Der Zugriff erfolgt über HTTP statt über WebSockets, wodurch die
Messung bei schnellen Anschlüssen zunehmend ungenau wird. Das
Projekt schreibt ausdrücklich, ein verlässliches Melden der Latenz
sei kein Ziel der Anwendung.

Der Vergleich auf dem Referenzgerät am 20.09.2026 zeigt das
deutlich — beide Läufe innerhalb weniger Minuten:

| Programm | Download | Upload | Ping | Jitter |
|---|---|---|---|---|
| librespeed-cli | 57,94 MBit/s | 12,37 MBit/s | 13,36 ms | 0,87 ms |
| speedtest-cli | 33,35 MBit/s | 11,25 MBit/s | 56,38 ms | – |

Daraus folgt der in AP22 festgelegte Vorrang: Ist librespeed-cli
vorhanden, wird es verwendet. speedtest-cli ist die Rückfallebene,
die eine Veröffentlichung ohne Fremdquelle erst möglich macht.

---

## 4. Datenschutz

Geprüft an den echten Programmausgaben vom 20.09.2026
(`06_TESTVERSIONEN/0.1.0-dev_AP22-PRUEFDATEN/rohausgaben/`).

- **speedtest-cli** liefert im Feld `client` die öffentliche
  IP-Adresse, ungefähre Koordinaten (`lat`, `lon`), den Anbieter
  und das Land, im Feld `server` dessen Standort und Kennung.
- **librespeed-cli** führt dieselben Felder, füllt sie ohne
  Telemetrie aber nicht.

aVincePulse übernimmt aus beiden Ausgaben **ausschließlich**
Download, Upload, Ping und Jitter. Weder die Wertedatei noch die
dauerhaft abgelegten Berichte enthalten Angaben zum Anschluss oder
zum Messserver. Nachgewiesen durch
`test_echte_ausgaben.js` (14 Prüfungen, alle bestanden).

Der Aufruf von speedtest-cli erfolgt mit `--secure`, da das
Programm sonst unverschlüsselt über HTTP misst.

---

## 5. Ergebnis

| Frage | Ergebnis |
|---|---|
| Dürfen beide Programme verwendet werden? | Ja. Aufruf vorhandener Systemprogramme, keine Verteilung, keine Lizenzkopplung. |
| Vereinbar mit GPL-3.0 für aVincePulse? | Ja, LGPL-3.0 und Apache-2.0 sind beide GPLv3-vereinbar; hier ohnehin nicht einschlägig. |
| Vereinbar mit den Regeln von Cinnamon Spices? | Ja, sofern keine Installationsanleitung für Fremdquellen erscheint. In AP22 umgesetzt und geprüft. |
| Offene Punkte | Wortlaut der Ookla-Nutzungsbedingungen (Seiten nicht erreichbar); speedtest-cli ohne Upstream-Pflege seit 30.04.2026. Beides vor der Einreichung erneut zu bewerten. |
