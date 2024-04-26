const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);

router.post('/addProduct',
 (req, res, next) => {
 
    const { libelle, description, images, prix, categorie } = req.body;
    const token = req.session.token;
    
    jwt.verify(token, 'azerty', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Utilisateur non authentifié' });
        } else {
            // L'objet 'decoded' contient les informations du jeton décodé
            // Vous pouvez accéder à l'ID de l'utilisateur comme suit
            const userId = decoded.userId;
            db.run(`
        INSERT INTO produits (libelle, description, images, prix, categorie, userId)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [libelle, description, images, prix, categorie, userId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'insertion du produit' });
        }

        res.json({ success: true, message: 'Produit ajouté avec succès' });
    });
        }
    });
    // Insérer le produit dans la base de données avec le userId associé à l'utilisateur authentifié
   
});


module.exports = router;
