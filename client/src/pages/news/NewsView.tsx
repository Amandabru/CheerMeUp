import { NewsType } from '../../Types';
import Card from '../../components/Card';

function NewsView({
    randomNews,
    onIncrement,
    onDecrement
}: {
    randomNews: NewsType[];
    onIncrement: () => void;
    onDecrement: () => void;
}) {
    console.log(randomNews);
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
                {randomNews ? (
                    randomNews.map((newsObject, index) => {
                        return (
                            <Card
                                key={index}
                                image={newsObject.image}
                                title={newsObject.title}
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
