function WorkHistoryBlock(props) {
  const organizeProjects = () => {
    let projectsComponents = [];

    for (let projects of props.entry.projects) {
      let infoBlock = [];
      let id = 0;

      infoBlock.push(<h2 key={id++}>{projects.title}</h2>);
      infoBlock.push(<h3 key={id++}>{projects.startDate} - {projects.endDate}</h3>);
      infoBlock.push(<h4 key={id++}>{projects.description}</h4>);

      projectsComponents.push(infoBlock);
    }

    return projectsComponents;
  };

  return (
    <div>
      <h1>{props.entry.companyName}</h1>
      <div>{organizeProjects()}</div>
    </div>
  );
}

export default WorkHistoryBlock;
