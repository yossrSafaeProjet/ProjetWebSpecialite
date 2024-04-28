
const request = require('supertest');
const app = require('../back/serveur');
 
describe('POST /panier - Ajout de produits au panier', () => {
  it('should add products to the cart and return 200 OK', async () => {
    const produits = [
      { id: 1, nom: 'Produit 1', prix: 10 },
      { id: 2, nom: 'Produit 2', prix: 20 }
    ];

    const res = await request(app)
      .post('/panier')
      .send({ produits });

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Produits ajoutés avec succès au panier');
  });
});

describe('GET /panier - Récupération des produits du panier', () => {
  it('should return the products in the cart and return 200 OK', async () => {
    const res = await request(app).get('/panier');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe('DELETE /panier - Vidage du panier', () => {
  it('should empty the cart and return 200 OK', async () => {
    const res = await request(app).delete('/panier');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Panier vidé avec succès');
  });
});

describe('DELETE /panier/:productId - Retrait d\'un produit du panier', () => {
  it('should remove a product from the cart and return 200 OK', async () => {
    const productId = 1;
    const res = await request(app).delete(`/panier/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(`Produit avec l'ID ${productId} retiré du panier avec succès`);
  });
});
