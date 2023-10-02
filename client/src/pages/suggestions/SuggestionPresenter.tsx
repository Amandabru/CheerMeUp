import { useState } from 'react';
import SuggestionView from './SuggestionView';
import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
import promiseNoData from '../../PromiseNoData';

function SuggestionPresenter({ model }: { model: CheerModel }) {
    const type = useModelProp(model, 'type');
    const data = useModelProp(model, 'currentSuggestionData');
    const error = useModelProp(model, 'currentSuggestionError');

    // Set amount of people
    const [company, setCompany] = useState<boolean>(false);

    // const [s, setSuggestion] = useState<string>("");
    // const [a, setActivityType] = useState<string>("");

    const options: {
        value: string;
        label: string;
    }[] = [
        { value: 'education', label: 'education' },
        { value: 'recreational', label: 'recreational' },
        { value: 'social', label: 'social' },
        { value: 'diy', label: 'diy' },
        { value: 'charity', label: 'charity' },
        { value: 'cooking', label: 'cooking' },
        { value: 'relaxation', label: 'relaxation' },
        { value: 'charity', label: 'charity' },
        { value: 'busywork', label: 'busywork' }
    ];

    return (
        <SuggestionView
            randomSuggestion={
                promiseNoData(type, data, error, 'Choose an Activity') ||
                data.activity
            }
            isToggled={company}
            onToggle={(c: boolean) => setCompany(c)}
            options={options}
            activityType={type}
            onNewSuggestion={(newType: string) => {
                model.setType(newType, company);
            }}
        />
    );
}

export default SuggestionPresenter;
