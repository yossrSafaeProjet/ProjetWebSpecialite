const express = require('express');
const cors = require('cors');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);

// Autoriser l'accès à partir de toutes les adresses IP
const corsOptions = {
    origin: '*',
  };
  
// Utilisez le middleware cors avec les options spécifiées
router.use(cors(corsOptions));

router.get('/statistiques', (req, res) => {
    const sql = `
        SELECT categorie as nom, COUNT(*) AS compte
        FROM produits
        GROUP BY categorie
    `;
    db.all(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
            return;
        }
        console.log(results);
        res.json(results);
    });
});

module.exports = router;
