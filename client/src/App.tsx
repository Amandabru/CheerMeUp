import "./App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { TDeck, getDecks } from "./api/getDecks";
import { createDeck } from "./api/createDeck";
import SuggestionPresenter from "./pages/suggestions/SuggestionPresenter";

// API
import { getMemes } from "./api/getMemes";

function App() {
  /*
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }
  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);*/

  /* async function getRandomSuggestion() {
    const suggestionProm = await getMemes();
    const suggestion: string = suggestionProm.memes[0].title;
    setSuggestion(suggestion);
  }*/

  /*const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    async function getRandomSuggestion() {
      const suggestionProm = await getMemes();
      // randomNumber = Math.floor(Math.random() * max);
      const suggestion: string = suggestionProm.memes[0].title;
      setSuggestion(suggestion);
    }
    getRandomSuggestion();
  }, []);*/

  return (
    /*<SuggestionPresenter
        sugg={suggestion}
        setSuggestion={(s: React.SetStateAction<string>) => setSuggestion(s)}
      /> */
    <div>
      <SuggestionPresenter />
    </div>

    /*
    <div className='container'>
      <div className='App'>
        <h1>Your Decks</h1>
        <ul className='decks'>
          {decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor='deck-title'>Deck Title</label>
          <input
            id='deck-title'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button>Create Deck</button>
        </form>
      </div>
    </div>*/
  );
}

export default App;
