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
        
