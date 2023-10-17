import { useState } from 'react';
import { DataBaseType } from '../../Types';
import Content from './Content';

function HomeView({
    mostLikedJoys,
    recentlyLikedJoys
}: {
    mostLikedJoys: DataBaseType[];
    recentlyLikedJoys: DataBaseType[];
}) {
    const [selectedView, setSelectedView] = useState<'recently' | 'best'>(
        'best'
    );
    const renderSelectedView = () => {
        if (selectedView === 'best') {
            return <Content joys={mostLikedJoys}></Content>;
        } else if (selectedView === 'recently') {
            return <Content joys={recentlyLikedJoys}></Content>;
        }
    };
    return (
        <div
            className="bg-gradient-to-r from-pink-300 to-[#ff82c9] text-black min-h-screen bg-fixed
            dark:from-[#611d4d] dark:to-[#4d173d] dark:text-white"
        >
            <h1 className=" absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                {' '}
                Cheer Me Up!
            </h1>
            <h2 className="absolute top-[44%]  md:top-[32%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-80 md:w-144">
                Welcome to the hub of happiness! If you're feeling bored, in
                need of a good laugh, or have temporarily lost faith in
                humanity, you're in the right place. Our mission is simple: to
                brighten your day!
            </h2>
            <div
                className="absolute top-[65%]  md:top-[45%] bg-gradient-to-r from-pink-300 to-[#ff82c9] text-black
                    dark:from-[#611d4d] dark:to-[#4d173d]"
            >
                <div className="flex justify-center w-full !scroll-smooth">
                    <button
                        className={`mr-10 btn btn-outline${
                            selectedView === 'best' ? 'btn-active' : ''
                        }`}
                        onClick={() => setSelectedView('best')}
                    >
                        Most liked
                    </button>
                    <button
                        className={`btn btn-outline${
                            selectedView === 'recently' ? 'btn-active' : ''
                        }`}
                        onClick={() => setSelectedView('recently')}
                    >
                        Recently liked
                    </button>
                </div>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-y-10 mt-5">
                    <div className="flex justify-center">
                        <div className="flex flex-col w-full md:w-2/3 mx-2 gap-y-10">
                            <Content joys={mostLikedJoys}></Content>
                        </div>
                        <div className="flex flex-col w-full md:w-2/3 mx-2 gap-y-10">
                            <Content joys={recentlyLikedJoys}></Content>
                        </div>
                    </div>
                </section>

                {/* <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-10 mt-10 mb-20">
                    {renderSelectedView()}
                </section> */}
            </div>
        </div>
    );
}

export default HomeView;
