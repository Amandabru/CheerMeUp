import { CheerModel } from '../../models/model';
import NewsView from './NewsView';
import { useState, useEffect, useCallback } from 'react';
import { DataStructure, NewsType } from '../../Types';
import { getHappyNews } from '../../api/getNews';
import promiseNoData from '../../PromiseNoData';
import useModelProp from '../../hooks/useModelProp';
import { User } from '../../userModel';
import { splitArrayInHalf, dataSlice } from '../../DataFunctions';

function NewsPresenter({
    model,
    user,
    directToLogin
}: {
    model: CheerModel;
    user: User | null;
    directToLogin: Function;
}) {
    const [newsData, setNewsData] = useState<NewsType[]>([]);
    const [newsData1, newsData2] = splitArrayInHalf(newsData);
    const [error, setError] = useState<Error | null>(null);
    const likedJoys: DataStructure = useModelProp(model);

    // Count used for keeping track of the pagination
    const storedCount = localStorage.getItem('newsCount');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
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
        getHappyNews()
            .then((newData) => {
                setNewsData(newData);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem('newsCount', count.toString());
    }, [count]);

    return (
        promiseNoData(
            getHappyNews(),
            newsData,
            error,
            'Could not fetch news (promise denied)',
            'bg-gradient-to-r from-blue-200 to-blue-300 dark:from-[#08094d] dark:to-[#04052e]'
        ) || (
            <NewsView
                newsData1={dataSlice(newsData1, count)}
                newsData2={dataSlice(newsData2, count)}
                onIncrement={increment}
                onDecrement={decrement}
                count={count}
                likedNews={likedJoys.news}
                likePost={(news: NewsType) => model.likeOrUnlikeNews(news)}
                user={user}
                showUserMustLogin={() => directToLogin()}
            />
        )
    );
}

export default NewsPresenter;
