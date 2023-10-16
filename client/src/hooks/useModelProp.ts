import React from 'react';
import { CheerModel } from '../models/model';

function useModelProp(model: CheerModel) {
    const [value, setValue] = React.useState(model.likedJoys);

    React.useEffect(() => {
        // Define a callback function to set the value
        const observerCallback = () => setValue(model.likedJoys);

        // Add the observer callback to the model
        model.addObserver(observerCallback);

        // Return a cleanup function to remove the observer
        return function () {
            // Remove the observer callback from the model
            model.removeObserver(observerCallback);
        };
    }, [model.likedJoys]);

    return value;
}

export default useModelProp;
