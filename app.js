// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const apiValue =  "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}"

const form = document.querySelector('form')
const input = document.querySelector('input')
const errorMsg = document.querySelector('.error-msg')

function handleSubmit(e) {
e.preventDefault()

if(!input.value === "") {
    errorMsg.textContent="Je pense que tu t'es trompé, remplissez le champ s'il vous plait "
    return;
}
}

form.addEventListener("submit", handleSubmit)