// script.js
const pokedex = document.getElementById('pokedex');

const fetchPokemon = async () => {
  const pokemonCount = 151; // Primeira geração
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const card = document.createElement('div');
  card.classList.add('pokemon');

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, '0');
  const type = pokemon.types.map(t => t.type.name).join(', ');

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${name}">
    <h3>${id} - ${name}</h3>
    <p>Tipo: ${type}</p>
  `;

  pokedex.appendChild(card);
};

fetchPokemon();
function searchPokemon() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const pokemonCard = document.querySelectorAll('.pokemon');
    pokemonCard.forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = name.includes(query) ? 'block' : 'none';
    });
  }
  let currentPage = 1;
const perPage = 20;

function loadPokemonPage(page) {
  const start = (page - 1) * perPage + 1;
  const end = page * perPage;
  for (let i = start; i <= end; i++) {
    fetchPokemon(i);
  }
}

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => createPokemonCard(data));
}

function createPokemonCard(pokemon) {
  // Criação do card do Pokémon
}
function openModal(pokemon) {
    document.getElementById('modalTitle').textContent = pokemon.name;
    document.getElementById('modalDetails').textContent = `Altura: ${pokemon.height} | Peso: ${pokemon.weight}`;
    document.getElementById('pokemonModal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('pokemonModal').style.display = 'none';
  }
  function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon');
    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <h3>${pokemon.name}</h3>
      <button onclick="openModal(${JSON.stringify(pokemon)})">Detalhes</button>
    `;
    document.getElementById('pokedex').appendChild(card);
  }
  function filterByType() {
    const selectedType = document.getElementById('typeFilter').value;
    const pokemonCards = document.querySelectorAll('.pokemon');
    pokemonCards.forEach(card => {
      const types = card.dataset.types.split(',');
      card.style.display = selectedType === '' || types.includes(selectedType) ? 'block' : 'none';
    });
  }
  function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon');
    card.dataset.types = pokemon.types.map(type => type.type.name).join(',');
    // Adicione o conteúdo do card
  }
  const pokedexContainer = document.getElementById('pokedex');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');

let allPokemon = [];

async function fetchPokemon() {
  for (let i = 1; i <= 151; i++) { // Primeira geração
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    allPokemon.push(data);
  }
  displayPokemon(allPokemon);
}

function displayPokemon(pokemonList) {
  pokedexContainer.innerHTML = '';
  pokemonList.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.innerHTML = `
      <h3>#${pokemon.id} ${pokemon.name}</h3>
      <img src="${pokemon.sprites.front_default}" class="pokemon-img" onclick="rotatePokemon(this)">
      <p>Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    `;
    card.onclick = () => showDetails(pokemon);
    pokedexContainer.appendChild(card);
  });
}

function rotatePokemon(imgElement) {
  imgElement.classList.add('rotate');
  setTimeout(() => {
    imgElement.classList.remove('rotate');
  }, 1000);
}

function searchPokemon() {
  const query = searchInput.value.toLowerCase();
  const filtered = allPokemon.filter(p => p.name.includes(query) || p.id.toString() === query);
  displayPokemon(filtered);
}

function filterByType() {
  const type = typeFilter.value;
  if (!type) {
    displayPokemon(allPokemon);
    return;
  }
  const filtered = allPokemon.filter(p => p.types.some(t => t.type.name === type));
  displayPokemon(filtered);
}

function showDetails(pokemon) {
  document.getElementById('modalTitle').innerText = `${pokemon.name.toUpperCase()} (#${pokemon.id})`;
  document.getElementById('modalDetails').innerHTML = `
    <strong>Peso:</strong> ${pokemon.weight / 10}kg<br>
    <strong>Altura:</strong> ${pokemon.height / 10}m<br>
    <strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}<br>
    <strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}
  `;
  document.getElementById('pokemonModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('pokemonModal').style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == document.getElementById('pokemonModal')) {
    closeModal();
  }
};

fetchPokemon();
async function searchPokemon() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const url = input ? `https://pokeapi.co/api/v2/pokemon/${input}` : null;

  if (!url) {
    alert('Por favor, insira o nome ou número do Pokémon.');
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Pokémon não encontrado.');

    const data = await response.json();
    displayPokemon(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayPokemon(data) {
  document.getElementById('pokemonImage').src = data.sprites.front_default;
  document.getElementById('pokemonName').textContent = data.name;
  document.getElementById('pokemonId').textContent = data.id;
  document.getElementById('pokemonHeight').textContent = data.height / 10;
  document.getElementById('pokemonWeight').textContent = data.weight / 10;
  document.getElementById('pokemonTypes').textContent = data.types.map(type => type.type.name).join(', ');

  document.getElementById('pokemonDetails').style.display = 'block';
}


        
