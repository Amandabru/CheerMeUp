import { useState } from 'react';
import ActivityView from './ActivityView';
import promiseNoData from '../../PromiseNoData';
import { getActivity } from '../../api/getActivity';
import usePromise from '../../hooks/usePromise';
import { ActivityType } from '../../Types';

function ActivityPresenter() {
    const [promise, setPromise] = useState<Promise<ActivityType> | null>(null);
    const [data, error] = usePromise(promise);
    const [company, setCompany] = useState<boolean>(false);
    const [activityType, setActivityType] = useState<string>('');

    let options: {
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

    if (company) {
        options = options.slice(0, 2);
    }

    const getRandomActivity = async (
        newActivityType: string,
        company: boolean
    ) => {
        setActivityType(newActivityType);
        setCompany(company);
        setPromise(getActivity(newActivityType, company));
    };

    return (
        <>
            <ActivityView
                randomActivity={
                    promiseNoData(
                        promise,
                        data,
                        error,
                        'Choose the type of activity you want'
                    ) || data?.text
                }
                isToggled={company}
                onToggle={(c: boolean) => setCompany(c)}
                options={options}
                activityType={activityType}
                onNewActivity={(newType: string) => {
                    newType && getRandomActivity(newType, company);
                }}
            />
        </>
    );
}

export default ActivityPresenter;
