import "./SpeechList.css"

import Speech from "../atoms/Speech";

function SpeechList({ speeches }) {
  return (
    <div className="SpeechList">
      {speeches.map(speech => (
        <Speech key={speech.id} sender={speech.sender} content={speech.content} />
      ))}
    </div>
  )
}

export default SpeechList;
