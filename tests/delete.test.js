const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());

// Route de suppression de produit
app.delete('/product/:productId', (req, res) => {
  const { productId } = req.params;

  // Simuler une erreur de token CSRF invalide
  if (req.headers['x-csrf-token'] === 'invalid_csrf_token') {
    return res.status(403).json({ error: 'CSRF token invalid' });
  }

  // Simuler une erreur de suppression de produit
  if (productId === '1') {
    return res.status(500).json({ error: 'Erreur lors de la suppression de la publication' });
  }

  // Simuler une suppression de produit réussie
  res.status(200).json({});
});

describe('DELETE /product/:productId', () => {
  it('should return 403 if CSRF token is invalid', async () => {
    const response = await request(app)
      .delete('/product/1')
      .set('x-csrf-token', 'invalid_csrf_token');

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: 'CSRF token invalid' });
  });

  it('should return 500 if there is an error deleting the product', async () => {
    const response = await request(app)
      .delete('/product/1')
      .set('x-csrf-token', 'valid_csrf_token');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erreur lors de la suppression de la publication' });
  });
  
  it('should return 200 if product is successfully deleted', async () => {
    const response = await request(app)
      .delete('/product/2')
      .set('x-csrf-token', 'valid_csrf_token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
