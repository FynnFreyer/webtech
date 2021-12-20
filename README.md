# Webtech
Übung für den Kurs Webtechnologien bei Knut Hühne an der HTW-Berlin

Kooperation zwischen [Younes Abdelwadoud](https://github.com/Lechiffre2110) 
und [Fynn Freyer](https://github.com/FynnFreyer).

Dieses Projekt wird auf [Netlify](https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app) gehostet 
und greift auf das [travel-app Backend](https://github.com/FynnFreyer/travel-app) zu.

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

Für die Weltkarte wird eine GEO-JSON verwendet.

Die Icons für das mobile Navigationsmenü (`assets/*.png`) sind von [Freepik](https://www.freepik.com/) 
auf [www.flaticon.com](https://www.flaticon.com/) erstellt worden.
