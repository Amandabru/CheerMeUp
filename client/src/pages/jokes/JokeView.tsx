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
            <div className="btn-group">
                <input
                    type="radio"
                    name="options"
                    data-title="Programming"
                    className="btn"
                />
                <input
                    type="radio"
                    name="options"
                    data-title="Misc"
                    className="btn"
                />
                <input
                    type="radio"
                    name="options"
                    data-title="Pun"
                    className="btn"
                />
            </div>
            <div className="absolute top-1/3 left-1/4 w-1/2 m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-lime-100	">
                {randomJoke}
            </div>
            <button
                className="btn absolute top-1/2 left-1/2 m-auto"
                onClick={() => {
                    onNewJoke(jokeType);
                    console.log('onclick ' + jokeType);
                }}
            >
                Get new joke
            </button>
        </div>
    );
}

export default JokeView;
