import {
    MemeType,
    NewsType,
    JokeType,
    ActivityType,
    DataBaseType
} from './Types';

function promiseNoData(
    promise: Promise<
        | string
        | MemeType[]
        | NewsType[]
        | JokeType
        | ActivityType
        | DataBaseType[]
        | null
    > | null,
    data:
        | string
        | object
        | MemeType[]
        | NewsType[]
        | JokeType
        | ActivityType
        | DataBaseType[]
        | null,
    error: Error | null,
    noDataMessage: string
) {
    if (!promise) {
        return <span> {noDataMessage} </span>;
    } else if (
        (!data || (Array.isArray(data) && data.length === 0)) &&
        !error
    ) {
        return (
            <div className="min-h-screen min-w-screen bg-black">
                <span className="loading loading-dots loading-md top-1/2 left-1/2 absolute"></span>
            </div>
        );
    } else if (!data && error) {
        return <span> {error.message} </span>;
    }

    return false;
}

export default promiseNoData;
