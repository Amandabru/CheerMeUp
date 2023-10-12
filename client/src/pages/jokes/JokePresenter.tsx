import promiseNoData from '../../PromiseNoData';
import JokeView from './JokeView';
import { useState } from 'react';
import usePromise from '../../hooks/usePromise';
import { getJoke } from '../../api/getJoke';
import { JokeType } from '../../Types';
import santa from '../../assets/audio/santa.mp3';
import spooky from '../../assets/audio/spooky.mp3';

function JokePresenter() {
    const [promise, setPromise] = useState<Promise<JokeType> | null>(null);
    const [data, error] = usePromise(promise);
    const [jokeType, setJokeType] = useState<string[]>([]);
    const [liked, isLiked] = useState<boolean>(false);
    let santaLaugh = new Audio(santa);
    let spookyLaugh = new Audio(spooky);

    const categories: string[] = [
        'programming',
        'pun',
        'dark',
        'spooky',
        'christmas'
    ];

    const playSantaLaugh = () => {
        console.log('here');
        santaLaugh.play();
    };

    const playSpookyLaugh = () => {
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
                data?.text
            }
            onChristmasClick={() => playSantaLaugh()}
            onSpookyClick={() => playSpookyLaugh()}
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
