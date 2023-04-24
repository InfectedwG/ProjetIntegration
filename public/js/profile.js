let btnUpdateUser = document.getElementById("Update-user");
let btnUpdatePassword = document.getElementById("Update-password");
let canadaShip = document.getElementById('check-canada-ship');
let usaShip = document.getElementById('check-usa-ship');

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



btnUpdateUser.addEventListener('click', async (event) => {


    let nom = document.getElementById('InputNom').value;
    let prenom = document.getElementById('InputPrenom').value;
    let email = document.getElementById('InputEmail').value;
    let appart = document.getElementById('InputAppartement').value;
    let adresse = document.getElementById('InputAdresse').value;
    let ville = document.getElementById('InputVille').value;
    let province = document.getElementById('InputProvince').value;
    let postalCode = document.getElementById('InputCodePostale').value;
    let country;
    if (canadaShip.checked) country = 'CA';
    else country = 'US';

    

    let data = [
        {
            first_name: prenom,
            last_name: nom,
            email: email,
        },
        {
            appartment: appart,
            street_address: adresse,
            city: ville,
            province_state: province,
            country: country,
            postal_code: postalCode,
        }
    ]

    await fetch('/api/update-info', {

        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),

    });

    event.preventDefault();
});

/*
btnUpdatePassword.addEventListener('click', async (event) => {


    let passwordRegister = document.getElementById('InputPassword1').value;
    let passwordConfirmation = document.getElementById('InputPassword2').value;


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

    event.preventDefault();
});*/



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


    if(form.checkValidity()){
        
    
    
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
