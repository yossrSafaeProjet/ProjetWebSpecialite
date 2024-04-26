const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);
const jwt = require('jsonwebtoken');

router.put('/updateProduct/:productId', (req, res, next) => {
    const { productId } = req.params;
    const { libelle, description, images, prix, categorie } = req.body;
    const token = req.session.token;
    jwt.verify(token, 'azerty', (err, decoded) => {
        if (err) {
            console.error('Erreur lors du décodage du jeton JWT :', err);
            return res.status(401).json({ error: 'Token JWT invalide' });
        } else {
            // Récupérer l'ID de l'utilisateur à partir du token
            const userId = decoded.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Utilisateur non authentifié' });
            } 
            db.run(`
        UPDATE produits 
        SET libelle = ?, description = ?, images = ?, prix = ?, categorie = ?, userId = ?
        WHERE id = ?
    `, [libelle, description, images, prix, categorie, userId, productId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
        }

        res.json({ success: true, message: 'Produit mis à jour avec succès' });
    });
        }
    });
    
});



module.exports = router;
