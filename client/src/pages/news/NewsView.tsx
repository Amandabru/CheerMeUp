import { NewsType } from '../../Types';
import { NewsCard } from '../../components/Card';
import { User } from '../../userModel';
import PaginationButtons from '../../components/UI/PaginationButtons';

function NewsView({
    newsData1,
    newsData2,
    onIncrement,
    onDecrement,
    count,
    likedNews,
    likePost,
    user,
    showUserMustLogin
}: {
    newsData1: NewsType[];
    newsData2: NewsType[];
    onIncrement: () => void;
    onDecrement: () => void;
    count: number;
    likedNews: NewsType[];
    likePost: Function;
    user: User | null;
    showUserMustLogin: Function;
}) {
    function mapCards(newsData: NewsType[]) {
        return newsData ? (
            newsData.map((newsObject, index) => (
                <NewsCard
                    key={index}
                    image={newsObject.urlToImage}
                    title={newsObject.title}
                    text={newsObject.text}
                    author={newsObject.author}
                    published={newsObject.publishedAt}
                    source={newsObject.source}
                    url={newsObject.url}
                    isLiked={
                        likedNews.find((news) => news.url === newsObject.url)
                            ? true
                            : false
                    }
                    handleLike={() => {
                        user ? likePost(newsObject) : showUserMustLogin();
                    }}
                />
            ))
        ) : (
            <div>No news data available</div>
        );
    }
    return (
        <div
            className="bg-gradient-to-r from-blue-200 to-blue-300 text-black min-h-screen bg-fixed
            dark:from-[#08094d]  dark:to-[#04052e] dark:text-white"
        >
            <h1 className=" absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Tired of Bad News?
            </h1>
            <h2 className="absolute top-[26%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                We only serve good ones!
            </h2>
            <div className="absolute top-[30%] flex w-full place-items-center">
                {' '}
                <button className="btn btn-outline">More happy news!</button>
            </div>
            <div
                className="absolute top-[36%] bg-gradient-to-r from-blue-200 to-blue-300 text-black min-h-screen bg-fixed
                dark:from-[#08094d]  dark:to-[#04052e] "
            >
                <PaginationButtons
                    count={count}
                    onDecrement={onDecrement}
                    onIncrement={onIncrement}
                />
                <section className="w-full !scroll-smooth">
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="flex flex-col w-full md:w-1/2 gap-y-10 mt-10 place-items-center md:place-items-end md:mr-[3%]">
                            {mapCards(newsData1)}
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 gap-y-10 mt-10 place-items-center md:place-items-start md:ml-[3%]">
                            {mapCards(newsData2)}
                        </div>
                    </div>
                </section>
                <PaginationButtons
                    count={count}
                    onDecrement={onDecrement}
                    onIncrement={onIncrement}
                    position={'bottom'}
                />
                <div className="h-10"></div>
            </div>
        </div>
    );
}

export default NewsView;
