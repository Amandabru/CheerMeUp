import { useEffect, useState } from 'react';

// TODO: any

function usePromise<T>(promise: Promise<T> | null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(
        function () {
            setData(null);
            setError(null);
            let cancelled = false;
            if (promise)
                promise
                    .then((dt: any) => {
                        if (!cancelled) setData(dt);
                    })
                    .catch((er: any) => {
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
