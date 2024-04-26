const express = require('express');
const passport = require('passport');
const SQLite3 = require('sqlite3').verbose();
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Tokens = require('csrf');
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const tokens = new Tokens();

// Créer un jeton CSRF
const csrfSecret = tokens.secretSync();

// Middleware pour ajouter le jeton CSRF à chaque requête
router.use((req, res, next) => {
  res.locals.csrfToken = tokens.create(csrfSecret);
  next();
});
router.get('/csrf', (req, res) => {
    const csrfToken = tokens.create(csrfSecret);
    res.json({ csrfToken: csrfToken });
  });
// Configurations Passport
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        const db = new SQLite3.Database(dbPath);
        db.get('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, row) => {
            if (err) {
                return done(err);
            }
            if (!row) {
                return done(null, false, { message: 'Utilisateur non trouvé.' });
            }

            bcrypt.compare(password, row.password, (bcryptErr, result) => {
                if (bcryptErr) {
                    return done(bcryptErr);
                }

                if (!result) {
                    return done(null, false, { message: 'Mot de passe incorrect.' });
                }

                return done(null, row);
            });
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const db = new SQLite3.Database(dbPath);
    db.get('SELECT * FROM utilisateurs WHERE id = ?', [id], (err, row) => {
        done(err, row);
    });
});

router.post('/login', (req, res, next) => {
    // Vérifier le jeton CSRF
    const csrfToken = req.headers['x-csrf-token'];
    //console.log(tokens.verify(csrfSecret, csrfToken));
    if (!tokens.verify(csrfSecret, csrfToken)) {
        return res.status(403).json({ message: 'Token CSRF invalide.' });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }
        // L'utilisateur est authentifié avec succès
        return res.status(200).json({ message: 'Connexion réussie.', user: user });
    })(req, res, next);
});

module.exports = router;
