let subtotal = document.getElementById('subtotal');
let total = document.getElementById('total');
let tax = document.getElementById('tax');
let updateCartBtn = document.getElementById('update-cart-btn');
let checkoutBtn = document.getElementById('btn-checkout');

let taxRate = 0.14975;



const updateCart = async () => {
    let products = document.getElementById('cart-items');
    let prices = document.getElementsByClassName('item-price');
    let quantities = document.getElementsByClassName('item-quantity');
    let itemSubtotals = document.getElementsByClassName('item-subtotal');
    let productIds = document.getElementsByClassName('item-id');
    let checkboxes = document.getElementsByClassName('item-isSelected');
    let tempSubtotal = 0;
    let dataItemId = [];
    let dataItemQuantity = [];
    let dataItemIsSelected = [];

    for (let i = 0; i < prices.length; i++) {
        let quantity = Number.parseInt(quantities[i].value);
        dataItemId.push(productIds[i].id);
        dataItemQuantity.push(quantity);
        dataItemIsSelected.push(checkboxes[i].checked);

        /*
        let tempItemSubtotal = price * quantity;
        itemSubtotals[i].innerText = tempItemSubtotal.toFixed(2);
        tempSubtotal += price * quantity;
        */
    }
    products.innerHTML = '';



    /*
    subtotal.innerText = tempSubtotal.toFixed(2);
    let tempTax = tempSubtotal * taxRate;
    tax.innerText = tempTax.toFixed(2);
    let tempTotal = tempSubtotal * (1 + taxRate);
    total.innerText = tempTotal.toFixed(2);
    */
    let data = {
        product_ids: dataItemId,
        is_selecteds: dataItemIsSelected,
        quantities: dataItemQuantity,
    }


    let response = await fetch('/api/update_cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    let cartInfo = await response.json();

    updateCartClient(cartInfo, products);



}

updateCartBtn.addEventListener('click', updateCart);
checkoutBtn.addEventListener('click', async () => {
    await updateCart();

    let userId = 2;

    let data = {
        user_id: userId,
    }

    let queryString = new URLSearchParams(data).toString();

    window.location.href = `/checkout`;
});

const updateCartClient = (cart, cartItems) => {
    
    for(let i = 0; i < cart.length-1; i++){
        updateCartRowClient(cart[i], cartItems);
    }

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
    if(product.is_selected === 1) inputCheck.checked = true;

    divCheck.append(inputCheck);
    tdCheck.append(divCheck);
    trProduct.append(tdCheck);

    //--------------image-------------------------------------
    let tdImg = document.createElement('td');

    let divImg = document.createElement('div');
    divImg.classList.add('flex');

    let img = document.createElement('img');
    img.src = 'img/cat.jpg';

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

let btnProduits = document.getElementsByClassName('produits');

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


for(let produit of btnProduits){
    produit.addEventListener('click', (event) => {
        ouvrirProduit(event);
    });
}