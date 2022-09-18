import {
  Link,
} from "react-router-dom";

import { PersonalProject } from "./PersonalProjectsModels";

function ProjectsBlock(props: PersonalProject){
  const { title, description, thumbnail, route, repo } = props

  return (
    <div className='project-block'>
      <h3>{title}</h3>
      <p>{description}</p>
      <img className="thumbnail" src={require('../public/thumbnails/' + thumbnail)} alt={title + ' thumbnail'}/> {/*Try to keep thumbnails 350x233*/}
      <br/>
      <Link to={'/' + route} target='_blank' rel='noreferrer'>View it here!</Link>
      <br/>
      <a href={repo} target='_blank' rel='noreferrer'>Github Repository</a>
      <br/>
    </div>
  );
}

export default ProjectsBlock;
