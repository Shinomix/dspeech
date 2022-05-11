import { connect } from "react-redux";
import { useEffect } from 'react';

import SpeechList from "../molecules/SpeechList";
import { fetchPage } from "../utils/speech-reducer";

function Speeches({ speeches, dispatch }) {
  useEffect(() => {
    dispatch(fetchPage())
  }, []);

  return (
    <SpeechList speeches={speeches} />
  )
}

const mapStateToProps = (state) => ({
  speeches: state.speech.speeches
})

export default connect(mapStateToProps)(Speeches)
