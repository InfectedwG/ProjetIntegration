// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, request, response, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js'
import * as model from './model/methodeDB.js'

// Création du serveur
const app = express();
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static('public'));

// Ajouter les routes ici ...
//-------------------------------------- Pages --------------------------------------------
app.get('/', async (request, response) => {

    
    response.render('home', {
        titre: 'Accueil',
        categories: await model.getTopCategoriesDB(),
        styles: ['/css/dropdown-menu.css'],
        scripts: ['/js/home.js'],
        headerCategories: await model.getCategoriesDB(),

    });

});

app.get('/category', async (request, response) => {
    
    let categoryName = await model.getCategoryNameByIdDB(request.query.id_category);

    response.render('category', {
        titre: categoryName,
        styles: ['/css/category.css'],
        scripts: ['/js/category.js'],
        produits: await model.getProduitsByCategoryDB(request.query.id_category)
    });
});


app.get('/product', async (request, response) => {

    let productName = await model.getProductNameByIdDB(request.query.id_produit);

    response.render('product', {
        titre: productName,
        styles: ['/css/product.css'],
        scripts: ['/js/product.js'],
        produit: await model.getProductByIdDB(request.query.id_produit)
    });
});

app.get('/privacy-policy', (request, response) => {
    response.render('privacy-policy', {
        titre: 'Privacy Policy',
        styles: ['/css/privacy-policy.css'],

    });
});

app.get('/panier', async (request, response) => {
    let produits = await model.getCartListItemsByUserIdDB(2);
    let subtotal = 0;
    
    for(let p of produits){
        p.subtotal = p.price*p.quantity;
        subtotal += p.subtotal;
    }

    response.render('panier', {
        titre: 'Panier',
        styles: ['/css/panier.css'],
        scripts: ['/js/panier.js'],
        produits: produits,
        subtotal: subtotal.toFixed(2),
    });
});

//-------------------------------------APIs-------------------------------------------------

app.patch('/api/update_cart', async (request, response) => {
    let cart_id = await model.getCartIdByUserIdDB(2);
    let productIdArray = request.body.product_id;
    let quantityArray = request.body.quantity;
    let isSelectedArray = [];
    for(let selected of request.body.is_selected){
        if(selected) isSelectedArray.push(1);
        else isSelectedArray.push(0);
    }
    for(let i = 0; i < productIdArray.length; i++){
        await model.updateCartItemsByProductIdAndCartIdDB(cart_id[0].id, productIdArray[i], quantityArray[i], isSelectedArray[i]);        
    }
    response.status(201).end();
    
});

// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${ process.env.PORT }`);
