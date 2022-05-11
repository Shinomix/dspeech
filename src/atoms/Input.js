import './Input.css';

function Input({ onChangeFn, value, isInvalid }) {
  const handleChange = (e) => {
    onChangeFn(e.currentTarget.value);
  };

  const classNames = () => isInvalid ? "Input Input--invalid" : "Input";

  return (
    <div>
      <textarea className={classNames()}
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Jot your mind here..."
      />
    </div>
  )
}

export default Input;
