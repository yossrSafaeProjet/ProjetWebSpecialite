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

const SearchProduct = require('./SearchProduct');
const Panier = require('./Panier');
const Statistique = require('./Statistique');

const cors=require('cors');
const app = express();
const tokens = new Tokens();
const session = require('express-session');
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
app.use('',SearchProduct );
app.use('',Panier);
app.use('',Statistique);


app.get('/inscription', (req, res) => {res.render('inscription');});

app.use('/', registrationRouter); 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
module.exports = app;
