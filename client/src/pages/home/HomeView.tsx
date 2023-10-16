import { useState } from 'react';
import { User } from '../../userModel';
import { DataBaseType, DataStructure } from '../../Types';
import Content from './Content';

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
    const [selectedView, setSelectedView] = useState<'recently' | 'best'>(
        'best'
    );
    const renderSelectedView = () => {
        if (selectedView === 'best') {
            return (
                <Content
                    user={user}
                    joys={mostLikedJoys}
                    likedJoys={likedJoys}
                    likeMeme={likeMeme}
                    likeJoke={likeJoke}
                    likeNews={likeNews}
                    showUserMustLogin={showUserMustLogin}
                ></Content>
            );
        } else if (selectedView === 'recently') {
            return (
                <Content
                    user={user}
                    joys={recentlyLikedJoys}
                    likedJoys={likedJoys}
                    likeMeme={likeMeme}
                    likeJoke={likeJoke}
                    likeNews={likeNews}
                    showUserMustLogin={showUserMustLogin}
                ></Content>
            );
        }
    };
    return (
        <div
            className="bg-pink-300 text-black min-h-screen bg-fixed 
         dark:bg-[#531942] dark:text-white"
        >
            <h1 className=" absolute top-[13%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                {' '}
                Cheer Me Up!
            </h1>
            <h2 className="absolute top-[32%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Welcome to the hub of happiness! If you're feeling bored, in
                need of a good laugh, or have temporarily lost faith in
                humanity, you're in the right place. Our mission is simple: to
                brighten your day!
            </h2>
            <div
                className="absolute top-[42%] bg-pink-300 w-full
                    dark:bg-[#531942] dark:text-black"
            >
                <div className="flex justify-center w-full !scroll-smooth">
                    <button
                        className={`mr-10 btn btn-accent${
                            selectedView === 'best' ? 'btn-active' : ''
                        }`}
                        onClick={() => setSelectedView('best')}
                    >
                        Most liked
                    </button>
                    <button
                        className={`btn btn-accent${
                            selectedView === 'recently' ? 'btn-active' : ''
                        }`}
                        onClick={() => setSelectedView('recently')}
                    >
                        Recently liked
                    </button>
                </div>
                <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-10 mt-10">
                    {renderSelectedView()}
                </section>
                <div className="h-20"></div>
            </div>
        </div>
    );
}

export default HomeView;
