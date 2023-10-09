import { SuggestionType } from './Types';

function promiseNoData(
    promise: Promise<string | null | SuggestionType> | null,
    data: string | object | Error | null,
    error: Error | null,
    noDataMessage: string
) {
    if (!promise) {
        return <span> {noDataMessage} </span>;
    } else if (!data && !error) {
        return <span className="loading loading-dots loading-md"></span>;
    } else if (!data && error) {
        return <span> {error.message} </span>;
    }

    return false;
}

export default promiseNoData;
