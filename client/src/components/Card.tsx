import HeartIcon from './UI/HeartIcon';

function CheckIfLiked(isLiked: Boolean) {
    return isLiked ? (
        <HeartIcon
            isSolid={true}
            style={{
                cursor: 'pointer',
                transform: 'scale(1.5)'
            }}
        />
    ) : (
        <HeartIcon
            isSolid={false}
            style={{
                cursor: 'pointer',
                transform: 'scale(1.5)'
            }}
        />
    );
}

// check if card is displayed on home page or not
function CheckIfHome({
    handleLike,
    isLiked,
    numberLikes
}: {
    handleLike: Function | undefined;
    isLiked: boolean | undefined;
    numberLikes: number | undefined;
}) {
    return handleLike !== undefined && isLiked !== undefined ? (
        <button
            className="ml-8 mb-5 focus:outline-none flex items-center w-32 space-x-2"
            onClick={() => {
                handleLike();
            }}
        >
            {CheckIfLiked(isLiked)}
            <span className="text-s">{numberLikes}</span>
        </button>
    ) : (
        <h1 className="text-md ml-8 mb-2">
            Number of likes: <span className="ml-2 text-xl">{numberLikes}</span>
        </h1>
    );
}

export function NewsCard({
    image,
    title,
    text,
    author,
    published,
    source,
    url,
    handleLike,
    isLiked,
    numberLikes
}: {
    image: string;
    title: string;
    text: string;
    author: string;
    published: string;
    source: string;
    url: string;
    handleLike?: Function | undefined;
    isLiked?: boolean | undefined;
    numberLikes?: number | undefined;
}) {
    return (
        <div
            className={`bg-white w-2/3 rounded-xl overflow-hidden shadow-xl
            `}
        >
            <div className="flex flex-col h-full">
                <h1 className="mx-8 mt-5 text-lg font-bold">{title}</h1>
                <img
                    className="object-contain w-96 h-2/6 mx-auto my-5"
                    src={image}
                />
                <p className="mx-8 mb-3">{text}</p>
                <p className="mx-8 mb-10 text-xs">
                    <span className="mr-5">{author}</span>
                    <span className="mr-5">{published}</span>

                    <span className="mr-2">Read more:</span>

                    <a
                        href={url}
                        className="text-blue-700 hover:text-black"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {source}
                    </a>
                </p>

                {CheckIfHome({ handleLike, isLiked, numberLikes })}
            </div>
        </div>
    );
}

export function MemeCard({
    image,
    handleLike,
    isLiked,
    numberLikes
}: {
    image: string;
    handleLike?: Function | undefined;
    isLiked?: boolean | undefined;
    numberLikes?: number | undefined;
}) {
    return (
        <div
            className={`bg-white w-2/3 rounded-xl overflow-hidden shadow-xl
       `}
        >
            <div className="flex flex-col h-full">
                <img
                    className="object-contain w-80 md:w-128 h-5/6 mx-auto mt-8 mb-10"
                    src={image}
                />

                {CheckIfHome({ handleLike, isLiked, numberLikes })}
            </div>
        </div>
    );
}

export function JokeCard({
    text,
    handleLike,
    isLiked,
    numberLikes
}: {
    text: string;
    handleLike?: Function | undefined;
    isLiked?: boolean | undefined;
    numberLikes?: number | undefined;
}) {
    return (
        <div
            className={`bg-white w-2/3 rounded-xl overflow-hidden shadow-xl
        `}
        >
            <div className="flex flex-col h-full">
                <h1 className="mx-8 my-10 md:my-20 text-lg md:text-3xl font-bold">
                    {text}
                </h1>

                {/* This creates space to push the button to the bottom */}
                {CheckIfHome({ handleLike, isLiked, numberLikes })}
            </div>
        </div>
    );
}
