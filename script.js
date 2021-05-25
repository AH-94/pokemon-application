
const cardsContainer = document.querySelector('.cards');
const numberOfPokemons = 150;

function getAllPokemon() {
    for (let i = 1; i <= 4; i++) {
         getPokemon(i);
    }
}

async function getPokemon(id) {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
}

getAllPokemon();


