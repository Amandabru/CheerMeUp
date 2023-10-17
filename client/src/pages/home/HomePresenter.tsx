import HomeView from './HomeView';
import { getPopular } from '../../api/getPopular';
import { useEffect, useState } from 'react';
import { DataBaseType } from '../../Types';
import usePromise from '../../hooks/usePromise';
import promiseNoData from '../../PromiseNoData';

function HomePresenter() {
    const [promiseMostLiked, setPromiseMostLiked] = useState<Promise<
        DataBaseType[]
    > | null>(null);
    const [dataMostLiked, errorMostliked] = usePromise(promiseMostLiked);

    const [promiseRecentlyLiked, setPromiseRecentlyLiked] = useState<Promise<
        DataBaseType[]
    > | null>(null);
    const [dataRecentlyLiked, errorRecentlyLiked] =
        usePromise(promiseRecentlyLiked);

    useEffect(() => {
        async function getPopularJoys() {
            try {
                setPromiseMostLiked(getPopular(20, 'likes'));
                setPromiseRecentlyLiked(getPopular(20, 'recentlyLiked'));
            } catch (error) {
                console.log(error);
            }
        }
        getPopularJoys();
    }, []);

    return (
        promiseNoData(
            promiseMostLiked,
            dataMostLiked,
            errorMostliked,
            'Could not fetch most liked joys',
            'bg-gradient-to-r from-pink-300 to-[#ff82c9] dark:from-[#611d4d] dark:to-[#4d173d]'
        ) ||
        promiseNoData(
            promiseRecentlyLiked,
            dataRecentlyLiked,
            errorRecentlyLiked,
            'Could not fetch recently liked joys',
            'bg-gradient-to-r from-pink-300 to-[#ff82c9] dark:from-[#611d4d] dark:to-[#4d173d]'
        ) || (
            <HomeView
                mostLikedJoys={dataMostLiked}
                recentlyLikedJoys={dataRecentlyLiked}
            />
        )
    );
}

export default HomePresenter;
