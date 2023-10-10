import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
//import promiseNoData from '../../PromiseNoData';
import MemeView from './MemeView';
import { useState, useEffect } from 'react';
import { MemeType } from '../../Types';
import { getMemes } from '../../api/getMemes';

function MemePresenter({ model }: { model: CheerModel }) {
    const [memeData, setMemeData] = useState<MemeType[]>([]);
    const [count, setCount] = useState<number>(0);

    // Function to increment the count
    const increment = () => {
        if (count < 2) {
            setCount(count + 1);
        }
    };

    // Function to decrement the count
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    useEffect(() => {
        getMemes()
            .then((res) => setMemeData(res))
            .catch((err) => console.log(err));
    }, []); // Empty dependency array means this effect runs only once on component mount

    function memeDataSlice(data: MemeType[], count: number): MemeType[] {
        if (count === 0) {
            return data.slice(0, data.length / 3);
        }
        if (count === 1) {
            return data.slice(data.length / 3, data.length - data.length / 3);
        }
        if (count === 2) {
            return data.slice(data.length - data.length / 3, data.length);
        }
        return [];
    }

    return memeData.length > 0 ? (
        <MemeView
            randomMeme={memeDataSlice(memeData, count)}
            onIncrement={increment}
            onDecrement={decrement}
        />
    ) : (
        <div className="bg-blue-300 text-black min-h-screen bg-fixed">
            No data
        </div>
    );
}

export default MemePresenter;
