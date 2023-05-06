document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    createPokemonSelection();
    let selectedCard = document.querySelector('#searchButton')
    selectedCard.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/pokemon')
        .then(res => res.json())
        .then(data => {
            renderCard(data)
            createTypeButtons(data);
        })
        .catch(error => console.error(error));
    })
})

function createPokemonSelection() {
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(data => {
        data.forEach((pokemon)=> {
            let pokemonSelection = document.querySelector('#pokemonSelect');
            let option = document.createElement('option');
            option.innerText = pokemon.name;
            pokemonSelection.appendChild(option);
        })
    })
}

function createTypeButtons(data) {
    let selectedPokemon = document.querySelector('#pokemonSelect')
    let pokemonTypeContainer = document.querySelector('#pokemonCard')
    let types = ['Grass', 'Fire', 'Water', 'Electric', 'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'];
    let selectedPokemonType = data.find(pokemon => pokemon.name === selectedPokemon.value).type;
    for (let i = 0; i < types.length; i++) {
        if (selectedPokemonType.includes(types[i])) {
            const typeButton = document.createElement('button');
            typeButton.innerText = types[i];
            typeButton.classList.add(types[i]);
            pokemonTypeContainer.appendChild(typeButton);
        }
    }
}

function renderCard(data) {
    resetCard();
    let pokemonCard = document.querySelector('#pokemonCard');
    let pokemonImage = document.createElement('img');
    let pokemonName = document.createElement('h3');
    pokemonImage.src = data.find(pokemon => pokemon.name === document.querySelector('#pokemonSelect').value).image;
    pokemonName.innerText = data.find(pokemon => pokemon.name === document.querySelector('#pokemonSelect').value).name;
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonName);
}

function resetCard() {
    const originalCard = document.querySelector('#pokemonCard');
    while (originalCard.firstChild) {
        originalCard.removeChild(originalCard.firstChild);
    }
}