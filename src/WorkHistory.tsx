import './stylesheets/WorkHistory.css';

import { useState, useEffect } from 'react';

import WorkHistoryBlock from './WorkHistoryBlock';

import { WorkHistoryDataModel } from "./WorkHistoryModels";

function WorkHistory(): JSX.Element {
  // State variable.
  const [workHistoryData, setWorkHistoryData] = useState<WorkHistoryDataModel>();

  // Get data from WorkHistory.json on page load using an IIFE.
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch('/data/WorkHistory.json');
        const json = await data.json();
        setWorkHistoryData(json);
      } catch (err) {
        console.log(err);
      }
    })();
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
