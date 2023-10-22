import { CheerModel } from '../../models/model';
import MemeView from './MemeView';
import { useState, useEffect, useCallback } from 'react';
import { DataStructure, MemeType } from '../../Types';
import { getMemes } from '../../api/getMemes';
import { User } from '../../userModel';
import useModelProp from '../../hooks/useModelProp';
import { splitArrayInHalf, dataSlice } from '../../DataFunctions';
import usePromise from '../../hooks/usePromise';
import promiseNoData from '../../PromiseNoData';

function MemePresenter({
    model,
    user,
    directToLogin
}: {
    model: CheerModel;
    user: User | null;
    directToLogin: Function;
}) {
    const [promise, setPromise] = useState<Promise<MemeType[]> | null>(null);
    const [data, error] = usePromise(promise);
    // Divide memeData into two arrays since we want two independent columns in scroll feed
    let memeData1: MemeType[] = [];
    let memeData2: MemeType[] = [];
    if (Array.isArray(data)) {
        const memeData = data as MemeType[]; // Cast data to MemeType[] since we know it is of type MemeData[]
        [memeData1, memeData2] = splitArrayInHalf(memeData);
    }

    const likedJoys: DataStructure = useModelProp(model);

    // Count used for keeping track of the pagination
    const [count, setCount] = useState<number>(0);

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
        setPromise(getMemes());
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MemeView
            memeData1={
                promiseNoData(
                    promise,
                    data,
                    error,
                    'Could not fetch memes (promise denied)'
                ) || dataSlice(memeData1, count)
            }
            memeData2={
                promiseNoData(
                    promise,
                    data,
                    error,
                    'Could not fetch memes (promise denied)'
                ) || dataSlice(memeData2, count)
            }
            onIncrement={increment}
            onDecrement={decrement}
            count={count}
            likedMemes={likedJoys.memes}
            likePost={(meme: MemeType) => model.likeOrUnlikeMeme(meme)}
            user={user}
            showUserMustLogin={() => directToLogin()}
        />
    );
}

export default MemePresenter;
