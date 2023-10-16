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
    darkAttributes,
    numberLikes
}: {
    image: string;
    title: string;
    text: string;
    author: string;
    published: string;
    source: string;
    url: string;
    handleLike: Function;
    isLiked: boolean;
    darkAttributes?: string;
    numberLikes?: number;
}) {
    return (
        <div
            className={`bg-white w-96 md:w-144 h-128 md:h-128 rounded-xl overflow-hidden shadow-xl
           ${darkAttributes} `}
        >
            <div className="flex flex-col h-full">
                <h1 className="mx-8 mt-5 text-lg font-bold">{title}</h1>
                <img
                    className="object-contain w-96 h-2/6 mx-auto my-5"
                    src={image}
                />
                <p className="mx-8 mb-3">{text}</p>
                <p className="ml-8 text-xs">
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
                <div className="flex-grow"></div>{' '}
                {/* This creates space to push the button to the bottom */}
                <button
                    className="ml-8 mb-5 focus:outline-none flex items-center w-32 space-x-2"
                    onClick={() => {
                        handleLike();
                    }}
                >
                    {CheckIfLiked(isLiked)}
                    <span className="text-s">{numberLikes}</span>
                </button>
            </div>
        </div>
    );
}

export function MemeCard({
    image,
    handleLike,
    isLiked,
    darkAttributes,
    numberLikes
}: {
    image: string;
    handleLike: Function;
    isLiked: boolean;
    darkAttributes?: string;
    numberLikes: any;
}) {
    return (
        <div
            className={`bg-white w-96 md:w-144 h-96 md:h-128 rounded-xl overflow-hidden shadow-xl
        ${darkAttributes} `}
        >
            <div className="flex flex-col h-full">
                <img
                    className="object-contain w-80 md:w-128 h-5/6 mx-auto mt-8"
                    src={image}
                />
                <div className="flex-grow"></div>{' '}
                {/* This creates space to push the button to the bottom */}
                <button
                    className="ml-8 mb-5 focus:outline-none flex items-center w-32 space-x-2"
                    onClick={() => {
                        handleLike();
                    }}
                >
                    {CheckIfLiked(isLiked)}
                    <span className="text-s">{numberLikes}</span>
                </button>
            </div>
        </div>
    );
}

export function JokeCard({
    text,
    handleLike,
    isLiked,
    darkAttributes,
    numberLikes
}: {
    text: string;
    handleLike: Function;
    isLiked: boolean;
    darkAttributes?: string;
    numberLikes?: any;
}) {
    return (
        <div
            className={`bg-white w-96 md:w-144 h-32 md:h-64 rounded-xl overflow-hidden shadow-xl
        ${darkAttributes} `}
        >
            <div className="flex flex-col h-full">
                <h1 className="mx-8 mt-5 md:mt-15 text-lg md:text-3xl font-bold">
                    {text}
                </h1>
                <div className="flex-grow"></div>{' '}
                {/* This creates space to push the button to the bottom */}
                <button
                    className="ml-8 mb-5 focus:outline-none flex items-center w-32 space-x-2"
                    onClick={() => {
                        handleLike();
                    }}
                >
                    {CheckIfLiked(isLiked)}
                    <span className="text-s">{numberLikes}</span>
                </button>
            </div>
        </div>
    );
}
