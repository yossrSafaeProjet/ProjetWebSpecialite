const request = require('supertest');


const app = require('../back/serveur');


describe('POST /addProduct', () => {
  it('should return 401 if user is not authenticated', async () => {
    const response = await request(app)
      .post('/addProduct')
      .send({
        libelle: 'Product 1',
        description: 'Description du produit',
        images: ['image1.jpg', 'image2.jpg'],
        prix: 10.99,
        categorie: 'Electronique'
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Utilisateur non authentifié' });
  });

});
