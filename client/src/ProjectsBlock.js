import {
  Link,
} from "react-router-dom";

function ProjectsBlock(props){
  return (
    <div className='project-block'>
      <h3>{props.entry.title}</h3>
      <p>{props.entry.description}</p>
      <Link to={'/' + props.entry.route} target='_blank' rel='noreferrer'>View it here!</Link>
      <br/>
      <a href={props.entry.repo} target='_blank' rel='noreferrer'>Github Repository</a>
      <br/>
    </div>
  );
}

export default ProjectsBlock;
