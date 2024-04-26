const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);
const jwt = require('jsonwebtoken');
router.post('/logout', (req, res) => {
    const token = req.session.token;
    jwt.verify(token, 'azerty', (err, decoded) => {
        if (err) {
            console.error('Erreur lors du décodage du jeton JWT :', err);
            return res.status(401).json({ error: 'Utilisateur non authentifié', token: token });
        } else {
           
            const userId = decoded.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Utilisateur non authentifié' });
            } 
            req.session.destroy((err) => {
                if (err) {
                    console.error('Erreur lors de la destruction de la session :', err);
                    return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
                }
        
                // Réussite de la déconnexion
                res.status(200).json({ message: 'Déconnexion réussie' });
            });
        }
    });
  });
  module.exports=router;