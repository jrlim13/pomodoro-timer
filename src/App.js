import './App.css';
import Header from './components/Header';
import Timer from './components/Timer';
import TimerFuncitonal from './components/TimerFunctional';
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Timer /> */}
      <TimerFuncitonal />
      <Footer />
    </div>
  );
}

export default App;
