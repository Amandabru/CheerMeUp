import { MemeCard } from '../../components/Card';
import { MemeType } from '../../Types';
import { User } from '../../userModel';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

function MemeView({
    memeData,
    onIncrement,
    onDecrement,
    count,
    likedMemes,
    likePost,
    user,
    showUserMustLogin
}: {
    memeData: MemeType[];
    onIncrement: () => void;
    onDecrement: () => void;
    count: number;
    likedMemes: MemeType[];
    likePost: Function;
    user: User | null;
    showUserMustLogin: Function;
}) {
    return (
        <div
            className="bg-gradient-to-r from-teal-100 to-teal-300 text-black min-h-screen bg-fixed
            dark:from-[#0d3b40] to-[#0a2d30] dark:text-white"
        >
            <h1 className=" absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Craving a Smile?
            </h1>
            <h2 className="absolute top-[26%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Memes may brighten your day!
            </h2>
            <div
                className="absolute top-[28%] bg-gradient-to-r from-teal-100 to-teal-300 
            dark:from-[#0d3b40] to-[#0a2d30]"
            >
                <div className="flex justify-center items-center !scroll-smooth">
                    {count ? (
                        <button
                            className="btn btn-accent mt-10 mr-10"
                            onClick={() => {
                                onDecrement();
                            }}
                        >
                            <AiOutlineArrowLeft style={{ scale: '2' }} />
                        </button>
                    ) : null}

                    <button
                        className="btn btn-accent mt-10"
                        onClick={() => {
                            onIncrement();
                        }}
                    >
                        <AiOutlineArrowRight style={{ scale: '2' }} />
                    </button>
                </div>
                <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                    {memeData ? (
                        memeData.map((memeObject, index) => {
                            return (
                                <MemeCard
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
                                    darkAttributes=" dark:bg-[#0e464d] dark:text-gray-200"
                                ></MemeCard>
                            );
                        })
                    ) : (
                        <div>No meme data available</div>
                    )}
                </section>
                <div className="flex justify-center items-center !scroll-smooth pb-5">
                    {count ? (
                        <button
                            className="btn btn-accent mt-10 mr-10"
                            onClick={() => {
                                onDecrement();
                                window.scrollTo(0, 0);
                            }}
                        >
                            <AiOutlineArrowLeft style={{ scale: '2' }} />
                        </button>
                    ) : null}
                    <button
                        className="btn btn-accent mt-10"
                        onClick={() => {
                            onIncrement();
                            window.scrollTo(0, 0);
                        }}
                    >
                        <AiOutlineArrowRight style={{ scale: '2' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MemeView;
