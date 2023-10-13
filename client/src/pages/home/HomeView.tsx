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
    console.log(likedJoys);
    return (
        <div className="bg-pink-300 text-black h-full w-full fixed">
            <div>
                <section className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div>
                        {'Most Liked Joys'}
                        {mostLikedJoys.map((joy, index) => {
                            return (
                                //Return the card here instead, keep the functionality for liking
                                <div
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
