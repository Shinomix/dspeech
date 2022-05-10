import "./SubmitButton.css"

function SubmitButton({ content, onClickFn, isDisabled }) {
  const onClick = () => onClickFn();

  return (
    <button className="SubmitButton" onClick={onClick} disabled={isDisabled}>
      {content}
    </button>
  )
}

export default SubmitButton;
