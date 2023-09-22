function SuggestionView({
  randomizedSuggestion,
  onNewSuggestion,
}: {
  randomizedSuggestion: string;
  onNewSuggestion: Function; // dubbelkoll
}) {
  return (
    <body className="bg-violet-300 text-black">
      <div className="absolute top-[20%] left-1/4 w-1/2">
        <div className="form-control w-fit">
          <label className="label cursor-pointer">
            <span>Alone</span>
            <input type="checkbox" className="toggle" />
            <span>With Friends</span>
          </label>
        </div>

        <div>
          <select
            className="select select-bordered select-sm w-full max-w-xs bg-violet-200"
            defaultValue={"Type of Activity"}
          >
            <option disabled={true}>Type of Activity</option>
            <option>Fetcha</option>
            <option>Fetcha</option>
          </select>
        </div>
      </div>

      <div className="absolute top-1/3 left-1/4 w-1/2 m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-violet-100">
        {randomizedSuggestion}
      </div>
      <button
        className="btn absolute top-1/2 left-1/2 m-auto"
        onClick={() => {
          onNewSuggestion();
        }}
      >
        Get new suggestion
      </button>
    </body>
  );
}

export default SuggestionView;
