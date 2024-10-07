import { useEffect, useState, useRef } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

const Information = (props) => {
    const { output } = props;

    const [isTranscription, setIsTranscription] = useState(true);
    const [translating, setTranslating] = useState(null);
    const [toLanguage, setToLanguage] = useState("select a language");
    const [translation, setTranslation] = useState(null);

    const worker = useRef();

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(
                new URL("../utils/translate.worker.js", import.meta.url),
                {
                    type: "module",
                }
            );
        }

        const onMessageReceived = async (e) => {
            switch (e.data.status) {
                case "initiate":
                    console.log("DOWNLOADING");
                    break;
                case "progress":
                    console.log("LOADING");
                    break;
                case "update": {
                    const resultText = e.data.output;
                    setTranslation(resultText?.translation_text);
                    console.log("resultText", resultText);
                    break;
                }
                case "complete":
                    setTranslating(false);
                    console.log("DONE");
                    break;
            }
        };

        worker.current.addEventListener("message", onMessageReceived);

        return () =>
            worker.current.removeEventListener("message", onMessageReceived);
    });

    function generateTranslation() {
        if (translating || toLanguage === "select a language") return;

        setTranslating(true);

        worker.current.postMessage({
            text: output,
            src_lang: "eng_Latn",
            tgt_lang: toLanguage,
        });
    }

    const textElement = isTranscription
        ? output
        : translation || "No translation";

    function handleCopy() {
        navigator.clipboard.writeText(textElement);
    }

    function handleDownload() {
        const element = document.createElement("a");
        const file = new Blob([textElement], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = (`Freescribe_${new Date().toString()}.txt`);
        document.body.appendChild(element);
        element.click();
    }

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
                        "px-4 py-1 font-semibold text-lg duration-300 " +
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
                        "px-4 py-1 font-semibold text-lg duration-300 " +
                        (!isTranscription
                            ? "bg-violet-400 text-white"
                            : "text-violet-400 hover:text-violet-500")
                    }
                >
                    Translation
                </button>
            </div>
            <div className="my-2 flex flex-col">
                {isTranscription ? (
                    <Transcription {...props} textElement={textElement} />
                ) : (
                    <Translation
                        toLanguage={toLanguage}
                        translating={translating}
                        textElement={textElement}
                        setToLanguage={setToLanguage}
                        setTranslating={setTranslating}
                        generateTranslation={generateTranslation}
                    />
                )}
            </div>

            <div className="flex items-center gap-4 mx-auto">
                <button
                    onClick={handleCopy}
                    title="Copy"
                    className="bg-white text-violet-300 hover:text-violet-500 duration-300 shadow rounded px-2 aspect-square grid place-items-center"
                >
                    <span className="material-symbols-outlined">
                        content_copy
                    </span>
                </button>
                <button
                    onClick={handleDownload}
                    title="Donwload"
                    className="bg-white text-violet-300 hover:text-violet-500 duration-300 shadow rounded px-2 aspect-square grid place-items-center"
                >
                    <span className="material-symbols-outlined">download</span>
                </button>
            </div>
        </main>
    );
};

export default Information;
