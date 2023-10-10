import { useState } from 'react';
import RandomMemeView from './RandomMemeView';
import BestMemeView from './BestMemeView';
import Card from '../../components/Card';
import testMemes from './TestMemes';
import { MemeType } from '../../Types';

function MemeView({
    randomMeme,
    arrow
}: {
    randomMeme: MemeType[];
    arrow?: string;
}) {
    console.log(randomMeme);
    return (
        <div className="bg-blue-300 text-black min-h-screen bg-fixed">
            <div className="flex justify-center items-center !scroll-smooth">
                <button
                    className="btn btn-accent mt-10"
                    onClick={() => {
                        arrow = 'a';
                    }}
                >
                    left
                </button>
                <button
                    className="btn btn-accent mt-10"
                    onClick={() => {
                        arrow = 'b';
                    }}
                >
                    right
                </button>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                {randomMeme ? (
                    randomMeme.map((memeObject, index) => {
                        return <Card key={index} image={memeObject.url}></Card>;
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
