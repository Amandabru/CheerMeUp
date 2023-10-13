import { NewsType } from '../../Types';
import Card from '../../components/Card';
import { User } from '../../userModel';

function NewsView({
    newsData,
    onIncrement,
    onDecrement,
    likedNews,
    likePost,
    user,
    showUserMustLogin
}: {
    newsData: NewsType[];
    onIncrement: () => void;
    onDecrement: () => void;
    likedNews: NewsType[];
    likePost: Function;
    user: User | null;
    showUserMustLogin: Function;
}) {
    return (
        <div className="bg-blue-300 text-black min-h-screen bg-fixed">
            <div className="flex justify-center items-center !scroll-smooth">
                <button
                    className="btn btn-accent mt-10 mr-10"
                    onClick={() => {
                        onDecrement();
                        console.log('- pressed');
                    }}
                >
                    -
                </button>
                <button
                    className="btn btn-accent mt-10"
                    onClick={() => {
                        onIncrement();
                        console.log('+ pressed');
                    }}
                >
                    +
                </button>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                {newsData ? (
                    newsData.map((newsObject, index) => {
                        return (
                            <Card
                                type="news"
                                key={index}
                                image={newsObject.urlToImage}
                                title={newsObject.title}
                                description={newsObject.description}
                                author={newsObject.author}
                                published={newsObject.publishedAt}
                                source={newsObject.source.name}
                                url={newsObject.url}
                                isLiked={
                                    likedNews.find(
                                        (news) => news.url === newsObject.url
                                    )
                                        ? true
                                        : false
                                }
                                handleLike={() => {
                                    user
                                        ? likePost(newsObject)
                                        : showUserMustLogin();
                                }}
                            ></Card>
                        );
                    })
                ) : (
                    <div>No news data available</div>
                )}
            </section>
            <div className="flex justify-center items-center !scroll-smooth">
                <button className="btn btn-accent mt-10 hidden">
                    More memes
                </button>
            </div>
            <div className="h-15"></div>
        </div>
    );
}

export default NewsView;
