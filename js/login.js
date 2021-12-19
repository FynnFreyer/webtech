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
    let data = {email:emailInput, password:passwordInput};

    const response = await fetch("https://httpbin.org/post", {
        "method": "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log(response.json());

    if (JSON.parse(response.status) == 200) {
        status.innerHTML = "Login erfolgreich!";
        status.style.color = "green";
        setEmailCookie(emailInput);
        setSessionCookie("27634863746346732");
        await sleep(700);
        window.location.href = 'overview.html';
    } else {
        status.innerHTML = "Login fehlgeschlagen. Bitte überprüfen Sie Email Adresse und Passwort.";
        status.style.color = "red";
    }

    function setEmailCookie(email) {
        document.cookie = "Email=" + email;
        console.log("Email Cookie mit Wert Email=" + email + " gesetzt.")
    }

    //TODO: remove after backend sets cookie!!
    function setSessionCookie(session) {
        document.cookie = "Session=" + session;
        console.log("Session Cookie mit Wert Session=" + session + " gesetzt.")
    }

}
