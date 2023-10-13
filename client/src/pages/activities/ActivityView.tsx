function ActivityView({
    randomActivity,
    isToggled,
    onToggle,
    options,
    activityType,
    onNewActivity
}: {
    randomActivity: string | React.ReactElement | undefined;
    isToggled: boolean;
    onToggle: Function;
    options: {
        value: string;
        label: string;
    }[];
    activityType: string;
    onNewActivity: Function;
}) {
    return (
        <div className="bg-violet-300 text-black h-full w-full fixed">
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
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

                <div className="text-left mb-2">
                    <select
                        className="select select-bordered select-sm bg-violet-200"
                        value={activityType}
                        onChange={(e) => {
                            const newActivityType = e.target.value;
                            onNewActivity(newActivityType);
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

                <div className="m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-violet-100 h-40 w-full overflow-x-auto flex items-center justify-center relative">
                    <span>{randomActivity}</span>
                </div>
                <button
                    className="btn mt-5 transition-transform min-w-fit"
                    onClick={() => {
                        onNewActivity(activityType);
                        console.log(
                            'onclick ' + activityType + ' ' + isToggled
                        );
                    }}
                >
                    Get new activity
                </button>
            </div>
        </div>
    );
}

export default ActivityView;
