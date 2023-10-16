import { JokeType } from '../../Types';
import HeartIcon from '../../components/UI/HeartIcon';
import { useState } from 'react';
import { User } from '../../userModel';

function JokeView({
    randomJokeText,
    randomJokeData,
    onChristmasClick,
    onSpookyClick,
    jokeType,
    onNewJoke,
    likedJokes,
    isLiked,
    categories,
    user,
    showUserMustLogin
}: {
    randomJokeText: string | React.ReactElement | undefined;
    randomJokeData: JokeType | null;
    onChristmasClick: Function;
    onSpookyClick: Function;
    jokeType: string[];
    onNewJoke: Function;
    likedJokes: JokeType[];
    isLiked: Function;
    categories: string[];
    user: User | null;
    showUserMustLogin: Function;
}) {
    const [hidden, setVisability] = useState<
        'visible' | 'hidden' | 'collapse' | undefined
    >('hidden');
    return (
        <div
            className="bg-green-200 text-black h-full w-full fixed
        dark:bg-[#132A13] dark:text-white"
        >
            <h1 className=" absolute top-[13%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                {' '}
                Need a Good Laugh?
            </h1>
            <h2 className=" absolute top-[19%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Say no more!
            </h2>
            <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                <div
                    className="btn-group mb-5 shadow-lg"
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
                            className="btn "
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
                <div
                    className="m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-green-100 h-40 w-full overflow-x-auto flex items-center justify-center relative 
                    dark:bg-[#183618] dark:text-gray-300 dark:border-[#1f471f]"
                >
                    <span
                        onClick={() => {
                            user
                                ? isLiked(randomJokeData)
                                : showUserMustLogin();
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
                    className="btn mt-5 transition-transform min-w-fit shadow-lg"
                    onClick={() => {
                        if (jokeType.length) {
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
