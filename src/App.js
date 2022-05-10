import './App.css';
import Speeches from './organisms/Speeches';
import SpeechRecorder from './organisms/SpeechRecorder';
import logo from './logo.png';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="App-slogan">Record your thoughts in the blockchain for guaranteed trust and freedom.</div>
      <SpeechRecorder />
      <Speeches />
    </div>
  );
}

export default App;
