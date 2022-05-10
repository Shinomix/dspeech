import Input from "../atoms/Input";
import SubmitButton from "../atoms/SubmitButton";

function SubmitForm({
  onInputChangeFn,
  inputValue,
  onSubmitFn,
  isSubmitDisabled
}) {
  return (
    <div className="SpeechRecorder">
      <Input onChangeFn={onInputChangeFn} value={inputValue} />
      <SubmitButton content="Record" onClickFn={onSubmitFn} isDisabled={isSubmitDisabled} />
    </div>
  )
}
export default SubmitForm;
