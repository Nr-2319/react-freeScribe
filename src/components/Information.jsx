import { useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

const Information = () => {
    const [isTranscription, setIsTranscription] = useState(true);

    return (
        <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-40 max-w-full mx-auto max-w-prose w-full">
            <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
                Your <span className="text-violet-400 bold">Transcription</span>
            </h1>
            <div className="grid grid-cols-2 my-5 mx-auto bg-white shadow rounded-full overflow-hidden items-center">
                <button
                    onClick={() => {
                        setIsTranscription(true);
                    }}
                    className={
                        "px-4 duration-200 py-1 font-semibold text-lg " +
                        (isTranscription
                            ? "bg-violet-400 text-white"
                            : "text-violet-400 hover:text-violet-500")
                    }
                >
                    Transcription
                </button>
                <button
                    onClick={() => {
                        setIsTranscription(false);
                    }}
                    className={
                        "px-4 duration-200 py-1 font-semibold text-lg " +
                        (!isTranscription
                            ? "bg-violet-400 text-white"
                            : "text-violet-400 hover:text-violet-500")
                    }
                >
                    Translation
                </button>
            </div>

            {isTranscription ? <Transcription /> : <Translation />}
        </main>
    );
};

export default Information;
