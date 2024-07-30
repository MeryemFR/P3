//Récupération les données depuis l'API//

//*** Récupération les données Works 
let listWorks = []                                        // variable initialisée à un tab vide pour stocker les données                              
async function getWorks() {                                  // Fonction asynchrone pour obtenir les données
  await fetch('http://localhost:5678/api/works')          // appel de l'API
    .then((response) => response.json())              // récup des données
    .then((data) => {                                 // remplir le tableau 
      listWorks = data
    })
}


//*** Récupération les données Catégories 
let categories = []
async function getCategories() {
  await fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
      categories = data
    })
}


//*** Création des bouttons Catégories dynamiquement 
function createButtonCatg(){

  // recup le conteneur où les btn de catégories seront ajoutés
  const filters = document.querySelector('.filters')
  // bouton tous 
  const btnTous = document.createElement("button")  
  // ajout des attributs
  btnTous.textContent = "Tous"
  btnTous.setAttribute("name", "Tous")
  btnTous.setAttribute("type", "button")
  btnTous.classList.add("filters_btn")  
  // Ajout class pour qu'il sera affiché par défaut aprés l'actualisation de la page
  btnTous.classList.add("toggled")
  //** click sur btn tous
  btnTous.addEventListener('click', function () { 
    filterByCatg("Tous")
  // Supprimer classe 'toggled'de tous les boutons pour ne garder que le btn 'Tous'
    const allButtons = document.querySelectorAll('.filters_btn')
    allButtons.forEach(btn => btn.classList.remove('toggled'))
    btnTous.classList.add('toggled')
  })
  filters.appendChild(btnTous)
  


  // boutons catégories
  for (let i=0; i<categories.length; i++){
    let btnCategorie = document.createElement("button")  
    //ajout des attributs depuis le tab de catégories
    btnCategorie.setAttribute("name",categories[i].name) 
    btnCategorie.setAttribute("type","button")
    btnCategorie.classList.add("filters_btn")
    //ajouter les noms pour les btn depuis le tab de catégories
    btnCategorie.textContent=categories[i].name   
    //** click
    btnCategorie.addEventListener('click', function () {
      filterByCatg(categories[i].name)
    // Supprimer classe 'toggled' de tous les boutons pour garder le btn cliqué
      const allButtons = document.querySelectorAll('.filters_btn')
      allButtons.forEach(btn => btn.classList.remove('toggled'))
      btnCategorie.classList.add('toggled')
    })
    filters.appendChild(btnCategorie)   
  }
}




//*** Manipulation du DOM en JS -- Création d'une figure où les img et titres seront ajoutés
function creationFigureGallery(work,gallery) {
    
let figureGallery = document.createElement("figure")
let imageGallery = document.createElement("img") 
let titleGallery = document.createElement("figcaption")
// ajout des attributs à l'image
imageGallery.setAttribute("src",work.imageUrl)
imageGallery.setAttribute("alt",work.title)
// ajout txt dans le figcaption
titleGallery.textContent = work.title
//ajout class gallery_pic
figureGallery.classList.add("gallery_pic")

//ajout des img et titres dans le conteneur gallery
gallery.appendChild(figureGallery)
figureGallery.appendChild(imageGallery)
figureGallery.appendChild(titleGallery)
} 




//*** Afficher les works dynamiquement ** Manipulation du DOM en JS
function showAllWorks(){  

//recup le conteneur où les works seront ajoutés
let gallery = document.querySelector('.gallery')
//afficher les works 
for(let i = 0; i < listWorks.length; i++) {
    creationFigureGallery(listWorks[i],gallery)
}
} 