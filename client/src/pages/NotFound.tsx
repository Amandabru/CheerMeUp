function NotFound() {
    return (
        <div>
            <h1 className=" absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Oops!
            </h1>
            <h2 className="absolute top-[44%]  md:top-[32%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-80 md:w-144">
                We can't seem to find the page you're looking for.
            </h2>
        </div>
    );
}

export default NotFound;
