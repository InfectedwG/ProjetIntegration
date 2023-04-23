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
/*
const validationLastname = () => {
    if (lastnameRegister.validity.valid) {
        errorNom.style.display = 'none';
    }
    // Validation du champ de nom si il est vide
    else if (lastnameRegister.validity.valueMissing) {
        errorNom.innerText = 'Entrer votre nom';
        errorNom.style.display = 'block'
    }
}

// Validation du prenom

const validationFirstname = () => {
    if (firstnameRegister.validity.valid) {
        errorPrenom.style.display = 'none';
    }
    // Validation si le champ du prenom est vide
    else if (firstnameRegister.validity.valueMissing) {
        errorPrenom.innerText = 'Entrer votre prenom';
        errorPrenom.style.display = 'block';
    }
}

//  validation du courriel inscription


const validationEmailregister = () => {
    let example = "example@gmail.com";

    if (emailRegister.validity.valid) {
        errorCourriel.style.display = 'none';
    }
    // Validation si le champ de courriel ne respect pas le parttern
    else if (emailRegister.validity.typeMismatch) {
        errorCourriel.innerText = 'Entrer un courriel valide ex: "test@test.com"';
        errorCourriel.style.display = 'block';
    }
    //  Validation si le champ du courriel est vide
    else if (emailRegister.validity.valueMissing) {
        errorCourriel.innerText = 'Entrer votre courriel';
        errorCourriel.style.display = 'block';
    }
    else if (/@gm(ia|a|i)l.com$/.test(example)) {
        errorCourriel.innerText = "Votre courriel n'est pas valide. Fait sur de mettre .ca ou .com, etc"
        errorCourriel.style.display = 'block'
    }
}

//  validation du mot de passe inscription

const validationPasswordRegister = () => {
    if (passwordRegister.validity.valid) {
        errorPassword.style.display = 'none';
    }
    // Validation si le mot de passe est trop long
    else if (passwordRegister.validity.tooShort) {
        errorPassword.innerText = 'Le mot de passe est trop cour';
        errorPassword.style.display = 'block';
    }
    // Validation si le mot de passe est trop cours
    else if (passwordRegister.validity.tooLong) {
        errorPassword.innerText = 'Le mot de passe est trop long';
        errorPassword.style.display = 'block';
    }
    // Validation si le champ du mot de passe est vide
    else if (passwordRegister.validity.valueMissing) {
        errorPassword.innerText = 'Entrer votre mot de passe';
        errorPassword.style.display = 'block';
    }
    // si le mot de passe ne match pas le pattern
    else if (passwordRegister.validity.patternMismatch) {
        errorPassword.innerText = "Le mot de passe n'est pas valide. Fait sur qui a une majucule et un caratere special";
        errorPassword.style.display = 'block';
    }
}


// Validation du courriel connexion

const validationEmailLogin = () => {
    if (emailRegister.validity.valid) {
        errorCourriel.style.display = 'none';
    }
    else if (emailRegister.validity.typeMismatch) {
        errorCourriel.innerText = 'Entrer un courriel valide ex: "test@test.com"';
        errorCourriel.style.display = 'block';
    }
    else if (emailRegister.validity.valueMissing) {
        errorCourriel.innerText = 'Entrer votre courriel';
        errorCourriel.style.display = 'block';
    }
}

// Validation du mot de passe connexion

const validationPasswordLogin = () => {
    if (passwordLogin.validity.valid) {
        errorPassword.style.display = 'none';
    }
    else if (passwordLogin.validity.valueMissing) {
        errorPassword.innerText = 'Entrer votre mot de passe';
        errorPassword.style.display = 'block';
    }
}
*/

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

