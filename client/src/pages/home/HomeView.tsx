import { DataBaseType } from '../../Types';
import Card from '../../components/Card';

function HomeView({
    popularData,
    onIncrement,
    onDecrement
}: {
    popularData: DataBaseType[];
    onIncrement: () => void;
    onDecrement: () => void;
}) {
    console.log(popularData);
    return (
        <div className="bg-pink-300 text-black min-h-screen bg-fixed">
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
                {popularData ? (
                    popularData.map((popularObject, index) => {
                        return <Card key={index}></Card>;
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

export default HomeView;
