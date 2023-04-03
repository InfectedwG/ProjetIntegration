
import * as model from './methodeDB.js';

export const headerCartMethode = async () => {
    let produits = await model.getCartListItemsByUserIdDB(2);
    let subtotal = 0;
    let numberOfItems = 0;
    
    for(let p of produits){        
        subtotal += p.price*p.quantity;
        numberOfItems += p.quantity;
    }

    let headerCart = {
        subtotal: subtotal,
        number_of_items: numberOfItems,
    }

    return headerCart;
}