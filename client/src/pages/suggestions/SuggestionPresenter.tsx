import { useState } from 'react';
import SuggestionView from './SuggestionView';
import promiseNoData from '../../PromiseNoData';
import { getSuggestions } from '../../api/getSuggestions';

function SuggestionPresenter() {
    // Set amount of people
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
        setActivityType(newActivityType);
        setCompany(company);
        const suggestionProm = await getSuggestions(newActivityType, company);
        const newSuggestion = suggestionProm.text;
        setSuggestion(newSuggestion);
    };

    // promiseNoData promiseNoData(type, data, error, 'Choose an Activity') ||

    return (
        <SuggestionView
            randomSuggestion={suggestion}
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
