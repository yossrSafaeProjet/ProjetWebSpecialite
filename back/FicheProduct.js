const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const jwt = require('jsonwebtoken');
const db = new SQLite3.Database(dbPath);
router.get('/AllProduit', (req, res) => {
     // Assurez-vous que l'utilisateur est authentifié et que req.user contient les informations nécessaires
     const token = req.session.token;
     jwt.verify(token, 'azerty', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Utilisateur non authentifié', token: token });
            
        } else {
            // L'objet 'decoded' contient les informations du jeton décodé
            // Vous pouvez accéder à l'ID de l'utilisateur comme suit
            const userId = decoded.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Utilisateur non authentifié' });
            } 
            getProductForUser(userId,res);
            console.log('ID de l\'utilisateur extrait du jeton JWT :', userId);
        }
       
    });
    // Vérifiez si l'utilisateur est authentifié
   
});
function getProductForUser(userId,res) {
  
    db.all('SELECT * FROM produits WHERE userId= ? ' ,[userId], (err, produits) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
        }

        res.json({ produits });
    });
}

router.get('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    const token = req.session.token;
    jwt.verify(token, 'azerty', (err, decoded) => {
        if (err) {
            console.error('Erreur lors du décodage du jeton JWT :', err);
        } else {
            
            const userId = decoded.userId;
             if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
    } 

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
            console.log('ID de l\'utilisateur extrait du jeton JWT :', userId);
        }
    });
    // Assurez-vous que l'utilisateur est authentifié et que req.user contient les informations nécessaires


    // Vérifiez si l'utilisateur est authentifié
   
});



module.exports=router;