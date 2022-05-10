import './App.css';
import Speeches from './organisms/Speeches';
import SpeechRecorder from './organisms/SpeechRecorder';

function App() {
  return (
    <div className="App">
      <SpeechRecorder />
      <Speeches />
    </div>
  );
}

export default App;
