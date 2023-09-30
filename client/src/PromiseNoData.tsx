function promiseNoData(
  promise: Promise<string | null>,
  data: string | object | Error,
  error: Error | null
) {
  if (!promise) {
    return <span> no data </span>;
  } else if (!data && !error) {
    return (
      <div className="image">
        <img src="http://www.csc.kth.se/~cristi/loading.gif" height="170"></img>
      </div>
    );
  } else if (!data && error) {
    return <span> {error.message} </span>;
  }

  return false;
}

export default promiseNoData;
