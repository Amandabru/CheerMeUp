import { useEffect, useState } from 'react';
import {
    ActivityType,
    NewsType,
    MemeType,
    JokeType,
    DataBaseType,
    MessageType
} from '../Types';

function usePromise(
    promise: Promise<
        | ActivityType
        | NewsType[]
        | MemeType[]
        | JokeType
        | DataBaseType[]
        | MessageType
    > | null
): [
    (
        | ActivityType
        | NewsType[]
        | MemeType[]
        | JokeType
        | DataBaseType[]
        | MessageType
        | null
    ),
    Error | null
] {
    const [data, setData] = useState<
        | ActivityType
        | NewsType[]
        | MemeType[]
        | JokeType
        | DataBaseType[]
        | MessageType
        | null
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
                            dt:
                                | ActivityType
                                | NewsType[]
                                | MemeType[]
                                | JokeType
                                | DataBaseType[]
                                | MessageType
                        ) => {
                            if (!cancelled) setData(dt);
                        }
                    )
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
