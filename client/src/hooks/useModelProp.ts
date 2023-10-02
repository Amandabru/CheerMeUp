import React from "react";
import { CheerModel } from "../models/model";

function useModelProp(model: CheerModel, property: string) {
  const [value, setValue] = React.useState(model[property]);
  React.useEffect(() => {
    model.addObserver(() => setValue(model[property]));
    return function () {
      model.removeObserver(model[property]);
    };
  }, [model]);
  return value;
}

export default useModelProp;
