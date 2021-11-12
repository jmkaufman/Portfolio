function ProjectsBlock(props){
  return (
    <div>
      <h1>{props.entry.title}</h1>
      <h3>{props.entry.description}</h3>
      <a href={props.entry.route} target='_blank' rel='noreferrer'>View it here!</a>
      <h3>{props.entry.repo}</h3>
    </div>
  );
}

export default ProjectsBlock;