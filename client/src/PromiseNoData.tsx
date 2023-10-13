import {
    MemeType,
    NewsType,
    JokeType,
    SuggestionType,
    DataBaseType
} from './Types';

function promiseNoData(
    promise: Promise<
        | string
        | MemeType[]
        | NewsType[]
        | JokeType
        | SuggestionType
        | DataBaseType[]
        | null
    > | null,
    data:
        | string
        | object
        | MemeType[]
        | NewsType[]
        | JokeType
        | SuggestionType
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
        return <span className="loading loading-dots loading-md"></span>;
    } else if (!data && error) {
        return <span> {error.message} </span>;
    }

    return false;
}

export default promiseNoData;
