import HeartIcon from './UI/HeartIcon';

function CheckIfLiked(isLiked: Boolean) {
    return isLiked ? (
        <HeartIcon isSolid={true} />
    ) : (
        <HeartIcon isSolid={false} />
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
            className={`bg-white w-5/6 rounded-xl overflow-hidden shadow-xl justify-self-center
            `}
        >
            <div className="flex flex-col h-full">
                <h1 className="mx-8 mt-5 text-lg font-bold">{title}</h1>
                <img
                    className="object-contain w-9/12 mx-auto my-5"
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
                {handleLike !== undefined && isLiked !== undefined ? (
                    <button
                        className=" self-end mr-8 mb-5 focus:outline-none flex items-center"
                        onClick={() => {
                            handleLike();
                        }}
                    >
                        {CheckIfLiked(isLiked)}
                        <span className="text-s">{numberLikes}</span>
                    </button>
                ) : null}

                {numberLikes !== undefined ? (
                    <h1 className="text-md ml-8 mb-2">
                        Number of likes:{' '}
                        <span className="ml-2 text-xl">{numberLikes}</span>
                    </h1>
                ) : null}
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
            className={`bg-white w-5/6 rounded-xl overflow-hidden shadow-xl justify-self-center
       `}
        >
            <div className="flex flex-col h-full">
                <img
                    className="object-contain w-8/12 mx-auto mt-8 mb-10"
                    src={image}
                />

                {handleLike !== undefined && isLiked !== undefined ? (
                    <button
                        className="self-end mr-8 mb-5 focus:outline-none flex items-center"
                        onClick={() => {
                            handleLike();
                        }}
                    >
                        {CheckIfLiked(isLiked)}
                        <span className="text-s">{numberLikes}</span>
                    </button>
                ) : null}

                {numberLikes !== undefined ? (
                    <h1 className="text-md ml-8 mb-2">
                        Number of likes:{' '}
                        <span className="ml-2 text-xl">{numberLikes}</span>
                    </h1>
                ) : null}
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
            className={`bg-white w-5/6 rounded-xl overflow-hidden shadow-xl justify-self-center
        `}
        >
            <div className="flex flex-col h-full">
                {' '}
                {/* change card size by changing text margin */}
                <h1 className="mx-8 my-10 text-2xl font-bold md:my-36">
                    {text}
                </h1>
                {handleLike !== undefined && isLiked !== undefined ? (
                    <button
                        className=" self-end mr-8 mb-5 focus:outline-none flex items-center"
                        onClick={() => {
                            handleLike();
                        }}
                    >
                        {CheckIfLiked(isLiked)}
                        <span className="text-s">{numberLikes}</span>
                    </button>
                ) : null}
                {numberLikes !== undefined ? (
                    <h1 className="text-md ml-8 mb-2">
                        Number of likes:{' '}
                        <span className="ml-2 text-xl">{numberLikes}</span>
                    </h1>
                ) : null}
            </div>
        </div>
    );
}
