function SuggestionView() {
  return (
    <body className="bg-violet-300 text-black">
      <div className="absolute top-[20%] left-1/4 w-1/2">
        <div className="form-control w-fit">
          <label className="label cursor-pointer">
            <span>Alone</span>
            <input type="checkbox" className="toggle" checked />
            <span>With Friends</span>
          </label>
        </div>

        <div>
          <select className="select select-bordered select-sm w-full max-w-xs bg-violet-200">
            <option disabled selected>
              Type of Activity
            </option>
            <option>Fetcha</option>
            <option>Fetcha</option>
          </select>
        </div>
      </div>

      <div className="absolute top-1/3 left-1/4 w-1/2 m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-violet-100">
        Här kommer en suggestion att stå
      </div>
    </body>
  );
}

export default SuggestionView;
