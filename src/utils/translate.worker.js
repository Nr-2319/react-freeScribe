/* eslint-disable no-unused-vars */
import { pipeline } from "@xenova/transformers";

const API_KEY = import.meta.env.VITE_API_TOKEN;

self.addEventListener("message", async (event) => {
    const dataToTranslate = event.data.text;
    const srcLang = event.data.src_lang;
    const tgtLang = event.data.tgt_lang;
    self.postMessage("progress");

    const data = {
        inputs: dataToTranslate,
        parameters: { src_lang: srcLang, tgt_lang: tgtLang },
    }

    const jsonResult = await translate(data);

    self.postMessage({
        status: "update",
        output: jsonResult[0],
    });

    self.postMessage({
        status: "complete",
        output: jsonResult[0],
    });
});

async function translate(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/nllb-200-distilled-600M",
        {
            headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}