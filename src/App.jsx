import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import shuffle from "./utils/shuffle";

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();
        const pokemonList = data.results;

        // Create an array to store the Pokémon cards
        const cards = [];

        // Generate a set number of cards (e.g., 30)
        const numberOfCards = 30;

        // Shuffle the list of Pokémon
        const shuffledPokemonList = shuffle(pokemonList);

        for (let i = 0; i < numberOfCards; i++) {
          const randomPokemon = shuffledPokemonList[i];
          const pokemonDetailsResponse = await fetch(randomPokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();

          const pokemonData = {
            image: pokemonDetails.sprites.front_default,
            name: randomPokemon.name,
          };

          cards.push(pokemonData);
        }

        setCards(cards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }
    fetchCards();
  }, []);

  const handleCardClick = (name) => {
    if (!clickedCards.includes(name)) {
      // If the card hasn't been clicked, add it to clickedCards
      setClickedCards([...clickedCards, name]);
      console.log(`You clicked ` + name);

      // Shuffle the remaining cards (excluding clicked cards)
      const remainingCards = cards.filter(
        (card) => !clickedCards.includes(card.name)
      );
      const shuffledRemainingCards = shuffle(remainingCards);

      // Update the state with the shuffled cards
      setCards([
        ...shuffledRemainingCards,
        ...clickedCards.map((name) => cards.find((card) => card.name === name)),
      ]);
    }
  };

  return (
    <div className="cardWrapper">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          text={card.name}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default App;
