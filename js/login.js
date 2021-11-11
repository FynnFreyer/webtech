//User
const email = "huehne@htw-berlin.de";
const password = "hunter2";

//Form elements
const emailTextfield = document.getElementById("email");
const passwordTextfield = document.getElementById("password");
const submitbtn = document.getElementById("submit");
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

    if (emailInput == email && passwordInput == password) {
        status.innerHTML = "Login erfolgreich!";
        status.style.color = "green";
        await sleep(2000);
        window.location.href = 'overview.html';
    } else {
        status.innerHTML = "Login fehlgeschlagen. Bitte überprüfen Sie Email Adresse und Passwort.";
        status.style.color = "red";
    }
}
