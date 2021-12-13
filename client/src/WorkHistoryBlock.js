import './stylesheets/Block.css';

function WorkHistoryBlock(props) {
  const organizeProjects = () => {
    let projectsComponents = [];

    for (let projects of props.entry.projects) {
      let infoBlock = [];
      let id = 0;

      infoBlock.push(
      <div className='history-block' key={id++}>
        <h4>{projects.title}</h4>
        <h5>{projects.startDate} - {projects.endDate}</h5>
        <p>{projects.description}</p>
        </div>
      );

      projectsComponents.push(infoBlock);
    }

    return projectsComponents;
  };

  return (
    <div>
      <h3>{props.entry.companyName}</h3>
      <div>{organizeProjects()}</div>
    </div>
  );
}

export default WorkHistoryBlock;
