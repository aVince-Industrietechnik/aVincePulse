aVincePulse Panel-Icons
=======================

Herkunft:
    02_Varianten/minimalistisches_v_wlan_logo.png
    (einzige Variante mit transparentem Hintergrund)

Bearbeitung:
    - auf den Bildinhalt zugeschnitten; das Original hat breite
      transparente Raender, die das Logo im Panel klein wirken lassen
    - quadratisch zentriert
    - Signalboegen von Blau auf Weiss geaendert
    - zweite blaue Linie in den Schenkeln ergaenzt, parallel zu den
      vorhandenen Keilen und entlang der Schenkelneigung versetzt
    - roter Pulse-Punkt um 30 Prozent vergroessert und auf E60000
      gesetzt, damit er bei Panelgroesse sichtbar bleibt
    - auf Panelgroessen skaliert


aVincePulse_panel.png            (und _16x16 bis _48x48)
-------------------------------------------------------
Farbige Fassung, entspricht der C-1-Designrichtung:

    weisses V
    weisse Signalboegen
    blaue Keile im V
    roter Pulse-Punkt

Wird vom Applet ueber set_applet_icon_path() geladen.
Cinnamon skaliert die 128er Fassung auf die Panelhoehe.

Einschraenkung: Das Icon ist farbig und passt sich der Theme-Farbe
nicht an. Auf sehr hellen Panels wirkt der weisse Anteil des V schwach.


aVincePulse_panel_symbolic.png   (und _16x16 bis _48x48)
--------------------------------------------------------
Einfarbige Fassung. Nur der Alpha-Kanal beschreibt die Form,
die Farbe setzt Cinnamon nach dem Theme:

    dunkles Panel  -> Icon wird hell dargestellt
    helles Panel   -> Icon wird dunkel dargestellt

Geladen wird sie ueber set_applet_icon_symbolic_path().

Derzeit nicht aktiv. Sie liegt bereit, weil vor einer
Veroeffentlichung nicht bekannt ist, welches Theme andere
Benutzer verwenden.

Hinweis: Bei einer symbolischen Darstellung geht die Farbigkeit
verloren, der rote Pulse-Punkt erscheint dann in derselben Farbe
wie das uebrige Logo.


Offen
-----
Beide Fassungen sind aus PNG abgeleitet. Die Roadmap sieht in
Abschnitt 15 vor, vor einer Veroeffentlichung ein eigenstaendiges
Vektorlogo (SVG) zu erstellen und auf Lesbarkeit bei 16, 20, 24,
32 und 64 Pixel zu pruefen.
