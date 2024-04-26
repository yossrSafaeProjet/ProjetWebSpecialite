const express = require('express');
const passport = require('passport');
const path = require('path');
const Tokens = require('csrf');

const loginRouter = require('./login');
const logoutRouter = require('./Deconnexion');
const addProductRouter = require('./AjouterProduit');
const registrationRouter = require('./Inscription');
const ficheProductRouter=require('./FicheProduct');
const deleteProductRouter=require('./DeleteProduct');
const updateProductRouter = require('./UpdateProduct');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));
app.use(session({ secret: 'azerty', resave: true, saveUninitialized: true }));
app.use(express.static('Login'));
app.use(passport.initialize());



const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.use('/', loginRouter); 
app.use('/', logoutRouter); 
app.use('', addProductRouter); 
app.use('', updateProductRouter);
app.use('', ficheProductRouter);
app.use('',deleteProductRouter );
app.get('/inscription', (req, res) => {
  //const csrfToken = req.csrfToken();
  res.render('inscription');
  });

app.use('/', registrationRouter); 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
