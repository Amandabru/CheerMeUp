import { useState } from "react";
import SuggestionView from "./SuggestionView";
import { CheerModel } from "../../models/model";
import useModelProp from "../../hooks/useModelProp";

function SuggestionPresenter({ model }: { model: CheerModel }) {
  const suggestion = useModelProp(model, "currentSuggestion");
  const type = useModelProp(model, "type");

  const [s, setSuggestion] = useState<string>("");
  const [a, setActivityType] = useState<string>("");
  const [company, setCompany] = useState<boolean>(false);

  return (
    <SuggestionView
      randomizedSuggestion={suggestion.activity}
      isToggled={company}
      onToggle={(c: boolean) => setCompany(c)}
      activityType={type}
      onNewType={(newType: string) => model.setType(newType, company)}
    />
  );
}

export default SuggestionPresenter;
