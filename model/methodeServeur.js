
import * as model from './methodeDB.js';

export const headerCartMethode = async (user) => {
    let headerCart;

    if (user.access_id === 1) {
        let produits = await model.getCartListItemsByUserIdDB(user.id);
        let subtotal = 0;
        let numberOfItems = 0;

        for (let p of produits) {
            subtotal += p.price * p.quantity;
            numberOfItems += p.quantity;
        }

        headerCart = {
            subtotal: subtotal.toFixed(2),
            number_of_items: numberOfItems,
        }

        return headerCart;
    }
    else {
        headerCart = {
            subtotal: '0.00',
            number_of_items: '0',
        }

        return headerCart;
    }
}