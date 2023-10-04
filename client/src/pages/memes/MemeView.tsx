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
        <div className="bg-blue-300 text-black h-full w-full fixed">
            <div>
                <div className="flex justify-center items-center">
                    <button
                        className="btn btn-accent mr-5 mt-10"
                        onClick={() => setSelectedView('random')}
                    >
                        Random
                    </button>
                    <button
                        className="btn btn-accent ml-5 mt-10"
                        onClick={() => setSelectedView('best')}
                    >
                        Best
                    </button>
                </div>
            </div>
            {renderSelectedView()}
        </div>
    );
}

export default MemeView;
