import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
import promiseNoData from '../../PromiseNoData';
import JokeView from './JokeView';

function JokePresenter({ model }: { model: CheerModel }) {
    const type = useModelProp(model, 'jokeType');
    const data = useModelProp(model, 'currentJokeData');
    const error = useModelProp(model, 'currentJokeError');

    let categories: string[] = ['programming'];

    return (
        <JokeView
            randomJoke={
                promiseNoData(type, data, error, 'Choose a Type') || data.text
            }
            jokeType={categories}
            onNewJoke={(newType: string[]) => {
                model.setJoke(categories);
            }}
        />
    );
}

export default JokePresenter;
