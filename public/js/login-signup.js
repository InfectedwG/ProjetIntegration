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


const submitRegister = async () => {

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
            //errorCourriel.innerText = "Il y a deja un utilisateur avec cette adress courriel";
            //errorCourriel.style.display = 'block';
        }
        else {
            console.log('Erreur inconnu');
        }
    
    }

    

}


const submitLogin = async () => {

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

        //Afficher erreur dans l'interface graphine
        console.log(info);

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
    /*
    validationFirstname();
    validationLastname();
    validationEmailregister();
    validationPasswordRegister();
    */
    await submitRegister();
});




loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    /*
    validationEmailLogin();
    validationPasswordLogin();
    */
    await submitLogin();
});

