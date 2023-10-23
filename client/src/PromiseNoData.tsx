import {
    ActivityType,
    NewsType,
    MemeType,
    JokeType,
    DataBaseType,
    MessageType
} from './Types';

function promiseNoData(
    promise: Promise<
        | string
        | MemeType[]
        | NewsType[]
        | JokeType
        | ActivityType
        | DataBaseType[]
        | MessageType
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
        | MessageType
        | null,
    error: Error | null,
    noDataMessage: string,
    bgc: string,
    spinner?: 'yes'
) {
    if (!promise) {
        return <span> {noDataMessage} </span>;
    } else if (
        (!data || (Array.isArray(data) && data.length === 0)) &&
        !error
    ) {
        return (
            <div className={`min-h-screen min-w-screen overflow-hidden ${bgc}`}>
                {spinner === 'yes' ? (
                    <span className="loading loading-spinner loading-lg top-[20%] left-1/2 absolute dark:text-gray-300"></span>
                ) : (
                    <span className="loading loading-dots loading-md top-[1/2] left-1/2 absolute"></span>
                )}
            </div>
        );
    } else if (!data && error) {
        return <span> {error.message} </span>;
    }

    return false;
}

export default promiseNoData;
