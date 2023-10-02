import { useState, useEffect } from "react";
import SuggestionView from "./SuggestionView";
import { CheerModel } from "../../models/model";
import useModelProp from "../../hooks/useModelProp";
import promiseNoData from "../../PromiseNoData";

function SuggestionPresenter({ model }: { model: CheerModel }) {
  const data = useModelProp(model, "currentSuggestionData");
  const type = useModelProp(model, "type");
  const error = useModelProp(model, "currentSuggestionError");

  // Alone activity
  const [company, setCompany] = useState<boolean>(false);

  // const [s, setSuggestion] = useState<string>("");
  // const [a, setActivityType] = useState<string>("");

  return (
    <SuggestionView
      randomizedSuggestion={data.activity}
      isToggled={company}
      onToggle={(c: boolean) => setCompany(c)}
      activityType={type}
      onNewSuggestion={(newType: string) => {
        model.setType(newType, company);
      }}
      promiseNoData={promiseNoData(type, data, error, "Pick an Activity Type")}
    />
  );
}

export default SuggestionPresenter;
