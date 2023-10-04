import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
import promiseNoData from '../../PromiseNoData';
import JokeView from './JokeView';
import { useState } from 'react';

function JokePresenter({ model }: { model: CheerModel }) {
    const type = useModelProp(model, 'jokeType');
    const data = useModelProp(model, 'currentJokeData');
    const error = useModelProp(model, 'currentJokeError');

    // TODO: Implement with model

    const [liked, isLiked] = useState<boolean>(false);

    const categories: string[] = [
        'programming',
        'misc',
        'pun',
        'dark',
        'spooky',
        'christmas'
    ];

    return (
        <JokeView
            randomJoke={
                promiseNoData(type, data, error, 'Choose a Type') || data.text
            }
            jokeType={type}
            onNewJoke={(newType: string[]) => {
                model.setJoke(newType);
            }}
            liked={liked}
            isLiked={(l: boolean) => isLiked(l)}
            categories={categories}
        />
    );
}

export default JokePresenter;
