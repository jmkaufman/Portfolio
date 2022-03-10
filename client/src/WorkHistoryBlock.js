function WorkHistoryBlock(props) {
  const organizeProjects = () => {
    let projectsComponents = [];
    let id = 0;

    for (let projects of props.entry.projects) {
      let infoBlock = [];

      infoBlock.push(
      <div className='project' key={id++}>
        <div className='line'/>
        <div className='content'>
          <h4>{projects.title}</h4>
          <h5>{projects.startDate} - {projects.endDate}</h5>
          <div className='info'>
            <p>Languages: </p>
            <div className='languages'>{projects.languages}</div>
          </div>
          <div className='info'>
            <p>Tools: </p>
            <div className='tools'>{projects.frameworks}</div>
          </div>
        </div>
      </div>
      );

      projectsComponents.push(infoBlock);
    }

    return projectsComponents;
  };

  return (
    <div className='history-block'>
      <div className='circle'/>
      <h3>{props.entry.companyName}</h3>
      <div>{organizeProjects()}</div>
    </div>
  );
}

export default WorkHistoryBlock;
