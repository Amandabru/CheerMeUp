import "./App.css";

import SuggestionPresenter from "./pages/suggestions/SuggestionPresenter";
import { CheerModel } from "./models/model";

function App() {
  const model = new CheerModel();
  return (
    <div>
      <SuggestionPresenter model={model} />
    </div>
  );
}

export default App;
