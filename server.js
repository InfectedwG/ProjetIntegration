// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js'

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
app.get('/', (request, response) => {
    response.render('home', {
        title: 'Page d\'accueil',
        contenu: [
            {
                nom: 'express',
                description: 'Plateforme de gestion de requêtes HTTP et de création de serveur web.'
            },
            {
                nom: 'compression',
                description: 'Compression des requêtes et réponses envoyé et reçu par le serveur.'
            },
            {
                nom: 'cors',
                description: 'Support des Cross-Origin Resource Sharing.'
            },
            {
                nom: 'helmet',
                description: 'Sécuriser le serveur en le protégeant des attaques HTTP typiques.'
            },
            {
                nom: 'dotenv',
                description: 'Permet d\'utiliser un fichier de configuration .env pour configurer des variables d\'environnement.'
            },
            {
                nom: 'mysql-promise',
                description: 'Permet la connection à une base de données MySQL.'
            },
            {
                nom: 'sqlite3',
                description: 'Ouvre une base de données intégré dans l\'application Node.js.'
            },
            {
                nom: 'sqlite',
                description: 'Permet la connection à une base de données SQLite.'
            },
            {
                nom: 'express-handlebars',
                description: 'Permet l\'utilisation de Handlebars pour générer du HTML sur le serveur.'
            }
        ]
    });
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
