const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);

router.get('/search', (req, res) => {
    const searchTerm = req.query.query;

    // Requête SQL pour rechercher dans la table produit en fonction de la catégorie
    const sql = "SELECT * FROM produits where categorie= ?";

    // Paramètre pour rechercher la catégorie qui correspond au terme de recherche
    const searchParam = searchTerm;
    console.log(searchParam);
    // Exécution de la requête avec le paramètre de recherche
    db.all(sql, [searchParam],(err, rows) => {
        if (err) {
            console.error("Erreur lors de la recherche:", err.message);
            return res.status(500).json({ error: 'Erreur lors de la recherche' });
        }
        // Envoi des résultats de la recherche au format JSON
        console.log("Résultats de la recherche:", rows);
        res.json({ results: rows });
    });
});


module.exports = router;
