function SuggestionView({
  randomizedSuggestion,
  activityType,
  onActivityTypeChange,
}: {
  randomizedSuggestion: string;
  activityType: string;
  onActivityTypeChange: Function;
}) {
  const options: {
    value: string;
    label: string;
  }[] = [
    { value: "education", label: "education" },
    { value: "recreational", label: "recreational" },
    { value: "social", label: "social" },
    { value: "diy", label: "diy" },
    { value: "charity", label: "charity" },
    { value: "cooking", label: "cooking" },
    { value: "relaxation", label: "relaxation" },
    { value: "charity", label: "charity" },
    { value: "busywork", label: "busywork" },
  ];

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
            value={activityType}
            onChange={(e) => {
              const newActivityType = e.target.value;
              onActivityTypeChange(newActivityType);
            }}
          >
            <option value="" disabled>
              Type of Activity
            </option>
            {options.map(({ value, label }, index) => (
              <option value={value} key={index}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="absolute top-1/3 left-1/4 w-1/2 m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-violet-100">
        {randomizedSuggestion}
      </div>
      <button
        className="btn absolute top-1/2 left-1/2 m-auto"
        onClick={() => {
          console.log(activityType);
          onActivityTypeChange(activityType);
        }}
      >
        Get new suggestion
      </button>
    </body>
  );
}

export default SuggestionView;
