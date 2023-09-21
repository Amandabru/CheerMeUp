import { useState } from "react";
import SuggestionView from "./SuggestionView";

// import {getSuggestions} from "../../api/getSuggestions"

function SuggestionPresenter({ sugg }: { sugg: string }) {
  return (
    <SuggestionView randomizedSuggestion={sugg} setCurrentSuggestion={"hej"} />
  );
}

export default SuggestionPresenter;
