// server.js
const express = require('express');
const passport = require('passport');
const path = require('path')
const loginRouter = require('./login');
const app = express();
app.set('view engine', 'ejs');

/* require('./Bdd'); */

app.use(express.static('Login'));
app.use(express.static('public'));
app.use(passport.initialize());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('css'));

// Routes
app.get('/login', (req, res) => res.render('login'));

app.use('/', loginRouter); 

app.get('/inscription', (req, res) => {
    res.render('inscription');
  });
  const registrationRouter = require('./Inscription');
  app.use('/enregistrerUtilisateur', registrationRouter); 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
