import './stylesheets/App.css';
import Home from './Home';
import WorkHistory from './WorkHistory';
import Projects from './Projects';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Jason Text
      </header>
      <Home/>
      <WorkHistory/>
      <Projects/>
    </div>
  );
}

export default App;
