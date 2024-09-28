import { MessageTypes } from "./presets";

self.addEventListener("message", async (event) => {
    const { type, audio } = event.data;
    if (type === MessageTypes.INFERENCE_REQUEST) {
        await transcribe(audio);
    }
});

function sendLoadingMessage(status) {
    self.postMessage({
        type: MessageTypes.LOADING,
        status,
    });
}

function sendFinalResult() {
    self.postMessage({ type: MessageTypes.INFERENCE_DONE });
}

async function sendDownloadingMessage() {
    self.postMessage({
        type: MessageTypes.DOWNLOADING,
    });
}

function createResultMessage(results) {
    self.postMessage({
        type: MessageTypes.RESULT,
        results,
    });
}

async function transcribe(file) {
    sendLoadingMessage("loading");

    const API_KEY = import.meta.env.VITE_API_TOKEN;
    const data = file;

    sendLoadingMessage("success");

    sendDownloadingMessage();
    const response = await fetch(
        "https://api-inference.huggingface.co/models/distil-whisper/distil-medium.en",
        {
            headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: data,
        }
    );
    const result = await response.json();
    sendFinalResult();
    createResultMessage(result);
}
