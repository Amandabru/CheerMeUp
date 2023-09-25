import { useState, useEffect } from "react";
import SuggestionView from "./SuggestionView";

import { getSuggestions } from "../../api/getSuggestions";

function SuggestionPresenter() {
  const [suggestion, setSuggestion] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("");

  const getRandomSuggestion = async (newActivityType: string) => {
    if (newActivityType.trim() !== "") {
      // !!
      setActivityType(newActivityType);
      const suggestionProm = await getSuggestions(newActivityType, true);
      const newSuggestion = suggestionProm.activity;
      setSuggestion(newSuggestion);
    }
  };

  return (
    <SuggestionView
      randomizedSuggestion={suggestion}
      activityType={activityType}
      onActivityTypeChange={getRandomSuggestion}
    />
  );
}

export default SuggestionPresenter;
