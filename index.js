document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/pokemon')
        .then(res => res.json())
        .then(data => {
            createPokemonSelection(data);
            renderPokemonSelection(data);
            document.querySelector('#addButton').addEventListener('click', (e) => {
                e.preventDefault();
                addPokemon(data);
            })
    })

    function createCollectionCard(pokemonObj) {
        fetch('http://localhost:3000/collection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemonObj)
        })
    }

    function renderPokemonSelection (data) {
        let selectCard = document.querySelector('#searchButton')
        selectCard.addEventListener('click', (e) => {
            e.preventDefault();
            renderCard(data);
            renderStats(data);
        })
    }

    function addPokemon(data) {
        let highestId = Math.max(...data.map(pokemon => pokemon.id));
        let interface = document.querySelector('#collectionInterface');
        let selectedPokemon = document.querySelector('#pokemonSelect').value;
        data.forEach(pokemon => {
            let pokemonObj = {...pokemon};
            highestId += 1;
            pokemonObj.id = highestId;
            if (pokemon.name === selectedPokemon) {
                let originalCard = document.querySelector('#pokemonCard');
                let collectedCard = originalCard.cloneNode(true);
                collectedCard.id = 'collectedCard';
                interface.appendChild(collectedCard);
                createCollectionCard(pokemonObj);
            }
        })
    }
  
    function createPokemonSelection(data) {
        data.forEach((pokemon) => {
            let pokemonSelection = document.querySelector('#pokemonSelect');
            let option = document.createElement('option');
            option.innerText = pokemon.name;
            pokemonSelection.appendChild(option);
        });
    };

    function createTypeButtons(data) {
        let selectedPokemon = document.querySelector('#pokemonSelect');
        let pokemonTypeContainer = document.querySelector('#pokemonType');
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
        resetStats();
        let pokemonCard = document.querySelector('#pokemonCard');
        let pokemonTypeContainer = document.createElement('div');
        let pokemonImage = document.createElement('img');
        let pokemonName = document.createElement('h3');
        pokemonTypeContainer.id = 'pokemonType';
        pokemonImage.src = data.find(pokemon => pokemon.name === document.querySelector('#pokemonSelect').value).image;
        pokemonName.innerText = data.find(pokemon => pokemon.name === document.querySelector('#pokemonSelect').value).name;
        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonTypeContainer);
        createTypeButtons(data);
    }

    function renderStats(data) {
        let pokemonStats = document.querySelector('#pokemonStats');
        let pokemonHeight = document.createElement('h4');
        let pokemonWeight = document.createElement('h4');
        let pokemonCategory = document.createElement('h4');
        let pokemonWeakness = document.createElement('h4');
        let pokemonAbility = document.createElement('h4');
        let pokemonAbilityButtons = document.createElement('div');
        let pokemonWeaknessButtons = document.createElement('div');
        pokemonAbilityButtons.id = 'pokemonAbilities';
        pokemonWeaknessButtons.id = 'pokemonWeaknessButtons';
        pokemonAbility.innerText = 'Abilities:';
        pokemonWeakness.innerText = 'Weaknesses:';
        pokemonHeight.innerText = `Height: ${data.find(pokemon => pokemon.name === document.querySelector('#pokemonSelect').value).height}`;
        pokemonWeight.innerText = `Weight: ${data.find(pokemon => pokemon.name === document.querySelector('#pokemonSelect').value).weight}`;
        pokemonCategory.innerText = `Category: ${data.find(pokemon => pokemon.name === document.querySelector('#pokemonSelect').value).category}`;
        pokemonStats.appendChild(pokemonHeight);
        pokemonStats.appendChild(pokemonWeight);
        pokemonStats.appendChild(pokemonCategory);
        pokemonStats.appendChild(pokemonWeakness);
        pokemonStats.appendChild(pokemonWeaknessButtons);
        pokemonStats.appendChild(pokemonAbility);
        pokemonStats.appendChild(pokemonAbilityButtons);
        renderWeakness(data);
        renderAbility(data);
        renderDescription(data);
    }

    function renderAbility(data) {
        let selectedPokemon = document.querySelector('#pokemonSelect');
        let pokemonAbilityContainer = document.querySelector('#pokemonAbilities');
        let abilities = [...new Set(data.map(pokemon => pokemon.abilities).flat())];
        let selectedPokemonAbilities = data.find(pokemon => pokemon.name === selectedPokemon.value).abilities;
        let overlay = document.createElement('div');
        overlay.id = 'overlay';
        pokemonAbilityContainer.appendChild(overlay);
        for (let i = 0; i < abilities.length; i++) {
            if (selectedPokemonAbilities.includes(abilities[i])) {
                let abilityButton = document.createElement('button');
                let abilityInfoBox = document.createElement('div');
                let abilityInfo = document.createElement('p');
                abilityInfo.innerText = abilities[i];
                abilityButton.innerText = abilities[i];
                abilityInfoBox.id = 'infoBox';
                abilityButton.id = 'abilityButton';
                pokemonAbilityContainer.appendChild(abilityButton);
                abilityInfoBox.appendChild(abilityInfo);
                pokemonAbilityContainer.appendChild(abilityInfoBox);
                abilityButton.addEventListener('click', (e) => {
                    overlay.style.display = 'block';
                    abilityInfoBox.style.display = 'block';
                    e.stopPropagation();
                })
                window.addEventListener('click', () => {
                    overlay.style.display = 'none';
                    abilityInfoBox.style.display = 'none';
                });
            }
        }
    }

    function renderWeakness(data) {
        let selectedPokemon = document.querySelector('#pokemonSelect');
        let pokemonWeaknessContainer = document.querySelector('#pokemonWeaknessButtons');
        let weaknesses = ['Grass', 'Fire', 'Water', 'Electric', 'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'];
        let selectedPokemonWeakness = data.find(pokemon => pokemon.name === selectedPokemon.value).weaknesses;
        for (let i = 0; i < weaknesses.length; i++) {
            if (selectedPokemonWeakness.includes(weaknesses[i])) {
            const weaknessButton = document.createElement('button');
            weaknessButton.innerText = weaknesses[i];
            weaknessButton.classList.add(weaknesses[i]);
            pokemonWeaknessContainer.appendChild(weaknessButton);
            }
        }
    }

    function renderDescription(data) {
        let pokemonStats = document.querySelector('#pokemonStats');
        let pokemonDescription = document.createElement('p');
        pokemonDescription.id = 'pokemonDescription';
        pokemonDescription.innerText = data.find(pokemon => pokemon.name === document.querySelector('#pokemonSelect').value).description;
        pokemonStats.appendChild(pokemonDescription);
    }

    function resetStats() {
        const originalStats = document.querySelector('#pokemonStats');
        while (originalStats.firstChild) {
            originalStats.removeChild(originalStats.firstChild);
        }
    }

    function resetCard() {
        const originalCard = document.querySelector('#pokemonCard');
        while (originalCard.firstChild) {
            originalCard.removeChild(originalCard.firstChild);
        }
    }
})