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
