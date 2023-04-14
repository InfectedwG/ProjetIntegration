

export const updateHeaderCart = (headerCartServeur) => {
    let headerCart = document.getElementById('panier-btn-content');
    /*
    let headerString = headerCart.innerText;
    let itemStringStart = headerString.search('items');
    let subtotalStringStart = headerString.search('[\x24]');

    let tempNumberOfItems = Number.parseInt(headerString.substring(0, itemStringStart-1));
    let tempSubtotal = Number.parseFloat(headerString.substring(subtotalStringStart+1));
    let numberOfItems = tempNumberOfItems+quantity;
    let subtotal = tempSubtotal+price;
    */

    headerCart.innerText = headerCartServeur.number_of_items+' items - $'+headerCartServeur.subtotal;
}