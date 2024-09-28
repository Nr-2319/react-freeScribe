import { LANGUAGES } from "../utils/presets";

const Translation = (props) => {
    const {
        textElement,
        toLanguage,
        translating,
        setToLanguage,
        generateTranslation,
    } = props;

    return (
        <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
            {!translating && (
                <div className="flex flex-col">
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mr-auto mb-1">
                        To Language
                    </p>
                    <div className="flex items-strech gap-2">
                        <select
                            name=""
                            id=""
                            className="flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent hover:border-violet-300 duration-200 p-2 rounded"
                            value={toLanguage}
                            onChange={(e) => setToLanguage(e.target.value)}
                        >
                            <option value={"select a language"}>
                                Select a Language
                            </option>
                            {Object.entries(LANGUAGES).map(([key, value]) => {
                                return (
                                    <option key={key} value={value}>
                                        {key}
                                    </option>
                                );
                            })}
                        </select>
                        <button
                            onClick={generateTranslation}
                            className="specialBtn px-3 py-2 rounded-lg text-violet-400 hover:text-violet-600 duration-200"
                        >
                            Translate
                        </button>
                    </div>
                </div>
            )}

            {textElement && !translating && (
                <p className="text-justify p-2 my-1">{textElement}</p>
            )}

            {translating && (
                <div className="grid place-items-center">
                    <span className="material-symbols-outlined animate-spin">
                        progress_activity
                    </span>
                </div>
            )}
        </div>
    );
};

export default Translation;
