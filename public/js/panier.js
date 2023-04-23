import { updateHeaderCart } from "./methodeCommune";

let subtotal = document.getElementById('cart-subtotal');
let total = document.getElementById('cart-total');
let tax = document.getElementById('cart-tax');
let updateCartBtn = document.getElementById('update-cart-btn');
let checkoutBtn = document.getElementById('btn-checkout');

const updateCart = async () => {

    let produits = document.getElementsByClassName('produits');

    let cart = document.getElementById('cart-items');
    let quantities = document.getElementsByClassName('item-quantity');
    let checkboxes = document.getElementsByClassName('item-isSelected');

    let data = [];

    for (let i = 0; i < produits.length; i++) {
        let quantity = Number.parseInt(quantities[i].value);
        let isSelected = 0;
        if (checkboxes[i].checked) isSelected = 1;

        let product = {
            product_id: parseInt(produits[i].id),
            quantity: quantity,
            is_selected: isSelected,
        }
        data.push(product);

    }
    cart.innerHTML = '';


    let response = await fetch('/api/update_cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.status === 201) {
        let cartItemsUpdated = await response.json();

        updateCartClient(cartItemsUpdated, cart);

        updateHeaderCart(cartItemsUpdated[cartItemsUpdated.length - 1]);

        console.log('test');
    }

}

updateCartBtn.addEventListener('click', async () => {
    await updateCart();
    console.log('test');
});

checkoutBtn.addEventListener('click', async () => {

    await updateCart();

    window.location.href = `/checkout`;
});

const updateCartClient = (cartItems, cart) => {

    for (let i = 0; i < cartItems.length - 2; i++) {
        updateCartRowClient(cartItems[i], cart);
    }
    let subtotal = document.getElementById('cart-subtotal');
    let total = document.getElementById('cart-total');
    let tax = document.getElementById('cart-tax');

    subtotal.innerText = '$' + cartItems[cartItems.length - 2].subtotal;
    tax.innerText = '$' + cartItems[cartItems.length - 2].taxAmount;
    total.innerText = '$' + cartItems[cartItems.length - 2].total;

}

const updateCartRowClient = (product, parent) => {

    let trProduct = document.createElement('tr');
    trProduct.classList.add('produits');

    //------------checkbox-------------------------------------
    let tdCheck = document.createElement('td');

    let divCheck = document.createElement('div');
    divCheck.classList.add('flex');
    divCheck.classList.add('red');

    let inputCheck = document.createElement('input');
    inputCheck.type = 'checkbox';
    inputCheck.classList.add('item-isSelected');
    if (product.is_selected === 1) inputCheck.checked = true;

    divCheck.append(inputCheck);
    tdCheck.append(divCheck);
    trProduct.append(tdCheck);

    //--------------image-------------------------------------
    let tdImg = document.createElement('td');

    let divImg = document.createElement('div');
    divImg.classList.add('flex');

    let img = document.createElement('img');
    img.src = `/img/produits/${product.product_id}/main.jpg`;
    img.style.width = '50px';
    img.style.height = '50px';

    divImg.append(img);
    tdImg.append(divImg);
    trProduct.append(tdImg);

    //-----------------name+id------------------------------
    let tdName = document.createElement('td');

    let pName = document.createElement('p');
    pName.id = product.id;
    pName.classList.add('item-id');
    pName.innerText = product.name;

    tdName.append(pName);
    trProduct.append(tdName);

    //-------------------price--------------------------------
    let tdPrice = document.createElement('td');

    let pPrice = document.createElement('p');
    pPrice.classList.add('item-price');
    pPrice.innerText = product.price;

    tdPrice.append(pPrice);
    trProduct.append(tdPrice);

    //--------------------quantity------------------------------
    let tdQuantity = document.createElement('td');

    let divQuantity = document.createElement('div');
    divQuantity.classList.add('flex');

    let inputQuantity = document.createElement('input');
    inputQuantity.type = 'number';
    inputQuantity.classList.add('item-quantity');
    inputQuantity.value = product.quantity;
    inputQuantity.min = 0;
    inputQuantity.max = 10;

    divQuantity.append(inputQuantity);
    tdQuantity.append(divQuantity);
    trProduct.append(tdQuantity);

    //-----------------------subtotal------------------------------
    let tdSubtotal = document.createElement('td');

    let pSubtotal = document.createElement('p');
    pSubtotal.classList.add('item-subtotal');
    pSubtotal.innerText = product.subtotal;

    tdSubtotal.append(pSubtotal);
    trProduct.append(tdSubtotal);


    parent.append(trProduct);


}

let btnProduits = document.getElementsByClassName('produits-recommander');

const ouvrirProduit = async (event) => {

    let idProduit = parseInt(event.currentTarget.id);

    let data = {
        id_produit: idProduit,
    }

    let queryString = new URLSearchParams(data).toString();

    window.location.href = `/product?${queryString}`;

    console.log(queryString);
    console.log(idProduit);
}


for (let produit of btnProduits) {
    produit.addEventListener('click', (event) => {
        ouvrirProduit(event);
    });
}