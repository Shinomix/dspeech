import './Input.css';

function Input({ onChangeFn, value }) {
  const handleChange = (e) => {
    onChangeFn(e.currentTarget.value);
  };

  return (
    <div>
      <textarea className="Input"
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Jot your mind here..."
      />
    </div>
  )
}

export default Input;
