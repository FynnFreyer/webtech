# Webtech
Übung für den Kurs Webtechnologien bei Knut Hühne an der HTW-Berlin

Kooperation zwischen [Younes Abdelwadoud](https://github.com/Lechiffre2110) und [Fynn Freyer](https://github.com/FynnFreyer).

Der `deploy`-Branch des Projektes wird auf [Netlify](https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app) gehostet.

# Aufbau der Abgabe

## HTML

Es gibt verschiedene Seiten
- `overview.html` - Karte  
    Gibt Übersicht über getätigte Reisen mithilfe einer grafischen Darstellung auf einer Weltkarte.
- `add.html` - Hinzufügen  
    Gibt die Möglichkeit neue Reisen in der Datenbank zu speichern.
- `edit.html` - Änderungen  
    Hier kann man Änderungen an getätigten Reisen vornehmen.  
- `index.html` - Login  
    Man muss sich initial Einloggen um die anderen Funktionalitäten freizuschalten.

## CSS

Das CSS ist im Ordner `css` und in globales 
und seitenspezifisches CSS unterschieden.

Globales CSS liegt in `css/style.css` und 
seitenspezifisches CSS in einer 
nach der importierenden Datei 
benannten Datei im Ordner `css`.


## Assets

Für die Weltkarte wird eine SVG-Datei verwendet, welche auf einem 
[Werk in den Wikimedia-Commons](https://commons.wikimedia.org/wiki/File:BlankMap-World.svg) basiert.
Die Datei wird als `object` eingebunden und dann durch CSS gestyled und befindet sich in `assets/worldmap.svg`.