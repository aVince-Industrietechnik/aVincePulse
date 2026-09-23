#!/usr/bin/env bash
#
# aVincePulse - Umgebungspruefung fuer ein Zweitgeraet
#
# Prueft, ob auf diesem Rechner alles vorhanden ist, um aVincePulse zu
# installieren, zu testen und weiterzuentwickeln. Aendert nichts.
#
# Aufruf:  bash zweitgeraet-pruefen.sh
#
set -u
fehlend=()
warnung=()

titel() { printf '\n\033[1m%s\033[0m\n%s\n' "$1" "$(printf '%.0s-' $(seq ${#1}))"; }
ok()    { printf '  \033[32m OK \033[0m %s\n' "$1"; }
fehlt() { printf '  \033[31mFEHLT\033[0m %s\n' "$1"; fehlend+=("$2"); }
hinw()  { printf '  \033[33mHINW\033[0m %s\n' "$1"; warnung+=("$1"); }

titel "System"
if [ -r /etc/os-release ]; then
    . /etc/os-release
    ok "$PRETTY_NAME"
else
    hinw "/etc/os-release nicht lesbar"
fi
if command -v cinnamon >/dev/null; then
    ok "Cinnamon $(cinnamon --version 2>/dev/null | head -1 | awk '{print $2}')"
else
    fehlt "Cinnamon nicht gefunden" "cinnamon"
fi
sitzung="${XDG_SESSION_TYPE:-unbekannt}"
if [ "$sitzung" = "x11" ]; then
    ok "Sitzungstyp X11"
else
    hinw "Sitzungstyp $sitzung - aVincePulse ist nur unter X11 geprueft; unter Wayland ist Alt+F2 r nicht moeglich"
fi

