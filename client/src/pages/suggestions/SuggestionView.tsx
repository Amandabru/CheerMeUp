function SuggestionView({
    randomSuggestion,
    isToggled,
    onToggle,
    options,
    activityType,
    onNewSuggestion
}: {
    randomSuggestion: string;
    isToggled: boolean;
    onToggle: Function;
    options: {
        value: string;
        label: string;
    }[];
    activityType: string;
    onNewSuggestion: Function;
}) {
    return (
        <body className="bg-violet-300 text-black">
            <div className="absolute top-[20%] left-1/4 w-1/2">
                <div className="form-control w-fit">
                    <label className="label cursor-pointer">
                        <span>Alone</span>
                        <input
                            type="checkbox"
                            className="toggle"
                            defaultChecked={false}
                            onClick={() => {
                                isToggled = !isToggled;
                                onToggle(isToggled);
                            }}
                        />
                        <span>With Friends</span>
                    </label>
                </div>

                <div>
                    <select
                        className="select select-bordered select-sm w-full max-w-xs bg-violet-200"
                        value={activityType}
                        onChange={(e) => {
                            const newActivityType = e.target.value;
                            onNewSuggestion(newActivityType);
                            console.log(
                                'onchange ' + newActivityType + ' ' + isToggled
                            );
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
                {randomSuggestion}
            </div>
            <button
                className="btn absolute top-1/2 left-1/2 m-auto"
                onClick={() => {
                    onNewSuggestion(activityType);
                    console.log('onclick ' + activityType + ' ' + isToggled);
                }}
            >
                Get new suggestion
            </button>
        </body>
    );
}

export default SuggestionView;
