import Input from "../atoms/Input";
import SubmitButton from "../atoms/SubmitButton";

function SubmitForm({
  onInputChangeFn,
  inputValue,
  onSubmitFn,
  isSubmitDisabled,
  isInputInvalid,
}) {
  return (
    <div className="SpeechRecorder">
      <Input onChangeFn={onInputChangeFn} value={inputValue} isInvalid={isInputInvalid} />
      <SubmitButton content="Record" onClickFn={onSubmitFn} isDisabled={isSubmitDisabled} />
    </div>
  )
}
export default SubmitForm;
