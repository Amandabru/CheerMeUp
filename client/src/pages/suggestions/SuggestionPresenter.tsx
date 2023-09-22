import { getMemes } from "../../api/getMemes";
import { useState, useEffect } from "react";
import SuggestionView from "./SuggestionView";

import { getSuggestions } from "../../api/getSuggestions";

function SuggestionPresenter() {
  const [suggestion, setSuggestion] = useState<string>("");

  /*
  const getRandomSuggestion = async () => {
    const suggestionProm = await getMemes();
    let randomNumber: number = Math.floor(Math.random() * 11);
    const newSuggestion: string = suggestionProm.memes[randomNumber].title; // all memes do not seem to have a title
    setSuggestion(newSuggestion);
  };
  */

  const getRandomSuggestion = async () => {
    const suggestionProm = await getSuggestions("cooking", true);
    const newSuggestion = suggestionProm.activity;
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
