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
        let userLogin = await model.getUserByEmailDB(email);

        let user = await model.getUserByEmailSession(email);

        if (!userLogin) {
            return done(null, false, { erreur: 'erreur_nom_utilisateur' });
        }

        let valide = await compare(password, userLogin.password);

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
        let userTemp = await model.getUserByEmailDB(user.email);
        done(null, userTemp);
    }
    catch (error) {
        done(error);

    }
});