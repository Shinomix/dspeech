import "./SpeechRecorder.css";

import { connect } from "react-redux";

import SubmitForm from "../molecules/SubmitForm";
import { inputChanged } from "../utils/recorder-reducer";
import { recordSpeech } from "../utils/web3/contract-api";

function SpeechRecorder({ inputValue, dispatch }) {
  const onInputChangeFn = (input) => dispatch(inputChanged(input));
  const onSubmitFn = async () => {
    await recordSpeech(inputValue);
    dispatch(inputChanged(""));
  };

  const isInputInvalid = () => inputValue.length > 256;
  const isSubmitDisabled = () => inputValue.length === 0 || isInputInvalid();

  return (
    <div className="SpeechRecorder">
      <SubmitForm
        onInputChangeFn={onInputChangeFn}
        inputValue={inputValue}
        onSubmitFn={onSubmitFn}
        isSubmitDisabled={isSubmitDisabled()}
        isInputInvalid={isInputInvalid()}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  inputValue: state.recorder.inputValue
});

export default connect(mapStateToProps)(SpeechRecorder);
