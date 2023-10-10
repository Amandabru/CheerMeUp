import { CheerModel } from '../../models/model';
import NewsView from './NewsView';
import { useState, useEffect } from 'react';
import { NewsType } from '../../Types';
import { getHappyNews } from '../../api/getNews';

function NewsPresenter({ model }: { model: CheerModel }) {
    const [newsData, setNewsData] = useState<NewsType[]>([]);
    const [count, setCount] = useState<number>(0);

    // Function to increment the count
    const increment = () => {
        if (count < 2) {
            setCount(count + 1);
        }
    };

    // Function to decrement the count
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    useEffect(() => {
        getHappyNews()
            .then((res) => setNewsData(res))
            .catch((err) => console.log(err));
    }, []); // Empty dependency array means this effect runs only once on component mount

    function memeDataSlice(data: NewsType[], count: number): NewsType[] {
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

    return newsData.length > 0 ? (
        <NewsView
            randomNews={memeDataSlice(newsData, count)}
            onIncrement={increment}
            onDecrement={decrement}
        />
    ) : (
        <div className="bg-blue-300 text-black min-h-screen bg-fixed">
            No data
        </div>
    );
}

export default NewsPresenter;
