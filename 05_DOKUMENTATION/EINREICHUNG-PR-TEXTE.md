# Die beiden Pull Requests – Texte und Vorgehen

**Angelegt am 26.09.2026** für die Einreichung der Fassung `0.1.0`.

**Zwei getrennte Pull Requests gegen zwei verschiedene Repositories.**
Ein PR mit beiden Spices wird geschlossen.

| | Applet | Desklet |
|---|---|---|
| Repository | `linuxmint/cinnamon-spices-applets` | `linuxmint/cinnamon-spices-desklets` |
| Verzeichnis im Repo | `avincepulse-applet@avince/` | `avincepulse-desklet@avince/` |
| Quelle auf der NAS | `PRUEFDATEN/einreichung/applets/…` | `PRUEFDATEN/einreichung/desklets/…` |

**Titel und Commit-Nachricht müssen gleich lauten** und dem Muster
`spice name: beschreibung` folgen. Das gilt laut `CONTRIBUTING.md` für
**beides**, nicht nur für den PR-Titel.

**Den Autor mit `@` erwähnen entfällt.** Das ist für Änderungen an
fremden Spices gedacht; bei einer Neuaufnahme gibt es noch keinen
Autoreneintrag.

---

## Warum der Text begründen muss, was aVincePulse anders macht

Das README des Applet-Repositories sagt zu Neuaufnahmen:

> „New spices can be added by Pull Request. The Cinnamon team can
> accept or reject the addition and should give justification in the PR
> comments section."

Und zu Löschungen nennt es als Grund, „if the features are already
provided, either by Cinnamon itself, or by another spice which is more
successful".

Es gibt bereits mehrere System-Monitore für Cinnamon. Der Text sollte
deshalb nicht nur aufzählen, was aVincePulse kann, sondern auch, worin
es sich unterscheidet. Das ist kein Verkaufsargument, sondern die
Antwort auf eine Frage, die sonst der Gutachter stellen muss.

---

# PR 1 – Applet

**Repository:** `linuxmint/cinnamon-spices-applets`

**Titel und Commit-Nachricht:**

```
avincepulse-applet@avince: add new applet
```

**Beschreibung:**

> **Ab hier kopieren, bis zur nächsten Marke.** Die Zeilen darüber –
> Überschrift, Repository, Titel – gehören **nicht** ins
> Beschreibungsfeld. Der Titel gehört ins Titelfeld.
>
> Die Absätze sind hier auf 72 Zeichen umbrochen, damit die Datei
> lesbar bleibt. GitHub bricht selbst um; beim Einfügen ist das
> gleichgültig.

<!-- ↓↓↓ AB HIER KOPIEREN ↓↓↓ -->

A hardware and network monitor for the Cinnamon panel.

**What makes it different from the monitors already here:** nothing is
drawn in the panel itself. The panel keeps a single small icon, and the
readings appear in a large, readable display in the centre of the
screen when you point at it — or on click, which is the default so that
touchscreens work too. The panel stays as tidy as you left it, and the
readings are legible from across the room rather than squeezed between
two other applets.

It also ships as a matching desklet, submitted separately to
`cinnamon-spices-desklets` as `avincepulse-desklet@avince`. The two
share the same measurement and sensor logic and show the same numbers,
but neither needs the other — install one, or both.

## What it shows

Up to 15 readings, each one optional, freely orderable and renameable:
CPU and drive temperature, CPU load, memory, free disk space, fan
speed, battery charge, mains state, live network throughput, and the
results of an internet speed test.

Warning thresholds colour a value orange or red when it leaves the
range you set, with hysteresis so the colour does not flicker.

Where a machine offers several sensors, you choose: which temperature
sensor counts as CPU or drive, which network interface is measured,
which drive's free space is shown. The automatic choice is the
default and names what it picked.

## What it does not do

- No root rights, no background service, no extra packages for the
  monitoring itself.
- No network calls of its own. The only outbound link is a Ko-fi
  address in the settings, which opens on click and nowhere else.
