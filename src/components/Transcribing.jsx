const Transcribing = () => {
    return (
        <div className="flex items-center flex-1 flex-col text-center justify-center gap-10 md:gap-14 pb-24 p-4">
            <div className="flex flex-col gap-2 sm:gap-3">
                <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
                    <span className="text-violet-400 bold">Transcribing</span>
                </h1>
                <p>Your file in progress</p>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 mx-auto w-full max-w-[300px]">
                {[0, 1, 2].map((val) => {
                    return (
                        <div
                            key={val}
                            className={
                                "rounded-full h-2 sm:h-3 opacity-50 bg-purple-400 loading " +
                                `loading${val}`
                            }
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default Transcribing;
