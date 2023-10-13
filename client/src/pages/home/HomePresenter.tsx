import { CheerModel } from '../../models/model';
import HomeView from './HomeView';
import { User } from '../../userModel';
import { getPopular } from '../../api/getPopular';
import { useEffect, useState } from 'react';
import { DataBaseType } from '../../Types';
import useModelProp from '../../hooks/useModelProp';
import usePromise from '../../hooks/usePromise';
import promiseNoData from '../../PromiseNoData';

function HomePresenter({
    model,
    user
}: {
    model: CheerModel;
    user: User | null;
}) {
    const [promise, setPromise] = useState<Promise<DataBaseType[]> | null>(
        null
    );
    const [popularJoys, error] = usePromise(promise);

    const likedJoys = useModelProp(model, 'likedJoys');

    useEffect(() => {
        async function getPopularJoys() {
            try {
                setPromise(getPopular(20, 'likes'));
            } catch (error) {
                console.log(error);
            }
        }
        getPopularJoys();
    }, []);
    return (
        promiseNoData(
            promise,
            popularJoys,
            error,
            'Could not fetch popular joys'
        ) || (
            <HomeView
                user={user}
                popularJoys={popularJoys}
                likedJoys={likedJoys}
            />
        )
    );
}

export default HomePresenter;
