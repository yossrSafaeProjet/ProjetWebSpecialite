const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const Tokens = require('csrf');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);
const tokens = new Tokens();
const csrfSecret = tokens.secretSync();

// Middleware pour ajouter le jeton CSRF à chaque requête
router.use((req, res, next) => {
    res.locals.csrfToken = tokens.create(csrfSecret);
    next();
  });

router.get('/csrf-delete',(req, res) => {
    const csrfToken = tokens.create(csrfSecret);
    console.log(csrfToken);
    res.json({ csrfToken: csrfToken });
});

router.delete('/product/:productId', (req, res) => {
    const { productId } = req.params;
    const csrfToken  = req.headers['x-csrf-token']; // Récupérez le jeton CSRF de la requête POST;
    console.log(csrfToken);
    // Vérification du token CSRF
    if (!tokens.verify(csrfSecret, csrfToken)) {
        return res.status(403).json({ error: 'CSRF token invalid' });
    }
    // Supprimez la publication de la base de données
    db.run('DELETE FROM produits WHERE id = ?', [productId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la suppression de la publication' });
        }
    });
});

module.exports = router;
