import { updateHeaderCart } from "./methodeCommune.js";

let btnCart = document.getElementById("Cart-button");
let arrowLeft = document.getElementById('arrow-left');
let arrowRight = document.getElementById('arrow-right');

let btnProduits = document.getElementsByClassName('produits');

const ouvrirProduit = async (event) => {

    let idProduit = parseInt(event.currentTarget.id);

    let data = {
        id_produit: idProduit,
    }

    let queryString = new URLSearchParams(data).toString();

    window.location.href = `/product?${queryString}`;
    
    
}


for(let produit of btnProduits){
    produit.addEventListener('click', ouvrirProduit);
}




btnCart.addEventListener('click', async () => {
    btnCart.disabled = true;
    btnCart.classList.add('btn-disabled');
    btnCart.innerText = 'In Cart';

    let priceString = document.getElementById('product-price').innerText;
    let price = Number.parseFloat(priceString.substring(1));
    let productID = Number.parseInt(btnCart.dataset.productid);
    let quantity = Number.parseInt(document.getElementById('quantity').value);



    let data = {
        product_id: productID,
        quantity: quantity,
    }

    let response = await fetch('/api/add_to_cart', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),

    });

    let headerCart = await response.json();
    updateHeaderCart(headerCart);

});

let productImgContainer = document.getElementById('imgs-container');

let position0 = document.getElementById('pos-0');
let position1 = document.getElementById('pos-1');
let position2 = document.getElementById('pos-2');
let position3 = document.getElementById('pos-3');
let position4 = document.getElementById('pos-4');

let bigMain = document.getElementById('main-big-img');
let bigSec1 = document.getElementById('sec1-big-img');
let bigSec2 = document.getElementById('sec2-big-img');
let bigSec3 = document.getElementById('sec3-big-img');
let bigSec4 = document.getElementById('sec4-big-img');

let smallMain = document.getElementById('main-small-img');
let smallSec1 = document.getElementById('sec1-small-img');
let smallSec2 = document.getElementById('sec2-small-img');
let smallSec3 = document.getElementById('sec3-small-img');
let smallSec4 = document.getElementById('sec4-small-img');

let counter = 100;


arrowLeft.addEventListener('click', () => {
    counter--;

    
    imageSlider();
});

arrowRight.addEventListener('click', () => {
    counter++;

    imageSlider();
});

const imageSlider = () => {

    switch (counter % 5) {
        case 0:
            bigMain.style.display = 'block';
            bigSec1.style.display = 'none';
            bigSec2.style.display = 'none';
            bigSec3.style.display = 'none';
            bigSec4.style.display = 'none';

            position0.innerHTML = '';
            position0.appendChild(smallMain);

            position1.innerHTML = '';
            position1.appendChild(smallSec1);

            position2.innerHTML = '';
            position2.appendChild(smallSec2);

            position3.innerHTML = '';
            position3.appendChild(smallSec3);

            position4.innerHTML = '';
            position4.appendChild(smallSec4);
            break;

        case 1:
        case -1:
            bigMain.style.display = 'none';
            bigSec1.style.display = 'block';
            bigSec2.style.display = 'none';
            bigSec3.style.display = 'none';
            bigSec4.style.display = 'none';

            position0.innerHTML = '';
            position0.appendChild(smallSec1);

            position1.innerHTML = '';
            position1.appendChild(smallSec2);

            position2.innerHTML = '';
            position2.appendChild(smallSec3);

            position3.innerHTML = '';
            position3.appendChild(smallSec4);

            position4.innerHTML = '';
            position4.appendChild(smallMain);
            break;

        case 2:
        case -2:
            bigMain.style.display = 'none';
            bigSec1.style.display = 'none';
            bigSec2.style.display = 'block';
            bigSec3.style.display = 'none';
            bigSec4.style.display = 'none';

            position0.innerHTML = '';
            position0.appendChild(smallSec2);

            position1.innerHTML = '';
            position1.appendChild(smallSec3);

            position2.innerHTML = '';
            position2.appendChild(smallSec4);

            position3.innerHTML = '';
            position3.appendChild(smallMain);

            position4.innerHTML = '';
            position4.appendChild(smallSec1);
            break;

        case 3:
        case -3:
            bigMain.style.display = 'none';
            bigSec1.style.display = 'none';
            bigSec2.style.display = 'none';
            bigSec3.style.display = 'block';
            bigSec4.style.display = 'none';

            position0.innerHTML = '';
            position0.appendChild(smallSec3);

            position1.innerHTML = '';
            position1.appendChild(smallSec4);

            position2.innerHTML = '';
            position2.appendChild(smallMain);

            position3.innerHTML = '';
            position3.appendChild(smallSec1);

            position4.innerHTML = '';
            position4.appendChild(smallSec2);
            break;

        case 4:
        case -4:
            bigMain.style.display = 'none';
            bigSec1.style.display = 'none';
            bigSec2.style.display = 'none';
            bigSec3.style.display = 'none';
            bigSec4.style.display = 'block';

            position0.innerHTML = '';
            position0.appendChild(smallSec4);

            position1.innerHTML = '';
            position1.appendChild(smallMain);

            position2.innerHTML = '';
            position2.appendChild(smallSec1);

            position3.innerHTML = '';
            position3.appendChild(smallSec2);

            position4.innerHTML = '';
            position4.appendChild(smallSec3);
            break;
    }
}

let description = document.getElementById('description');
let information = document.getElementById('information');
let dContent = document.getElementById('description-content');
let iContent = document.getElementById('information-content');

description.addEventListener('click', (event) => {
    event.preventDefault();

    iContent.style.display = 'none';
    dContent.style.display = 'block';
});

information.addEventListener('click', (event) => {
    event.preventDefault();

    dContent.style.display = 'none';
    iContent.style.display = 'block';


});







