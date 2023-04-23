

export const updateHeaderCart = (headerCartServeur) => {

    let headerCart = document.getElementById('panier-btn-content');    

    headerCart.innerText = headerCartServeur.number_of_items+' items - $'+headerCartServeur.subtotal;
}

//------------------------------------------Validation----------------------------------------------------------

export const validationLastname = () => {
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

export const validationFirstname = () => {
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


export const validationEmailregister = () => {
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

export const validationPasswordRegister = () => {
    if (passwordRegister.validity.valid) {
        errorPassword.style.display = 'none';
    }
    // Validation si le mot de passe est trop long
    else if (passwordRegister.validity.tooShort) {
        errorPassword.innerText = 'Le mot de passe est trop court';
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
        errorPassword.innerText = "Le mot de passe n'est pas valide. Fait sur qui a une masjucule et un caratere special";
        errorPassword.style.display = 'block';
    }
}


// Validation du courriel connexion

export const validationEmailLogin = () => {
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

export const validationPasswordLogin = () => {
    if (passwordLogin.validity.valid) {
        errorPassword.style.display = 'none';
    }
    else if (passwordLogin.validity.valueMissing) {
        errorPassword.innerText = 'Entrer votre mot de passe';
        errorPassword.style.display = 'block';
    }
}
