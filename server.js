// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, request, response, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js'
import { getCategoriesDB, getTopCategoriesDB } from './model/methodeDB.js';

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
        categories: await getTopCategoriesDB(),
        styles: ['/css/dropdown-menu.css'],
        headerCategories: await getCategoriesDB(),

    });

});
app.get('/privacy-policy', (request, response) => {
    response.render('privacy-policy', {
        titre: 'Privacy Policy',
        styles: ['/css/privacy-policy.css'],

    });
});

app.get('/panier', (request, response) => {
    response.render('panier', {
        titre: 'Panier',
        styles: ['/css/panier.css'],
    });
});

//-----------------------------------------------------------------------------------------

// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${ process.env.PORT }`);
