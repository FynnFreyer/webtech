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

//------ Filter visited ------
fetch("https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/travels", {
    "method" : "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        let visitedCountries = [];
        for (let i = 0; i < data.length; i++) {
            visitedCountries.push(data[i].destination);
        }
        L.geoJson(geo, {
            style: countriesStyle,
            filter: function(feature, layer) {
                let notVisited = true;
                for (let c of visitedCountries) {
                    if (feature.properties.iso_a2 == c) {
                        notVisited = false;
                    }
                }
                return notVisited;

            }
        }).addTo(mymap);
    })

function updateMap(countries) {

    var countriesStyle = {
        "color": "#000000",
        "weight": 2
    };
    mymap.clear();

    let visitedCountries = [];
    for (let i = 0; i < countries.length; i++) {
        visitedCountries.push(countries[i].destination);
    }
    L.geoJson(geo, {
        style: countriesStyle,
        filter: function(feature, layer) {
            let notVisited = true;
            for (let c of visitedCountries) {
                if (feature.properties.iso_a2 == c) {
                    notVisited = false;
                }
            }
            return notVisited;
        }
    }).addTo(mymap);





}





