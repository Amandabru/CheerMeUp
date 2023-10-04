import RandomMemeView from './RandomMemeView';
import BestMemeView from './BestMemeView';

function MemeView() {
    return (
        <body className="bg-blue-300 text-black h-full w-full fixed">
            <div>
                <h1>Meme page in progress</h1>
                <div className="flex align-middle">
                    <button className="btn btn-accent">Random</button>
                    <button className="btn btn-accent">Best</button>
                </div>
            </div>
        </body>
    );
}

export default MemeView;
