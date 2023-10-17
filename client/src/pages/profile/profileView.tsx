import { User } from '../../userModel';
import { MemeType, NewsType, JokeType } from '../../Types';
import { MemeCard, NewsCard, JokeCard } from '../../components/Card';
import { SadSmiley } from '../../components/UI/SadSmileyIcon';
import { Link } from 'react-router-dom';

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
        <div
            className="bg-gradient-to-r from-red-200 to-red-300 text-black min-h-screen bg-fixed pb-8
        dark:from-[#08094d]  dark:to-[#04052e] dark:text-white"
        >
            <h1 className="absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Hi {user?.username}!
            </h1>
            <h2 className="absolute top-[28%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-80 md:w-144">
                Take a moment to smile – here are all your previous laughs!
            </h2>
            <div
                className="absolute top-[38%] bg-gradient-to-r from-red-200 to-red-300 dark:from-[#08094d] dark:to-[#04052e] text-black
                   "
            >
                <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-10 mb-20">
                    {likedJoys.length > 0 ? (
                        likedJoys.map((object, index) => {
                            let cardComponent = null;
                            if (object.type === 'meme') {
                                cardComponent = (
                                    <MemeCard
                                        key={index}
                                        image={(object as MemeType).url}
                                        isLiked={
                                            likedMemes.find(
                                                (meme) =>
                                                    meme.url ===
                                                    (object as MemeType).url
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
                                cardComponent = (
                                    <NewsCard
                                        key={index}
                                        title={(object as NewsType).title}
                                        image={(object as NewsType).urlToImage}
                                        text={(object as NewsType).text}
                                        author={(object as NewsType).author}
                                        published={
                                            (object as NewsType).publishedAt
                                        }
                                        source={(object as NewsType).source}
                                        url={(object as NewsType).url}
                                        isLiked={
                                            likedNews.find(
                                                (news) =>
                                                    news.url ===
                                                    (object as NewsType).url
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
                                cardComponent = (
                                    <JokeCard
                                        key={index}
                                        text={(object as JokeType).text}
                                        isLiked={
                                            likedJokes.find(
                                                (joke) =>
                                                    joke.text ===
                                                    (object as JokeType).text
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
        </div>
    );
}
export default ProfileView;
