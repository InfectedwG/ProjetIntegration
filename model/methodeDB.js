import connectionPromise from './connexion.js';
import { hash } from 'bcrypt';

export const addUserBasicDB = async (email, password, prenom, nom) => {
    let connexion = await connectionPromise;

    let passwordHashed = await hash(password, 10);

    let resultat = await connexion.run(
        `
        insert into Users(first_name, last_name, email, password, access_id)
        values(?, ?, ?, ?, 1)
        `, [prenom, nom, email, passwordHashed]
    );

    await connexion.run(
        `
        insert into Cart(user_id)
        values(?)
        `, [resultat.lastID]
    )

    return resultat.lastID;
}

export const getUserByEmailDB = async (email) => {
    let connexion = await connectionPromise;

    let user = await connexion.get(
        `
        select *
        from Users
        where email = ?
        `, [email]
    )

    return user;
}

export const getUserByEmailSession = async (email) => {
    let connexion = await connectionPromise;

    let user = await connexion.get(
        `
        select id, first_name, last_name, email, billing_address_id, shipping_address_id, access_id
        from Users
        where email = ?
        `, [email]
    )

    return user;
}

// trouve un utilisateur avec son id
export const getUserById = async (user_id) => {
    let connexion = await connectionPromise;

    let user = await connexion.get(
        `
        select *
        from Users
        where id = ?
        `, [user_id]
    )

    return user;
}

export const getAdresseById = async (user_id) => {
    let connexion = await connectionPromise;

    let adresse = await connexion.get(
        `
        SELECT u.id, u.first_name, u.last_name, u.email, a.street_address, a.appartment, a.city, a.postal_code, a.province_state, a.country
        FROM Users u
        JOIN Addresses a ON u.shipping_address_id = a.id
        WHERE u.id  = ?
        `, [user_id]
    )

    return adresse;
}

export const getAllUser = async () => {
    let connexion = await connectionPromise;

    let users = await connexion.all(
        `
        select *
        from Users
        `
    )

    return users;
}

export const getProduitsByCategoryDB = async (category_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select *
        from Products
        where category_id = ?;
        `, [category_id]
    );
    return resultat;
}
export const getSameCategoryProductsByProductId = async (product_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
          SELECT p2.id, p2.code, p2.name, p2.price
          FROM Products p1 
          INNER JOIN Products p2 ON p1.category_id = p2.category_id 
          WHERE p1.id = ?
          ;
        `, [product_id]




    );

    return resultat;
}

export const getCategoryNameByProductId = async (product_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        SELECT Categories.name
        FROM Categories 
        INNER JOIN Products 
        ON Categories.id = Products.category_id 
        WHERE Products.id = ?;
        `, [product_id]


    );

    return resultat;
}

export const getTopCategoriesDB = async () => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select *
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
        select name, id
        from Categories;
        `
    );

    return resultat;
}

export const getCategoryNameByIdDB = async (category_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        `
        select name, id
        from Categories
        where id = ?;
        `, [category_id]
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

export const getProductNameByIdDB = async (product_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.get(
        `
        select name
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
        select ci.product_id as product_id, ci.quantity as quantity, ci.is_selected as is_selected, p.name as name, p.price as price
        from Cart c
        join Cart_Items ci on ci.cart_id = c.id
        join Products p on ci.product_id = p.id
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

    let resultat = await connexion.get(
        `
        select *
        from Users
        where id = ?;
        `, [user_id]
    );
    return resultat;
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

export const placeOrderDB = async (user_id, shipping_fee, total, date) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.run(
        `
        insert into Orders(user_id, shipping_fee, total, date)
        values (?, ?, ?, ?)
        `, [user_id, shipping_fee, total, date]
    );
    return resultat.lastID;
}

export const insertOrderDetailsDB = async (order_id, product_id, quantity) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.run(
        `
        insert into Order_Product(order_id, product_id, quantity)
        values(?, ?, ?)
        `, [order_id, product_id, quantity]
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

export const getCartIdByUserIdDB = async (user_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.get(
        `
        select id
        from Cart
        where user_id = ?
        `, [user_id]
    );
    return resultat;
}

export const updateCartItemsByProductIdAndCartIdDB = async (cart_id, product_id, quantity, is_selected) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.run(
        `
        update Cart_Items
        set quantity = ?,
            is_selected = ?
        where cart_id = ? and product_id = ?
        `, [quantity, is_selected, cart_id, product_id]
    );
    return resultat.lastID;
}

export const deleteCartItemsByProductIdAndCartIdDB = async (cart_id, product_id) => {
    let connexion = await connectionPromise;

    let resultat = await connexion.run(
        `
        delete from Cart_Items        
        where cart_id = ? and product_id = ?
        `, [cart_id, product_id]
    );
    return resultat;
}

export const addProductInCartDB = async (cart_id, product_id, quantity, is_selected) => {

    let connexion = await connectionPromise;

    let resultat = await connexion.run(

        `
        INSERT INTO Cart_Items (cart_id, product_id, quantity, is_Selected)
        values (?, ?, ?, ?)
        `
        , [cart_id, product_id, quantity, is_selected]

    );

    return resultat;

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


export const updateUser = async (user_id, first_name, last_name, email, street_address, appartment, city, postal_code, province_state, country) => {
    let connexion = await connectionPromise;

    // Hash le mot de passe si une nouvelle valeur est fournie
    //let passwordHashed = password ? await hash(password, 10) : undefined;

    // Récupère l'ID de l'adresse d'expédition de l'utilisateur
    let shippingAddress = await connexion.get(
        `
        select shipping_address_id
        from Users
        where id = ?
        `, [user_id]
    );



    // Met à jour l'adresse d'expédition de l'utilisateur
    if (shippingAddress) {
        await connexion.run(
            `
            update Addresses
            set street_address = ?,
                appartment = ?,
                city = ?,
                postal_code = ?,
                province_state = ?,
                country = ?
            where id = ?
            `, [street_address, appartment, city, postal_code, province_state, country, shippingAddress.shipping_address_id]
        );
    }

    // Met à jour les informations de base de l'utilisateur
    await connexion.run(
        `
        update Users
        set first_name = ?,
            last_name = ?,
            email = ?
            
        where id = ?
        `, [first_name, last_name, email, user_id]
    );
}


export const updateUserPassword = async (user_id, password) => {
    let connexion = await connectionPromise;

    // Hash le mot de passe si une nouvelle valeur est fournie
    let passwordHashed = password ? await hash(password, 10) : undefined;

    // Met à jour le mot de passe de l'utilisateur
    await connexion.run(
        `
        update Users
        set password = ?
        where id = ?
        `, [passwordHashed, user_id]
    );
}


export const getAllCommands = async (user_id) => {
    let connexion = await connectionPromise;
  
    // Récupère les commandes de l'utilisateur avec son nom
    const rows = await connexion.all(`
      SELECT Orders.id, Orders.total, Orders.date, Users.first_name, Users.last_name
      FROM Orders
      JOIN Users ON Orders.user_id = Users.id
      WHERE Orders.user_id = ?;
    `, [user_id]);
  
    console.log(rows);
  
    return rows;
  }
  

  export const getOrderProducts = async (user_id) => {
    let connexion = await connectionPromise;

    const rows = await connexion.all(`
        SELECT Order_Product.product_id , Products.name, Order_Product.quantity, Products.price, Products.code
        FROM Order_Product 
        JOIN Products ON Order_Product.product_id = products.id
        JOIN Orders ON Order_Product.order_id = Orders.id 
        WHERE Orders.user_id = ?;
    `, [user_id]);

    console.log(rows);

    return rows;
}





