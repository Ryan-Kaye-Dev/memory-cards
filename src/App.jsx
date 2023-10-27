import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import shuffle from "./utils/shuffle";
import TopBar from "./components/TopBar";
import { ThreeDots } from "react-loader-spinner";
import GameOver from "./components/GameOver";

function App() {
  const [cards, setCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

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
        const displayedCards = [];

        // Generate a set number of cards (e.g., 30)
        const numberOfCards = 151;
        const numberOfDisplayedCards = 6;

        // Shuffle the list of Pokémon
        const shuffledPokemonList = shuffle(pokemonList);
        const addedPokemonNames = [];

        for (let i = 0; i < numberOfCards; i++) {
          const randomPokemon = shuffledPokemonList[i];
          const pokemonDetailsResponse = await fetch(randomPokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();

          const pokemonData = {
            image: pokemonDetails.sprites.front_default,
            name: randomPokemon.name,
          };

          if (!addedPokemonNames.includes(pokemonData.name)) {
            cards.push(pokemonData);
            addedPokemonNames.push(pokemonData.name);
          }
        }

        for (let i = 0; i < numberOfDisplayedCards; i++) {
          displayedCards.push(cards[i]);
        }

        setCards(cards);
        setDisplayedCards(displayedCards);
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error("Error fetching cards:", error);
        setLoading(false); // Set loading to false on error
      }
    }
    fetchCards();
  }, []);
  
  useEffect(() => {
    // Apply the "pop" class to each card when they are added to the DOM
    const cardsToPop = document.querySelectorAll(".card");
    cardsToPop.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("pop");
      }, index * 200); // Delay each card's animation
    });
  }, [displayedCards]);

  const handleCardClick = (name) => {
    if (!clickedCards.includes(name)) {
      // If the card hasn't been clicked, add it to clickedCards
      setClickedCards([...clickedCards, name]);
      console.log(`You clicked ` + name);

      // Update the score
      setScore(score + 1);

      // Update the high score if necessary
      if (score >= highScore) {
        setHighScore(highScore + 1);
      }

      const shuffledCards = shuffle(cards);

      // Update the state with the shuffled cards
      setCards([
        ...shuffledCards,
        ...clickedCards.map((name) => cards.find((card) => card.name === name)),
      ]);
      setDisplayedCards(shuffledCards.slice(0, 6));
    } else {
      // If the card has been clicked, reset the game
      setGameOver(true);
      setClickedCards([]);
      setScore(0);
    }
  };

  return (
    <div className="app">
      {gameOver ? (
          <GameOver highScore={highScore} onRestart={() => {
            // Shuffle the cards again
            const shuffledCards = shuffle(cards);
            setCards(shuffledCards);
            setDisplayedCards(shuffledCards.slice(0, 6));
            setClickedCards([]);
            setScore(0);
            setGameOver(false);
          }} />
        ) : (
        <>
          <TopBar score={score} highScore={highScore} />
          {loading ? (
            // Show the loader while loading
            <div className="loader">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#396d73"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />{" "}
            </div>
          ) : (
            // Show the cards and TopBar when not loading
            <div className="cardWrapper">
              {displayedCards.map((card, index) => (
                <Card
                  key={index}
                  image={card.image}
                  text={card.name}
                  handleCardClick={handleCardClick}
                  className="card" // Add a class to the Card component
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
