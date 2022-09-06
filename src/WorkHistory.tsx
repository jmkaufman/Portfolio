import './stylesheets/WorkHistory.css';

import { useState, useEffect } from 'react';

import WorkHistoryBlock from './WorkHistoryBlock';

import { WorkHistoryDataModel } from "./WorkHistoryModels";

function WorkHistory(): JSX.Element {
  const [workHistoryData, setWorkHistoryData] = useState<WorkHistoryDataModel>();

  useEffect(() => {
    fetch('/data/WorkHistory.json')
      .then((res) => res.json())
      .then((data) => setWorkHistoryData(data))
      .catch((err) => console.log(err));
  }, []);

  const createWorkHistory = (): JSX.Element[] => {
    let whbComponents: JSX.Element[] = [];
    let id: number = 0;
    
    if (workHistoryData){
      for (let entry of workHistoryData.workHistory) {
        whbComponents.push(<WorkHistoryBlock key={id++} companyName={entry.companyName} workProjects={entry.workProjects} />);
      }
    }

    return whbComponents;
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
