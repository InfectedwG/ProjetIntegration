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
    if (inputChanged.checked) otherInput.checked = false;
    else otherInput.checked = true;
}


if (!btnDifferent.checked) {
    differentAddress.disabled = true;
}



btnDifferent.addEventListener('change', () => {
    if (!btnDifferent.checked) {
        differentAddress.disabled = true;
    }
    else differentAddress.disabled = false;
});


btnOrder.addEventListener('click', async () => {
    let orderTotal = document.getElementById('order-total');
    let country;

    let data;

    if (canadaShip.checked) country = 'CA';
    else country = 'US';

    let shipping_address = {
        street_address: addressInputShip.value,
        appartment: appartmentInputShip.value,
        city: cityInputShip.value,
        postal_code: zipcodeInputShip.value,
        province_state: provinceInputShip.value,
        country: country
    }

    if (canadaBill.checked) country = 'CA';
    else country = 'US';

    let billing_address = {
        street_address: addressInputBill.value,
        appartment: appartmentInputBill.value,
        city: cityInputBill.value,
        postal_code: zipcodeInputBill.value,
        province_state: provinceInputBill.value,
        country: country
    }

    if (differentAddress.disabled === true) {

        data = {
            shipping_address: shipping_address
        }
    }
    else {
        data = {
            shipping_address: shipping_address,
            billing_address: billing_address,
        }
    }

    if (orderTotal.innerText != '0.0') {

        let response = await fetch('/api/place-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }
    else console.log('vous n\'avez aucun item a commander');
});

canadaShip.addEventListener('change', checkCountry(canadaShip, usaShip));
usaShip.addEventListener('change', checkCountry(usaShip, canadaShip));

canadaBill.addEventListener('change', checkCountry(canadaBill, usaBill));
usaBill.addEventListener('change', checkCountry(usaBill, canadaBill));