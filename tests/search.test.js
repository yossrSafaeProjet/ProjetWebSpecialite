const request = require('supertest');
const app = require('../back/serveur');

describe('GET /search', () => {
  it('should return search results based on category', async () => {
    const searchTerm = 'categoryName'; // Définissez le terme de recherche ici
    const response = await request(app)
      .get('/search')
      .query({ query: searchTerm });

    expect(response.status).toBe(200);
    expect(response.body.results).toBeDefined();
    // Ajoutez d'autres assertions selon vos besoins pour vérifier les résultats de la recherche
  });
});
