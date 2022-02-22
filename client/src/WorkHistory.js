import { useState, useEffect } from 'react';
import WorkHistoryBlock from './WorkHistoryBlock';
import './stylesheets/WorkHistory.css';

function WorkHistory() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('WorkHistory.json')
      .then((res) => res.json())
      .then((_data) => setData(_data))
      .catch((err) => console.log(err));
  }, []);

  const createWorkHistory = () => {
    let components = [];
    let id = 0;

    for (let entry of data.workHistory) {
      components.push(<WorkHistoryBlock key={id++} entry={entry}/>);
    }

    return components;
  }

  return (
    <div className='work-history'>
      <h2>Professional Experience</h2>
      <div className='triangle'/>
      <div>{!data ? 'Loading...' : createWorkHistory()}</div>
      <div className='triangle'/>
    </div>
  );
}

export default WorkHistory;
