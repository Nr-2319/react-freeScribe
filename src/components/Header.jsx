/* eslint-disable react/prop-types */
const Header = (props) => {
    const { setAudioStream, setOutput, setFile, setLoading } = props;

    const getNewPage = () => {
        setAudioStream(null);
        setOutput(null);
        setFile(null);
        setLoading(false);
    };

    return (
        <>
            <header className="flex items-center justify-between gap-4 p-4">
                <button
                    className="p-1 px-4 rounded duration-200 hover:bg-violet-200"
                    onClick={getNewPage}
                >
                    <h1 className="font-medium text-2xl">
                        Free<span className="bold text-violet-600">Scribe</span>
                    </h1>
                </button>
                <button
                    onClick={getNewPage}
                    className="specialBtn py-2 px-3 rounded-lg text-violet-400 text-sm flex items-center gap-2"
                >
                    <p>New</p>
                    <span className="material-symbols-outlined">add</span>
                </button>
            </header>
        </>
    );
};

export default Header;
