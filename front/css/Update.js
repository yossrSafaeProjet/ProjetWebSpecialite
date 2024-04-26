document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
async function  chargerProduit(productId){
    configureMode('modification');
    try {
   
    const response = await fetch(`http://localhost:5000/product/${productId}`);
    const data = await response.json();
    // Remplissez les champs du formulaire avec les données récupérées
    document.getElementById('libelle').value = data.produit.libelle;
    document.getElementById('description').value = data.produit.description;
    document.getElementById('images').value = data.produit.images;
    document.getElementById('prix').value = data.produit.prix;
    document.getElementById('categorie').value = data.produit.categorie;
    
    // Assurez-vous que le formulaire est visible une fois les données chargées
    /* var popup = document.getElementById("popup");
            popup.style.display = "block"; */
            
               
    
    
    } catch (error) {
    console.error('Erreur lors de la récupération des données du produit:', error);
    // Gérez l'erreur ici, par exemple, afficher un message d'erreur à l'utilisateur
    }
    }});