import { WorkHistoryBlockPropsModel, WorkProject } from "./WorkHistoryModels";

function WorkHistoryBlock(props: WorkHistoryBlockPropsModel): JSX.Element {
  function createWorkHistoryBlocks(workProjects: WorkProject[]): JSX.Element[] {
    let infoComponents: JSX.Element[] = [];
    let id = 0;

    for (let workProject of workProjects) {
      let { jobTitle, startDate, endDate, languages, frameworks } = workProject;

      infoComponents.push(
        <div className="project" key={id++}>
          <div className="line" />
          <div className="content">
            <h4>{jobTitle}</h4>
            <h5>
              {startDate} - {endDate}
            </h5>
            <div className="info">
              <p>Languages: </p>
              <div className="languages">{languages}</div>
            </div>
            <div className="info">
              <p>Tools: </p>
              <div className="tools">{frameworks}</div>
            </div>
          </div>
        </div>
      );
    }

    return infoComponents;
  }

  return (
    <div className="history-block">
      <div className="circle" />
      <h3>{props.companyName}</h3>
      <div>{createWorkHistoryBlocks(props.workProjects)}</div>
    </div>
  );
}

export default WorkHistoryBlock;
