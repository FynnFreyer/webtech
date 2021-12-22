//Create Trip Form
//Hi
let inputTripName = document.getElementById("reisename");
let inputTripCountry = document.getElementById("land");
let inputTripStart = document.getElementById("start");
let inputTripEnd = document.getElementById("ende");
let btnNewTrip = document.getElementById("reiseErstellen");

//Edit Trip Form
let dropDownEdit = document.getElementById("name-select");
let deleteBtn = document.getElementById("delete");
let saveBtn = document.getElementById("save");

// ------ Check Login -------
function checkLogin() {
    if (getSessionID() == null) {
        alert("Sie müssen eingeloggt sein, um diese Seite zu sehen.");
        //window.location.href = "index.html";
    }
}

checkLogin()

//Create Trip
if (btnNewTrip != null) {
    btnNewTrip.addEventListener('click', () => {
        let tripname = inputTripName.value;
        let start = inputTripStart.value;
        let end = inputTripEnd.value;
        let country = inputTripCountry.value;
        createTrip(tripname, start, end, country);
    });

}

//On Change Reise mit gewähltem Key in Form laden und Enable Textfields
if (dropDownEdit != null) {
    dropDownEdit.addEventListener('change', () => {
        let name = dropDownEdit.value;
        let trips = getTrips();
        let trip = getTrip(trips, name);
        inputTripName.value = trip.tripname;
        inputTripStart.value = trip.startDate;
        inputTripEnd.value = trip.endDate;
        inputTripCountry.value = trip.country;
        inputTripName.disabled = false;
        inputTripStart.disabled = false;
        inputTripEnd.disabled = false;
        inputTripCountry.disabled = false;
        deleteBtn.disabled = false;
        saveBtn.disabled = false;
    });
}

//On Click Reise mit gewähltem Key aus LS löschen
if (deleteBtn != null) {
    deleteBtn.addEventListener('click', () => {
        deleteTrip(dropDownEdit.value);
        loadTrips();
    });
}

//Lädt alle gespeicherten Reisen in Dropdown
function loadTrips() {
    let dropdownTrips = document.getElementById("name-select");
    let trips = getTrips();
    let tripsObject = JSON.parse(trips);
    console.log(tripsObject);
    console.log(tripsObject.length);
    for (let i = 0; i < tripsObject.length; i++) {
        let option = document.createElement("OPTION");
        option.innerHTML = trips[i].name;
        option.value = trips[i].travel_id;
        dropdownTrips.options.add(option);
    }
}


//Speichert Änderungen an Reise
if (saveBtn != null) {
    saveBtn.addEventListener('click', () => {
        let trips = getTrips();
        let oldTrip = getTrip(dropDownEdit.value);
        let name = inputTripName.value;
        let start = inputTripStart.value;
        let end = inputTripEnd.value;
        let country = inputTripCountry.value;
        let newTrip = {
            tripname: name,
            country: country,
            startDate: start,
            endDate: end
        };

        if (name != oldTrip.tripname) {
            let deleteResponse = deleteTrip(dropDownEdit.value);
            let createResponse = createTrip(name, start, end, country, getEmail());
        } else {
            editTrip(newTrip);
        }
    });
}


if (document.getElementById("name-select") != null) {
    loadTrips();
}

//Dropdown
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


//Legt eine neue Reise an
async function createTrip(tripname, startDate, endDate, country) {
    let data = {"name":tripname, "start":startDate, "end":endDate, "destination":country};
    let URL = "https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/travels";
    let response = fetch(URL, {
        "method" : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });

    if (JSON.parse((await response).status) === 201) {
        console.log("Reise erfolgreich hinzugefügt.");
    } else {
        console.log("Reise konnte nicht hinzugefügt werden. Status code: " + (await response).status);
    }

}

//Editiert eine vorhandene Reise
async function editTrip(tripname, startDate, endDate, country) {
    let data = {"name": tripname, "start":startDate, "end":endDate, "destination":country};
    let response = fetch('https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/travels', {
        "method" : "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data})
    })

    if (JSON.parse((await response).status) == 200) {
        console.log("Reise erfolgreich editiert.")
    } else {
        console.log("Reise konnte nicht editiert werden.")
    }
}

//Holt alle Reisen von einem Nutzer aus DB
async function getTrips() {
    let URL = "https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/travels";
    let response = await fetch(URL, {
        "method" : "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (JSON.parse((await response).status) == 200) {
        console.log("Reise erfolgreich ausgelesen.");
        return response.json();
    } else {
        console.log("Reisen konnten nicht ausgelesen werden.")
        return null;
    }
}

//TODO: get travelid from array of travels
async function deleteTrip(tripName) {
    let email = getEmail();
    let data = {"name":tripName};
    let response = fetch('https://htw-travel-app.herokuapp.com/travels/delete', {
        "method" : POST,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify({data})
    });

    if (JSON.parse((await response).status) == 200) {
        console.log("Reise erfolgreich gelöscht.")
    } else {
        console.log("Reise konnte nicht gelöscht werden.")
    }
}

function getTrip(trips, tripName) {
    for (trip in trips) {
        if (trip.name == tripName) {
            return trip;
        }
    }
}

// ------ Cookies ------

//Get SessionID => Quelle: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
function getSessionID() {
    let cookieIndex = document.cookie.indexOf('session_id=');
    if (cookieIndex != -1) {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('session_id='))
            .split('=')[1];
        return cookieValue;
    } else {
        return null;
    }
}

let sessionActive = getSessionID();
if (sessionActive != null) {
    document.getElementById("Login").innerHTML = "Ausloggen";
    document.getElementById("Login").style.color = "red";
    document.getElementById("Login").addEventListener('click', () => {
        document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    });
}

//TEST REQUESTS
//getTrips();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




