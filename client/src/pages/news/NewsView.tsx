import { NewsType } from '../../Types';
import Card from '../../components/Card';
import { User } from '../../userModel';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

function NewsView({
    newsData,
    onIncrement,
    onDecrement,
    count,
    likedNews,
    likePost,
    user,
    showUserMustLogin
}: {
    newsData: NewsType[];
    onIncrement: () => void;
    onDecrement: () => void;
    count: number;
    likedNews: NewsType[];
    likePost: Function;
    user: User | null;
    showUserMustLogin: Function;
}) {
    return (
        <div
            className="bg-blue-300 text-black min-h-screen bg-fixed
            dark:bg-[#04052e] dark:text-white"
        >
            <h1 className=" absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Tired of Bad News?
            </h1>
            <h2 className="absolute top-[26%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                We only serve good ones!
            </h2>
            <div
                className="absolute top-[28%] bg-blue-300 text-black min-h-screen bg-fixed
                dark:bg-[#04052e] "
            >
                <div className="flex justify-center items-center !scroll-smooth">
                    {count ? (
                        <button
                            className="btn btn-accent mt-10 mr-10"
                            onClick={() => {
                                onDecrement();
                                console.log('- pressed');
                            }}
                        >
                            <AiOutlineArrowLeft style={{ scale: '2' }} />
                        </button>
                    ) : null}
                    <button
                        className="btn btn-accent mt-10"
                        onClick={() => {
                            onIncrement();
                            console.log('+ pressed');
                        }}
                    >
                        <AiOutlineArrowRight style={{ scale: '2' }} />
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
                                    text={newsObject.text}
                                    author={newsObject.author}
                                    published={newsObject.publishedAt}
                                    source={newsObject.source.name}
                                    url={newsObject.url}
                                    isLiked={
                                        likedNews.find(
                                            (news) =>
                                                news.url === newsObject.url
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
                <div className="flex justify-center items-center !scroll-smooth pb-5">
                    {count ? (
                        <button
                            className="btn btn-accent mt-10 mr-10"
                            onClick={() => {
                                onDecrement();
                                console.log('- pressed');
                            }}
                        >
                            <AiOutlineArrowLeft style={{ scale: '2' }} />
                        </button>
                    ) : null}
                    <button
                        className="btn btn-accent mt-10"
                        onClick={() => {
                            onIncrement();
                            console.log('+ pressed');
                        }}
                    >
                        <AiOutlineArrowRight style={{ scale: '2' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewsView;
