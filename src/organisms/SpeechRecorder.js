import "./SpeechRecorder.css";

import { connect } from "react-redux";

import SubmitForm from "../molecules/SubmitForm";
import { inputChanged } from "../utils/recorder-reducer";

function SpeechRecorder({ inputValue, dispatch }) {
  const onInputChangeFn = (input) => dispatch(inputChanged(input));
  const onSubmitFn = () => {};

  return (
    <div className="SpeechRecorder">
      <SubmitForm
        onInputChangeFn={onInputChangeFn}
        inputValue={inputValue}
        onSubmitFn={onSubmitFn}
        isSubmitDisabled={false}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  inputValue: state.recorder.inputValue
});

export default connect(mapStateToProps)(SpeechRecorder);
