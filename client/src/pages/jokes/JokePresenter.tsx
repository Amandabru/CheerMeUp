import promiseNoData from '../../PromiseNoData';
import JokeView from './JokeView';
import { useState } from 'react';
import usePromise from '../../hooks/usePromise';
import { getJoke } from '../../api/getJoke';
import { JokeType } from '../../Types';

function JokePresenter() {
    const [promise, setPromise] = useState<Promise<JokeType> | null>(null);
    const [data, error] = usePromise(promise);
    const [jokeType, setJokeType] = useState<string[]>([]);

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

    const getRandomJoke = async (newJokeType: string[]) => {
        setJokeType(newJokeType);
        setPromise(getJoke(newJokeType));
    };

    return (
        <JokeView
            randomJoke={
                promiseNoData(promise, data, error, 'Choose a Type') ||
                data.text
            }
            jokeType={jokeType}
            onNewJoke={(newType: string[]) => {
                getRandomJoke(newType);
            }}
            liked={liked}
            isLiked={(l: boolean) => isLiked(l)}
            categories={categories}
        />
    );
}

export default JokePresenter;
