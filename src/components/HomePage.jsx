/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

const HomePage = (props) => {
    const { setAudioStream, setFile } = props;

    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [duration, setDuration] = useState(0);

    const mediaRecorder = useRef(null);
    const mimeType = "audio/webm";

    async function startRecording() {
        let tempStream;

        // console.log("start recording");

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });
            tempStream = streamData;
        } catch (err) {
            console.log("err ", err);
            return;
        }

        setIsRecording(true);
        setAudioChunks([]);

        // create new media recorder instance using the stream
        const media = new MediaRecorder(tempStream, { type: mimeType });

        mediaRecorder.current = media;

        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                localAudioChunks.push(event.data);
            }
        };

        setAudioChunks(localAudioChunks);
    }

    async function stopRecording() {
        setIsRecording(false);
        // console.log("stop recording");

        if (mediaRecorder.current) {
            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: mimeType });
                setAudioStream(audioBlob);
                setAudioChunks([]);
                setDuration(0);
            };

            mediaRecorder.current.stop();
        }
    }

    useEffect(() => {
        if (isRecording) {
            const interval = setInterval(() => {
                setDuration((curr) => curr + 1);
            }, 1000);

            return () => clearInterval(interval);
        }

        // Reset duration if not recording
        setDuration(0);
    }, [isRecording]);

    const handleFileChange = (e) => {
        const tempFile = e.target.files[0];
        setFile(tempFile);
    };

    return (
        <>
            <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-40">
                <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
                    Free<span className="text-violet-400 bold">Scribe</span>{" "}
                </h1>
                <h3 className="font-medium md:text-lg">
                    Record <span className="text-violet-400">&rarr;</span>{" "}
                    Transcribe <span className="text-violet-400">&rarr;</span>{" "}
                    Translate
                </h3>

                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className="specialBtn py-2 px-4 rounded-xl flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-ful my-4"
                >
                    <p className="text-violet-400">
                        {!isRecording ? "Record" : "Stop recording"}
                    </p>
                    <div className="flex items-center gap-2">
                        {duration !== 0 && (
                            <p className="text-sm">{duration}s</p>
                        )}
                        <span
                            className={
                                `material-symbols-outlined duration-200 ` +
                                (isRecording ? `text-red-400` : "")
                            }
                        >
                            mic
                        </span>
                    </div>
                </button>

                <p className="text-base">
                    Or{" "}
                    <label className="text-violet-500 cursor-pointer hover:text-violet-800 duration-200">
                        upload{" "}
                        <input
                            type="file"
                            accept=".mp3, .wave"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    a mp3 file
                </p>
                <p className="italic text-slate-400">Free now free forever</p>
            </main>
        </>
    );
};

export default HomePage;
