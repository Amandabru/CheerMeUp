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
    let santaLaugh = new Audio('../../assets/audio/santa.mp3');
    let spookyLaugh = new Audio('../../assets/audio/spooky.mp3');

    const categories: string[] = [
        'programming',
        'pun',
        'dark',
        'spooky',
        'christmas'
    ];

    const playSantaLaugh = () => {
        santaLaugh.play();
    };

    const playspookyLaugh = () => {
        spookyLaugh.play();
    };

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
