import HomeView from './HomeView';
import { useEffect, useState, useMemo } from 'react';
import { DataBaseType } from '../../Types';
import usePromise from '../../hooks/usePromise';
import promiseNoData from '../../PromiseNoData';
import { splitArrayInHalf, dataSlice } from '../../DataFunctions';
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

    useEffect(() => {
        async function getPopularJoys() {
            try {
                // Fetch most liked data
                const mostLikedPromise = getPopular(24, 'likes').then(
                    (data) => {
                        return data as DataBaseType[];
                    }
                );

                // Fetch recently liked data
                const recentlyLikedPromise = getPopular(
                    24,
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

    useEffect(() => {
        localStorage.setItem('joyCount', count.toString());
    }, [count]);

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
                mostLikedJoys={dataMostLiked as DataBaseType[]}
                recentlyLikedJoys={dataRecentlyLiked as DataBaseType[]}
            />
        )
    );
}

export default HomePresenter;
