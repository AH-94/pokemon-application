
let cards = [];

const cardsContainer = document.querySelector('.cards');
const searchInput = document.querySelector('#searchField');


function getAllPokemon() {

    const numberOfPokemons = 150;

    for (let i = 1; i <= numberOfPokemons; i++) {
         getPokemon(i);
    }
}

async function getPokemon(id) {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    const card = generateCard(data);
    cards.push(card);
    injectHTML(cards);
}


function generateCard(data) {

    const abilities = [];

    for (let i = 0; i < data.abilities.length; i++) {
        abilities.push(data.abilities[i].ability.name);
    }

    return {id: data.id, name: data.name, abilities: [...abilities], liked: false};
}


function injectHTML(list) {

    clearContainer(cardsContainer);

    const html = list.map(item => {
        return `
        <div class="card card--span-3">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${item.id}.png" class="card__img">
            <span class="card__number"><strong>id:</strong> ${item.id}</span>
            <h2 class="card__name"><strong>Name:</strong> ${item.name}</h2>
            <p class="card__abilities"><strong>Abilities</strong> ${item.abilities.join(', ')}</p>
            <button class="card__btn">View Pokemon</button>
        </div>
        `
    }).join('');

    cardsContainer.innerHTML = html;
}

function clearContainer(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function filterPokemon(e) {
    const inputValue = e.currentTarget.value.toUpperCase();
    if (inputValue == null || inputValue == '') {
        getAllPokemon();
        return;
    };
    const matchingCards = cards.filter(card => card.name.toUpperCase().indexOf(inputValue) > -1);
    injectHTML(matchingCards);
}


searchInput.addEventListener('keyup', filterPokemon);

getAllPokemon();


