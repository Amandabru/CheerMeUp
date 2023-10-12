import { useState, useEffect } from 'react';
import { CheerModel } from '../models/model';
import { DataStructure } from '../Types';

function useLikedJoys(model: CheerModel): DataStructure {
    const [value, setValue] = useState(model.likedJoys);
    console.log('IN custom hook logging liked jokes:', model.likedJoys.jokes);
    useEffect(
        function () {
            function obs() {
                setValue(model.likedJoys);
            }
            model.addObserver(obs);
            return function () {
                model.removeObserver(obs);
            };
        },
        [model, model.likedJoys]
    );
    return value;
}

export default useLikedJoys;
