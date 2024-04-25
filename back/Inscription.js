const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const Tokens = require('csrf');
const bcrypt = require('bcrypt');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const tokens = new Tokens();
router.use(bodyParser.json());
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');

const csrfSecret = tokens.secretSync();

// Middleware pour ajouter le jeton CSRF à chaque requête
router.use((req, res, next) => {
  res.locals.csrfToken = tokens.create(csrfSecret);
  next();
});

router.get('/csrf-token', (req, res) => {
  const csrfToken = tokens.create(csrfSecret);
  res.json({ csrfToken: csrfToken });
});

router.post('/enregistrerUtilisateur', (req, res) => {
  const csrfToken = req.headers['x-csrf-token']; // Récupérez le jeton CSRF de la requête POST

  //console.log(tokens.verify(csrfSecret, csrfToken));
  // Vérifiez si le jeton CSRF est valide
  if (!tokens.verify(csrfSecret, csrfToken)) {
    // Le jeton CSRF n'est pas valide, renvoyez une erreur
    res.status(403).send('Erreur CSRF : jeton CSRF non valide');
    return;
  }

  const utilisateur = req.body;
  const db = new SQLite3.Database(dbPath);

  // Vérifiez si les mots de passe correspondent
  if (utilisateur.password !== utilisateur.confirmationMotDePasse) {
    res.status(400).send('Les mots de passe ne correspondent pas. Veuillez réessayer.');
    return;
  }

  // Hasher le mot de passe
  bcrypt.hash(utilisateur.password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors du hashage du mot de passe.');
      return;
    }
    // Insérez l'utilisateur dans la base de données avec le mot de passe hashé
    db.run(`
      INSERT INTO utilisateurs (nom, prenom, email, password) VALUES (?, ?, ?, ?)
    `, [utilisateur.nom, utilisateur.prenom, utilisateur.email, hashedPassword], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Erreur lors de l\'enregistrement de l\'utilisateur.');
      } else {
        res.json(utilisateur);
      }
    });
  });
});

module.exports = router;
