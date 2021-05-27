
let cards = [];

const cardsContainer = document.querySelector('.cards');
const searchInput = document.querySelector('#searchField');
const filterBtn = document.querySelector('#favouriteBtn');
const allBtn = document.querySelector('#allBtn');
const modal = document.querySelector('.modal');
const modalInner = modal.querySelector('.modal-inner');
const closeBtn = modal.querySelector('.modal__close');


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

    return {id: data.id, name: data.name, abilities: [...abilities], base_experience: data.base_experience, height: data.height, weight: data.weight, liked: false};
}


function saveCards() {
    localStorage.setItem('cards', JSON.stringify(cards));
}


function injectHTML(list) {

    clearContainer(cardsContainer);

    const html = list.map(item => {
        return `
        <div class="card">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${item.id}.png" class="card__img">
            <span class="card__number"><strong>id:</strong> ${item.id}</span>
            <h2 class="card__name"><strong>Name:</strong> ${item.name}</h2>
            <p class="card__abilities"><strong>Abilities</strong> ${item.abilities.join(', ')}</p>
            <button data-id="${item.id}" class="card__btn card__btn--modal">View Pokemon</button>
            <button data-id="${item.id}" class="card__btn card__btn--like ${loadClass(item.liked)}">Like Pokemon</button>
        </div>
        `
    }).join('');

    cardsContainer.innerHTML = html;
}

function loadClass(condition) {
    if (condition) {
        return 'liked';
    }
}

function clearContainer(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function filterPokemon(e) {
    const inputValue = e.currentTarget.value.toUpperCase();
    if (inputValue == null || inputValue == '') {
        injectHTML(cards);
    };
    const matchingCards = cards.filter(card => card.name.toUpperCase().indexOf(inputValue) > -1);
    injectHTML(matchingCards);
}


function cardBtnHandler(e) {

    if (e.target.classList.contains('card__btn--like')) {
        const selectedCard = cards.find(card => card.id == e.target.dataset.id);
        selectedCard.liked = true;
        saveCards();
        injectHTML(JSON.parse(localStorage.getItem('cards')));
    }

    if (e.target.classList.contains('card__btn--modal')) {
        const cardForModal = cards.find(card => card.id == e.target.dataset.id);
        const modalImage = modalInner.querySelector('img');
        modalImage.src = `https://pokeres.bastionbot.org/images/pokemon/${cardForModal.id}.png`;
        modalImage.alt = `image of ${cardForModal.name}`;
        const modalTitle = modalInner.querySelector('.modal-inner__title');
        modalTitle.textContent = cardForModal.name;
        const modalListItems = modalInner.querySelectorAll('.modal-inner__list li');
        modalListItems[0].innerHTML = `<strong>Abilities:</strong> ${cardForModal.abilities.join(', ')}`;
        modalListItems[1].innerHTML = `<strong>Base experience:</strong> ${cardForModal.base_experience}`;
        modalListItems[2].innerHTML = `<strong>Height:</strong> ${cardForModal.height}`;
        modalListItems[3].innerHTML = `<strong>Weight:</strong> ${cardForModal.weight}`;
        modal.classList.add('visible');
    }
    
}

function closeModal() {
    modal.classList.remove('visible');
}

function keyCloseHandler(e) {
    if (e.keyCode == 27) {
        closeModal();
    }
}

function filterLikedCards() {
    const likedCards = cards.filter(card => card.liked == true);
    injectHTML(likedCards);
}

function showAllPokemon() {
    injectHTML(cards);
}


searchInput.addEventListener('keyup', filterPokemon);

cardsContainer.addEventListener('click', cardBtnHandler);

filterBtn.addEventListener('click', filterLikedCards);

allBtn.addEventListener('click', showAllPokemon);

closeBtn.addEventListener('click', closeModal);

document.addEventListener('keyup', keyCloseHandler);

getAllPokemon();


