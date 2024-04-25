const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);

router.post('/addProduct', (req, res, next) => {
    const { libelle, description, images, prix, categorie, url_statistiques } = req.body;
    const userId = req.user ? req.user.id : null; // Assurez-vous que l'utilisateur est authentifié et que req.user contient les informations nécessaires

    // Vérifiez si l'utilisateur est authentifié
   /*  if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
    } */

    // Insérez le produit dans la base de données avec le userId associé à l'utilisateur authentifié
    db.run(`
        INSERT INTO produits (libelle, description, images, prix, categorie,userId)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [libelle, description, images, prix, categorie,userId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'insertion du produit' });
        }

        res.json({ success: true, message: 'Produit ajouté avec succès' });
    });
});


module.exports = router;
