function JokeView({
    randomJoke,
    jokeType,
    onNewJoke
}: {
    randomJoke: string;
    jokeType: string[];
    onNewJoke: Function;
}) {
    return (
        <div className="bg-lime-200	text-black h-full w-full fixed">
            <div
                className="btn-group"
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
            <div className="absolute top-1/4 left-1/4 w-1/2 text-center">
                <div className="m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-lime-100	">
                    {randomJoke}
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
