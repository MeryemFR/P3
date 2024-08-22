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
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
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
                        errorMsg.textContent = "Veuillez entrer un email et mot de passe valides"
                        form.appendChild(errorMsg)
                    }
                }
            })
    })
}


//**** Initialisation
document.addEventListener('DOMContentLoaded', () => {
    login()
})
