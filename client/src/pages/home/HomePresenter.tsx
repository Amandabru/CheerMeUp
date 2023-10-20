import HomeView from './HomeView';
import { useEffect, useState } from 'react';
import { DataBaseType } from '../../Types';
import usePromise from '../../hooks/usePromise';
import promiseNoData from '../../PromiseNoData';
import { splitArrayInHalf } from '../../DataFunctions';
import { getPopular } from '../../api/getPopular';

function HomePresenter() {
    const [promiseMostLiked, setPromiseMostLiked] = useState<Promise<
        DataBaseType[]
    > | null>(null);
    const [dataMostLiked, errorMostLiked] = usePromise(promiseMostLiked);
    const [dataMostLiked1, dataMostLiked2] = Array.isArray(dataMostLiked)
        ? splitArrayInHalf(dataMostLiked)
        : [[], []];

    const [promiseRecentlyLiked, setPromiseRecentlyLiked] = useState<Promise<
        DataBaseType[]
    > | null>(null);
    const [dataRecentlyLiked, errorRecentlyLiked] =
        usePromise(promiseRecentlyLiked);
    const [dataRecentlyLiked1, dataRecentlyLiked2] = Array.isArray(
        dataRecentlyLiked
    )
        ? splitArrayInHalf(dataRecentlyLiked)
        : [[], []];

    useEffect(() => {
        async function getPopularJoys() {
            try {
                // Fetch most liked data
                const mostLikedPromise = getPopular(20, 'likes').then(
                    (data) => {
                        return data as DataBaseType[];
                    }
                );

                // Fetch recently liked data
                const recentlyLikedPromise = getPopular(
                    20,
                    'recentlyLiked'
                ).then((data) => {
                    return data as DataBaseType[];
                });

                // Set the promises in state
                setPromiseMostLiked(mostLikedPromise);
                setPromiseRecentlyLiked(recentlyLikedPromise);
            } catch (error) {
                console.error(error);
            }
        }
        getPopularJoys();
    }, []);

    return (
        promiseNoData(
            promiseMostLiked,
            dataMostLiked,
            errorMostLiked,
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
                mostLikedJoys1={dataMostLiked1}
                mostLikedJoys2={dataMostLiked2}
                recentlyLikedJoys1={dataRecentlyLiked1}
                recentlyLikedJoys2={dataRecentlyLiked2}
            />
        )
    );
}

export default HomePresenter;
