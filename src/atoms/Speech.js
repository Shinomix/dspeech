import "./Speech.css";

function Speech({ sender, senderUrl, content }) {
  return (
    <div className="Speech">
      <div className="Speech-sender">
        <a href={senderUrl} target="_blank">
          {sender}
        </a>
      </div>
      <div className="Speech-content">
        { content }
      </div>
    </div>
  )
}

export default Speech;
