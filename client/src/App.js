import { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import WorkHistory from './WorkHistory';
import Projects from './Projects';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/users')
      .then((res) => res.text())
      .then((text) => setData(text))
      .catch((err) => console.log(err));
  });

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <p>{!data ? "Loading..." : data}</p>
      <Home/>
      <WorkHistory/>
      <Projects/>
    </div>
  );
}

export default App;
