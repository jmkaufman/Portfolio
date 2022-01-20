import './stylesheets/Block.css';

function WorkHistoryBlock(props) {
  const organizeProjects = () => {
    let projectsComponents = [];
    let id = 0;

    for (let projects of props.entry.projects) {
      let infoBlock = [];

      infoBlock.push(
      <div key={id++}>
        <div>
          <h4>{projects.title}</h4>
          <h5>{projects.startDate} - {projects.endDate}</h5>
          <p>Languages: {projects.languages}</p>
          <p>Tools/Frameworks: {projects.frameworks}</p>
        </div>
        <span className='circle'/>
      </div>
      );

      projectsComponents.push(infoBlock);
    }

    return projectsComponents;
  };

  return (
    <div className='history-block-wrapper'>
      <div className='history-block'>
        <h3>{props.entry.companyName}</h3>
        <div>{organizeProjects()}</div>
      </div>
    </div>
  );
}

export default WorkHistoryBlock;
