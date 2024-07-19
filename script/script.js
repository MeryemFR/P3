//Récupération les données depuis l'API//

//*** Récupération les données Works 
 let listWorks = []                                        // variable initialisée à un tab vide pour stocker les données                              
async function getWorks() {                                  // Fonction asynchrone pour obtenir les données
    await fetch('http://localhost:5678/api/works')          // appel de l'API
          .then((response) => response.json())              // récup des données
          .then((data) => {                                 // remplir le tableau 
            listWorks=data                          
          } )
}


//*** Récupération les données Catégories 
let categories = []
async function getCategories() {
    await fetch('http://localhost:5678/api/categories')     
          .then((response) => response.json())              
          .then((data) => {                                 
            categories=data                    
          } )
}
