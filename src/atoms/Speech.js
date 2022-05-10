import "./Speech.css";

function Speech({ sender, content }) {
  return (
    <div className="Speech">
      <div className="Speech-sender">
        {sender}
      </div>
      <div className="Speech-content">
        { content }
      </div>
    </div>
  )
}

export default Speech;
