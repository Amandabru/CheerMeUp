import { CheerModel } from '../../models/model';
import HomeView from './HomeView';
import { useState, useEffect } from 'react';
import { getPopular } from '../../api/getPopular';
import { DataBaseType } from '../../Types';

function HomePresenter({ model }: { model: CheerModel }) {
    const [popularData, setPopularData] = useState<DataBaseType[]>([]);
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
        getPopular(10, 'likes')
            .then((res) => setPopularData(res))
            .catch((err) => console.log(err));
    }, []); // Empty dependency array means this effect runs only once on component mount

    function popularDataSlice(
        data: DataBaseType[],
        count: number
    ): DataBaseType[] {
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

    return popularData.length > 0 ? (
        <HomeView
            popularData={popularDataSlice(popularData, count)}
            onIncrement={increment}
            onDecrement={decrement}
        />
    ) : (
        <div className="bg-blue-300 text-black min-h-screen bg-fixed">
            No data
        </div>
    );
}

export default HomePresenter;
