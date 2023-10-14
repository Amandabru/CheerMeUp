import Card from '../../components/Card';
import { MemeType } from '../../Types';
import { User } from '../../userModel';

function MemeView({
    memeData,
    onIncrement,
    onDecrement,
    likedMemes,
    likePost,
    user,
    showUserMustLogin
}: {
    memeData: MemeType[];
    onIncrement: () => void;
    onDecrement: () => void;
    likedMemes: MemeType[];
    likePost: Function;
    user: User | null;
    showUserMustLogin: Function;
}) {
    return (
        <div className="bg-orange-300 text-black min-h-screen bg-fixed">
            <h1 className=" absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                {' '}
                Craving a Smile?
            </h1>
            <h2 className="absolute top-[26%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Memes may brighten your day!
            </h2>
            <div className="absolute top-[28%] bg-orange-300 ">
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
                    {memeData ? (
                        memeData.map((memeObject, index) => {
                            return (
                                <Card
                                    type="meme"
                                    key={index}
                                    image={memeObject.url}
                                    isLiked={
                                        likedMemes.find(
                                            (meme) =>
                                                meme.url === memeObject.url
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        user
                                            ? likePost(memeObject)
                                            : showUserMustLogin();
                                    }}
                                ></Card>
                            );
                        })
                    ) : (
                        <div>No meme data available</div>
                    )}
                </section>
                <div className="flex justify-center items-center !scroll-smooth">
                    <button className="btn btn-accent mt-10 hidden">
                        More memes
                    </button>
                </div>
                <div className="h-15"></div>
            </div>
        </div>
    );

    {
        /*const [selectedView, setSelectedView] = useState<'random' | 'best'>(
        'random'
    );
    const renderSelectedView = () => {
        if (selectedView === 'random') {
            return <RandomMemeView />;
        } else if (selectedView === 'best') {
            return <BestMemeView />;
        }
    };

    return (
        <div className="bg-blue-300 text-black min-h-screen bg-fixed">
            <div className="flex justify-center items-center !scroll-smooth">
                <button
                    className={`btn btn-accent mr-5 mt-10 ${
                        selectedView === 'random' ? 'btn-active' : ''
                    }`}
                    onClick={() => setSelectedView('random')}
                >
                    Random
                </button>
                <button
                    className={`btn btn-accent mr-5 mt-10 ${
                        selectedView === 'best' ? 'btn-active' : ''
                    }`}
                    onClick={() => setSelectedView('best')}
                >
                    Best
                </button>
            </div>

            {renderSelectedView()}
            <div className="h-15"></div>
        </div>
    );
    
    
    {data.map((item, index) => (
                    <Card key={index} image={item.url}></Card>
                ))}*/
    }
}

export default MemeView;

/* */
