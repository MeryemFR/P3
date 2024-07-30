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
function createButtonCatg() {

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
  for (let i = 0; i < categories.length; i++) {
    let btnCategorie = document.createElement("button")
    //ajout des attributs depuis le tab de catégories
    btnCategorie.setAttribute("name", categories[i].name)
    btnCategorie.setAttribute("type", "button")
    btnCategorie.classList.add("filters_btn")
    //ajouter les noms pour les btn depuis le tab de catégories
    btnCategorie.textContent = categories[i].name
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
function creationFigureGallery(work, gallery) {

  let figureGallery = document.createElement("figure")
  let imageGallery = document.createElement("img")
  let titleGallery = document.createElement("figcaption")
  // ajout des attributs à l'image
  imageGallery.setAttribute("src", work.imageUrl)
  imageGallery.setAttribute("alt", work.title)
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
function showAllWorks() {

  //recup le conteneur où les works seront ajoutés
  let gallery = document.querySelector('.gallery')
  //afficher les works 
  for (let i = 0; i < listWorks.length; i++) {
    creationFigureGallery(listWorks[i], gallery)
  }
}


//*** Filtrage de gallery par catégories pendant click
function filterByCatg(categorieSelectionne) {
  let gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''

  //si on clique sur le btn tous sinn autres catégories
  if (categorieSelectionne == "Tous") {
    showAllWorks()
  }
  else {
    // filtrer tout les works par catégories
    for (let i = 0; i < listWorks.length; i++) {
      if (listWorks[i].category.name == categorieSelectionne) {
        creationFigureGallery(listWorks[i], gallery)

      }
    }
  }
}



//*** Se déconnecter
function logout() {
  localStorage.removeItem('token')
}


//*** Mode admin 
function isAdmin() {
  // si login est connecter
  if (localStorage.getItem('token')) {
    //Modifier login -> logout
    const loginLink = document.querySelector('nav ul li:nth-child(3) a')
    loginLink.textContent = 'logout'
    //Cacher menu de filtre
    const filters = document.querySelector('.filters')
    filters.style.display = "none"
    //clique sur logout pour se deconnecter
    loginLink.addEventListener('click', function () {
      logout()
    })
    //modifier mes projets
    const mesProjets = document.querySelector('.portfolio_title')    //conteneur où lien et icone seront ajoutés

    const modifierIcon = document.createElement('i')                 //ajout de l'icone modifier mes projets
    modifierIcon.classList.add('fa-regular', 'fa-pen-to-square')

    const modifier = document.createElement('a')                     //ajout lien pour modifier
    modifier.textContent = 'modifier'
    modifier.href = '#'
    modifier.classList.add('edit')

    mesProjets.appendChild(modifierIcon)                             //mettre i et a dans le conteneur portfolio_title
    mesProjets.appendChild(modifier)


    //mode edition
    const body = document.querySelector('body')                      //recup body pour ajouter div 

    const modeEdition = document.createElement('div')                //creation div
    modeEdition.classList.add('mode_edition')

    const modeEditionIcon = document.createElement('i')              //ajout icone mode edition
    modeEditionIcon.classList.add('fa-regular', 'fa-pen-to-square')

    const modeEditionTxt = document.createElement('a')               //ajout txt mode edition
    modeEditionTxt.textContent = 'Mode édition'
    modeEditionTxt.href = '#';
    modeEditionTxt.classList.add('txt_edition')


    modeEdition.appendChild(modeEditionIcon)                         //ajout txt et i dans la div
    modeEdition.appendChild(modeEditionTxt)
    body.insertBefore(modeEdition, body.firstChild)                  //ajout div dans le body

  }
  else {
    console.log("pas connecté")
  }
}

//*** creation Modale pour modifier les projets
function createModal(update) {

  //créer modal
  const modal = document.createElement('aside')
  modal.classList.add('modal')

  //insert modal apres click sur update work pour eviter recreation de la modale
  update.insertAdjacentElement('afterend', modal)

  const modalContent1 = document.createElement('div')
  modalContent1.classList.add('modal_content_1')
  modal.appendChild(modalContent1);

  const divCloseBack = document.createElement('div')
  divCloseBack.classList.add('div_close_back')
  modalContent1.appendChild(divCloseBack)

  const btnClose = document.createElement('i')
  btnClose.classList.add('fa-solid', 'fa-xmark')
  divCloseBack.appendChild(btnClose)

  const modalTitle = document.createElement('h3')
  modalTitle.textContent = 'Galerie photo'
  modalContent1.appendChild(modalTitle)

  const galleryModal = document.createElement('div')
  galleryModal.classList.add('gallery_modal')
  modalContent1.appendChild(galleryModal)

  addImgModal(galleryModal) //appel fonction add images
  eventDeleteIcon()         //appel fonction suppression

  const btnAdd = document.createElement('button')
  btnAdd.textContent = 'Ajouter une photo'
  btnAdd.classList.add('btn_add')
  modalContent1.appendChild(btnAdd)
  //appel fonction ajouter une photo
  eventAddPhoto()

  //ouverture
  openModal(modal)
  //fermeture par icone
  btnClose.addEventListener('click', function () { closeModal(modal) })
  //fermeture en dehors de la modale
  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal(modal)
    }
  }
}


//*** Ouverture de la modale
function openModal(modal) { modal.style.display = 'block' }

//*** Fermeture de la modale
async function closeModal(modal) {
  modal.style.display = 'none'

  let gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''    //vider gallery
  await getWorks()          //recharger works
  showAllWorks()            //afficher works
}


//*** Créer img au conteneur galleryModal avec les icônes supression
function addImgModal(galleryModal) {

  for (let i = 0; i < listWorks.length; i++) {

    const imgModalBox = document.createElement('div')
    imgModalBox.classList.add('img_modal_box')

    const imgModal = document.createElement('img')
    imgModal.src = listWorks[i].imageUrl
    imgModal.alt = listWorks[i].title
    imgModal.classList.add('img_modal')

    const deleteIcon = document.createElement('i')
    deleteIcon.setAttribute('id', listWorks[i].id)
    deleteIcon.classList.add('fa-solid', 'fa-trash-can')

    imgModalBox.appendChild(imgModal)
    imgModalBox.appendChild(deleteIcon)

    galleryModal.appendChild(imgModalBox)
  }
}



//*** API Suppression Work
async function deleteWork(id) {

  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No token found')
    return;
  }
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  //Mettre à jour la liste des works aprés suppression
  const galleryModal = document.querySelector('.gallery_modal')
  galleryModal.innerHTML = ''
  await getWorks()          //appel api pour recharger la liste des works
  addImgModal(galleryModal) //appel fonction d'ajout img avec les icônes delete

  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  showAllWorks()

  eventDeleteIcon()       //appel fonction click suppression
}

