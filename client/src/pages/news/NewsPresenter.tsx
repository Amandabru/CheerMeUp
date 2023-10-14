import { CheerModel } from '../../models/model';
import NewsView from './NewsView';
import { useState, useEffect } from 'react';
import { NewsType } from '../../Types';
import { getHappyNews } from '../../api/getNews';
import promiseNoData from '../../PromiseNoData';
import useModelProp from '../../hooks/useModelProp';
import { User } from '../../userModel';

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
    const storedCount = localStorage.getItem('newsCount');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
    const [count, setCount] = useState<number>(initialCount);
    const [error, setError] = useState<Error | null>(null);
    const likedJoys = useModelProp(model, 'likedJoys');

    const lastFetchDate = localStorage.getItem('lastFetchDateNews');

    const shouldFetchData = () => {
        if (!lastFetchDate) return true;
        const lastFetchTime = new Date(lastFetchDate).getTime();
        const currentTime = new Date().getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;
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
            const storedNewsData = localStorage.getItem('newsData');
            if (storedNewsData) {
                setNewsData(JSON.parse(storedNewsData));
            }
        }
    }, []); // Empty dependency array means this effect runs only once on component mount

    useEffect(() => {
        localStorage.setItem('newsCount', count.toString());
    }, [count]);

    function newsDataSlice(data: NewsType[], count: number): NewsType[] {
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
        promiseNoData(
            getHappyNews(),
            newsData,
            error,
            'Could not fetch news (promise denied)'
        ) || (
            <NewsView
                newsData={newsDataSlice(newsData, count)}
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
