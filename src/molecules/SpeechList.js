import "./SpeechList.css"

import Speech from "../atoms/Speech";

function SpeechList({ speeches }) {
  const senderUrl = (sender) => "https://rinkeby.etherscan.io/address/" + sender;

  return (
    <div className="SpeechList">
      {speeches.map(speech => (
        <Speech key={speech.id} sender={speech.sender} senderUrl={senderUrl(speech.sender)} content={speech.content} />
      ))}
    </div>
  )
}

export default SpeechList;
