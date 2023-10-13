import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
import MemeView from './MemeView';
import { useState, useEffect } from 'react';
import { MemeType } from '../../Types';
import { getMemes } from '../../api/getMemes';

function TestPresenter({ model }: { model: CheerModel }) {
    const [memeData, setMemeData] = useState<MemeType[]>([]);

    useEffect(() => {
        getMemes()
            .then((res) => setMemeData(res))
            .catch((err) => console.log(err));
    }, []); // Empty dependency array means this effect runs only once on component mount

    return (
        <div>
            {memeData.length > 0
                ? memeData.map((object) => (
                      <img key={object.title} src={object.url} alt="Meme" />
                  ))
                : 'No data'}
        </div>
    );
}

export default TestPresenter;
