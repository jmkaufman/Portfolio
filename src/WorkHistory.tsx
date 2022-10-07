import "./stylesheets/WorkHistory.css";

import { useState, useEffect } from "react";

import WorkHistoryBlock from "./WorkHistoryBlock";

import {
  WorkHistoryBlockPropsModel,
  WorkHistoryDataModel,
} from "./WorkHistoryModels";

function WorkHistory(): JSX.Element {
  // State variable.
  const [workHistoryData, setWorkHistoryData] =
    useState<WorkHistoryDataModel>();

  // Get work history data on page load using an IIFE.
  useEffect(() => {
    (async function loadWorkHistory() {
      try {
        const data = await fetch("/data/WorkHistory.json");
        const json = await data.json();
        setWorkHistoryData(json);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function createWorkHistory(
    workHistory: WorkHistoryBlockPropsModel[]
  ): JSX.Element[] {
    const whbComponents: JSX.Element[] = [];
    let id = 0;

    if (workHistory) {
      for (let entry of workHistory) {
        whbComponents.push(
          <WorkHistoryBlock
            key={id++}
            companyName={entry.companyName}
            workProjects={entry.workProjects}
          />
        );
      }
    }

    return whbComponents;
  }

  return (
    <div className="work-history">
      <h2>Professional Experience</h2>
      <div className="triangle" />
      <div>
        {!workHistoryData
          ? "Loading..."
          : createWorkHistory(workHistoryData.workHistory)}
      </div>
      <div className="triangle" />
    </div>
  );
}

export default WorkHistory;
