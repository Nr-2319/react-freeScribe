/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import FileDisplay from "./components/FileDisplay";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./utils/presets";

function App() {
    const [file, setFile] = useState(null);
    const [audioStream, setAudioStream] = useState(null);
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(null);

    const isAudioAvailable = file || audioStream;

    function handleAudioReset() {
        setFile(null);
        setAudioStream(null);
    }

    // transcription
    const worker = useRef(null);

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(
                new URL("./utils/whisper.worker.js", import.meta.url),
                {
                    type: "module",
                }
            );
        }

        const onMessageReceived = async (e) => {
            switch (e.data.type) {
                case "DOWNLOADING":
                    setDownloading(true);
                    console.log("DOWNLOADING");
                    break;
                case "LOADING":
                    setLoading(true);
                    console.log("LOADING");
                    break;
                case "RESULT": {
                    const resultText = e.data.results.text;
                    setOutput(resultText);
                    console.log(resultText);
                    break;
                }
                case "INFERENCE_DONE":
                    setOutput(true);
                    console.log("DONE");
                    break;
            }
        };

        worker.current.addEventListener("message", onMessageReceived);

        return () =>
            worker.current.removeEventListener("message", onMessageReceived);
    });

    async function handleFormSubmission() {
        if (!file && !audioStream) return;

        setLoading(true);
        const audio = file || audioStream;

        worker.current.postMessage({
            type: MessageTypes.INFERENCE_REQUEST,
            audio,
        });
    }

    return (
        <div className="flex flex-col max-w-[1000px] mx-auto w-full">
            <section className="min-h-screen flex flex-col">
                <Header
                    setFile={setFile}
                    setAudioStream={setAudioStream}
                    setOutput={setOutput}
                    setLoading={setLoading}
                />
                {output ? (
                    <Information output={output} />
                ) : loading ? (
                    <Transcribing />
                ) : isAudioAvailable ? (
                    <FileDisplay
                        handleFormSubmission={handleFormSubmission}
                        handleAudioReset={handleAudioReset}
                        file={file}
                        audioStream={audioStream}
                    />
                ) : (
                    <HomePage
                        setFile={setFile}
                        setAudioStream={setAudioStream}
                    />
                )}
            </section>
        </div>
    );
}

export default App;
