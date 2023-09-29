import { useState } from "react";
import SuggestionView from "./SuggestionView";
import { CheerModel } from "../../model/model";
import useModelProp from "../../hooks/useModelProp";

import { getSuggestions, apiCall } from "../../api/getSuggestions";

function SuggestionPresenter({ model }: { model: CheerModel }) {
  const modelActivity = useModelProp(model, "activityID");

  const [suggestion, setSuggestion] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("");
  const [company, setCompany] = useState<boolean>(true);

  const apiCall = async (newActivityType: string, company: boolean) => {
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
      onActivityTypeChange={apiCall}
      isToggled={company}
      onToggle={apiCall}
      activityID={modelActivity}
      onNewActivity={(newId: string) => model.setActivityID(newId)}
    />
  );
}

export default SuggestionPresenter;
