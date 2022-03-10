import { useState, useEffect } from 'react';
import './stylesheets/About.css';

function About() {
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
      <p id='home-description'>{data}</p>
    </div>
  );
}

export default About;