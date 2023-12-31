import { CheerModel } from '../../models/model';
import NewsView from './NewsView';
import { useState, useEffect, useCallback } from 'react';
import { DataStructure, NewsType } from '../../Types';
import { getHappyNews } from '../../api/getNews';
import promiseNoData from '../../PromiseNoData';
import useModelProp from '../../hooks/useModelProp';
import { User } from '../../userModel';
import { splitArrayInHalf, dataSlice } from '../../DataFunctions';
import usePromise from '../../hooks/usePromise';

function NewsPresenter({
    model,
    user,
    directToLogin
}: {
    model: CheerModel;
    user: User | null;
    directToLogin: Function;
}) {
    const [promise, setPromise] = useState<Promise<NewsType[]> | null>(null);
    const [data, error] = usePromise(promise);
    // Divide data into two arrays since we want two independent columns in scroll feed
    let newsData1: NewsType[] = [];
    let newsData2: NewsType[] = [];
    if (Array.isArray(data)) {
        [newsData1, newsData2] = splitArrayInHalf(data);
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
        setPromise(getHappyNews());
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <NewsView
            newsData1={
                promiseNoData(
                    promise,
                    data,
                    error,
                    'Could not fetch news (promise denied)',
                    '',
                    'yes'
                ) || dataSlice(newsData1, count)
            }
            newsData2={
                promiseNoData(
                    promise,
                    data,
                    error,
                    'Could not fetch news (promise denied)',
                    '',
                    'yes'
                ) || dataSlice(newsData2, count)
            }
            onIncrement={increment}
            onDecrement={decrement}
            count={count}
            likedNews={likedJoys.news}
            likePost={(news: NewsType) => model.likeOrUnlikeNews(news)}
            user={user}
            showUserMustLogin={() => directToLogin()}
        />
    );
}

export default NewsPresenter;
