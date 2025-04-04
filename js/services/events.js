export default function initEventListeners() {
    const submitButton = document.querySelector("#sumbitNewUser");

    const data = {
        name: document.querySelector("#nome").value,
        email: document.querySelector("#email").value,
        senha: document.querySelector("#senha").value
    }
    
    submitButton.addEventListener('click',  inserirUsuario(data)); 
}