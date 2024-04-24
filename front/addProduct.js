document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);
    fetch('http://localhost:5000/addProduct', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Erreur:', error);
        // Gère les erreurs, par exemple afficher un message d'erreur à l'utilisateur
    });
});
