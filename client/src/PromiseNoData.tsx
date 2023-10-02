function promiseNoData(
  promise: Promise<string | null>,
  data: string | object | Error,
  error: Error | null,
  noDataMessage: string
) {
  if (!promise) {
    return <span> {noDataMessage} </span>;
  } else if (!data && !error) {
    return <img src="http://www.csc.kth.se/~cristi/loading.gif"></img>;
  } else if (!data && error) {
    return <span> {error.message} </span>;
  }

  return false;
}

export default promiseNoData;
