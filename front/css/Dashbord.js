async function fetchCsrfToken() {
    try {
        const response = await fetch('http://localhost:5000/csrf-delete');
        const data = await response.json();
        const csrfToken = data.csrfToken;
        console.log(csrfToken);
        document.getElementById('csrfToken').value = csrfToken; // Stockage du jeton CSRF dans le champ caché
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchCsrfToken();
});

function afficherPopup() {
    configureMode('ajout');
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}

function seDeconnecter() {
    // Ajouter votre logique de déconnexion ici
    fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => {
            if (!response.ok) {
                alert('Vous n\'etes pas autorisé à effectuer cette action ')
                throw new Error('Erreur lors de la requête');
            }
            window.location.href = 'http://localhost:3000/login';
        })
        .catch(error => {
            console.error('Erreur:', error);
            // Gère les erreurs, par exemple afficher un message d'erreur à l'utilisateur
        });}
function fermerPopup() {
var popup = document.getElementById("popup");
popup.style.display = "none";
}


async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('http://localhost:5000/AllProduit', {
            credentials: 'include'
        });
        if(response.status===401){
            alert('Vous etes pas autorisé pour accéder à cette page !')
        }
        if (response.ok) {

            const responseData = await response.json();
            const productList = document.getElementById('productList');
            if (responseData.produits.length > 0) {
                productList.style.display = 'block';
                
                responseData.produits.forEach(product => {
                   const  productId=product.id;
                    if (!document.getElementById('product_' + productId)) {
// Création de l'élément de la carte

const cardElement = document.createElement('div');
cardElement.id='product_'+productId;
document.getElementById('productId').value=productId;
cardElement.classList.add('card'); // Ajout de la classe pour la mise en forme CSS

// Image du produit
const imageElement = document.createElement('img');
imageElement.src = product.images;
imageElement.alt = product.libelle;
cardElement.appendChild(imageElement);

// Contenu de la carte
const cardContent = document.createElement('div');
cardContent.classList.add('card-content');

// Libellé du produit
const libelleElement = document.createElement('h3');
libelleElement.textContent = 'Libelle: '+product.libelle;
cardContent.appendChild(libelleElement);

// Description du produit
const descriptionElement = document.createElement('p');
descriptionElement.textContent = 'Description: ' + product.description;
cardContent.appendChild(descriptionElement);

// Prix du produit
const prixElement = document.createElement('p');
prixElement.textContent = 'Prix: ' + product.prix + ' £';
cardContent.appendChild(prixElement);

// Catégorie du produit
const categorieElement = document.createElement('p');
categorieElement.textContent = 'Catégorie: ' + product.categorie;
cardContent.appendChild(categorieElement);
const deleteIcon = document.createElement('span');
deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Vous pouvez remplacer cela par une classe d'icône ou utiliser Font Awesome
deleteIcon.classList.add('delete-icon');
deleteIcon.onclick = function() {

deleteProduct(productId); // Appeler la fonction de suppression avec l'ID du produit en paramètre
};
cardElement.appendChild(deleteIcon);

// Ajouter l'icône de modification
const editIcon = document.createElement('span');
editIcon.innerHTML = '<i class="fas fa-edit"></i>'; // Vous pouvez remplacer cela par une classe d'icône ou utiliser Font Awesome
editIcon.classList.add('edit-icon');
editIcon.onclick = function() {
chargerProduit(productId); // Appeler la fonction de modification avec l'ID du produit en paramètre
};
    

cardElement.appendChild(editIcon);
// Ajout du contenu de la carte à la carte
cardElement.appendChild(cardContent);

// Ajout de la carte à la liste des produits
productList.appendChild(cardElement);
            }});
        } else {
            productList.style.display = 'none';
        }
    } else {
        console.error('Erreur lors de la récupération des produits');
    }
} catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
}
}

fetchAndDisplayProducts();
const popupTitle = document.getElementById('popupTitle');
const submitButton = document.getElementById('submitButton');

