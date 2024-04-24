const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);
router.get('/AllProduit', (req, res) => {
    const userId = req.user.id; // Assurez-vous que l'utilisateur est authentifié et que req.user contient les informations nécessaires

    // Vérifiez si l'utilisateur est authentifié
   /*  if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
    } */
    getProductForUser(userId,res);
});
function getProductForUser(userId, res) {
    // Récupérez toutes les publications de la base de données pour l'utilisateur spécifique
    db.all('SELECT * FROM publications WHERE user_id = ?', [userId], (err, publications) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des publications' });
        }

        // Envoyez les publications au client
        res.json({ publications });
    });
}

module.exports=router;