import { useState } from 'react';
import SuggestionView from './SuggestionView';
import promiseNoData from '../../PromiseNoData';
import { getSuggestions } from '../../api/getSuggestions';
import usePromise from '../../hooks/usePromise';
import { SuggestionType } from '../../Types';

function SuggestionPresenter() {
    const [promise, setPromise] = useState<any>();
    const [data, error] = usePromise(promise);

    const [company, setCompany] = useState<boolean>(false);
    const [suggestion, setSuggestion] = useState<string>('');
    const [activityType, setActivityType] = useState<string>('');

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

    const getRandomSuggestion = async (
        newActivityType: string,
        company: boolean
    ) => {
        // setPromise(getSuggestions(newActivityType, company));
        // console.log(promise);

        const suggestionProm = await getSuggestions(newActivityType, company);
        const newSuggestion = suggestionProm.text;
        setActivityType(newActivityType);
        setCompany(company);
        setSuggestion(newSuggestion);
    };

    // promiseNoData promiseNoData(promise, data, error, 'Choose an Activity') ||

    return (
        <SuggestionView
            randomSuggestion={
                //promiseNoData(promise, data, error, 'Choose an Activity') ||
                suggestion
            }
            isToggled={company}
            onToggle={(c: boolean) => setCompany(c)}
            options={options}
            activityType={activityType}
            onNewSuggestion={(newType: string) => {
                getRandomSuggestion(newType, company);
            }}
        />
    );
}

export default SuggestionPresenter;
