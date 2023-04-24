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
    

    // Input à valider
    let password1 = document.getElementById('InputPassword1');
    let password2 = document.getElementById('InputPassword2');

    let passwordRegister = document.getElementById('InputPassword1').value;
    let passwordConfirmation = document.getElementById('InputPassword2').value;

    // Champs d'erreur pour afficher les messages
    //d'erreurs
    let passwordErrorField1 = document.getElementById('password-error-field1');
    let passwordErrorField2 = document.getElementById('password-error-field2');

    // Fonction de validation
    const validatePassword1 = () => {
        if (password1.validity.valid) {
            passwordErrorField1.innerText = '';
            

            // Retirer les classe CSS s'il n'y a pas d'erreur
            passwordErrorField1.classList.remove('active');
            
            password1.classList.remove('active');
            
        }
        else {
            if (password1.validity.valueMissing) {
                passwordErrorField1.innerText = 'Veuillez entrer votre mot de passe.';
                
            }
            
            else if (password1.validity.tooShort) {
                passwordErrorField1.innerText = 'Votre mot de passe est trop court.';
                
            }
           

            // Ajouter les classe CSS s'il y a des erreurs
            passwordErrorField1.classList.add('active');
            
            password1.classList.add('active');
            
        }
    };

    const validatePassword2 = () => {
        if (password2.validity.valid) {
            
            passwordErrorField2.innerText = '';

            // Retirer les classe CSS s'il n'y a pas d'erreur
            
            passwordErrorField2.classList.remove('active');
            
            password2.classList.remove('active');
        }
        else {
            
             if (password2.validity.valueMissing) {
                
                passwordErrorField2.innerText = 'Veuillez entrer votre mot de passe.';
            }
            else if (password2.validity.tooShort) {
                passwordErrorField2.innerText = 'Votre mot de passe est trop court.';
                
            }

            // Ajouter les classe CSS s'il y a des erreurs
            
            passwordErrorField2.classList.add('active');
            
            password2.classList.add('active');
        }
    };

    password1.addEventListener('input', validatePassword1);
    password1.addEventListener('blur', validatePassword1);
    password2.addEventListener('input', validatePassword2);
    password2.addEventListener('blur', validatePassword2);
    form.addEventListener('submit', validatePassword1);
    form.addEventListener('submit', validatePassword2);

    

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
    event.preventDefault();
    
});
