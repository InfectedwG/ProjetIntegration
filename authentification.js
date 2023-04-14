import { compare } from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import * as model from "./model/methodeDB.js";

let config = {
    usernameField: 'email',
    passwordField: 'password',
}

passport.use(new Strategy(config, async (email, password, done) => {
    try {
        let user = await model.getUserByEmail(email);

        if (!user) {
            return done(null, false, { erreur: 'erreur_nom_utilisateur'});
        }

        let valide = await compare(password, user.password);

        if (!valide) {
            return done(null, false, { erreur: 'erreur_mot_passe' });
        }
        return done(null, user);
    }

    catch (error) {
        return done(error);
    }

}));

passport.serializeUser((user, done) => {
    
    done(null, {
        user_id: user.id,
        email: user.email,
        access_id: user.access_id,
    });
});

passport.deserializeUser(async (user, done) => {
     
    try {
        let userTemp = await model.getUserByEmail(user.email);
        done(null, userTemp);
    }
    catch (error) {
        done(error);
        
    }
});