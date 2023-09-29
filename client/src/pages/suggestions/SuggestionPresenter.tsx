import { useState } from "react";
import SuggestionView from "./SuggestionView";
import { CheerModel } from "../../models/model";
import useModelProp from "../../hooks/useModelProp";

function SuggestionPresenter({ model }: { model: CheerModel }) {
  const modelSuggestion = useModelProp(model, "currentSuggestion");
  const modelType = useModelProp(model, "typeID");

  const [suggestion, setSuggestion] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("");
  const [company, setCompany] = useState<boolean>(false);

  return (
    <SuggestionView
      randomizedSuggestion={modelSuggestion.activity}
      isToggled={company}
      onToggle={(c: boolean) => setCompany(c)}
      typeID={modelType}
      onNewType={(newType: string) => model.setTypeID(newType, company)}
    />
  );
}

export default SuggestionPresenter;
