import { User } from '../../userModel';
import { MemeType, NewsType, JokeType } from '../../Types';
import { MemeCard, NewsCard, JokeCard } from '../../components/Card';
import { SadSmiley } from '../../components/UI/Icons';
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
    console.log(likedJoys);
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
                                    published={(object as NewsType).publishedAt}
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
    );
}
export default ProfileView;
