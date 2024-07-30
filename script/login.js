//**** Vérification du mail
function checkEmail() {
    // récup valeur email
    const email = this.value
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!regex.test(email)) {
        alert("Please enter a valid email address")
    }
}


//**** Vérification du mot de passe
function checkPassword() {
    // récup valeur passwords
    const password = this.value
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/

    if (!regex.test(password)) {
        alert("Please enter a valid password")
    }
}


//**** initialiser les validations
function initializeValidation() {
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")

    emailInput.addEventListener('change', checkEmail)
    passwordInput.addEventListener('change', checkPassword)
}


//**** Récupération API de login et sauvegarde du Token et puis rediriger vers Index **** Bouton se connecter
function login() {

    //récup formulaire login
    const form = document.getElementsByClassName('login')

    
    //Event bouton se connecter
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        //récup valeur saisies dans email et password
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        //appel de l'API de login
        fetch('http://localhost:5678/api/users/login', {
            