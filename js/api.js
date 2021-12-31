//TODO: implement check login: send get request => if 401 redirect; if ok => logged in
//Create Trip Form
let inputTripName = document.getElementById("reisename");
let inputTripCountry = document.getElementById("land");
let inputTripStart = document.getElementById("start");
let inputTripEnd = document.getElementById("ende");
let btnNewTrip = document.getElementById("reiseErstellen");

//Edit Trip Form
let dropDownEdit = document.getElementById("name-select");
let tripId = document.getElementById("reiseid");
let deleteBtn = document.getElementById("delete");
let saveBtn = document.getElementById("save");

//BASE URL
const BASEURLTRAVELS = "https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/travels"
const BASEURLUSERS = "https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/travels"

//Login

//------ CREATE ------
if (btnNewTrip != null) {
    btnNewTrip.addEventListener('click', () => {
        let tripname = inputTripName.value;
        let start = inputTripStart.value;
        let end = inputTripEnd.value;
        let country = inputTripCountry.value;
        let data = {"name":tripname, "start":start, "end":end, "destination":country};
        fetch(BASEURLTRAVELS, {
            "method" : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        })
            .then(res => {
                logResponse(res, "Reise erfolgreich hinzugefügt.", "Reise konnte nicht hinzugefügt werden.");
            });
    });

}
//------ DELETE ------
if (deleteBtn != null) {
    deleteBtn.addEventListener('click', () => {
        fetch(BASEURLTRAVELS + tripId.value, {
            "method" : "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                logResponse(res, "Reise erfolgreich gelöscht.", "Reise konnte nicht gelöscht werden.");
            })
        loadTrips();
    });
}


//------ EDIT ------

//Lädt alle gespeicherten Reisen in Edit Form Dropdown
function loadTrips() {
    let dropdownTrips = document.getElementById("name-select");
    fetch(BASEURLTRAVELS, {
        "method" : "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement("OPTION");
                option.innerHTML = data[i].name;
                option.value = data[i].id;
                dropdownTrips.options.add(option);
            }
        })
}


//Lädt ausgewählte Reise in Edit Form
if (dropDownEdit != null) {
    dropDownEdit.addEventListener('change', () => {
        let id = dropDownEdit.value;
        fetch("https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/travels", {
            "method" : "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                logResponse(res, "Reise erfolgreich geladen", "Reise konnte nicht geladen werden.");
            })
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == id) {
                        tripId.value = data[i].id;
                        inputTripName.value = data[i].name;
                        inputTripStart.value = data[i].start;
                        inputTripEnd.value = data[i].end;
                        inputTripCountry.value = data[i].destination;
                        inputTripName.disabled = false;
                        inputTripStart.disabled = false;
                        inputTripEnd.disabled = false;
                        inputTripCountry.disabled = false;
                        deleteBtn.disabled = false;
                        saveBtn.disabled = false;
                    }
                }
            })
    });
}

//Speichert Änderungen an Reise
if (saveBtn != null) {
    saveBtn.addEventListener('click', () => {
        let tripname = inputTripName.value;
        let startDate = inputTripStart.value;
        let endDate = inputTripEnd.value;
        let country = inputTripCountry.value;
        let URL = "https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/travels/" + tripId.value;
        let data = {"name": tripname, "start":startDate, "end":endDate, "destination":country};

        fetch(BASEURLTRAVELS + tripId.value, {
            "method" : "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
    });
}

//Lädt Länder in Edit Form Dropdown
const countryNames = geo.features.map(feature => feature.properties.name_long);
const countryISO = geo.features.map(feature => feature.properties.iso_a2);
function loadDropdown() {
    let dropdownCountries = document.getElementById("land");
    let i = 0;
    for (let country in countryNames) {
        let option = document.createElement("OPTION");
        option.innerHTML = countryNames[country];
        option.value = countryISO[i];
        dropdownCountries.options.add(option);
        i++;
    }
}
if (inputTripCountry != null) {
    loadDropdown();
}



//HILFSFUNKTIONEN
function logResponse(res, successMsg, failMsg) {
    if (res.ok) {
        console.log(successMsg);
    } else {
        console.log(failMsg + "(Fehlercode: " + res.status + ")");
    }
}

if (document.getElementById("name-select") != null) {
    loadTrips();
}
