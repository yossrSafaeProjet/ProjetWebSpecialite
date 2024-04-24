document.addEventListener("DOMContentLoaded", function() {
    // Requête pour récupérer le jeton CSRF depuis le back-end
    fetch('http://localhost:5000/csrf-token')
        .then(response => response.json())
        .then(data => {
            const csrfToken = data.csrfToken;
            console.log("Jetons CSRF reçu :", csrfToken); // Ajoutez cette ligne pour afficher le jeton CSRF reçu dans la console
            // Stockage du jeton CSRF dans le champ caché du formulaire
            document.getElementById("csrfToken").value = csrfToken;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du jeton CSRF:', error);
        }); 
    
    
    document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page après la soumission du formulaire
    
    // Récupération des valeurs des champs du formulaire
    var nom = document.getElementById('nom').value;
    var prenom = document.getElementById('prenom').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmationMotDePasse = document.getElementById('confirmationMotDePasse').value;
    var csrfToken = document.getElementById('csrfToken').value; // Récupération du jeton CSRF

    var message = document.getElementById('message');

    // Vérifier si les mots de passe correspondent
    if (password !== confirmationMotDePasse) {
        message.textContent = "Les mots de passe ne correspondent pas. Veuillez réessayer.";
        return;
    } else {
        message.textContent = "";
    }

    // Envoyer les données au serveur avec le jeton CSRF
    fetch('http://localhost:5000/enregistrerUtilisateur', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken // Ajout du jeton CSRF dans les en-têtes de la requête
        },
        body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
            confirmationMotDePasse: confirmationMotDePasse
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'enregistrement de l\'utilisateur.');
        }
        alert('Utilisateur enregistré avec succès !');
    })
    .catch(error => {
        console.error(error);
        alert('Une erreur est survenue lors de l\'enregistrement de l\'utilisateur.');
    });
});
});
