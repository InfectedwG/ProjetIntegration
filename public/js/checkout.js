let differentAddress = document.getElementById('different-address');
let btnDifferent = document.getElementById('checkbox-different');
let btnTos = document.getElementById('agreement-tos');
let btnOrder = document.getElementById('btn-order');

//-----------------Shipping
let addressInputShip = document.getElementById('address-ship');
let appartmentInputShip = document.getElementById('appartment-ship');
let cityInputShip = document.getElementById('city-ship');
let provinceInputShip = document.getElementById('province-ship');
let zipcodeInputShip = document.getElementById('zipcode-ship');
let phoneInputShip = document.getElementById('phone-ship');
let notesInputShip = document.getElementById('delivery-notes');
let canadaShip = document.getElementById('check-canada-ship');
let usaShip = document.getElementById('check-usa-ship');


//-----------------Billing
let addressInputBill = document.getElementById('address-bill');
let appartmentInputBill = document.getElementById('appartment-bill');
let cityInputBill = document.getElementById('city-bill');
let provinceInputBill = document.getElementById('province-bill');
let zipcodeInputBill = document.getElementById('zipcode-bill');
let canadaBill = document.getElementById('check-canada-bill');
let usaBill = document.getElementById('check-usa-bill');

const checkCountry = (inputChanged, otherInput) => {
    if(inputChanged.checked) otherInput.checked = false;
    else otherInput.checked = true;
}


if(!btnDifferent.checked){
    differentAddress.disabled = true;
}



btnDifferent.addEventListener('change', () => {
    if(!btnDifferent.checked){
        differentAddress.disabled = true;
    }
    else differentAddress.disabled = false;
});


btnOrder.addEventListener('click', () => {

    let data = {

    }
});

canadaShip.addEventListener('change', checkCountry(canadaShip, usaShip));
usaShip.addEventListener('change', checkCountry(usaShip, canadaShip));

canadaBill.addEventListener('change', checkCountry(canadaBill, usaBill));
usaBill.addEventListener('change', checkCountry(usaBill, canadaBill));