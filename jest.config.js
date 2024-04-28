// jest.config.js
module.exports = {
    testEnvironment: 'node', // Indique à Jest d'utiliser un environnement Node.js pour exécuter les tests
    testMatch: ['**/tests/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'], // Les fichiers de test seront recherchés dans ces chemins
};
