// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const apiValue =  "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}"

const form = document.querySelector('form')
const input = document.querySelector('input')
const errorMsg = document.querySelector('.error-msg')
const resultsDisplay = document.querySelector(".result-display")
const loader = document.querySelector(".loader")

function handleSubmit(e) {
e.preventDefault()

if(!input.value === "") {
    errorMsg.textContent="Je pense que tu t'es trompé, remplissez le champ s'il vous plait "
    return;
}
    else {
        errorMsg.textContent = "";
        loader.style.display="flex";
        resultsDisplay.textContent=""
        wikiApiCall(input.value)
    }
}

async function wikiApiCall(searchInput) {

    try {

    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)

    if(!response.ok){
        throw new Error(`${response.status}`)
    }

    console.log(response)

    const data = await response.json()
    
    console.log(data)
    console.log(response)

    createCards(data.query.search)
}

    catch (error) {
        errorMsg.textContent =` ${error} `
        loader.style.display = "none"
    }
}



function createCards(data) {
    if(!data.length) {
        errorMsg.textContent = "Woops la recherche n'a rien donné"
        loader.style.display ="none"
    }

    else{
        data.forEach(el => {
            const url = `https://en.wikipedia.org/?curid=${el.pageid}`
            const card = document.createElement("div")
            card.className = "result-item";
            card.innerHTML = `<h3 class="result-title">
            <a href="${url}" target ="_blank">${el.title}</a> 
            </h3>
            <a href="${url}" class="result-link" target ="_blank">${url}</a>
            <span class="result-snippet">${el.snippet}</span>
            <br>
            `
            resultsDisplay.appendChild(card)
        });
        loader.style.display="none"
}
}

form.addEventListener("submit", handleSubmit)