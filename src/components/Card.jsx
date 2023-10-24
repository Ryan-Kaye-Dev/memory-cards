import { useState, useEffect } from 'react';

export default function Card({ image, text }) {
  const [pokemon, setPokemon] = useState({});
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonList = data.results;
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const randomPokemon = pokemonList[randomIndex];

        const pokemonDetailsResponse = await fetch(randomPokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.json();

        const pokemonData = {
          image: pokemonDetails.sprites.front_default,
          name: randomPokemon.name
        };

        setPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getPokemon();
  }, []);

return (
    <>
        {display && (
            <div className="card" onClick={() => setDisplay(false)}>
                <img src={pokemon.image} alt="Pokemon" />
                <p>{pokemon.name}</p>
            </div>
        )}
    </>
);
}
