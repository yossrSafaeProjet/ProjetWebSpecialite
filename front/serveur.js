const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('css'));
app.get('/', (req, res) => res.render('Acceuil'));

app.get('/login', (req, res) => res.render('login'));
app.get('/dashbord', (req, res) => res.render('Dashbord'));

app.listen(port, () => {
  console.log(`Serveur front-end en cours d'exécution sur le port ${port}`);
});