//Récupération les données depuis l'API//

//*** Récupération les données Works 
let listWorks = []                                          // variable initialisée à un tab vide pour stocker les données                              
async function getWorks() {                                 // Fonction asynchrone pour obtenir les données
  await fetch('http://localhost:5678/api/works')            // appel de l'API
    .then((response) => response.json())                    // récup des données
    .then((data) => {                                       // remplir le tableau 
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
    // const
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
  //  const 
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

  } else {
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

//*** Ouv de la modale
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



//*** Event click Suppression Work
function eventDeleteIcon() {
  const deleteIcon = document.querySelectorAll('.fa-trash-can')
  //click 
  deleteIcon.forEach(deleteIcon => {
    deleteIcon.addEventListener('click', function () {
      //confirmation
      if (confirm('Are you sure you want to delete this work ?')) {
        deleteWork(deleteIcon.id)
      }
    })
  })
}



//*** Event click Modifier Work
function eventModifier() {
  //si login est connecté
  if (localStorage.getItem('token')) {
    const modifier = document.querySelector('.edit')
    //click
    modifier.addEventListener('click', function () {
      //appel fonction creation modale
      createModal(modifier)
    })
  }
}

//*** Event click Mode edition = modifier work
function eventModeEdition() {
  //si login est connecté
  if (localStorage.getItem('token')) {
    const modeEdition = document.querySelector('.mode_edition')
    //click
    modeEdition.addEventListener('click', function () {
      //appel fonction creation modale
      createModal(modeEdition)
    })
  }
}


//*** Event boutton ajouter une photo
function eventAddPhoto() {

  //recup les elements de la modale existante et btn ajout
  const modalContent1 = document.querySelector('.modal_content_1')
  const div_close_back = document.querySelector('.div_close_back')
  const btnAdd = document.querySelector('.btn_add')
  const modalTitle = document.querySelector('h3')
  const galleryModal = document.querySelector('.gallery_modal')

  //click -> ouvert la modale 2 d'ajout
  btnAdd.addEventListener('click', function () {

    // Créer icône back
    const backBtn = document.createElement('i')
    backBtn.classList.add('fa-solid', 'fa-arrow-left')
    backBtn.setAttribute('id', 'back_btn')
    div_close_back.insertAdjacentElement('afterbegin', backBtn)
    eventBack() //appel fonction pour retourner à la modale précédente

    // Changer titre modal
    modalTitle.textContent = 'Ajout photo'

    // Cachez le conteneur gallery de modale existant
    galleryModal.style.display = 'none'

    // Cacher bouton ajouter une photo
    btnAdd.style.display = 'none'

    // Créer uploader image
    const uploaderImg = document.createElement('div')
    uploaderImg.classList.add('uploader_img')
    modalContent1.appendChild(uploaderImg)

    // Créer icon file
    const fileIcon = document.createElement("i")
    fileIcon.classList.add("fa-regular", "fa-image")
    uploaderImg.appendChild(fileIcon)

    // Créer label ajouter photo
    const fileLabel = document.createElement("label")
    fileLabel.textContent = "+ Ajouter photo"
    fileLabel.classList.add("file_label")
    fileLabel.setAttribute("for", "file")
    uploaderImg.appendChild(fileLabel)

    // Créer file input
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.id = "file"
    fileInput.name = "images"
    fileInput.setAttribute("accept", ".jpg, .jpeg, .png")
    fileInput.addEventListener("change", function () {
      eventValider()
    })
    uploaderImg.appendChild(fileInput)

    // Créer image preview
    const imagePreview = document.createElement("img")
    imagePreview.className = "image_preview"
    imagePreview.setAttribute("src", "#")
    imagePreview.setAttribute("alt", "Aperçu de l'image")
    uploaderImg.appendChild(imagePreview)

    // appel fonction charger image
    eventLoadImg()

    // Créer file max Size 
    const fileMaxSize = document.createElement("p")
    fileMaxSize.classList.add("max_size")
    fileMaxSize.textContent = "Jpg, png: 4Mo max"
    uploaderImg.appendChild(fileMaxSize)

    // Créer formulaire
    const form = document.createElement("form")
    form.id = "form"
    form.classList.add("form_modal")
    modalContent1.appendChild(form)

    // Créer titre
    const titleLabel = document.createElement("p")
    titleLabel.classList.add("form_label")
    titleLabel.textContent = "Titre"
    form.appendChild(titleLabel)

    // Créer input titre
    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.id = "title_input"
    titleInput.name = "title"
    titleInput.setAttribute("required", "required")
    titleInput.addEventListener("change", function () {
      eventValider()
    })
    form.appendChild(titleInput)

    // Créer champs catégorie
    const categoryLabel = document.createElement("p")
    categoryLabel.classList.add("form_label")
    categoryLabel.textContent = "Catégorie"
    form.appendChild(categoryLabel)

    const categorySelect = document.createElement("select")
    categorySelect.id = "category_select"
    categorySelect.name = "category"
    categorySelect.setAttribute("required", "required")
    categorySelect.addEventListener("change", function () {
      eventValider()
    })
    //remplir une option par défaut sans valeur 
    const defaultOption = document.createElement("option")
    defaultOption.value = ""
    defaultOption.textContent = "Choisissez une catégorie"
    categorySelect.appendChild(defaultOption)
    //remplir select avec les catégories
    for (let i = 0; i < categories.length; i++) {
      const option = document.createElement("option")
      option.value = categories[i].id
      option.textContent = categories[i].name
      categorySelect.appendChild(option)
    }
    form.appendChild(categorySelect)

    // Créer bouton valider
    const btnValider = document.createElement("button")
    btnValider.classList.add("btn_valider")
    btnValider.textContent = "Valider"
    modalContent1.appendChild(btnValider)
  })
}


// *** Event charger photo depuis pc
function eventLoadImg() {

  const fileInput = document.querySelector('#file')
  const maxSize = 4 * 1024 * 1024 // 4Mo Taille max autorisée

  //changement fichier dans input
  fileInput.addEventListener('change', function () {
    //Créer fichier pour lire l'img
    const file = this.files[0]
    //verifier taille img
    if (file.size > maxSize) {
      alert("La taille de l'image ne doit pas dépasser 4Mo")
      this.value = ''
      return
    }
    const reader = new FileReader()
    //lire emplacement img
    reader.readAsDataURL(file)
    //attendre que l'img soit lue
    reader.addEventListener('load', function () {
      const imagePreview = document.querySelector('.image_preview')
      //afficher l'img
      imagePreview.src = reader.result
      imagePreview.style.display = 'block'

      //cacher les élements uploader et afficher img preview
      const fileIcon = document.querySelector('.fa-image')
      fileIcon.style.display = 'none'
      const fileLabel = document.querySelector('.file_label')
      fileLabel.style.display = 'none'
      const fileMaxSize = document.querySelector('.max_size')
      fileMaxSize.style.display = 'none'
    })
  })
}




let isWorkAdded = false // variable pour vérifier si addwork est déja exécuté ou pas

//*** Event bouton valider
async function eventValider() {
  // Les éléments à verifier sont remplis
  const fileInput = document.getElementById("file")
  const titleInput = document.getElementById("title_input")
  const categorySelect = document.getElementById("category_select")
  const form = document.getElementById("form")
  const btnValider = document.querySelector(".btn_valider")
  // Les éléments à vider après l'ajout
  const previewImg = document.querySelector('.image_preview')
  const fileIcon = document.querySelector('.fa-image')
  const fileLabel = document.querySelector('.file_label')
  const fileMaxSize = document.querySelector('.max_size')
  const modalContent1 = document.querySelector('.modal_content_1')

  function checkFields() {
    return titleInput.value.trim() !== "" && categorySelect.value !== "" && fileInput.files.length > 0
  }

  function updateButtonState() {
    if (checkFields()) {
      //bouton actif si tous les champs sont remplis
      btnValider.style.backgroundColor = "#1D6154"
      btnValider.disabled = false
    } else {
      //bouton désactivé
      btnValider.style.backgroundColor = "#A7A7A7"
      btnValider.disabled = true
    }
  }

  //** fonction pour Réinitialiser le formulaire aprés le click
  function resetForm() {
    form.reset()
    fileInput.value = ''
    previewImg.style.display = "none"
    previewImg.src = ''
    fileIcon.style.display = ""
    fileLabel.style.display = ""
    fileMaxSize.style.display = ""
    updateButtonState() // Rafraichit l'état du bouton
  }

  //** Mise à jour des évenements si les champs sont remplis
  [titleInput, categorySelect, fileInput].forEach(input => {
    input.addEventListener('change', updateButtonState)
    input.addEventListener('input', updateButtonState)
  })

  //** Appel fonction Mise à jour de bouton
  updateButtonState()

  //** click bouton Valider
  btnValider.addEventListener("click", async function (event) {
    event.preventDefault()

    // verification Si les champs sont remplissés et si le work n'est pas ajouté
    if (isWorkAdded === true || !checkFields()) { return }
    isWorkAdded = true // pour ne pas redéclencher l'ajout work
    await addWork()

    // Afficher message de succès
    const message = document.createElement('div')
    message.textContent = "Le work a été ajouté avec succès !"
    message.classList.add('message_ajout')
    modalContent1.appendChild(message)
    setTimeout(() => message.remove(), 2000)

    resetForm()        // Réinitialiser le formulaire
    await getWorks()   // Recharger la liste des travaux


    // mise à jour de la galerie principale
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''
    showAllWorks()
    isWorkAdded = false
  })
}



//*** Ajouter nouvelle work + appel API 
async function addWork() {
  const fileInput = document.getElementById("file")
  const titleInput = document.getElementById("title_input")
  const categorySelect = document.getElementById("category_select")
  const token = localStorage.getItem('token')

  //**Créer où on peut ajouter le fichier */
  const formData = new FormData()
  formData.append("image", fileInput.files[0])
  formData.append("title", titleInput.value)
  formData.append("category", categorySelect.value)

  //**appel API de work POST + autorisation avec le token */
  await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  })
}



//*** Event retour à la modale précédente
function eventBack() {
  const modal = document.querySelector('.modal')
  const backBtn = document.getElementById('back_btn')
  const modifier = document.querySelector('.edit')

  backBtn.addEventListener('click', async function () {
    //supprimer la modale et puis recréer
    modal.remove()
    await getWorks();
    createModal(modifier)
  })
}



//*** Fonction initialisation
async function init() {
  await getWorks()
  await getCategories()
  createButtonCatg()
  showAllWorks()
  isAdmin()
  eventModifier()
  eventModeEdition()
}
// appel pour l'initialisation
init()
