//User
const email = "huehne@htw-berlin.de";
const password = "hunter2";
document.getElementsByClassName("logo").innerHTML = "Hallo Welt";

//Form elements
const emailTextfield = document.getElementById("email");
const passwordTextfield = document.getElementById("password");
const form = document.getElementById("login-form");
const status = document.getElementById("loginStatus");

//Login
form.addEventListener("submit", login);
function login() {
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;

    if (emailInput == email && passwordInput == password) {
        status.innerHTML = "Login erfolgreich!";
        status.style.color = "green";
    } else {
        status.innerHTML = "Login fehlgeschlagen. Bitte überprüfen Sie Email Adresse und Passwort.";
        status.style.color = "red";
    }
}
