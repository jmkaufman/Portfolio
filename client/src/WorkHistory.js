import { useState, useEffect } from 'react';
import WorkHistoryBlock from './WorkHistoryBlock';

function WorkHistory() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('WorkHistory.json')
      .then((res) => res.json())
      .then((_data) => setData(_data))
      .catch((err) => console.log(err));
  }, []);

  const createWorkHistory = (jsonData) => {
    let components = [];
    let id = 0;

    for (let entry of jsonData.workHistory) {
      components.push(<WorkHistoryBlock key={id++} entry={entry}/>);
    }

    return components;
  }

  return (
    <div>
      <h1>WorkHistory</h1>
      <div>{!data ? 'Loading...' : createWorkHistory(data)}</div>
    </div>
  );
}

export default WorkHistory;
