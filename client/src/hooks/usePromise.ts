import { useEffect, useState } from 'react';
import { JokeType, SuggestionType } from '../Types';

// TODO: any

function usePromise(
    promise: Promise<SuggestionType | JokeType> | null
): [SuggestionType | JokeType | null, Error | null] {
    const [data, setData] = useState<JokeType | SuggestionType | null>(null);
    const [error, setError] = useState<Error | null>(null);
    useEffect(
        function () {
            setData(null);
            setError(null);
            let cancelled = false;
            if (promise)
                promise
                    .then((dt: SuggestionType | JokeType) => {
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
