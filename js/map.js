

var mymap = L.map('mapid').setView([51.505, -0.09], 2);

//var featureCollection = JSON.parse(dataFile);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGVpZG9sZWluOTkiLCJhIjoiY2t2OXUzc2t0MDh2ZjJ2cGdrYm5vMWdsNSJ9.CvO5TfaWDYRrJtdqczwQDQ'
}).addTo(mymap);

//Style Black
var countriesStyle = {
    "color": "#000000",
    "weight": 2
};

//Filter visited


let visitedCoutriesArray = getVisitedCountries();
//GeoJSON
L.geoJson(geo, {
    style: countriesStyle,
    filter: function(feature, layer) {
        var visited = false;
        for (let i = 0; i < visitedCoutriesArray.length; i++) {
            if (feature.properties.name == visitedCoutriesArray[i]) {
                visited = true;
            }
        }

        if (visited == true) {
            return false;
        } else {
            return true;
        }

    }
}).addTo(mymap);


//Get visited countries from local storage
function getVisitedCountries() {
    var visitedCountries = [];
    for (const key in localStorage) {
        if (key != "length" && key != "clear" && key != "getItem" && key != "key" && key != "removeItem" && key != "setItem") {
            let trip = loadFromLocalStorage(key);
            visitedCountries.push(trip.country);
        }
    }
    console.log(visitedCountries)
    return visitedCountries;
}


function loadFromLocalStorage(key) {
    let object = JSON.parse(localStorage.getItem(key));
    return object;
}


