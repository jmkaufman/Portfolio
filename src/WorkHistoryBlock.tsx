import { WorkHistoryBlockPropsModel } from "./WorkHistoryModels";

function WorkHistoryBlock(props: WorkHistoryBlockPropsModel): JSX.Element {
  const createWorkHistoryBlock = (): JSX.Element[] => {
    let infoComponents: JSX.Element[] = [];
    let id: number = 0;

    for (let workProject of props.workProjects) {
      const { jobTitle, startDate, endDate, languages, frameworks } = workProject;

      infoComponents.push(
        <div className='project' key={id++}>
          <div className='line'/>
          <div className='content'>
            <h4>{jobTitle}</h4>
            <h5>{startDate} - {endDate}</h5>
            <div className='info'>
              <p>Languages: </p>
              <div className='languages'>{languages}</div>
            </div>
            <div className='info'>
              <p>Tools: </p>
              <div className='tools'>{frameworks}</div>
            </div>
          </div>
        </div>
      );

    }

    return infoComponents;
  };

  return (
    <div className='history-block'>
      <div className='circle'/>
      <h3>{props.companyName}</h3>
      <div>{createWorkHistoryBlock()}</div>
    </div>
  );
}

export default WorkHistoryBlock;