titel "Werkzeuge fuer Entwicklung und Pruefung"
for paar in "cjs:cinnamon-common" "git:git" "rsync:rsync" \
            "msgfmt:gettext" "xgettext:gettext" \
            "cinnamon-xlet-makepot:cinnamon-common" "python3:python3"; do
    w=${paar%%:*}; p=${paar#*:}
    if command -v "$w" >/dev/null; then ok "$w"; else fehlt "$w" "$p"; fi
done
if command -v gh >/dev/null; then
    ok "gh (GitHub-CLI)"
else
    hinw "gh (GitHub-CLI) fehlt - nur noetig, wenn KEIN SSH-Schluessel bei GitHub hinterlegt ist (sudo apt install gh)"
fi
if python3 -c "import polib" 2>/dev/null; then ok "python3-polib"; else fehlt "python3-polib" "python3-polib"; fi
if python3 -c "import PIL"   2>/dev/null; then ok "python3-PIL (nur fuer Bildpruefungen)"; else hinw "python3-PIL fehlt - nur fuer Bildpruefungen noetig (python3-pil)"; fi

titel "Speedtest-Programme (beide optional)"
gefunden=0
for p in /usr/local/bin/librespeed-cli /usr/bin/librespeed-cli \
         /opt/librespeed/librespeed-cli /snap/bin/librespeed-cli; do
    [ -x "$p" ] && { ok "librespeed-cli  $p"; gefunden=1; break; }
done
[ $gefunden -eq 0 ] && hinw "librespeed-cli nicht gefunden - kein Paket der Mint-Quellen, nur von Hand installierbar"
gefunden=0
for p in /usr/bin/speedtest-cli /usr/local/bin/speedtest-cli; do
    [ -x "$p" ] && { ok "speedtest-cli   $p"; gefunden=1; break; }
done
[ $gefunden -eq 0 ] && hinw "speedtest-cli nicht gefunden - aus den Paketquellen: sudo apt install speedtest-cli"

titel "Zugriff auf das Repository"
#
# Das Repository ist privat (Befund P26). Es gibt zwei gangbare Wege,
# und es genuegt, wenn EINER davon traegt:
#
#   - ein bei GitHub hinterlegter SSH-Schluessel (wie auf dem
#     Referenzgeraet), oder
#   - eine Anmeldung ueber gh.
#
# Geprueft wird deshalb, was zaehlt: Kommt eine Verbindung zum
# Repository zustande? Eine Pruefung allein auf gh meldete am
# 23.09.2026 einen Mangel, obwohl der Zugang ueber SSH einwandfrei
# lief.
#
REPO_SSH="git@github.com:aVince-Industrietechnik/aVincePulse.git"
REPO_HTTPS="https://github.com/aVince-Industrietechnik/aVincePulse.git"
zugang=0

# BatchMode verhindert, dass ssh nach einer Passphrase fragt und das
# Skript stehen bleibt; ohne Zeitgrenze haengt es an einer Firewall.
if GIT_TERMINAL_PROMPT=0 \
   GIT_SSH_COMMAND="ssh -o BatchMode=yes -o ConnectTimeout=8 -o StrictHostKeyChecking=accept-new" \
   git ls-remote "$REPO_SSH" HEAD >/dev/null 2>&1; then
    ok "Zugriff ueber SSH-Schluessel"
    zugang=1
fi

if [ $zugang -eq 0 ] && GIT_TERMINAL_PROMPT=0 git ls-remote "$REPO_HTTPS" HEAD >/dev/null 2>&1; then
    ok "Zugriff ueber HTTPS (gespeicherte Anmeldung)"
    zugang=1
fi

if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
    ok "gh angemeldet als $(gh api user --jq .login 2>/dev/null)"
    if [ $zugang -eq 0 ] && gh repo view aVince-Industrietechnik/aVincePulse --json name >/dev/null 2>&1; then
        ok "Zugriff ueber gh"
        zugang=1
    fi
fi

if [ $zugang -eq 0 ]; then
    fehlt "kein Zugriff auf das private Repository" "repo-zugang"
fi

titel "Zugriff auf die NAS"
NAS=/mnt/LX-NAS-linux/60_SETUP_INSTALLATION
if [ -d "$NAS/aVincePulse_Development" ]; then
    ok "Entwicklungsverzeichnis erreichbar: $NAS/aVincePulse_Development"
    [ -d "$NAS/aVincePulse_Backups" ] && ok "Backups erreichbar" || hinw "aVincePulse_Backups nicht gefunden"
    [ -w "$NAS/aVincePulse_Development" ] && ok "Schreibrecht vorhanden" || hinw "kein Schreibrecht - nur Lesen moeglich"
else
    hinw "NAS unter $NAS nicht eingebunden - auf dem Zweitgeraet nicht zwingend, siehe Anleitung"
fi

titel "Hardware dieses Rechners (das ist der Zweck des Zweitgeraets)"
echo "  Sensoren unter /sys/class/hwmon:"
for d in /sys/class/hwmon/hwmon*; do
    [ -r "$d/name" ] || continue
    n=$(cat "$d/name" 2>/dev/null)
    t=$(ls "$d" 2>/dev/null | grep -c '^temp[0-9]*_input')
    f=$(ls "$d" 2>/dev/null | grep -c '^fan[0-9]*_input')
    printf "    %-14s %s  (%d Temperatur, %d Luefter)\n" "$(basename $d)" "$n" "$t" "$f"
done
echo "  Stromversorgung unter /sys/class/power_supply:"
if [ -d /sys/class/power_supply ] && [ -n "$(ls -A /sys/class/power_supply 2>/dev/null)" ]; then
    for d in /sys/class/power_supply/*/; do
        printf "    %-20s type=%s scope=%s\n" "$(basename $d)" \
            "$(cat $d/type 2>/dev/null)" "$(cat $d/scope 2>/dev/null || echo '-')"
    done
else
    printf "    \033[33mkeine\033[0m - Desktop ohne Akku. Genau dafuer ist dieser Test da:\n"
    printf "    BATT und STATUS muessen sauber ausgeblendet werden oder \"--\" zeigen.\n"
fi
echo "  Netzwerkschnittstellen:"
for d in /sys/class/net/*/; do
    n=$(basename "$d"); [ "$n" = "lo" ] && continue
    printf "    %-12s\n" "$n"
done

titel "Ergebnis"
if [ ${#fehlend[@]} -eq 0 ]; then
    printf "  \033[32mAlles Noetige vorhanden.\033[0m\n"
else
    printf "  \033[31m%d Punkt(e) fehlen.\033[0m Vorschlag:\n\n" "${#fehlend[@]}"
    pakete=$(printf '%s\n' "${fehlend[@]}" | grep -v '^repo-' | sort -u | tr '\n' ' ')
    [ -n "${pakete// }" ] && printf "    sudo apt install %s\n" "$pakete"
    if printf '%s\n' "${fehlend[@]}" | grep -q '^repo-zugang'; then
        printf "    Zugang zum privaten Repository herstellen - einer der beiden Wege:\n"
        printf "      SSH-Schluessel bei GitHub hinterlegen (Settings -> SSH and GPG keys)\n"
        printf "      oder: sudo apt install gh && gh auth login\n"
    fi
fi
[ ${#warnung[@]} -gt 0 ] && printf "\n  %d Hinweis(e), siehe oben.\n" "${#warnung[@]}"
echo
