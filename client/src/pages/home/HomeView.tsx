import { useState } from 'react';
import { DataBaseType } from '../../Types';
import Content from './Content';

function HomeView({
    mostLikedJoys1,
    mostLikedJoys2,
    recentlyLikedJoys1,
    recentlyLikedJoys2
}: {
    mostLikedJoys1: DataBaseType[] | React.ReactElement;
    mostLikedJoys2: DataBaseType[] | React.ReactElement;
    recentlyLikedJoys1: DataBaseType[] | React.ReactElement;
    recentlyLikedJoys2: DataBaseType[] | React.ReactElement;
}) {
    const [selectedView, setSelectedView] = useState<'most' | 'recently'>(
        'most'
    );

    return (
        <div
            className="bg-gradient-to-r from-pink-300 to-[#ff82c9] text-black min-h-screen bg-fixed
            dark:from-[#611d4d] dark:to-[#240f1d] dark:text-white"
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
                className="absolute top-[65%]  md:top-[45%] w-full bg-gradient-to-r from-pink-300 to-[#ff82c9] text-black
                    dark:from-[#611d4d] dark:to-[#240f1d]"
            >
                <div className="flex justify-center w-full !scroll-smooth">
                    <button
                        className={`mr-10 btn btn-outline${
                            selectedView === 'most' ? 'btn-active' : ''
                        }`}
                        onClick={() => setSelectedView('most')}
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
                <section className="w-full !scroll-smooth">
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="flex flex-col w-full md:w-1/2 gap-y-10 mt-10 place-items-center md:place-items-end md:mr-[3%]">
                            {selectedView === 'most' ? (
                                <Content
                                    data={mostLikedJoys1}
                                    view={'most'}
                                    position={'left'}
                                />
                            ) : (
                                <Content
                                    data={recentlyLikedJoys1}
                                    view={'recently'}
                                    position={'left'}
                                />
                            )}
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 gap-y-10 mt-10 place-items-center md:place-items-start md:ml-[3%]">
                            {selectedView === 'most' ? (
                                <Content data={mostLikedJoys2} view={'most'} />
                            ) : (
                                <Content
                                    data={recentlyLikedJoys2}
                                    view={'recently'}
                                />
                            )}
                        </div>
                    </div>
                </section>
                <div className="h-10"></div>
            </div>
        </div>
    );
}

export default HomeView;