// Fonction pour configurer le mode (ajout ou modification)
function configureMode(mode) {
if (mode === 'ajout') {
popupTitle.textContent = 'Ajouter un produit';
submitButton.value = 'Ajouter';

} else if (mode === 'modification') {
popupTitle.textContent = 'Modifier un produit';
submitButton.value = 'Modifier';
}
if(document.getElementById('submitButton').value === 'Ajouter'){
    document.getElementById('productForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire
         // Récupère les données du formulaire
        const libelle = document.getElementById('libelle').value;
        const description = document.getElementById('description').value;
        const images = document.getElementById('images').value;
        const prix = document.getElementById('prix').value;
        const categorie = document.getElementById('categorie').value;
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({libelle,images,description,categorie,prix }),
        })
        .then(response => {
            if (!response.ok) {
                alert('Vous n\'etes pas autorisé à effectuer cette action !');
                throw new Error('Erreur lors de la requête');
            }
            
            return response.json();
    
        })
        .then(data => {
            var popup = document.getElementById("popup");
            popup.style.display = "none";
            // Actualiser la liste des produits
            fetchAndDisplayProducts();
        })
        .catch(error => {
            console.error('Erreur:', error);
            // Gère les erreurs, par exemple afficher un message d'erreur à l'utilisateur
        });
    });
}else{
    if(document.getElementById('submitButton').value==='Modifier'){

        document.getElementById('productForm').addEventListener('submit', async function(event) {
            event.preventDefault();
        const libelle = document.getElementById('libelle').value;
        const description = document.getElementById('description').value;
        const images = document.getElementById('images').value;
        const prix = document.getElementById('prix').value;
        const categorie = document.getElementById('categorie').value;
        const productId=document.getElementById('productId').value;
        console.log(productId)
        fetch(`http://localhost:5000/updateProduct/${productId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({libelle,images,description,categorie,prix }),
            })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }
                
                return response.json();
        
            })
            .then(data => {
                console.log("Pour updatedata",data);
                var popup = document.getElementById("popup");
                popup.style.display = "none";
                // Actualiser la liste des produits
                fetchAndDisplayProducts();
            })
            .catch(error => {
                console.error('Erreur:', error);
                // Gère les erreurs, par exemple afficher un message d'erreur à l'utilisateur
            });
    } )};
}
}

// Appel de la fonction avec le mode approprié
async function  chargerProduit(productId){
configureMode('modification');
try {
const response = await fetch(`http://localhost:5000/product/${productId}`,{
    credentials:'include'});
const data = await response.json();
// Remplissez les champs du formulaire avec les données récupérées
document.getElementById('libelle').value = data.produit.libelle;
document.getElementById('description').value = data.produit.description;
document.getElementById('images').value = data.produit.images;
document.getElementById('prix').value = data.produit.prix;
document.getElementById('categorie').value = data.produit.categorie;

// Assurez-vous que le formulaire est visible une fois les données chargées
  var popup = document.getElementById("popup");
        popup.style.display = "block";

} catch (error) {
console.error('Erreur lors de la récupération des données du produit:', error);
// Gérez l'erreur ici, par exemple, afficher un message d'erreur à l'utilisateur
}

}
async function deleteProduct(productId) {
const confirmDelete = confirm('Voulez-vous vraiment supprimer ce produit ?');

if (confirmDelete) {
await deleleProducts(productId);
}
}

async function deleleProducts(productId) {

    try {
        const csrfToken = document.getElementById('csrfToken').value; // Récupérer le token CSRF stocké côté client

        const response = await fetch(`http://localhost:5000/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken // Inclure le token CSRF dans les en-têtes de la requête
            }
        });

        if (response.ok) {
            // Suppression réussie : mettre à jour l'interface utilisateur
            const productElement = document.getElementById(productId);
            if (productElement) {
                productElement.remove();
            }
        } else {
            // Gérer les erreurs liées à la suppression du produit
            console.error('Erreur lors de la suppression du produit');
        }
    } catch (error) {
        // Gérer les erreurs de manière appropriée
        console.error('Erreur lors de la suppression du produit :', error);
    }
}