import { useEffect, useState } from 'react';

function usePromise<T>(promise: Promise<T> | null): [T | null, Error | null] {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    useEffect(
        function () {
            setData(null);
            setError(null);
            let cancelled = false;
            if (promise)
                promise
                    .then((dt: T) => {
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
