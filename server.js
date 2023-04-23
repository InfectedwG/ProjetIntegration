// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import session from 'express-session';
import memorystore from 'memorystore';
import express, { json, request, response, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js';
import passport from 'passport';
import * as model from './model/methodeDB.js';
import * as serveur from './model/methodeServeur.js';
import './authentification.js';
import { validationInscription } from './validationInscription.js';
import { validationConnexion } from './validationConnexion.js';
import middlewareSse from './middlewareSse.js';
import _ from 'lodash'


// Création du serveur
const app = express();
const MemoryStore = memorystore(session);
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// Ajout de middlewares
app.use(helmet(cspOption));

app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    cookie: { maxAge: 3600000 },
    name: process.env.npm_package_name,
    store: new MemoryStore({ checkPeriod: 3600000 }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(middlewareSse());



const taxRate = 0.14975;
//const _ = require('lodash');



// Ajouter les routes ici ...
//-------------------------------------- Pages --------------------------------------------
app.get('/', async (request, response) => {


    let cartAccess = false;

    let headerCart;

    if (request.user) {
        headerCart = await serveur.headerCartMethode(request.user.id, request.user.access_id);
    }
    else {
        headerCart = {
            subtotal: '0.00',
            number_of_items: '0',
        }
    }

    if (request.user && request.user.access_id === 1) {
        cartAccess = true;
    }

    response.render('home', {
        titre: 'Accueil',
        categories: await model.getTopCategoriesDB(),
        styles: ['/css/dropdown-menu.css'],
        scripts: ['/js/home.js'],
        headerCategories: await model.getCategoriesDB(),
        headerCart: headerCart,
        cartAccess: cartAccess,
    });

});

app.get('/login-signup', async (request, response) => {

    let cartAccess = false;

    if (request.user && request.user.access_id === 1) {
        cartAccess = true;
    }

    let headerCart = {
        subtotal: '0.00',
        number_of_items: '0',
    };

    response.render('login-inscription', {
        titre: 'Connexion/Inscription',
        styles: ['css/login-inscription.css', '/css/dropdown-menu.css'],
        scripts: ['js/login-signup.js'],
        headerCategories: await model.getCategoriesDB(),
        headerCart: headerCart,
        cartAccess: cartAccess,

    });
});

app.get('/category', async (request, response) => {

    let cartAccess = false;

    let headerCart;

    if (request.user) {
        headerCart = await serveur.headerCartMethode(request.user.id, request.user.access_id);
    }
    else {
        headerCart = {
            subtotal: '0.00',
            number_of_items: '0',
        }
    }

    if (request.user && request.user.access_id === 1) {
        cartAccess = true;
    }

    let categoryName = await model.getCategoryNameByIdDB(request.query.id_category);

    response.render('category', {
        titre: categoryName,
        styles: ['/css/category.css', '/css/dropdown-menu.css'],
        scripts: ['/js/category.js'],
        produits: await model.getProduitsByCategoryDB(request.query.id_category),
        headerCategories: await model.getCategoriesDB(),
        headerCart: headerCart,
        cartAccess: cartAccess,
    });
});


app.get('/product', async (request, response) => {


    let cartAccess = false;

    let headerCart;

    if (request.user) {
        headerCart = await serveur.headerCartMethode(request.user.id, request.user.access_id);
    }
    else {
        headerCart = {
            subtotal: '0.00',
            number_of_items: '0',
        }
    }

    if (request.user && request.user.access_id === 1) {
        cartAccess = true;
    }



    let productName = await model.getProductNameByIdDB(request.query.id_produit);

    response.render('product', {
        titre: productName.name,
        styles: ['/css/product.css', '/css/dropdown-menu.css'],
        scripts: ['/js/product.js'],
        categorieProduit: await model.getCategoryNameByProductId(request.query.id_produit),
        pruductsbycategorie: await model.getSameCategoryProductsByProductId(request.query.id_produit),
        produit: await model.getProductByIdDB(request.query.id_produit),
        headerCategories: await model.getCategoriesDB(),
        headerCart: headerCart,
        cartAccess: cartAccess,
    });
});

app.get('/profile', async (request, response) => {

    let cartAccess = false;

    if (request.user && request.user.access_id === 1) {

        let headerCart;

        cartAccess = true;

        if (request.user) {
            headerCart = await serveur.headerCartMethode(request.user.id, request.user.access_id);
        }
        else {
            headerCart = {
                subtotal: '0.00',
                number_of_items: '0',
            }
        }


        let user = await model.getAdresseById(request.user.id);
        let commandes = await model.getAllCommands(request.user.id);

        for (let c of commandes) {
            let subtotal = 0;
            let total = 0;
            let orderProducts = await model.getOrderProductsAlter(c.id);

            for (let p of orderProducts) {

                let productSubtotal = p.price * p.quantity;

                p.subtotal = productSubtotal.toFixed(2);

                subtotal += productSubtotal;

            }

            c.products = orderProducts;

            total = subtotal * (taxRate + 1);

            c.total = total.toFixed(2);

        }

        response.render('profile', {
            titre: "(profile de l'utilisateur)",
            styles: ['/css/profile.css'],
            scripts: ['/js/profile.js'],
            user: user,
            commandes: commandes,
            headerCart: headerCart,
            headerCategories: await model.getCategoriesDB(),
            cartAccess: cartAccess,
            headerCategories: await model.getCategoriesDB(),

        });
    }
    else {
        response.status(403).end();
    }
});

app.get('/privacy-policy', async (request, response) => {

    let cartAccess = false;

    let headerCart;

    if (request.user) {
        headerCart = await serveur.headerCartMethode(request.user.id, request.user.access_id);
    }
    else {
        headerCart = {
            subtotal: '0.00',
            number_of_items: '0',
        }
    }

    if (request.user && request.user.access_id === 1) {
        cartAccess = true;
    }

    response.render('privacy-policy', {
        titre: 'Privacy Policy',
        styles: ['/css/privacy-policy.css', '/css/dropdown-menu.css'],
        headerCategories: await model.getCategoriesDB(),
        headerCart: headerCart,
        cartAccess: cartAccess,

    });
});

app.get('/panier', async (request, response) => {

    let orderStatus = false;
    
    if(request.query){
        orderStatus = request.query.order_status;
    }

    let cartAccess = false;

    if (request.user && request.user.access_id === 1) {

        let headerCart;

        cartAccess = true;

        if (request.user) {
            headerCart = await serveur.headerCartMethode(request.user.id, request.user.access_id);
        }
        else {
            headerCart = {
                subtotal: '0.00',
                number_of_items: '0',
            }
        }

        let produits = await model.getCartListItemsByUserIdDB(request.user.id);
        let subtotal = 0;


        for (let p of produits) {
            let productSubtotal = p.price * p.quantity;
            p.subtotal = productSubtotal.toFixed(2);
            subtotal += productSubtotal;
        }

        let total = subtotal * (1 + taxRate);
        let taxAmount = subtotal * taxRate;

        response.render('panier', {
            titre: 'Panier',
            styles: ['/css/panier.css', '/css/dropdown-menu.css'],
            scripts: ['/js/panier.js'],
            produits: produits,
            subtotal: subtotal.toFixed(2),
            headerCategories: await model.getCategoriesDB(),
            pruductsbycategorie: await model.getSameCategoryProductsByProductId(3),
            headerCart: headerCart,
            taxRate: taxRate,
            taxAmount: taxAmount.toFixed(2),
            total: total.toFixed(2),
            cartAccess: cartAccess,
            orderStatus: orderStatus,

        });
    }
    else {
        response.status(403).end();
    }
});

app.get('/checkout', async (request, response) => {

    let cartAccess = false;

    if (request.user && request.user.access_id === 1) {
        let headerCart;

        cartAccess = true;

        if (request.user) {
            headerCart = await serveur.headerCartMethode(request.user.id, request.user.access_id);
        }
        else {
            headerCart = {
                subtotal: '0.00',
                number_of_items: '0',
            }
        }

        let cartItems = await model.getCartListItemsByUserIdDB(request.user.id);
        let orderItems = [];
        let subtotal = 0;


        for (let item of cartItems) {
            if (item.is_selected) {
                let itemSubtotal = item.price * item.quantity;
                item.subtotal = itemSubtotal.toFixed(2);
                orderItems.push(item);
                subtotal += itemSubtotal;
            }
        }

        let taxAmount = subtotal * taxRate;
        let total = subtotal * (1 + taxRate);


        let shippingInfo = await model.getShippingInfoByAddressIdDB(request.user.shipping_address_id);
        let billingInfo = await model.getBillingInfoByAddressIdDB(request.user.billing_address_id);


        // country is either canada or usa, nothing else
        let countryShipping = false;
        if (shippingInfo.country == 'CA') countryShipping = true;

        let countryBilling = false;
        if (billingInfo.country == 'CA') countryBilling = true;

        response.render('checkout', {
            titre: 'Checkout',
            styles: ['/css/dropdown-menu.css'],
            scripts: ['/js/checkout.js'],
            orderItems: orderItems,
            subtotal: subtotal.toFixed(2),
            headerCategories: await model.getCategoriesDB(),
            headerCart: headerCart,
            taxRate: taxRate,
            taxAmount: taxAmount.toFixed(2),
            total: total.toFixed(2),
            user: request.user,
            cartAccess: cartAccess,
            countryShipping: countryShipping,
            countryBilling: countryBilling,
            shipping_info: shippingInfo,
            billing_info: billingInfo,
        });
    }
    else {
        response.status(403).end();
    }
});

//-------------------------------------APIs-------------------------------------------------

app.patch('/api/update_cart', async (request, response) => {
    if (request.user && request.user.access_id === 1) {


        let cart_id = await model.getCartIdByUserIdDB(request.user.id);
        let productIdArray = request.body.product_ids;
        let quantityArray = request.body.quantities;
        let isSelectedArray = [];
        for (let selected of request.body.is_selecteds) {
            if (selected) isSelectedArray.push(1);
            else isSelectedArray.push(0);
        }
        for (let i = 0; i < productIdArray.length; i++) {

            if (quantityArray[i] === 0) await model.deleteCartItemsByProductIdAndCartIdDB(cart_id.id, productIdArray[i]);

            else await model.updateCartItemsByProductIdAndCartIdDB(cart_id.id, productIdArray[i], quantityArray[i], isSelectedArray[i]);
        }
        let produitsPanier = await model.getCartListItemsByUserIdDB(request.user.id);
        let subtotal = 0;

        for (let p of produitsPanier) {
            let productSubtotal = p.price * p.quantity;
            p.subtotal = productSubtotal.toFixed(2);
            subtotal += productSubtotal;
        }
        produitsPanier.push({
            subtotal: subtotal,
            taxRate: taxRate,
            total: subtotal * 1 + taxRate,
        });


        response.status(201).json(produitsPanier).end();
    }
    else {
        response.status(403).end();
    }

});

app.post('/api/add_to_cart', async (request, response) => {

    if (request.user === undefined) {
        response.status(403).end();
    }
    else if (request.user.access_id === 1) {
        let cart_id = await model.getCartIdByUserIdDB(request.user.id);
        let cartItems = await model.getCartListItemsByUserIdDB(2);
        let add = true;

        if (cartItems.length === 0) await model.addProductInCartDB(cart_id.id, request.body.product_id, request.body.quantity, 0);
        else {
            for (let item of cartItems) {
                if (item.product_id === request.body.product_id) add = false;
            }
            if (!add) await model.updateCartItemsByProductIdAndCartIdDB(cart_id.id, request.body.product_id, request.body.quantity, 1);
            else await model.addProductInCartDB(cart_id.id, request.body.product_id, request.body.quantity, 0);
        }
        let headerCart = await serveur.headerCartMethode(request.user.id, request.user.access_id);



        response.status(201).json(headerCart).end();
    }

    else {
        response.status(403).end();
    }
});

app.post('/api/place-order', async (request, response) => {

    if (request.user && request.user.access_id === 1) {
        let cartItems = await model.getCartListItemsByUserIdDB(request.user.id);
        let orderItems = [];
        let subtotal = 0;
        let total;
        let shippingFee = 0.0;
        let cart = await model.getCartIdByUserIdDB(request.user.id);
        let cart_id = cart.id

        if (cartItems.length > 0) {
            for (let item of cartItems) {
                if (item.is_selected) {
                    orderItems.push(item);
                    let itemSubtotal = item.price * item.quantity;
                    subtotal += itemSubtotal;

                }
            }
        }

        total = (subtotal + shippingFee) * (taxRate + 1);
        let today = new Date();
        let todayEpoch = today.getTime();

        if (orderItems.length > 0) {
            let shippingInfo = await model.getShippingInfoByAddressIdDB(request.user.shipping_address_id);
            if (!_.isEqual(shippingInfo, request.body.shippingInfo)) await model.updateUserShippingInfoDB(request.body.shippingInfo, request.user.id);

            let billingInfo = await model.getBillingInfoByAddressIdDB(request.user.billing_address_id);
            if (!_.isEqual(billingInfo, request.body.billingInfo)) await model.updateUserBillingInfoDB(request.body.billingInfo, request.user.id);
            
            let order_id = await model.placeOrderDB(request.user.id, 0.0, total, todayEpoch);
            if (order_id) {
                for (let item of orderItems) {
                    await model.insertOrderDetailsDB(order_id, item.product_id, item.quantity);
                    await model.deleteCartItemsByProductIdAndCartIdDB(cart_id, item.product_id);
                }
                response.status(201).json({order_status: true}).end();
            }
            else response.status(403).json({ message: "erreur order_id" }).end();
        }
        else response.status(403).json({ message: "erreur aucun item dans order" }).end();


    }
    else response.status(403).json({ message: "acces interdit" }).end();
});

//-----------------------------------Connexion/Deconnexion/Inscription---------------------------------------
app.post('/inscription', async (request, response, next) => {
    //valider les donner recu du client
    if (/*validationInscription(request.body)*/true) {

        try {
            let user_id = await model.addUserBasicDB(request.body.email, request.body.password, request.body.prenom, request.body.nom);


            let user = await model.getUserById(user_id);

            response.status(201).end();
            //response.pushJson(user, 'update-new-user');
        }
        catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT') {
                response.status(409).end();
            }
            else {
                next(error);
            }
        }
    }
    else {
        response.status(400).end();
    }
});

