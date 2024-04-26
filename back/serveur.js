const express = require('express');
const passport = require('passport');
const path = require('path');
const Tokens = require('csrf');

const loginRouter = require('./login');
const addProductRouter = require('./AjouterProduit');
const registrationRouter = require('./Inscription');
const ficheProductRouter=require('./FicheProduct');
const deleteProductRouter=require('./DeleteProduct');
const updateProductRouter = require('./UpdateProduct');
const SearchProduct = require('./SearchProduct');
const Panier = require('./Panier');
const Statistique = require('./Statistique');


const app = express();
const tokens = new Tokens();

app.use(express.static('Login'));
app.use(passport.initialize());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());



app.use('/', loginRouter); 
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
