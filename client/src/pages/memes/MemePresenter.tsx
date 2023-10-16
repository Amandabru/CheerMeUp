import { CheerModel } from '../../models/model';
import MemeView from './MemeView';
import { useState, useEffect } from 'react';
import { DataStructure, MemeType } from '../../Types';
import { getMemes } from '../../api/getMemes';
import promiseNoData from '../../PromiseNoData';
import { User } from '../../userModel';
import useModelProp from '../../hooks/useModelProp';

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
    const storedCount = localStorage.getItem('memeCount');
    const initialCount = storedCount ? parseInt(storedCount) : 0;
    const [count, setCount] = useState<number>(initialCount);

    const [error, setError] = useState<Error | null>(null);
    const likedJoys: DataStructure = useModelProp(model);

    const lastFetchDate = localStorage.getItem('lastFetchDateMemes');

    const shouldFetchData = () => {
        if (!lastFetchDate) return true;
        const lastFetchTime = new Date(lastFetchDate).getTime();
        const currentTime = new Date().getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        return currentTime - lastFetchTime >= twentyFourHours;
    };

    const fetchData = () => {
        getMemes()
            .then((res) => {
                setMemeData(res);
                localStorage.setItem('memeData', JSON.stringify(res));
                localStorage.setItem(
                    'lastFetchDateMemes',
                    new Date().toISOString()
                );
            })
            .catch((err) => setError(err));
    };

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

    useEffect(() => {
        if (shouldFetchData()) {
            fetchData();
        } else {
            const storedMemeData = localStorage.getItem('memeData');
            if (storedMemeData) {
                setMemeData(JSON.parse(storedMemeData));
            }
        }
    }, []); // Empty dependency array means this effect runs only once on component mount

    useEffect(() => {
        localStorage.setItem('memeCount', count.toString());
    }, [count]);

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

    return (
        promiseNoData(getMemes(), memeData, error, 'Could not fetch memes') || (
            <MemeView
                memeData={memeDataSlice(memeData, count)}
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
