import { DataStructure, JokeType } from '../../Types';
import HeartIcon from '../../components/UI/HeartIcon';
import { useState } from 'react';

function JokeView({
    randomJokeText,
    randomJokeData,
    onChristmasClick,
    onSpookyClick,
    jokeType,
    onNewJoke,
    likedJokes,
    isLiked,
    categories
}: {
    randomJokeText: string;
    randomJokeData: JokeType;
    onChristmasClick: Function;
    onSpookyClick: Function;
    jokeType: string[];
    onNewJoke: Function;
    likedJokes: JokeType[];
    isLiked: Function;
    categories: string[];
}) {
    const [hidden, setVisability] = useState<
        'visible' | 'hidden' | 'collapse' | undefined
    >('hidden');
    return (
        <div className="bg-lime-200	text-black h-full w-full fixed">
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 text-center">
                <div
                    className="btn-group mb-5"
                    onClick={(e) => {
                        const target = e.target as HTMLInputElement;
                        jokeType = [target.value];
                    }}
                >
                    {categories.map((category) => (
                        <input
                            type="radio"
                            name="options"
                            data-title={category}
                            className="btn"
                            value={category}
                            key={category}
                            onClick={() => {
                                if (category === 'christmas') {
                                    onChristmasClick();
                                } else if (category === 'spooky') {
                                    onSpookyClick();
                                }
                            }}
                        />
                    ))}
                    <input
                        type="radio"
                        name="options"
                        data-title={'all'}
                        className="btn"
                        value={[
                            'programming',
                            'misc',
                            'pun',
                            'spooky',
                            'christmas'
                        ]}
                    />
                </div>
                <div className="m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-lime-100 h-40 w-full overflow-x-auto flex items-center justify-center relative">
                    <span
                        // TODO: Implement with model
                        onClick={() => {
                            isLiked(randomJokeData);
                        }}
                        style={{ visibility: hidden }}
                    >
                        <HeartIcon
                            isSolid={
                                likedJokes.find(
                                    (joke) =>
                                        joke.apiId === randomJokeData?.apiId
                                )
                                    ? true
                                    : false
                            }
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                cursor: 'pointer',
                                transform: 'scale(1.5)'
                            }}
                        />
                    </span>
                    <span>{randomJokeText}</span>
                </div>
                <button
                    className="btn mt-5 transition-transform min-w-fit"
                    onClick={() => {
                        if (jokeType != null) {
                            onNewJoke([jokeType]);
                            setVisability('visible');
                        }
                    }}
                >
                    Get new joke
                </button>
            </div>
        </div>
    );
}

export default JokeView;
