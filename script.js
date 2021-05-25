
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';


async function getPokemon() {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
}

getPokemon();

