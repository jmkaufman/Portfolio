import {
  Link,
} from "react-router-dom";

function ProjectsBlock(props){
  return (
    <div className='project-block'>
      <h3>{props.entry.title}</h3>
      <p>{props.entry.description}</p>
      <img className="thumbnail" src={require('../public/thumbnails/' + props.entry.thumbnail).default} alt={props.entry.title + ' thumbnail'}/> {/*Try to keep thumbnails 350x233*/}
      <br/>
      <Link to={'/' + props.entry.route} target='_blank' rel='noreferrer'>View it here!</Link>
      <br/>
      <a href={props.entry.repo} target='_blank' rel='noreferrer'>Github Repository</a>
      <br/>
    </div>
  );
}

export default ProjectsBlock;
