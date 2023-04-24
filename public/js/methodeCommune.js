

export const updateHeaderCart = (headerCartServeur) => {

    let headerCart = document.getElementById('panier-btn-content');    

    headerCart.innerText = headerCartServeur.number_of_items+' items - $'+headerCartServeur.subtotal;
}

//------------------------------------------Validation----------------------------------------------------------

export const validationLastname = (lastnameRegister, errorNom) => {
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

export const validationFirstname = (firstnameRegister, errorPrenom) => {
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


export const validationEmailregister = (emailRegister, errorCourriel) => {
    let example = "example@gmail.com";
    let valid = false;

    if (emailRegister.validity.valid) {
        errorCourriel.style.display = 'none';
        valid = true;
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

    return valid;
}

//  validation du mot de passe inscription

export const validationPasswordRegister = (passwordRegister, passwordConfirmation, errorPassword) => {
    let valid = false
    if (passwordRegister.validity.valid) {
        errorPassword.style.display = 'none';
        valid = true
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
    else if(passwordConfirmation.value != passwordRegister.value){
        errorPassword.innerText = 'mots de passes non-identiques';
        errorPassword.style.display = 'block';
    }

    return valid;
}


// Validation du courriel connexion

export const validationEmailLogin = (emailRegister, errorCourriel) => {
    let valid = false;

    if (emailRegister.validity.valid) {
        errorCourriel.style.display = 'none';
        valid = true;
    }
    else if (emailRegister.validity.typeMismatch) {
        errorCourriel.innerText = 'Entrer un courriel valide ex: "test@test.com"';
        errorCourriel.style.display = 'block';
    }
    else if (emailRegister.validity.valueMissing) {
        errorCourriel.innerText = 'Entrer votre courriel';
        errorCourriel.style.display = 'block';
    }

    return valid;
}

// Validation du mot de passe connexion

export const validationPasswordLogin = (passwordLogin, errorPassword) => {
    let valid = false;

    if (passwordLogin.validity.valid) {
        errorPassword.style.display = 'none';
        valid = true
    }
    else if (passwordLogin.validity.valueMissing) {
        errorPassword.innerText = 'Entrer votre mot de passe';
        errorPassword.style.display = 'block';
    }

    return valid;
}


export const validateStreeAddress = (address, error) => {
    let valid = false;

    if (address.validity.valid) {
        error.style.display = 'none';
        valid = true
    }
    else if (address.validity.valueMissing) {
        error.innerText = 'Entrer votre adresse';
        error.style.display = 'block';
    }

    return valid;
}

export const validateCity = (city, error) => {
    let valid = false;

    if (city.validity.valid) {
        error.style.display = 'none';
        valid = true
    }
    else if (city.validity.valueMissing) {
        error.innerText = 'Entrer la ville';
        error.style.display = 'block';
    }

    return valid;
}

export const validateProvince = (province, error) => {
    let valid = false;

    if (province.validity.valid) {
        error.style.display = 'none';
        valid = true
    }
    else if (province.validity.valueMissing) {
        error.innerText = 'Entrer la ville';
        error.style.display = 'block';
    }

    return valid;
}

export const validationCodePostal = (codePostal, error) => {
    let valid = false;

    if (codePostal.validity.valid) {
        error.style.display = 'none';
        valid = true;
    }
    else if (codePostal.validity.typeMismatch) {
        error.innerText = 'Entrer un code postal valide ex: "1A1 A1A"';
        error.style.display = 'block';
    }
    else if (codePostal.validity.valueMissing) {
        error.innerText = 'Entrer votre courriel';
        error.style.display = 'block';
    }

    return valid;
}
