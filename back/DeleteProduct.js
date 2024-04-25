const express = require('express');
const SQLite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, 'ma_base_de_donnees.db');
const db = new SQLite3.Database(dbPath);

router.delete('/product/:productId', (req, res) => {
    const { productId } = req.params;
    /* const userId = req.user.id; */

    // Vérifiez si l'utilisateur est authentifié
   /*  if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
    } */

    // Supprimez la publication de la base de données
    db.run('DELETE FROM produits WHERE id = ?', [productId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la suppression de la publication' });
        }
    });
});

module.exports = router;
