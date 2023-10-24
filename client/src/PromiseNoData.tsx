function promiseNoData<T>(
    promise: Promise<T | null> | null,
    data: T | null,
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
                    <span className="loading loading-spinner loading-lg top-[50%] left-1/2 absolute dark:text-gray-300"></span>
                ) : (
                    <span className="loading loading-dots loading-md top-[50%] left-1/2 absolute "></span>
                )}
            </div>
        );
    } else if (!data && error) {
        return <span> {error.message} </span>;
    }

    return false;
}

export default promiseNoData;
