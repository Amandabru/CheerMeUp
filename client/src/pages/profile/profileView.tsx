import { User } from '../../userModel';
import { MemeType, NewsType, JokeType } from '../../Types';
import { MemeCard, NewsCard, JokeCard } from '../../components/Card';
import { SadSmiley } from '../../components/UI/Icons';
import { Link } from 'react-router-dom';

function SectionHeader(title: string) {
    return (
        <div className="flex justify-center text-2xl font-bold mb-4">
            {title}
        </div>
    );
}

function ProfileView({
    loggedInUser,
    likedJoys,
    likedMemes,
    likedNews,
    likedJokes,
    likeMemePost,
    likeNewsPost,
    likeJokePost
}: {
    loggedInUser: User;
    likedJoys: any[]; // objects inside of array is of MemeType, NewsType, JokeType
    likedMemes: MemeType[];
    likedNews: NewsType[];
    likedJokes: JokeType[];
    likeMemePost: Function;
    likeNewsPost: Function;
    likeJokePost: Function;
}) {
    const user = loggedInUser;

    return (
        <div className="bg-red-300 text-black min-h-screen bg-fixed">
            <div className="flex justify-center text-3xl font-bold">
                <h1 className="my-10">Hi {user?.username}</h1>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                {likedJoys.length > 0 ? (
                    likedJoys.map((object, index) => {
                        let cardComponent = null;

                        if (object.type === 'meme') {
                            // This is a MemeType object
                            cardComponent = (
                                <MemeCard
                                    key={index}
                                    image={object.url}
                                    isLiked={
                                        likedMemes.find(
                                            (meme) => meme.url === object.url
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        likeMemePost(object);
                                    }}
                                ></MemeCard>
                            );
                        } else if (object.type === 'news') {
                            // This is a NewsType object
                            cardComponent = (
                                <NewsCard
                                    key={index}
                                    title={object.title}
                                    image={object.urlToImage}
                                    text={object.text}
                                    author={object.author}
                                    published={object.publishedAt}
                                    source={object.source}
                                    url={object.url}
                                    isLiked={
                                        likedNews.find(
                                            (news) => news.url === object.url
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        likeNewsPost(object);
                                    }}
                                ></NewsCard>
                            );
                        } else if (object.type === 'joke') {
                            // This is a JokeType object
                            cardComponent = (
                                <JokeCard
                                    key={index}
                                    text={object.text}
                                    isLiked={
                                        likedJokes.find(
                                            (joke) => joke.text === object.text
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        likeJokePost(object);
                                    }}
                                ></JokeCard>
                            );
                        }

                        return cardComponent;
                    })
                ) : (
                    <>
                        <div>You have no liked content {SadSmiley()}</div>
                        <Link to="/memes">
                            <button className="btn btn-accent mt-10">
                                Show me memes!
                            </button>
                        </Link>
                    </>
                )}{' '}
            </section>
        </div>
    );
}
export default ProfileView;

/* <div className="bg-red-300 text-black min-h-screen bg-fixed">
            <div className="flex justify-center text-3xl font-bold">
                <h1 className="my-10">Hi {user?.username}</h1>
            </div>
            {SectionHeader('Memes')}
            <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                {likedMemes.length > 0 ? (
                    likedMemes.map((memeObject, index) => {
                        return (
                            <MemeCard
                                key={index}
                                image={memeObject.url}
                                isLiked={
                                    likedMemes.find(
                                        (meme) => meme.url === memeObject.url
                                    )
                                        ? true
                                        : false
                                }
                                handleLike={() => {
                                    likeMemePost(memeObject);
                                }}
                            ></MemeCard>
                        );
                    })
                ) : (
                    <>
                        <div>You have no liked memes {SadSmiley()}</div>
                        <Link to="/memes">
                            <button className="btn btn-accent mt-10">
                                Show me memes!
                            </button>
                        </Link>
                    </>
                )}{' '}
            </section>
            {SectionHeader('News')}
            <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                {likedNews.length > 0 ? (
                    likedNews.map((object, index) => {
                        return (
                            <NewsCard
                                key={index}
                                image={object.urlToImage}
                                title={object.title}
                                text={object.text}
                                author={object.author}
                                published={object.publishedAt}
                                source={object.source}
                                url={object.url}
                                isLiked={
                                    likedNews.find(
                                        (news) => news.url === object.url
                                    )
                                        ? true
                                        : false
                                }
                                handleLike={() => {
                                    likeNewsPost(object);
                                }}
                            ></NewsCard>
                        );
                    })
                ) : (
                    <>
                        <div>You have no liked news {SadSmiley()}</div>
                        <Link to="/news">
                            <button className="btn btn-accent mt-10">
                                Show me happy news!
                            </button>
                        </Link>
                    </>
                )}
            </section>
            {SectionHeader('Jokes')}
            <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                {likedJokes.length > 0 ? (
                    likedJokes.map((jokeObject, index) => {
                        return (
                            <JokeCard
                                key={index}
                                text={jokeObject.text}
                                isLiked={
                                    likedJokes.find(
                                        (joke) => joke.text === jokeObject.text
                                    )
                                        ? true
                                        : false
                                }
                                handleLike={() => {
                                    likeJokePost(jokeObject);
                                }}
                            ></JokeCard>
                        );
                    })
                ) : (
                    <>
                        <div>You have no liked jokes {SadSmiley()}</div>
                        <Link to="/jokes">
                            <button className="btn btn-accent mt-10">
                                Show me jokes!
                            </button>
                        </Link>
                    </>
                )}
            </section>
        </div> */
