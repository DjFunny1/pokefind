let allPokemons = [];  // lista completa de Pokémons

        function fetchAllPokemon() {
            fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
                .then(res => res.json())
                .then(data => {
                    allPokemons = data.results; // Guarda aqui los Pokémon
                    displayPokemons(allPokemons);
                });
        }

        function displayPokemons(pokemonList) {
            const pokemonListContainer = document.getElementById('pokemonList');
            pokemonListContainer.innerHTML = ""; // Limpiar el contenedor

            pokemonList.forEach((pokemon) => {
                fetch(pokemon.url)
                    .then(res => res.json())
                    .then(pokemonData => {
                        const pokemonCard = document.createElement("div");
                        pokemonCard.classList.add("pokemonCard");

                        const pokemonCardInner = document.createElement("div");//para el efecto de flipcard 3d
                        pokemonCardInner.classList.add("pokemonCardInner");

                        const pokemonCardFront = document.createElement("div");
                        pokemonCardFront.classList.add("pokemonCardFront");
                        pokemonCardFront.innerHTML = `
                            <h2>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                            <img src="${pokemonData.sprites.other.home.front_default}" alt="${pokemonData.name}" style="width: 100%; height: auto;">
                            <p>Tipo: ${pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                        `;

                        const pokemonCardBack = document.createElement("div");
                        pokemonCardBack.classList.add("pokemonCardBack");
                        pokemonCardBack.innerHTML = `
                            <h3>Detalles</h3>
                            <p>Altura: ${pokemonData.height / 10} m</p>
                            <p>Peso: ${pokemonData.weight / 10} kg</p>
                            <p>Habilidades: ${pokemonData.abilities.map(abilitiesInfo => abilitiesInfo.ability.name).join(', ')}</p>
                            <p>Estadísticas: ${pokemonData.stats.map(statsInfo => statsInfo.stat.name).join(', ')}</p>
                            <p>Potencias: ${pokemonData.stats.map(statsInfo => statsInfo.base_stat)}</p>
                        `;

                        pokemonCardInner.appendChild(pokemonCardFront);
                        pokemonCardInner.appendChild(pokemonCardBack);
                        pokemonCard.appendChild(pokemonCardInner);
                        pokemonListContainer.appendChild(pokemonCard);
                    });
            });
        }

        function searchPokemons() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
            displayPokemons(filteredPokemons);
        }

        document.getElementById('searchButton').addEventListener('click', searchPokemons);
        document.getElementById('searchInput').addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                searchPokemons();
            }
        });

        // Cargar todos los Pokémon al cargar la página
        fetchAllPokemon();

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
        }
        
        function toggleDarkMode() {
            let isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        }
        
          // On page load
        document.addEventListener('DOMContentLoaded', (event) => {
            if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            }
        });