# Changelog

All notable changes to aVincePulse are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project uses [Semantic Versioning](https://semver.org/lang/en/).

German readers: this file is kept in English, like `README.md`, because
it is shown to everyone who installs aVincePulse. The German
documentation lives in `README.de.md`.

## [Unreleased]

First public release. Development history before this point is
recorded in the repository's commits and tags, not here.

### Added

- **Two components that work on their own and together.** An applet for
  the Cinnamon panel with a large hover display, and a desklet for the
  desktop. Both share the same measurement and sensor logic; either can
  be installed without the other.
- **15 readings**, each one optional and freely orderable, with your own
  labels: processor temperature and load, memory usage, drive
  temperature and free space, fan speed, battery charge, mains state,
  live network download and upload, and five internet speed test
  values.
- **Automatic hardware and sensor detection**, with manual override for
  every sensor, the network interface and the drive. Readings the
  machine cannot provide are left out instead of showing zero.
- **Warning thresholds** with two levels and a colour change, in two
  colour sets — one for dark backgrounds, one for light ones.
- **Internet speed test** using `librespeed-cli` or `speedtest-cli`,
  whichever is installed, started only from the menu or the settings
  window. Results are kept and written as readable reports. If no
  program is installed, the speed test disappears and everything else
  carries on.
- **Hardware reports** listing the detected sensors and the chosen
  sources.
- **Readability settings**: font size and weight, a fixed text shadow,
  and an optional dimmed background panel.
- **English and German**, following the system language, with a `.pot`
  file for further translations.

### Notes

- Tested on Linux Mint with Cinnamon 6.6 under X11, on one machine.
- No root rights, no background services, no extra packages for the
  monitoring itself.
- Nothing is written outside `~/.config/cinnamon/spices/` and
  `~/.local/share/avincepulse/`.

<!--
Hinweis zur Pflege (nicht fuer Anwender bestimmt, deshalb im Kommentar):

Beim naechsten Update wird aus "[Unreleased]" eine Versionszeile mit
Datum, zum Beispiel:

    ## [1.0.1] - 2026-11-03
    ### Fixed
    - Fan speed stayed empty on some laptops

Darueber entsteht ein neues "[Unreleased]". Ueberschriften nach Keep a
Changelog: Added, Changed, Deprecated, Removed, Fixed, Security.
Drei bis fuenf Zeilen je Fassung genuegen; wer es genauer braucht,
liest die Commits.
-->
