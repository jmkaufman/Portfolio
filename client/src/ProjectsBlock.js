function ProjectsBlock(props){
  return (
    <div className='project-block'>
      <h3>{props.entry.title}</h3>
      <p>{props.entry.description}</p>
      <a href={props.entry.route} target='_blank' rel='noreferrer'>View it here!</a>
      <br/>
      <a href={props.entry.repo} target='_blank' rel='noreferrer'>Github Repository</a>
    </div>
  );
}

export default ProjectsBlock;