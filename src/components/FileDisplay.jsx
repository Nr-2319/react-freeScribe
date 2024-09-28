/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

const FileDisplay = (props) => {
    const { handleAudioReset, file, audioStream, handleFormSubmission } = props;

    const audioRef = useRef();

    useEffect(() => {
        if (!file && !audioStream) {
            return;
        }

        // Clean up object URLs to avoid memory leaks
        if (audioRef.current.src) {
            URL.revokeObjectURL(audioRef.current.src);
        }

        if (file) {
            audioRef.current.src = URL.createObjectURL(file);
        } else if (audioStream && audioStream instanceof Blob) {
            audioRef.current.src = URL.createObjectURL(audioStream);
        } else {
            console.warn("audioStream is not a valid Blob");
        }
    }, [audioStream, file]);

    return (
        <>
            <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-40 max-w-full mx-auto w-72 sm:w-96">
                <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
                    Your <span className="text-violet-400 bold">File</span>{" "}
                </h1>
                <div className="flex my-4 flex-col text-left my-4">
                    <h3 className="font-semibold">Name</h3>
                    <p>{file ? file?.name : "Custom Audio"}</p>
                </div>
                <audio ref={audioRef} controls />

                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={handleAudioReset}
                        className="text-slate-400 hover:text-violet-600 duration-200"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleFormSubmission}
                        className="flex items-center gap-2 specialBtn px-3 p-2 font-medium rounded-lg text-violet-400"
                    >
                        <p>Transcribe</p>
                        <span className="material-symbols-outlined">
                            transcribe
                        </span>
                    </button>
                </div>
            </main>
        </>
    );
};

export default FileDisplay;
