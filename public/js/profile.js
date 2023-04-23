let btnUpdateUser = document.getElementById("Update-user");
let btnUpdatePassword = document.getElementById("Update-password");

btnUpdateUser.addEventListener('click', async (event) => {


    let nom = document.getElementById('InputNom').value;
    let prenom = document.getElementById('InputPrenom').value;
    let email = document.getElementById('InputEmail').value;
    let appart = document.getElementById('InputAppartement').value;
    let adresse = document.getElementById('InputAdresse').value;
    let ville = document.getElementById('InputVille').value;
    let province = document.getElementById('InputProvince').value;
    let pays = document.getElementById('InputPays').value;
    let postalCode = document.getElementById('InputCodePostale').value;

    let data = {
        nom: nom,
        prenom: prenom,
        email: email,
        appart: appart,
        adresse: adresse,
        ville: ville,
        province: province,
        pays: pays,
        postalCode: postalCode,
    }

    await fetch('/api/profile', {

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
