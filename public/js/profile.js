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


btnUpdatePassword.addEventListener('click', async (event) => {


    let passwordRegister = document.getElementById('InputPassword1').value;
    let passwordConfirmation = document.getElementById('InputPassword2').value;


    if (passwordRegister.value === passwordConfirmation.value) {
        let data = {
            passwordRegister: passwordRegister,
            passwordConfirmation: passwordConfirmation,

        }
        await fetch('/api/profile-password', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

    }

    event.preventDefault();
});
