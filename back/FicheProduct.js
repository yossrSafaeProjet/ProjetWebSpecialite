const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);
router.get('/AllProduit', (req, res) => {
    const userId = null; // Assurez-vous que l'utilisateur est authentifié et que req.user contient les informations nécessaires

    // Vérifiez si l'utilisateur est authentifié
   /*  if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
    } */
    getProductForUser(res);
});
function getProductForUser(res) {
    db.all('SELECT * FROM produits' , (err, produits) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
        }

        res.json({ produits });
    });
}

router.get('/product/:productId', (req, res) => {
    const productId = req.params.productId;

    // Assurez-vous que l'utilisateur est authentifié et que req.user contient les informations nécessaires
    const userId = null;

    // Vérifiez si l'utilisateur est authentifié
    /* if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
    } */

    // Recherchez le produit dans la base de données par son ID
    db.get('SELECT * FROM produits WHERE id = ?', [productId], (err, produit) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
        }

        if (!produit) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        res.json({ produit });
    });
});



module.exports=router;