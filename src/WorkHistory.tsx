import './stylesheets/WorkHistory.css';

import { useState, useEffect } from 'react';

import WorkHistoryBlock from './WorkHistoryBlock';

type WorkHistoryModel = {
  workHistory: WorkHistoryInterface[]
}

interface WorkHistoryInterface {
  companyName: string,
  projects: Project[]
}

interface Project {
  title: string,
  startDate: string,
  endDate: string,
  languages: string,
  frameworks: string
}

function WorkHistory() {
  const [workHistoryData, setWorkHistoryData] = useState<WorkHistoryModel>();

  useEffect(() => {
    fetch('/data/WorkHistory.json')
      .then((res) => res.json())
      .then((_data) => setWorkHistoryData(_data))
      .catch((err) => console.log(err));
  }, []);

  const createWorkHistory = () => {
    let components = [];
    let id = 0;
    
    if (workHistoryData){
      for (let entry of workHistoryData.workHistory) {
        components.push(<WorkHistoryBlock key={id++} entry={entry}/>);
      }
    }

    return components;
  }

  return (
    <div className='work-history'>
      <h2>Professional Experience</h2>
      <div className='triangle'/>
      <div>{!workHistoryData ? 'Loading...' : createWorkHistory()}</div>
      <div className='triangle'/>
    </div>
  );
}

export default WorkHistory;
