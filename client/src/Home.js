import { useState, useEffect } from 'react';
import './stylesheets/Home.css';

function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('AboutMe.txt')
      .then((res) => res.text())
      .then((text) => setData(text))
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <h1>Jason Kaufman</h1>
      <h2 id='home-description'>{data}</h2>
    </div>
  );
}

export default Home;