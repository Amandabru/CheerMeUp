import HeartIcon from '../../components/UI/HeartIcon';

function JokeView({
    randomJoke,
    jokeType,
    onNewJoke,
    liked,
    isLiked
}: {
    randomJoke: string;
    jokeType: string[];
    onNewJoke: Function;
    liked: boolean;
    isLiked: Function;
}) {
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
                    <input
                        type="radio"
                        name="options"
                        data-title="Programming"
                        className="btn"
                        value={['programming']}
                    />
                    <input
                        type="radio"
                        name="options"
                        data-title="Misc"
                        className="btn"
                        value={['misc']}
                    />
                    <input
                        type="radio"
                        name="options"
                        data-title="Pun"
                        className="btn"
                        value={['pun']}
                    />
                    <input
                        type="radio"
                        name="options"
                        data-title="All"
                        className="btn"
                        value={['programming', 'misc', 'pun']}
                    />
                </div>
                <div className="m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-lime-100 h-40 w-full overflow-x-auto flex items-center justify-center relative">
                    <span
                        onClick={() => {
                            liked = !liked;
                            isLiked(liked);
                        }}
                    >
                        <HeartIcon
                            isSolid={liked} // likedList.find((likedObject => likedObject.id === liked.id))
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                cursor: 'pointer',
                                transform: 'scale(1.5)'
                            }}
                        />
                    </span>
                    <span>{randomJoke}</span>
                </div>
                <button
                    className="btn mt-5 transition-transform min-w-fit"
                    onClick={() => {
                        if (jokeType != null) {
                            onNewJoke([jokeType]);
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
