import { CheerModel } from '../../models/model';
import MemeView from './MemeView';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { DataStructure, MemeType } from '../../Types';
import { getMemes } from '../../api/getMemes';
import promiseNoData from '../../PromiseNoData';
import { User } from '../../userModel';
import useModelProp from '../../hooks/useModelProp';
import { splitArrayInHalf, dataSlice } from '../../DataFunctions';

function MemePresenter({
    model,
    user,
    directToLogin
}: {
    model: CheerModel;
    user: User | null;
    directToLogin: Function;
}) {
    const [memeData, setMemeData] = useState<MemeType[]>([]);
    const [memeData1, memeData2] = splitArrayInHalf(memeData);
    const [error, setError] = useState<Error | null>(null);
    const likedJoys: DataStructure = useModelProp(model);

    // Count used for keeping track of the pagination
    const initialCount = useMemo(() => {
        const storedCount = localStorage.getItem('newsCount');
        return storedCount ? parseInt(storedCount, 10) : 0;
    }, []);
    const [count, setCount] = useState<number>(initialCount);

    const increment = () => {
        if (count < 2) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const fetchData = useCallback(() => {
        getMemes()
            .then((newData) => {
                setMemeData(newData);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem('memeCount', count.toString());
    }, [count]);

    return (
        promiseNoData(
            getMemes(),
            memeData,
            error,
            'Could not fetch memes',
            'bg-gradient-to-r from-rose-300 to-orange-300 dark:from-[#0d3b40] dark:to-[#0a2d30]'
        ) || (
            <MemeView
                memeData1={dataSlice(memeData1, count)}
                memeData2={dataSlice(memeData2, count)}
                onIncrement={increment}
                onDecrement={decrement}
                count={count}
                likedMemes={likedJoys.memes}
                likePost={(meme: MemeType) => model.likeOrUnlikeMeme(meme)}
                user={user}
                showUserMustLogin={() => directToLogin()}
            />
        )
    );
}

export default MemePresenter;
