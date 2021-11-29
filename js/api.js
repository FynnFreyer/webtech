//Create Trip Form
let inputTripName = document.getElementById("reisename");
let inputTripCountry = document.getElementById("land");
let inputTripStart = document.getElementById("start");
let inputTripEnd = document.getElementById("ende");
let btnNewTrip = document.getElementById("reiseErstellen");

//Edit Trip Form
let dropDownEdit = document.getElementById("name-select");
let deleteBtn = document.getElementById("delete");
let saveBtn = document.getElementById("save");

//Create Trip
if (btnNewTrip != null) {
    btnNewTrip.addEventListener('click', () => {
        let tripname = inputTripName.value;
        let start = inputTripStart.value;
        let end = inputTripEnd.value;
        let country = inputTripCountry.value;

        //Überprüfung ob Name schon vergeben => localStorage.getItem() returned null, falls nicht in LS:
        let nameTaken = localStorage.getItem(tripname);
        if (nameTaken != null) {
            alert("Fehler: bereits vergeben");
        } else {
            createTrip(tripname, start, end, country);
        }
    });
}

function createTrip(name, start, end, countryISO) {

    let trip = {
        tripname: name,
        country: countryISO,
        startDate: start,
        endDate: end
    };

    saveToLocalStorage(trip.tripname, trip);

}

//------ Edit Trip ------
//Funktionsweise: 1. Trip aus Dropdown auswählen (am Anfang Felder disabled) 2. Felder werden mit aktuellen Werten befüllt 3. Änderungen vornehmen 4. Speichern und Reise wird aktualisiert
//Iteration over LS: https://attacomsian.com/blog/javascript-iterate-over-local-storage-keys

//On Change Reise mit gewähltem Key in Form laden und Enable Textfields
if (dropDownEdit != null) {
    dropDownEdit.addEventListener('change', () => {
        key = dropDownEdit.value;
        trip = loadFromLocalStorage(key);
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
        localStorage.removeItem(dropDownEdit.value);
        loadTrips();
    });
}

//Lädt alle gespeicherten Reisen aus LocalStorage in Dropdown
function loadTrips() {
    let dropdownTrips = document.getElementById("name-select");
    for (const key in localStorage) {
        if (key != "length" && key != "clear" && key != "getItem" && key != "key" && key != "removeItem" && key != "setItem" && key != "login") {
            var option = document.createElement("OPTION");
            option.innerHTML = key;
            option.value = key;
            dropdownTrips.options.add(option);
        }
    }
}


//Speichert Änderungen an Reise
if (saveBtn != null) {
    saveBtn.addEventListener('click', () => {
        let oldTrip = loadFromLocalStorage(dropDownEdit.value);
        let name = inputTripName.value;
        let start = inputTripStart.value;
        let end = inputTripEnd.value;
        let country = inputTripCountry.value;

        if (name !== oldTrip.tripname) {
            localStorage.removeItem(dropDownEdit.value);
            createTrip(name, start, end, country);
        } else {
            createTrip(name, start, end, country);
        }

    });
}

function editTrip(trip) {
    newName = document.getElementById("editName").value;
    newCountry = document.getElementById("editCountry").value;
    newStart = document.getElementById("editStart").value;
    newEnd = document.getElementById("editEnd").value;

    trip.name = newName;
    trip.country = newCountry;
    trip.startDate = newStart;
    trip.endDate = newEnd;

    saveToLocalStorage(trip.name, trip);
}


//Save & load objects from local storage
//Arguments to passed (save): unique key for object in local storage and object
//Arguments to passed (load): key of object in local storage

function saveToLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

function loadFromLocalStorage(key) {
    let object = JSON.parse(localStorage.getItem(key));
    return object;
}


if (document.getElementById("name-select") != null) {
    loadTrips();
}

//Dropdown
const countryNames = geo.features.map(feature => feature.properties.name);
function loadDropdown() {
    let dropdownCountries = document.getElementById("land");
    for (const country in countryNames) {
            var option = document.createElement("OPTION");
            option.innerHTML = country;
            option.value = country;
            dropdownCountries.options.add(option);
    }
}

loadDropdown();

//LOGOUT
let loginStatus = localStorage.getItem('login');
if (loginStatus == 'True') {
    document.getElementById("Login").innerHTML = "Ausloggen";
    document.getElementById("Login").style.color = "red";

    document.getElementById("Login").addEventListener('click', () => {
        localStorage.setItem('login', 'False');
    });
}

