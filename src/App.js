import './App.css';
import Speeches from './organisms/Speeches';
import SpeechRecorder from './organisms/SpeechRecorder';
import logo from './logo.png';
import { setupListeners } from './utils/web3/contract-api';
import { useEffect } from 'react';
import { connect } from 'react-redux';

function App({ dispatch }) {
  useEffect(() => {
    setupListeners();
  }, []);

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="App-slogan">Record your thoughts in the blockchain for guaranteed trust and freedom.</div>
      <SpeechRecorder />
      <Speeches />
    </div>
  );
}

export default connect()(App);
