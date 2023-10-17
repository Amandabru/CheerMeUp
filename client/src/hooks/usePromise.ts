import { useEffect, useState } from 'react';
import { ActivityType, DataBaseType, JokeType, MessageType } from '../Types';

function usePromise(
    promise: Promise<ActivityType | JokeType | DataBaseType[] | MessageType | null> | null
): any {
    const [data, setData] = useState<
        ActivityType | JokeType | DataBaseType[] | MessageType| null
    >(null);
    const [error, setError] = useState<Error | null>(null);
    useEffect(
        function () {
            setData(null);
            setError(null);
            let cancelled = false;
            if (promise)
                promise
                    .then(
                        (
                            dt: ActivityType | JokeType | DataBaseType[] | MessageType | null
                        ) => {
                            if (!cancelled) setData(dt);
                        }
                    )
                    .catch((er: Error | null) => {
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
