import * as validation from "./methodeCommune.js";

let btnUpdateUser = document.getElementById("Update-user");
let btnUpdatePassword = document.getElementById("Update-password");
let canadaShip = document.getElementById('check-canada-ship');
let usaShip = document.getElementById('check-usa-ship');

let updateInfoForm = document.getElementById('update-info-form');

const checkCountry = (inputChanged, otherInput) => {
    if (inputChanged.checked) otherInput.checked = false;
    else otherInput.checked = true;
}

canadaShip.addEventListener('change', () => {
    checkCountry(canadaShip, usaShip);
});
usaShip.addEventListener('change', () => {
    checkCountry(usaShip, canadaShip);
});



updateInfoForm.addEventListener('submit', async (event) => {
    console.log('test');

    event.preventDefault();


    let nom = document.getElementById('InputNom');
    let prenom = document.getElementById('InputPrenom');
    let email = document.getElementById('InputEmail');
    let appart = document.getElementById('InputAppartement');
    let adresse = document.getElementById('InputAdresse');
    let ville = document.getElementById('InputVille');
    let province = document.getElementById('InputProvince');
    let postalCode = document.getElementById('InputCodePostale');
    let country;
    if (canadaShip.checked) country = 'CA';
    else country = 'US';



    let errorLastname = document.getElementById('first-error');
    let errorFirstname = document.getElementById('last-error');
    let errorEmail = document.getElementById('email-error');
    let errorAddress = document.getElementById('password-register-error');
    let errorCity = document.getElementById('city-error');
    let errorProvince = document.getElementById('province-error');
    let errorCodePostal = document.getElementById('zipcode-error');

    if (validation.validationFirstname(prenom, errorFirstname) &&
        validation.validationLastname(nom, errorLastname) &&
        validation.validationEmailregister(email, errorEmail) &&
        validation.validateStreeAddress(adresse, errorAddress) &&
        validation.validateCity(ville, errorCity) &&
        validation.validateProvince(province, errorProvince) &&
        validation.validationCodePostal(postalCode, errorCodePostal)) {

        let data = [
            {
                first_name: prenom.value,
                last_name: nom.value,
                email: email.value,
            },
            {
                appartment: appart.value,
                street_address: adresse.value,
                city: ville.value,
                province_state: province.value,
                country: country,
                postal_code: postalCode.value,
            }
        ]

        await fetch('/api/update-info', {

            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),

        });

    }
});


let form = document.getElementById('form-login');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Input à valider
    let password = document.getElementById('InputPassword1');

    let passwordRegister = document.getElementById('InputPassword1').value;
    let passwordConfirmation = document.getElementById('InputPassword2').value;

    // Champs d'erreur pour afficher les messages
    //d'erreurs
    let passwordErrorField = document.getElementById('password-error-field');

    // Fonction de validation
    const validatePassword = () => {
        if (password.validity.valid) {
            passwordErrorField.innerText = '';

            // Retirer les classe CSS s'il n'y a pas d'erreur
            passwordErrorField.classList.remove('active');
            password.classList.remove('active');
        }
        else {
            if (password.validity.valueMissing) {
                passwordErrorField.innerText = 'Veuillez entrer votre mot de passe.';
            }
            else if (password.validity.tooShort) {
                passwordErrorField.innerText = 'Votre mot de passe est trop court.';
            }

            // Ajouter les classe CSS s'il y a des erreurs
            passwordErrorField.classList.add('active');
            password.classList.add('active');
        }
    };
    password.addEventListener('input', validatePassword);
    password.addEventListener('blur', validatePassword);
    form.addEventListener('submit', validatePassword);


    if (form.checkValidity()) {



        if (passwordRegister === passwordConfirmation) {
            let data = {
                passwordRegister: passwordRegister,


            }
            await fetch('/api/profile-password', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

        }
    }
});
