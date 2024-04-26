const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
let panier = [];

router.post('/panier', (req, res) => {
    
    const produits = req.body.produits; 
    console.log('Produits reçus depuis le frontend :', produits);
    panier.push(...produits);
    res.status(200).send('Produits ajoutés avec succès au panier');
});

// Route GET pour récupérer les produits du panier
router.get('/panier', (req, res) => {
    res.status(200).json(panier);
});
// Route DELETE pour vider le panier
router.delete('/panier', (req, res) => {
    panier = [];
    res.send('Panier vidé avec succès');
});
// Route DELETE pour retirer un produit du panier
router.delete('/panier/:productId', (req, res) => {
    const productId = req.params.productId;
    // Retirer le produit correspondant du panier
    panier = panier.filter(product => product.id !== productId);
    res.status(200).send(`Produit avec l'ID ${productId} retiré du panier avec succès`);
});

    


module.exports = router;