- It never opens or closes a window without being asked, and shows no
  notifications.
- Readings the machine cannot provide are left out rather than shown
  as zero.

## Privacy

The optional internet speed test runs `librespeed-cli` or
`speedtest-cli` if either is installed, through an argument list rather
than a shell. Both print more than the measurement — `speedtest-cli`
includes the public IP address, approximate coordinates and the
provider. Only the four numbers are kept: download, upload, ping,
jitter. Nothing else is written anywhere.

## Runtime data

Reports and the last speed test result go to
`~/.local/share/avincepulse/`, created through
`GLib.get_user_data_dir()`.

This deviates from the recommendation of `get_user_state_dir()` plus
UUID, and deliberately so: the applet and the desklet share that
directory, so a speed test started in one appears in the other whether
or not the other is installed. A UUID in the path would make that
impossible. The **prohibition** — never write into the spice's own
installation directory — is kept; `metadata.path` is read only, for the
icon.

## Checks

- `validate-spice`: No errors found
- Syntax checked against cjs; no JavaScript newer than SpiderMonkey 102
- 494 assertions across nine test scripts
- Tested on two machines: a laptop with Intel graphics, and a desktop
  with an AMD processor, no battery and two identical NVMe drives
- English and German, `.pot` included — further translations welcome

`cinnamon-version` is set to 6.6, the version it has actually been
tested against, rather than a lower bound that has not been tried.

Licence: GPL-3.0-only.

<!-- ↑↑↑ BIS HIER KOPIEREN ↑↑↑ -->

---

# PR 2 – Desklet

**Repository:** `linuxmint/cinnamon-spices-desklets`

**Titel und Commit-Nachricht:**

```
avincepulse-desklet@avince: add new desklet
```

**Beschreibung:**

> **Ab hier kopieren, bis zur nächsten Marke.** Die Zeilen darüber
> gehören **nicht** ins Beschreibungsfeld.

<!-- ↓↓↓ AB HIER KOPIEREN ↓↓↓ -->

A hardware and network monitor for the Cinnamon desktop.

It sits on the desktop and shows its readings permanently, with an
adjustable font size and an optional dimmed background panel so it
stays legible over any wallpaper.

It also ships as a matching applet, submitted separately to
`cinnamon-spices-applets` as `avincepulse-applet@avince`. The two share
the same measurement and sensor logic and show the same numbers, but
neither needs the other — install one, or both. When both are running
they measure at the same moment, because the tick is aligned to the
system clock rather than to each component's own start time.

## What it shows

Up to 15 readings, each one optional, freely orderable and renameable:
CPU and drive temperature, CPU load, memory, free disk space, fan
speed, battery charge, mains state, live network throughput, and the
results of an internet speed test.

Warning thresholds colour a value orange or red when it leaves the
range you set, with hysteresis so the colour does not flicker.

Where a machine offers several sensors, you choose: which temperature
sensor counts as CPU or drive, which network interface is measured,
which drive's free space is shown. The automatic choice is the default
and names what it picked.

## What it does not do

- No root rights, no background service, no extra packages for the
  monitoring itself.
- No network calls of its own. The only outbound link is a Ko-fi
  address in the settings, which opens on click and nowhere else.
- It never opens or closes a window without being asked, and shows no
  notifications.
- Readings the machine cannot provide are left out rather than shown
  as zero.

## Privacy

The optional internet speed test runs `librespeed-cli` or
`speedtest-cli` if either is installed, through an argument list rather
than a shell. Both print more than the measurement — `speedtest-cli`
includes the public IP address, approximate coordinates and the
provider. Only the four numbers are kept: download, upload, ping,
jitter. Nothing else is written anywhere.

## Runtime data

Reports and the last speed test result go to
`~/.local/share/avincepulse/`, created through
`GLib.get_user_data_dir()`.

