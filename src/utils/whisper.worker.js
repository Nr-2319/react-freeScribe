const API_KEY = import.meta.env.VITE_API_TOKEN;

export async function query(file) {
    const data = file;
    const response = await fetch(
        "https://api-inference.huggingface.co/models/distil-whisper/distil-large-v3",
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
    return result;
}

/* query("src/assets/sample1.mp3").then((response) => {
    console.log(JSON.stringify(response));
}); */
