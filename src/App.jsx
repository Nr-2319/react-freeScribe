
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import FileDisplay from "./components/FileDisplay";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { query } from "./utils/whisper.worker";

function App() {
    const [file, setFile] = useState(null);
    const [audioStream, setAudioStream] = useState(null);
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transcription, setTranscription] = useState("");
    const [finished, setFinished] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const isAudioAvailable = file || audioStream;

    function handleAudioReset() {
        setFile(null);
        setAudioStream(null);
    }

    // transcription
    const worker = useRef(null);

    /*     async function readAudioFrom(file) {
        const sampling_rate = 16000;
        const audioCTX = new AudioContext({ sampleRate: sampling_rate });

        const arrayBuffer = await file.arrayBuffer();

        const decoded = await audioCTX.decodeAudioData(arrayBuffer);

        const audioData = decoded.getChannelData(0);

        const audioBlob = new Blob([audioData], { type: file.type });

        return audioBlob;
    } */

    async function handleFormSubmission() {
        if (!file && !audioStream) return;

        setLoading(true);
        const audio = file || audioStream;
        await query(audio).then((res) => {
            const answer = JSON.stringify(res);
            setTranscription(answer);
        });
        console.log("transcription", transcription);

        setLoading(false);
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
                    <Information />
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
            <footer></footer>
        </div>
    );
}

export default App;
