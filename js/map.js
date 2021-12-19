var mymap = L.map('mapid').setView([51.505, -0.09], 2);
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
            if (feature.properties.iso_a2 == visitedCoutriesArray[i]) {
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


function getVisitedCountries() {

    let visitedCountries = [];
    let trips = getTrips();
    for (let trip in trips) {
        visitedCountries.push(trip.destination);
    }
    console.log(visitedCountries);
    return visitedCountries;
}

async function getTrips() {
    let email = getEmail();
    let URL = "URLofBackend.com/travels?email=" + email;
    let response = fetch(URL, {
        "method" : "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (JSON.parse((await response).status) == 200) {
        console.log("Reise erfolgreich hinzugefügt.");
        return JSON.parse((await response).json()); //Backend has to return an array of trips
    } else {
        console.log("Reisen konnten nicht ausgelesen werden.")
        return null;
    }
}

function getEmail() {
    let cookieIndex = document.cookie.indexOf('Session=');
    if (cookieIndex != -1) {
        cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('Email='))
            .split('=')[1];
        return cookieValue;
    } else {
        return null;
    }
}


