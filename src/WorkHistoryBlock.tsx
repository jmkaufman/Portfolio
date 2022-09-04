type WorkHistoryBlockProps = {
  entry: 
    {
      companyName: string,
      projects: Project[]
    }
}

interface Project {
  title: string,
  startDate: string,
  endDate: string,
  languages: string,
  frameworks: string
}

function WorkHistoryBlock(props: WorkHistoryBlockProps) {
  const organizeProjects = () => {
    let projectsComponents = [];
    let id = 0;

    for (let project of props.entry.projects) {
      let infoBlock = [];
      const { title, startDate, endDate, languages, frameworks } = project;

      infoBlock.push(
      <div className='project' key={id++}>
        <div className='line'/>
        <div className='content'>
          <h4>{title}</h4>
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
