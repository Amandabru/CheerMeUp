import { User } from '../../userModel';
import { MemeType, NewsType, JokeType } from '../../Types';
import Card from '../../components/Card';
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
    likedJoys: (MemeType | NewsType | JokeType)[];
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
            {SectionHeader('Memes')}
            <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                {likedMemes.length > 0 ? (
                    likedMemes.map((memeObject, index) => {
                        return (
                            <Card
                                type="meme"
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
                            ></Card>
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
                    likedNews.map((newsObject, index) => {
                        return (
                            <Card
                                type="news"
                                key={index}
                                image={newsObject.urlToImage}
                                title={newsObject.title}
                                text={newsObject.text}
                                author={newsObject.author}
                                published={newsObject.publishedAt}
                                source={newsObject.source}
                                url={newsObject.url}
                                isLiked={
                                    likedNews.find(
                                        (news) => news.url === newsObject.url
                                    )
                                        ? true
                                        : false
                                }
                                handleLike={() => {
                                    likeNewsPost(newsObject);
                                }}
                            ></Card>
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
                            <Card
                                type="joke"
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
                            ></Card>
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
        </div>
    );
}

export default ProfileView;
