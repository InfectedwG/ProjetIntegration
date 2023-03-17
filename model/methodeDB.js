import connectionPromise from './connexion.js';

export const getProduitParCategorieDB = async (category_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select *
        from Product
        where category_id = ?;
        `, [category_id]
    );
    return resultat;
}

export const getTopCategoriesDB = async () => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select name, img_name
        from Categories
        limit 6;
        `
    );

    return resultat;
}

export const getCategoriesDB = async () => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select name
        from Categories;
        `
    );

    return resultat;
}

export const getProductByIdDB = async (product_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select *
        from Products
        where id = ?;
        `, [product_id]
    );

    return resultat;
}

export const getCartListItemsByUserIdDB = async (user_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select ci.product_id, ci.quantity, ci.is_Selected, p.name, p.description
        from Cart c
        join Cart_Items ci on ci.cart_id = c.id
        join Product p on ci.product_id = p.id
        where c.user_id = ?;
        `, [user_id]
    );

    return resultat;
}


export const getOrdersByUserIdDB = async (user_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select *
        from Orders
        where user_id = ?;
        `, [user_id]
    );

    return resultat;
}

export const getOrderDetailsByOrderIdDB = async (order_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select op.product_id, p.name, p.description, op.quantity
        from Order_Product op
        join Products p on p.id = op.product_id
        where op.order_id = ?;
        `, [order_id]
    );

    return resultat;
}

export const getUserByIdDB = async (user_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select *
        from Users
        where id = ?;
        `, [user_id]
    );
    return resultat;
}

export const getUserByEmailDB = async (email) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select *
        from Users
        where email = ?;
        `, [email]
    );
    return resultat;
}

export const addUserDB = async (email, name, password) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.run(
        `
        insert into Users(name, email, password)
        values (?, ?, ?);
        `, [name, email, password]
    );
    return resultat.lastID;
}

export const updateUserShippingInfoDB = async (user_id, address, city, postal_code, province_state, country) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.run(
        `
        update Users
        set address = ?,
            city = ?,
            postal_code = ?,
            province_state = ?,
            country = ?
        where id = ?;
        `, [address, city, postal_code, province_state, country, user_id]
    );
    return resultat.lastID;
}

export const changeUserAccessDB = async (user_id, access_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.run(
        `
        update Users
        set access_id = ?
        where id = ?
        `, [access_id, user_id]
    );
    return resultat.lastID;
}

export const getGabaritDB = async () => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        
        `
    );
    return resultat;
}

export const runGabaritDB = async () => {
    let connexion = await connectionPromise;

    let resultat = await connexion.run(
        `
        
        `
    );
    return resultat.lastID;
}

