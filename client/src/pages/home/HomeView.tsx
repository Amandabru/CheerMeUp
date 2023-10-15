import { DataBaseType, DataStructure } from '../../Types';
import Card from '../../components/Card';
import { User } from '../../userModel';

function HomeView({
    user,
    mostLikedJoys,
    recentlyLikedJoys,
    likedJoys,
    likeMeme,
    likeNews,
    likeJoke,
    showUserMustLogin
}: {
    user: User | null;
    mostLikedJoys: DataBaseType[];
    recentlyLikedJoys: DataBaseType[];
    likedJoys: DataStructure;
    likeMeme: Function;
    likeNews: Function;
    likeJoke: Function;
    showUserMustLogin: Function;
}) {
    return (
        <div
            className="bg-pink-300 text-black h-full w-full fixed
        dark:bg-[#531942] dark:text-white"
        >
            <h1 className=" absolute top-[13%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                {' '}
                Cheer Me Up!
            </h1>
            <h2 className=" absolute top-[25%] text-lg font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Welcome to the hub of happiness! If you're feeling bored, in
                need of a good laugh, or have temporarily lost faith in
                humanity, you're in the right place. Our mission is simple: to
                brighten your day!
            </h2>
            <div>
                <section className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div>
                        {'Most Liked Joys'}
                        {mostLikedJoys.map((joy, index) => {
                            return (
                                //Return the card here instead, keep the functionality for liking
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (user) {
                                            if (joy.type === 'meme') {
                                                likeMeme(joy.content);
                                            } else if (joy.type === 'news') {
                                                likeNews(joy.content);
                                            } else {
                                                likeJoke(joy.content);
                                            }
                                        } else {
                                            showUserMustLogin();
                                        }
                                    }}
                                >
                                    {'Likeable Incognito Joy'}
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div>
                        {'Recently Liked Joys'}
                        {recentlyLikedJoys.map((joy, index) => {
                            return (
                                //Return the card here instead, keep the functionality for liking
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (user) {
                                            if (joy.type === 'meme') {
                                                likeMeme(joy.content);
                                            } else if (joy.type === 'news') {
                                                likeNews(joy.content);
                                            } else {
                                                likeJoke(joy.content);
                                            }
                                        } else {
                                            showUserMustLogin();
                                        }
                                    }}
                                >
                                    {'Likeable Incognito Joy'}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HomeView;
