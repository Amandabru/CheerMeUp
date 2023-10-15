import HeartIcon from './UI/HeartIcon';

function Card({
    type,
    image,
    title,
    text,
    author,
    published,
    source,
    url,
    handleLike,
    isLiked,
    darkAttributes
}: {
    type: 'joke' | 'meme' | 'news';
    image?: string;
    title?: string;
    text?: string;
    author?: string;
    published?: string;
    source?: string;
    url?: string;
    handleLike: Function;
    isLiked: boolean;
    darkAttributes: string;
}) {
    const cardSizeClasses = {
        joke: 'w-48 h-64',
        meme: 'w-128 h-128',
        news: 'w-144 h-128'
    };

    const imageClasses = {
        joke: '',
        meme: 'object-contain w-128 h-5/6 mx-auto ',
        news: 'object-contain w-96 h-2/6 mx-auto my-5'
    };

    return (
        <div
            className={`bg-white rounded-3xl overflow-hidden shadow-lg ${cardSizeClasses[type]}
           ${darkAttributes} `}
        >
            <div className="flex flex-col h-full">
                <h1 className="mx-8 mt-5 text-lg font-bold">{title}</h1>
                <img className={`${imageClasses[type]}`} src={image} />
                <p className="mx-8 mb-3">{text}</p>
                <p className="ml-8 text-xs">
                    <span className="mr-5">{author}</span>
                    <span className="mr-5">{published}</span>
                    {type === 'news' && (
                        <span className="mr-2">Read more:</span>
                    )}
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
                    className="ml-8 mb-5 focus:outline-none flex items-center w-32"
                    onClick={() => {
                        handleLike();
                    }}
                >
                    {isLiked ? (
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
                    )}
                </button>
            </div>
        </div>
    );
}

export default Card;
