import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
//import promiseNoData from '../../PromiseNoData';
import MemeView from './MemeView';
import { useState, useEffect } from 'react';
import { MemeType } from '../../Types';
import { getMemes } from '../../api/getMemes';

function MemePresenter({ model }: { model: CheerModel }) {
    const [memeData, setMemeData] = useState<MemeType[]>([]);

    //fetch data when page is loaded
    useEffect(() => {
        getMemes()
            .then((res) => setMemeData(res))
            .catch((err) => console.log(err));
    }, []); // Empty dependency array means this effect runs only once on component mount

    return memeData.length > 0 ? (
        <MemeView
            randomMeme={memeData.slice(memeData.length / 2, memeData.length)}
        />
    ) : (
        <div className="bg-blue-300 text-black min-h-screen bg-fixed">
            No data
        </div>
    );
}

export default MemePresenter;
