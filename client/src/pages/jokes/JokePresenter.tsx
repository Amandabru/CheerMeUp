import promiseNoData from '../../PromiseNoData';
import JokeView from './JokeView';
import { useState } from 'react';
import usePromise from '../../hooks/usePromise';
import { getJoke } from '../../api/getJoke';
import { JokeType } from '../../Types';
import santa from '../../assets/audio/santa.mp3';
import spooky from '../../assets/audio/spooky.mp3';
import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';

function JokePresenter({ model }: { model: CheerModel }) {
    const [promise, setPromise] = useState<Promise<JokeType> | null>(null);
    const [joke, error] = usePromise(promise);
    const [jokeType, setJokeType] = useState<string[]>([]);
    let santaLaugh = new Audio(santa);
    let spookyLaugh = new Audio(spooky);
    const likedJoys = useModelProp(model, 'likedJoys');

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

    const playSpookyLaugh = () => {
        spookyLaugh.play();
    };

    const getRandomJoke = async (newJokeType: string[]) => {
        setJokeType(newJokeType);
        setPromise(getJoke(newJokeType));
    };
    console.log(likedJoys.jokes);

    return (
        <JokeView
            randomJokeText={
                promiseNoData(promise, joke, error, 'Choose a Type') ||
                joke.text
            }
            randomJokeData={joke ? joke : null}
            onChristmasClick={() => playSantaLaugh()}
            onSpookyClick={() => playSpookyLaugh()}
            jokeType={jokeType}
            onNewJoke={(newType: string[]) => {
                getRandomJoke(newType);
            }}
            likedJokes={likedJoys.jokes}
            isLiked={(joke: JokeType) => {
                model.likeOrUnlikeJoke(joke);
            }}
            categories={categories}
        />
    );
}

export default JokePresenter;