This deviates from the recommendation of `get_user_state_dir()` plus
UUID, and deliberately so: the desklet and the applet share that
directory, so a speed test started in one appears in the other whether
or not the other is installed. A UUID in the path would make that
impossible. The **prohibition** — never write into the spice's own
installation directory — is kept; `metadata.path` is read only, for the
icon.

## Checks

- `validate-spice`: No errors found
- Syntax checked against cjs; no JavaScript newer than SpiderMonkey 102
- 494 assertions across nine test scripts
- Tested on two machines: a laptop with Intel graphics, and a desktop
  with an AMD processor, no battery and two identical NVMe drives
- English and German, `.pot` included — further translations welcome

`cinnamon-version` is set to 6.6, the version it has actually been
tested against, rather than a lower bound that has not been tried.

Licence: GPL-3.0-only.

<!-- ↑↑↑ BIS HIER KOPIEREN ↑↑↑ -->

---

# Vorgehen je Pull Request

Beide Male gleich, nur mit dem jeweils anderen Repository und
Verzeichnis.

## 1. Repository forken

Auf GitHub `linuxmint/cinnamon-spices-applets` öffnen und oben rechts
auf **Fork** klicken. Das erzeugt eine eigene Kopie unter
`aVince-Industrietechnik/cinnamon-spices-applets`.

## 2. Fork klonen

```bash
cd ~ && git clone git@github.com:aVince-Industrietechnik/cinnamon-spices-applets.git
```

## 3. Zweig anlegen

```bash
cd ~/cinnamon-spices-applets && git checkout -b avincepulse-applet
```

## 4. Das Spice hineinkopieren

```bash
rsync -a "/mnt/LX-NAS-linux/60_SETUP_INSTALLATION/aVincePulse_Development/06_TESTVERSIONEN/0.1.0-dev_AP25-PRUEFDATEN/einreichung/applets/avincepulse-applet@avince" ~/cinnamon-spices-applets/
```

## 5. Gegenprüfen

```bash
cd ~/cinnamon-spices-applets && ./validate-spice avincepulse-applet@avince
```

Erwartet: `No errors found. Everything looks good.`

## 6. Commit mit dem vorgeschriebenen Titel

```bash
cd ~/cinnamon-spices-applets && git add "avincepulse-applet@avince" && git commit -m "avincepulse-applet@avince: add new applet"
```

## 7. Pushen

```bash
cd ~/cinnamon-spices-applets && git push -u origin avincepulse-applet
```

## 8. Pull Request eröffnen

GitHub zeigt nach dem Push einen Knopf **Compare & pull request** an.
Titel prüfen – er muss wortgleich mit der Commit-Nachricht sein –, den
Beschreibungstext von oben einfügen, absenden.

---

# Für das Desklet

Dieselben acht Schritte mit:

- Repository `linuxmint/cinnamon-spices-desklets`
- Zweig `avincepulse-desklet`
- Verzeichnis `avincepulse-desklet@avince`
- Quelle `…/einreichung/desklets/avincepulse-desklet@avince`
- Titel `avincepulse-desklet@avince: add new desklet`
- Prüfskript heißt dort ebenfalls `./validate-spice`

---

# Nach der Aufnahme

- **In beiden READMEs** steht „Noch nicht bei Cinnamon Spices
  eingereicht" bzw. „Not yet submitted". Der Satz ist dann zu
  berichtigen.
