import { getMemes } from "../../api/getMemes";
import { useState, useEffect } from "react";
import SuggestionView from "./SuggestionView";

// import {getSuggestions} from "../../api/getSuggestions"

function SuggestionPresenter() {
  const [suggestion, setSuggestion] = useState<string>("");

  const getRandomSuggestion = async () => {
    const suggestionProm = await getMemes();
    let randomNumber = Math.floor(Math.random() * 11);
    const newSuggestion: string = suggestionProm.memes[randomNumber].title;
    setSuggestion(newSuggestion);
  };

  useEffect(() => {
    getRandomSuggestion();
  }, []);

  return (
    <SuggestionView
      randomizedSuggestion={suggestion}
      onNewSuggestion={getRandomSuggestion}
    />
  );
}

export default SuggestionPresenter;
