import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
//import promiseNoData from '../../PromiseNoData';
import MemeView from './MemeView';
import { useState, useEffect } from 'react';
import { MemeType } from '../../Types';

function MemePresenter({ model }: { model: CheerModel }) {
    const data: MemeType[] = useModelProp(model, 'currentMemeData');

    useEffect(() => {
        // Call the setMeme method when the component mounts
        model.setMeme();
    }, []); // The empty dependency array ensures this effect runs only once on mount

    return (
        (data && (
            <MemeView randomMeme={data} onNewMeme={() => model.setMeme()} />
        )) || (
            <MemeView
                randomMeme={undefined}
                onNewMeme={() => model.setMeme()}
            />
        )
    );
}

export default MemePresenter;
