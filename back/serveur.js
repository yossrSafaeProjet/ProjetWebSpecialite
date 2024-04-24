// server.js
const express = require('express');
const passport = require('passport');
const path = require('path')
const loginRouter = require('./login');
const addProductRouter = require('./AjouterProduit');
const registrationRouter = require('./Inscription');
const ficheProductRouter=require('./FicheProduct');
const app = express();
/* require('./Bdd'); */

app.use(express.static('Login'));
/* app.use(express.static('public')); */
app.use(passport.initialize());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');

app.use(cors()); 
// Routes



app.use('/', loginRouter); 
app.use('', addProductRouter); 
app.use('', ficheProductRouter);
app.get('/inscription', (req, res) => {
  //const csrfToken = req.csrfToken();
  res.render('inscription');
  });

app.use('/', registrationRouter); 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
