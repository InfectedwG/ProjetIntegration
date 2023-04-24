import * as validation from "./methodeCommune.js";

let firstnameRegister = document.getElementById('firstname-register');
let lastnameRegister = document.getElementById('lastname-register');
let emailRegister = document.getElementById('email-register');
let passwordRegister = document.getElementById('password-register');
let passwordConfirmation = document.getElementById('password-confirmation-register');
let registerForm = document.getElementById('register-form');

let emailLogin = document.getElementById('email-login');
let passwordLogin = document.getElementById('password-login');
let loginForm = document.getElementById('login-form');

let signupSuccessful = document.getElementById('inscription-successful');




const submitRegister = async (errorCourriel) => {

    let data;

    if (passwordRegister.value === passwordConfirmation.value) {
        data = {
            prenom: firstnameRegister.value,
            nom: lastnameRegister.value,
            email: emailRegister.value,
            password: passwordRegister.value,
        }
        let response = await fetch('/inscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            //window.location.replace('/connexion');
            signupSuccessful.style.display = 'block';
        }
        else if (response.status === 409) {
            //Afficher erreur dans l'interface graphique
            console.log('Utilisateur deja existant');

            // Si l'utilisateur se connect avec un compte qui n'exsite pas
            errorCourriel.innerText = "Il y a deja un utilisateur avec cette adress courriel";
            errorCourriel.style.display = 'block';
        }
        else {
            console.log('Erreur inconnu');
        }

    }



}


const submitLogin = async (loginError) => {

    let data = {
        email: emailLogin.value,
        password: passwordLogin.value,
    }

    let response = await fetch('/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.status === 200) {
        window.location.replace('/');
    }
    else if (response.status === 401) {
        let info = await response.json();

        //Afficher erreur dans l'interface graphique

        if (info.erreur) {
            loginError.innerText = 'Email non existant ou mot de passe erronee';
            loginError.style.display = 'block';
        }
        else {
            loginError.innerText = 'Erreur inconnu';
            loginError.style.display = 'block';
        }

        // Si l'utilisateur se connect avec un compte qui n'exsite pas
        //errorCourriel.innerText = "Soit le courriel ou le mot de passe a une erreur. Ou ce compte n'exsite pas";
        //errorCourriel.style.display = 'block';
    }
    else {
        console.log('Erreur inconnu');
    }
}

//------------------------------------------Validation----------------------------------------------------------

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    let errorLastname = document.getElementById('first-error');
    let errorFirstname = document.getElementById('last-error');
    let errorEmail = document.getElementById('email-register-error');
    let errorPassword = document.getElementById('password-register-error');

    if (validation.validationFirstname(firstnameRegister, errorFirstname) &&
        validation.validationLastname(lastnameRegister, errorLastname) &&
        validation.validationEmailregister(emailRegister, errorEmail) &&
        validation.validationPasswordRegister(passwordRegister, passwordConfirmation, errorPassword)) {
            await submitRegister(errorEmail);
    }

    
});




loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    let passwordError = document.getElementById('password-error');
    let emailError = document.getElementById('email-login-error');
    let loginError = document.getElementById('login-error');

    if(validation.validationEmailLogin(passwordLogin, passwordError) &&
    validation.validationPasswordLogin(emailLogin, emailError)){
        await submitLogin(loginError);
    }

    
});

