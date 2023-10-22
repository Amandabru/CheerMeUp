import HomeView from './HomeView';
import { useEffect, useState, useCallback, useMemo } from 'react';
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
    // Divide data into two arrays since we want two independent columns in scroll feed
    const [dataMostLiked1, dataMostLiked2] = useMemo(() => {
        if (Array.isArray(dataMostLiked)) {
            const dataMostLikedArray = dataMostLiked as DataBaseType[]; // Cast data to DataBaseType[] since we know it is of type DataBaseType[]
            return splitArrayInHalf(dataMostLikedArray);
        }
        return [[], []];
    }, [dataMostLiked]);

    const [promiseRecentlyLiked, setPromiseRecentlyLiked] = useState<Promise<
        DataBaseType[]
    > | null>(null);
    const [dataRecentlyLiked, errorRecentlyLiked] =
        usePromise(promiseRecentlyLiked);
    const [dataRecentlyLiked1, dataRecentlyLiked2] = useMemo(() => {
        if (Array.isArray(dataRecentlyLiked)) {
            const dataRecentlyLikedArray = dataRecentlyLiked as DataBaseType[];
            return splitArrayInHalf(dataRecentlyLikedArray);
        }
        return [[], []];
    }, [dataRecentlyLiked]);

    const fetchData = useCallback(() => {
        setPromiseMostLiked(getPopular(24, 'likes'));
        setPromiseRecentlyLiked(getPopular(24, 'recentlyLiked'));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <HomeView
            mostLikedJoys1={
                promiseNoData(
                    promiseMostLiked,
                    dataMostLiked,
                    errorMostLiked,
                    'Could not fetch most liked joys (promise denied)',
                    'yes'
                ) || dataMostLiked1
            }
            mostLikedJoys2={
                promiseNoData(
                    promiseMostLiked,
                    dataMostLiked,
                    errorMostLiked,
                    'Could not fetch most liked joys (promise denied)',
                    'yes'
                ) || dataMostLiked2
            }
            recentlyLikedJoys1={
                promiseNoData(
                    promiseRecentlyLiked,
                    dataRecentlyLiked,
                    errorRecentlyLiked,
                    'Could not fetch recently liked joys (promise denied)',
                    'yes'
                ) || dataRecentlyLiked1
            }
            recentlyLikedJoys2={
                promiseNoData(
                    promiseRecentlyLiked,
                    dataRecentlyLiked,
                    errorRecentlyLiked,
                    'Could not fetch recently liked joys (promise denied)',
                    'yes'
                ) || dataRecentlyLiked2
            }
        />
    );
}

export default HomePresenter;
