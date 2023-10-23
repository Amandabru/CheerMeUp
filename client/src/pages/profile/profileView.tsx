import { User } from '../../userModel';
import { MemeType, NewsType, JokeType } from '../../Types';
import { MemeCard, NewsCard, JokeCard } from '../../components/Card';

function ProfileView({
    loggedInUser,
    likedJoys1,
    likedJoys2,
    likedMemes,
    likedNews,
    likedJokes,
    likeMemePost,
    likeNewsPost,
    likeJokePost
}: {
    loggedInUser: User;
    likedJoys1: (MemeType | NewsType | JokeType)[];
    likedJoys2: (MemeType | NewsType | JokeType)[];
    likedMemes: MemeType[];
    likedNews: NewsType[];
    likedJokes: JokeType[];
    likeMemePost: Function;
    likeNewsPost: Function;
    likeJokePost: Function;
}) {
    const user = loggedInUser;

    function mapCards(
        likedJoys: (MemeType | NewsType | JokeType)[],
        position?: 'left' | null
    ) {
        return likedJoys.length > 0 ? (
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
                                        meme.url === (object as MemeType).url
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
                                        news.url === (object as NewsType).url
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
                                        joke.text === (object as JokeType).text
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
            <div className="w-full">
                {position === 'left' && (
                    <h2 className="text-2xl font-light text-center dark:text-white">
                        You have no liked content
                    </h2>
                )}
            </div>
        );
    }

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
                className="absolute top-[38%] w-full bg-gradient-to-r from-red-200 to-red-300 text-black
        dark:from-[#08094d]  dark:to-[#04052e]"
            >
                <section className="w-full !scroll-smooth">
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="flex flex-col w-full md:w-1/2 gap-y-10 mt-10 place-items-center md:place-items-end md:mr-[3%]">
                            {mapCards(likedJoys1, 'left')}
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 gap-y-10 mt-10 place-items-center md:place-items-start md:ml-[3%]">
                            {mapCards(likedJoys2)}
                        </div>
                    </div>
                </section>
                <div className="h-10"></div>
            </div>
        </div>
    );
}
export default ProfileView;