- Der Autoreneintrag entsteht mit der Aufnahme; ab dann gilt für
  eigene Änderungen der vereinfachte Prüfweg aus dem README
  („the reviewer only has to perform the following checks").

---

# Eingereicht am 26.09.2026

| | Applet | Desklet |
|---|---|---|
| Pull Request | [#9073](https://github.com/linuxmint/cinnamon-spices-applets/pull/9073) | [#1910](https://github.com/linuxmint/cinnamon-spices-desklets/pull/1910) |
| Zweig im Fork | `avincepulse-applet` | `avincepulse-desklet` |
| Commit | `29d11cf` | `eb9910b` |
| Dateien | 15 | 14 |
| Zeilen | +9.297 / −0 | +8.657 / −0 |
| Konflikte | keine | keine |

Eingereicht wurde die Fassung **0.1.0**, Tag `0.1.0`, Commit `77fb85a`.

## Was beim Einreichen auffiel

**Die Dateirechte.** Alles, was von der NAS kommt, trägt `755` – dort
liegt ein CIFS-Einhängepunkt mit festen Rechten. Im Spices-Repository
sind von 9.379 Dateien nur 395 ausführbar, und das sind Skripte.
Vor dem Commit deshalb:

```bash
find "UUID" -type f -exec chmod 644 {} \;
find "UUID" -type d -exec chmod 755 {} \;
```

Sonst wären 29 unnötig ausführbare Dateien eingereicht worden.

**`validate-spice` im echten Repository** ist der eigentliche Test,
nicht die Kopie unter `PRUEFDATEN/`. Beide Pakete: „No errors found".

## Der automatische Scanner

Beide Pull Requests bekamen sofort einen Kommentar von
`github-actions` – einen regex-gestützten „Best-practices scanner".
Er bezeichnet seine Funde selbst als „advisory" und sagt: „This check
is not perfect and will not replace a normal review."

**14 Hinweise beim Applet, 13 beim Desklet** (dem Desklet fehlt das
Panel-Symbol und damit eine `file_test`-Stelle).

### hardcoded_data_dir – sachlich falsch, mit Beleg beantwortet

Beanstandet wurde `GLib.get_home_dir() + "/.local/share/locale"` in
`bindtextdomain()`, empfohlen `get_user_data_dir()`.

**Das wäre ein Fehler.** Cinnamon installiert die Übersetzungskataloge
selbst an den festen Pfad, nicht an den XDG-Pfad – nachgeprüft in der
installierten Fassung 6.6.9:

| Cinnamon-Datei | Zeile |
|---|---|
| `cinnamon-settings/bin/ExtensionCore.py` | 80 |
| `cinnamon-settings/bin/KeybindingTable.py` | 679, 716 |
| `cinnamon-settings/bin/Spices.py` | 27 |
| `cinnamon-settings/xlet-settings.py` | 70 |

Bei gesetztem `XDG_DATA_HOME` liefen beide auseinander und die
Übersetzung wäre schlicht nicht auffindbar. Das ist Befund **P20 aus
AP25**, im Code begründet.

### Die übrigen Hinweise – erwartet

`enumerate_children` (5), `file_test` (4 bzw. 3),
`file_get_contents` (3), `query_exists` (1). Alle betreffen
`/proc`, `/sys`, `/dev/disk/by-uuid` oder eigene kleine Dateien –
keiner kann auf einem Netzlaufwerk liegen.

**Der eine Zugriff, der wirklich blockieren konnte, taucht nicht
auf:** `query_filesystem_info()` je Takt ist seit AP26 asynchron.
Genau der Punkt, den die Prüfliste „at all costs" nennt.

Beantwortet wurde beides je einmal im Pull Request, mit den
Zeilenangaben aus Cinnamons eigenem Code.

## Wie es weitergeht

Der Validate-Workflow **wartet auf die Freigabe eines Betreuers** –
bei einem ersten Beitrag Standard, GitHub führt fremde Workflows nicht
ungefragt aus.

Danach prüft ein Mensch. Im Applet-Repository lagen zum Zeitpunkt der
Einreichung **149 offene Pull Requests**, im Desklet-Repository 63.
Geduld einplanen.

## Nach der Aufnahme

1. **„Noch nicht bei Cinnamon Spices eingereicht"** in `README.md` und
   `README.de.md` berichtigen.
2. **Den Spices-Link** in `HOMEPAGE-PROMPT-avince-de.md` eintragen und
   dort den Installationsweg auf *Systemeinstellungen → Applets →
   Herunterladen* umstellen.
3. **Der Autoreneintrag** entsteht mit der Aufnahme; ab dann gilt für
   eigene Änderungen der vereinfachte Prüfweg aus dem README.
