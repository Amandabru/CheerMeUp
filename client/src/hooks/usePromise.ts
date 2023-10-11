import { useEffect, useState } from 'react';
import { SuggestionType } from '../Types';

// TODO: any

function usePromise<T>(promise: Promise<T> | null): any {
    const [data, setData] = useState<SuggestionType | null>(null);
    const [error, setError] = useState<Error | null>(null);
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
