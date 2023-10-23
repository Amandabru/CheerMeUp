import { CheerModel } from '../../models/model';
import MemeView from './MemeView';
import { useState, useEffect, useCallback } from 'react';
import { DataStructure, MemeType } from '../../Types';
import { getMemes } from '../../api/getMemes';
import { User } from '../../userModel';
import useModelProp from '../../hooks/useModelProp';
import { splitArrayInHalf } from '../../DataFunctions';
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
    // Divide data into two arrays since we want two independent columns in scroll feed
    let memeData1: MemeType[] = [];
    let memeData2: MemeType[] = [];
    if (Array.isArray(data)) {
        [memeData1, memeData2] = splitArrayInHalf(data);
    }

    const likedJoys: DataStructure = useModelProp(model);

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
                    'Could not fetch memes (promise denied)',
                    '',
                    'yes'
                ) || memeData1
            }
            memeData2={
                promiseNoData(
                    promise,
                    data,
                    error,
                    'Could not fetch memes (promise denied)',
                    '',
                    'yes'
                ) || memeData2
            }
            onNewFetch={fetchData}
            likedMemes={likedJoys.memes}
            likePost={(meme: MemeType) => model.likeOrUnlikeMeme(meme)}
            user={user}
            showUserMustLogin={() => directToLogin()}
        />
    );
}

export default MemePresenter;
