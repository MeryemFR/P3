//**** Vérification du mail
function checkEmail() {
    // récup valeur email
    const email = this.value
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!regex.test(email)) {
        alert("Veuillez entrer une adresse-email valide")
    }
}


//**** Vérification du mot de passe
function checkPassword() {
    // récup valeur passwords
    const password = this.value
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/

    if (!regex.test(password)) {
        alert("Veuillez entrer un mot de passe valide")
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
    const form = document.querySelector('.login')   
    //Event bouton se connecter
    form.addEventListener('submit', (event) => {      
        event.preventDefault()
        //récup valeur saisies dans email et password
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        //appel de l'API de login
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})})
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                //sauvegarde du token dans le localStorage
                localStorage.setItem('token', data.token)           
                window.location.href = "index.html"       
            } else {
                    // Vérifier si le msg d'erreur existe déjà
                    const existingErrorMsg = form.querySelector('.error-msg')
                    if (!existingErrorMsg) {
                        // Créer msg d'erreur si aucun n'existe
                        const errorMsg = document.createElement('div')
                        errorMsg.classList.add('error-msg')
                        errorMsg.textContent = "Veuillez renseigner un email et un mot de passe valide"
                        form.appendChild(errorMsg)
                
                        //css pour le message d'erreur
                        errorMsg.style.cssText = 'color: red; font-size: 16px; align-self: center; margin-bottom: 10px;'
                    }
                }
        })
    })
}




//**** Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initializeValidation()
    login()
})