app.post('/connexion', (request, response, next) => {
    //valider les donner recu du client
    if (/*validationConnexion(request.body)*/ true) {
        passport.authenticate('local', (error, email, info) => {
            if (error) {
                next(error);
            }
            else if (!email) {
                response.status(401).json(info);
            }
            else {
                request.logIn(email, (error) => {
                    if (error) {
                        next(error);
                    }
                    else {
                        response.status(200).end();
                    }
                });
            }
        })(request, response, next);
    }
    else {
        response.status(400).end();
    }
});

app.get('/deconnexion', (request, response, next) => {
    request.logOut((error) => {
        if (error) {
            next(error);
        }
        else {
            response.redirect('/');
        }
    })
});

app.patch('/api/profile', async (request, response) => {

    if (request.user && request.user.access_id === 1) {

        try {
            if (!request.user) {
                return response.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            console.log(request.body);
            await model.updateUser(request.user.id, request.body.prenom, request.body.nom, request.body.email, request.body.adresse, request.body.appart, request.body.ville, request.body.postalCode, request.body.province, request.body.pays);

            let user = await model.getUserById(request.user.id);
            // Renvoyer la réponse
            response.status(201).json(user).end();
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Erreur serveur' });
        }
    }
    else {
        response.status(403).end();
    }
});

app.patch('/api/profile-password', async (request, response) => {

    if (request.user && request.user.access_id === 1) {

        try {
            if (!request.user) {
                return response.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            console.log(request.body);
            await model.updateUserPassword(request.user.id, request.body.passwordRegister);

            let user = await model.getUserById(request.user.id);
            // Renvoyer la réponse
            response.status(201).json(user).end();
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Erreur serveur' });
        }
    }
    else {
        response.status(403).end();
    }
});



// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${process.env.PORT}`);
