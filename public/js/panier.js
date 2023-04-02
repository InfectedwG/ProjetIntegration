let subtotal = document.getElementById('subtotal');
let total = document.getElementById('total');
let tax = document.getElementById('tax');
let updateCartBtn = document.getElementById('update-cart-btn');

let taxRate = 0.14975;



let taxNum = Number.parseFloat(subtotal.innerText)*taxRate;
tax.innerText = taxNum.toFixed(2);

let totalNum = Number.parseFloat(subtotal.innerText)*(1+taxRate);
total.innerText = totalNum.toFixed(2);

const updateCart = () => {
    let prices = document.getElementsByClassName('item-price');
    let quantities = document.getElementsByClassName('item-quantity');
    let itemSubtotals = document.getElementsByClassName('item-subtotal');
    let productIds = document.getElementsByClassName('item-id');
    let checkboxes = document.getElementsByClassName('item-isSelected');
    let tempSubtotal = 0;
    let dataItemId = [];
    let dataItemQuantity = [];
    let dataItemIsSelected = [];

    for(let i = 0; i<prices.length; i++){
        let price = Number.parseFloat(prices[i].innerText);        
        let quantity = Number.parseInt(quantities[i].value);

        let tempItemSubtotal = price*quantity;
        itemSubtotals[i].innerText = tempItemSubtotal.toFixed(2);

        tempSubtotal += price*quantity;

        dataItemId.push(productIds[i].id);
        dataItemQuantity.push(quantity);
        dataItemIsSelected.push(checkboxes[i].checked);

    }
    
    subtotal.innerText = tempSubtotal.toFixed(2);
    let tempTax = tempSubtotal*taxRate;
    tax.innerText = tempTax.toFixed(2);
    let tempTotal = tempSubtotal*(1+taxRate);
    total.innerText = tempTotal.toFixed(2);

    let data = {
        product_id: dataItemId,
        is_selected: dataItemIsSelected,
        quantity: dataItemQuantity,
    }


    fetch('/api/update_cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    
}

updateCartBtn.addEventListener('click', updateCart);