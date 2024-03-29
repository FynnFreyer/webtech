//Form elements
const emailTextfield = document.getElementById("email");
const passwordTextfield = document.getElementById("password");
const submitbtn = document.getElementById("submit");
const submitbtnRegister = document.getElementById("submitRegister");
const status = document.getElementById("loginStatus");

//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Login
submitbtn.addEventListener("click", login);

async function login() {
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;

    const response = await fetch("https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/login", {
        "method": "POST",
        headers: {
            'Accept' : '*/*',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            "email": emailInput,
            "password": passwordInput
        })
    });

    if (JSON.parse(response.status) === 200) {
        status.innerHTML = "Login erfolgreich!";
        status.style.color = "green";
        //await sleep(700);
        window.location.href = 'overview.html';
    } else {
        status.innerHTML = "Login fehlgeschlagen. Bitte überprüfen Sie Email Adresse und Passwort.";
        status.style.color = "red";
    }

}

//------ REGISTER ------
submitbtnRegister.addEventListener("click", () => {
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;
    fetch("https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/users", {
        "method": "POST",
        headers: {
            'Accept' : '*/*',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            "email": emailInput,
            "password": passwordInput
        })
    })
        .then(res => {
            if (res.ok) {
                status.innerHTML = "Registrierung erfolgreich. Es wurde ein Bestätigungslink an Ihre Email Adresse gesendet.";
            } else {
                status.innerHTML = "Registrierung fehlgeschlagen. (Fehlercode: " + res.status + ")";
            }
        })
});




