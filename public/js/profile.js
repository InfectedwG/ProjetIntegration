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
    event.preventDefault();
    
});
