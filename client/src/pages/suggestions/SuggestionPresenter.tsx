import { useState } from "react";
import SuggestionView from "./SuggestionView";

import { getSuggestions } from "../../api/getSuggestions";

function SuggestionPresenter() {
  const [suggestion, setSuggestion] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("");
  const [company, setCompany] = useState<boolean>(true);

  const getRandomSuggestion = async (
    newActivityType: string,
    company: boolean
  ) => {
    // !! model grejs etc + redux
    setActivityType(newActivityType);
    setCompany(company);
    const suggestionProm = await getSuggestions(newActivityType, company);
    const newSuggestion = suggestionProm.activity;
    setSuggestion(newSuggestion);
  };

  return (
    <SuggestionView
      randomizedSuggestion={suggestion}
      activityType={activityType}
      onActivityTypeChange={getRandomSuggestion}
      isToggled={company}
      onToggle={getRandomSuggestion}
    />
  );
}

export default SuggestionPresenter;
