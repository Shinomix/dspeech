import { connect } from "react-redux";
import SpeechList from "../molecules/SpeechList";

function Speeches({ speeches }) {
  return (
    <SpeechList speeches={speeches} />
  )
}

const mapStateToProps = (state) => ({
  speeches: state.speech
})

export default connect(mapStateToProps)(Speeches)
