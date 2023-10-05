import { useState } from 'react';
import RandomMemeView from './RandomMemeView';
import BestMemeView from './BestMemeView';

function MemeView() {
    const [selectedView, setSelectedView] = useState<'random' | 'best'>(
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
}

export default MemeView;
