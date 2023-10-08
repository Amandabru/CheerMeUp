import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
import promiseNoData from '../../PromiseNoData';
import MemeView from './MemeView';
import { useState, useEffect } from 'react';

function MemePresenter({ model }: { model: CheerModel }) {
    const data = useModelProp(model, 'currentMemeData');

    useEffect(() => {
        if (data === undefined) {
            model.setMeme();
        }
    }, [data, model]);

    return (
        <MemeView randomMeme={data?.url} onNewMeme={() => model.setMeme()} />
    );
}

export default MemePresenter;
