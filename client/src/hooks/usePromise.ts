import { useEffect, useState } from 'react';
import { JokeType, ActivityType, DataBaseType } from '../Types';

// TODO: any

function usePromise(
    promise: Promise<ActivityType | JokeType | DataBaseType[]> | null
): [ActivityType | JokeType | DataBaseType[] | null, Error | null] {
    const [data, setData] = useState<
        ActivityType | JokeType | DataBaseType[] | null
    >(null);
    const [error, setError] = useState<Error | null>(null);
    useEffect(
        function () {
            setData(null);
            setError(null);
            let cancelled = false;
            if (promise)
                promise
                    .then((dt: ActivityType | JokeType | DataBaseType[]) => {
                        if (!cancelled) setData(dt);
                    })
                    .catch((er: Error) => {
                        if (!cancelled) setError(er);
                    });
            return function () {
                cancelled = true;
            };
        },
        [promise]
    );
    return [data, error];
}

export default usePromise;
