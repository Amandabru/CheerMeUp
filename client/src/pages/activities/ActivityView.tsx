function ActivityView({
    randomActivity,
    options,
    activityType,
    onNewActivity
}: {
    randomActivity: string | React.ReactElement | undefined;
    options: {
        value: string;
        label: string;
    }[];
    activityType: string;
    onNewActivity: Function;
}) {
    return (
        <div
            className="bg-gradient-to-r from-violet-300 to-violet-400 text-black h-full w-full fixed
        dark:from-[#360145]  dark:to-[#10002B] dark:text-white"
        >
            <h1 className=" absolute top-[13%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144 mt-16">
                {' '}
                Bored?
            </h1>
            <h2 className=" absolute top-[19%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144 mt-16">
                Your cure is right here!
            </h2>
            <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144 mt-16">
                <div className="text-left mb-2">
                    <select
                        className="select select-bordered select-sm bg-violet-200
                        dark:bg-[#240046] dark:text-gray-300 "
                        value={activityType}
                        onChange={(e) => {
                            const newActivityType = e.target.value;
                            onNewActivity(newActivityType);
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
                    className="m-auto p-10 text-center border-2 border-solid border-white rounded-2xl bg-violet-100 h-40 w-full flex items-center justify-center relative
                    dark:bg-[#240046] dark:text-gray-300 dark:border-[#3C096C]"
                >
                    <span>{randomActivity}</span>
                </div>
                <button
                    className="btn mt-5 transition-transform min-w-fit shadow-lg"
                    onClick={() => {
                        onNewActivity(activityType);
                    }}
                >
                    Get new activity
                </button>
            </div>
        </div>
    );
}

export default ActivityView;
