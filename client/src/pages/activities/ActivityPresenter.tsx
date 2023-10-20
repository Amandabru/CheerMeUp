import { useState, useMemo } from 'react';
import ActivityView from './ActivityView';
import promiseNoData from '../../PromiseNoData';
import { getActivity } from '../../api/getActivity';
import usePromise from '../../hooks/usePromise';
import { ActivityType } from '../../Types';

function ActivityPresenter() {
    const [promise, setPromise] = useState<Promise<ActivityType> | null>(null);
    const [data, error] = usePromise(promise);
    const [activityType, setActivityType] = useState<string>('');

    const options = useMemo(
        () => [
            { value: 'education', label: 'education' },
            { value: 'recreational', label: 'recreational' },
            { value: 'social', label: 'social' },
            { value: 'diy', label: 'diy' },
            { value: 'charity', label: 'charity' },
            { value: 'cooking', label: 'cooking' },
            { value: 'relaxation', label: 'relaxation' },
            { value: 'charity', label: 'charity' },
            { value: 'busywork', label: 'busywork' }
        ],
        []
    );

    const getRandomActivity = async (newActivityType: string) => {
        setActivityType(newActivityType);
        setPromise(getActivity(newActivityType));
    };

    return (
        <>
            <ActivityView
                randomActivity={
                    promiseNoData(
                        promise,
                        data,
                        error,
                        'Choose the type of activity you want',
                        ''
                    ) || (data as ActivityType)?.text
                }
                options={options}
                activityType={activityType}
                onNewActivity={(newType: string) => {
                    newType && getRandomActivity(newType);
                }}
            />
        </>
    );
}

export default ActivityPresenter;
