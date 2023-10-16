import { CheerModel } from '../../models/model';
import { useState } from 'react';
import { User } from '../../userModel';
import { DataBaseType } from '../../Types';
import ContentPresenter from './ContentPresenter';

function HomeView({
    model,
    user,
    mostLikedJoys,
    recentlyLikedJoys,
    showUserMustLogin
}: {
    model: CheerModel;
    user: User | null;
    mostLikedJoys: DataBaseType[];
    recentlyLikedJoys: DataBaseType[];
    showUserMustLogin: Function;
}) {
    console.log(mostLikedJoys);
    const [selectedView, setSelectedView] = useState<'recently' | 'best'>(
        'best'
    );
    const renderSelectedView = () => {
        if (selectedView === 'best') {
            return (
                <ContentPresenter
                    model={model}
                    user={user}
                    joys={mostLikedJoys}
                    directToLogin={showUserMustLogin}
                ></ContentPresenter>
            );
        } else if (selectedView === 'recently') {
            return (
                <ContentPresenter
                    model={model}
                    user={user}
                    joys={recentlyLikedJoys}
                    directToLogin={showUserMustLogin}
                ></ContentPresenter>
            );
        }
    };
    return (
        <div className="bg-pink-300 text-black min-h-screen">
            <h1 className=" absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Cheer Me Up!
            </h1>
            <h2 className="absolute top-[32%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Welcome to the hub of happiness! If you're feeling bored, in
                need of a good laugh, or have temporarily lost faith in
                humanity, you're in the right place. Our mission is simple: to
                brighten your day!
            </h2>
            <div className="absolute top-[42%] bg-pink-300 ">
                <div className="flex justify-center  !scroll-smooth">
                    <button
                        className={`mr-10 btn btn-accent${
                            selectedView === 'best' ? 'btn-active' : ''
                        }`}
                        onClick={() => setSelectedView('best')}
                    >
                        Best
                    </button>
                    <button
                        className={`btn btn-accent${
                            selectedView === 'recently' ? 'btn-active' : ''
                        }`}
                        onClick={() => setSelectedView('recently')}
                    >
                        recently
                    </button>
                </div>
                <section className="grid auto-cols-max grid-cols-1 md:grid-cols-2 place-items-center mt-20 mx-40 gap-20 ">
                    {renderSelectedView()}
                </section>
            </div>
        </div>
    );
}

export default HomeView;
