function Card({
    type,
    image,
    title,
    description,
    author,
    published,
    source,
    url,
    handleLike,
    isLiked
}: {
    type: 'joke' | 'meme' | 'news';
    image?: string;
    title?: string;
    description?: string;
    author?: string;
    published?: string;
    source?: string;
    url?: string;
    handleLike: Function;
    isLiked: boolean;
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

    let heart = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-2"
        >
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
        </svg>
    );

    let filledHeart = (
        <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="mr-2"
        >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
        </svg>
    );

    return (
        <div
            className={`bg-white rounded-3xl overflow-hidden shadow-lg ${cardSizeClasses[type]}`}
        >
            <div className="flex flex-col h-full">
                <h1 className="mx-8 mt-5 text-lg font-bold">{title}</h1>
                <img className={`${imageClasses[type]}`} src={image} />
                <p className="mx-8 mb-3">{description}</p>
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
                    {isLiked ? heart : filledHeart}
                </button>
            </div>
        </div>
    );
}

export default Card;
