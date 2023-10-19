import { CheerModel } from '../../models/model';
import NewsView from './NewsView';
import { useState, useEffect } from 'react';
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
    const lastFetchDate = localStorage.getItem('lastFetchDateNews');

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

    const shouldFetchData = () => {
        if (!lastFetchDate) return true;
        const lastFetchTime = new Date(lastFetchDate).getTime();
        const currentTime = new Date().getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000; // fetch new data one time per day
        return currentTime - lastFetchTime >= twentyFourHours;
    };

    const fetchData = () => {
        getHappyNews()
            .then((res) => {
                setNewsData(res);
                localStorage.setItem('newsData', JSON.stringify(res));
                localStorage.setItem(
                    'lastFetchDateNews',
                    new Date().toISOString()
                );
            })
            .catch((err) => setError(err));
    };

    useEffect(() => {
        if (shouldFetchData()) {
            fetchData();
        } else {
            const storedNewsData = localStorage.getItem('newsData');
            if (storedNewsData) {
                setNewsData(JSON.parse(storedNewsData));
            }
        }
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
