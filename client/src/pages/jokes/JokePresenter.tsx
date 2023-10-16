import promiseNoData from '../../PromiseNoData';
import JokeView from './JokeView';
import { useState } from 'react';
import usePromise from '../../hooks/usePromise';
import { getJoke } from '../../api/getJoke';
import { DataStructure, JokeType } from '../../Types';
import santa from '../../assets/audio/santa.mp3';
import spooky from '../../assets/audio/spooky.mp3';
import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
import { User } from '../../userModel';

function JokePresenter({
    model,
    user,
    directToLogin
}: {
    model: CheerModel;
    user: User | null;
    directToLogin: Function;
}) {
    const [promise, setPromise] = useState<Promise<JokeType> | null>(null);
    const [joke, error] = usePromise(promise);
    const [jokeType, setJokeType] = useState<string[]>([]);
    let santaLaugh = new Audio(santa);
    let spookyLaugh = new Audio(spooky);
    const likedJoys: DataStructure = useModelProp(model);

    const categories: string[] = [
        'programming',
        'pun',
        'dark',
        'spooky',
        'christmas'
    ];

    const playSantaLaugh = () => {
        santaLaugh.play();
        santaLaugh.volume = 0.1;
    };

    const playSpookyLaugh = () => {
        spookyLaugh.play();
        spookyLaugh.volume = 0.1;
    };

    const getRandomJoke = async (newJokeType: string[]) => {
        setJokeType(newJokeType);
        setPromise(getJoke(newJokeType));
    };

    return (
        <JokeView
            randomJokeText={
                promiseNoData(
                    promise,
                    joke,
                    error,
                    'Choose the type of joke you want'
                ) || joke?.text
            }
            randomJokeData={(joke as JokeType) ? (joke as JokeType) : null}
            onChristmasClick={() => playSantaLaugh()}
            onSpookyClick={() => playSpookyLaugh()}
            jokeType={jokeType}
            onNewJoke={(newType: string[]) => {
                newType && getRandomJoke(newType);
            }}
            likedJokes={likedJoys.jokes}
            isLiked={(joke: JokeType) => {
                model.likeOrUnlikeJoke(joke);
            }}
            categories={categories}
            user={user}
            showUserMustLogin={() => directToLogin()}
        />
    );
}

export default JokePresenter;
