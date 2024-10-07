const Transcription = (props) => {
    const { textElement } = props;

    return <div className="text-justify bg-white shadow w-full p-2 px-4 rounded">{textElement}</div>;
};

export default Transcription;
