import { useEffect, useState } from 'react';
import { JokeType, ActivityType, MemeType, NewsType } from '../Types';

// TODO: any

function usePromise(
    promise: Promise<ActivityType | JokeType> | null
): [ActivityType | JokeType | null, Error | null] {
    const [data, setData] = useState<ActivityType | JokeType | null>(null);
    const [error, setError] = useState<Error | null>(null);
    useEffect(
        function () {
            setData(null);
            setError(null);
            let cancelled = false;
            if (promise)
                promise
                    .then((dt: ActivityType | JokeType) => {
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
