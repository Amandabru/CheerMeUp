import { MemeType, NewsType } from './Types';

// need to rewrite because data sends an object with an error

function promiseNoData(
    promise: Promise<string | MemeType[] | NewsType[] | null>,
    data: string | object | MemeType[] | NewsType[] | Error,
    error: Error | null,
    noDataMessage: string
) {
    console.log(promise);
    console.log(data);
    console.log('error' + error);
    console.log('noDataMessage' + noDataMessage);
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
