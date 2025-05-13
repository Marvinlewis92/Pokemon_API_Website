async function getPoki() {
    try {
        let textin = document.getElementById('textInput');
        // console.log(textin.value)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${textin.value}`);
        const data = await response.json();
    
        displayPoki(data)

    } catch(error) {
        console.error("Pokemon not found", error)
        const gallery = document.getElementById('pokiDisplay');
        gallery.innerText = "Pokemon not found!"
        gallery.className = 'mt-5';
        gallery.className = 'text-danger'
    }
}

let count = 1; 
async function getSuggestions() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
        const data = await response.json();
        displaySuggestions(data)
        // console.log(data.results)
        count++
        
    } catch (error) {
        console.error("suggestions failed", error)
    }
}

function displaySuggestions(data) {

    // let ele = document.getElementsByName('poke')
    // let placeHolderDisplay = ele[0].placeholder;
    let displaySug = document.getElementById('suggestions');
    // console.log(placeHolderDisplay)
    displaySug.innerText = data.name;
    // console.log(data)
}

async function randomFunction() {
    const randomPok = Math.floor(Math.random() * 20); 
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPok}`)
        const data = await response.json();
        // console.log(data)
    
        displayPoki(data);

    } catch (error) {
        console.error("Trouble getting pokemon!", error)
    }
}


function displayPoki(data) {
        // console.log(data)
    const cardPoki = `
    <div class="card" style="width: 18rem;">
    <img src=${data.sprites.front_default} class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
    <p class="card-text">Type: ${data.abilities.map(dat => `<ul>
      <li>${dat.ability.name}</li>
      </ul>
      `
    )}</p>
    </div>
    </div>
    ` ;


    const gallery = document.getElementById('pokiDisplay');
    gallery.innerHTML = cardPoki;
}

// RESET AFTER API CALL

const undo = () => {
    const gallery = document.getElementById('pokiDisplay');
    gallery.innerHTML = null;
    
};

let counter = 0; 

const pressGo = () => {
    if (counter > 0) {
        undo();
        getPoki();
    } else getPoki();
    
    counter++
    let textin = document.getElementById('textInput');
    textin.value = null;
}

const getSuggestionsTimeOut = () => {
    getSuggestions();
    setInterval(getSuggestions, 3000)
}





document.addEventListener('DOMContentLoaded', getSuggestionsTimeOut)
// BUTTONS
const randomButton = document.getElementById('random')
randomButton.addEventListener('click', randomFunction)
const pokiButton = document.getElementById('poikButton')
pokiButton.addEventListener('click', pressGo);
const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', undo)