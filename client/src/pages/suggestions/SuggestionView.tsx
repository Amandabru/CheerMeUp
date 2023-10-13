function SuggestionView({
    randomSuggestion,
    isToggled,
    onToggle,
    options,
    activityType,
    onNewSuggestion
}: {
    randomSuggestion: string | React.ReactElement | undefined;
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
        <div
            className="bg-violet-300 text-black h-full w-full fixed
        dark:bg-indigo-950"
        >
            <div
                className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144
            "
            >
                <div className="form-control w-fit ">
                    <label className="label cursor-pointer dark:text-gray-300 ">
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

                <div className="text-left mb-2">
                    <select
                        className="select select-bordered select-sm bg-violet-200
                        dark:bg-indigo-900 dark:text-gray-300 "
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

                <div
                    className="m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-violet-100 h-40 w-full overflow-x-auto flex items-center justify-center relative
                 dark:bg-indigo-900 dark:text-gray-300 dark:border-indigo-800"
                >
                    <span>{randomSuggestion}</span>
                </div>
                <button
                    className="btn mt-5 transition-transform min-w-fit"
                    onClick={() => {
                        onNewSuggestion(activityType);
                        console.log(
                            'onclick ' + activityType + ' ' + isToggled
                        );
                    }}
                >
                    Get new suggestion
                </button>
            </div>
        </div>
    );
}

export default SuggestionView;
