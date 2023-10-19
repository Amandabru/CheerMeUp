import { MemeCard } from '../../components/Card';
import { MemeType } from '../../Types';
import { User } from '../../userModel';
import PaginationButtons from '../../components/UI/PaginationButtons';

function MemeView({
    memeData1,
    memeData2,
    onIncrement,
    onDecrement,
    count,
    likedMemes,
    likePost,
    user,
    showUserMustLogin
}: {
    memeData1: MemeType[];
    memeData2: MemeType[];
    onIncrement: () => void;
    onDecrement: () => void;
    count: number;
    likedMemes: MemeType[];
    likePost: Function;
    user: User | null;
    showUserMustLogin: Function;
}) {
    function mapCards(memeData: MemeType[]) {
        return memeData ? (
            memeData.map((memeObject, index) => {
                return (
                    <MemeCard
                        key={index}
                        image={memeObject.url}
                        isLiked={
                            likedMemes.find(
                                (meme) => meme.url === memeObject.url
                            )
                                ? true
                                : false
                        }
                        handleLike={() => {
                            user ? likePost(memeObject) : showUserMustLogin();
                        }}
                    ></MemeCard>
                );
            })
        ) : (
            <div>No meme data available</div>
        );
    }

    return (
        <div
            className="bg-gradient-to-r from-rose-300 to-orange-300 text-black min-h-screen bg-fixed
            dark:from-[#0d3b40]  dark:to-[#0a2d30] dark:text-white"
        >
            <h1 className=" absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Craving a Smile?
            </h1>
            <h2 className="absolute top-[26%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Memes will brighten your day!
            </h2>
            <div
                className="absolute top-[28%] w-full bg-gradient-to-r from-rose-300 to-orange-300 text-black
            dark:from-[#0d3b40]  dark:to-[#0a2d30]"
            >
                <PaginationButtons
                    count={count}
                    onDecrement={onDecrement}
                    onIncrement={onIncrement}
                />
                <section className="w-full !scroll-smooth">
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="flex flex-col w-full md:w-1/2 gap-y-10 mt-10 place-items-center md:place-items-end md:mr-[3%]">
                            {mapCards(memeData1)}
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 gap-y-10 mt-10 place-items-center md:place-items-start md:ml-[3%]">
                            {mapCards(memeData2)}
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

export default MemeView;
