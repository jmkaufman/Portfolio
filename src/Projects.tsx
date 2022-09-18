import './stylesheets/Projects.css';

import ProjectsBlock from './ProjectsBlock';

import { PersonalProjectsDataModel } from './PersonalProjectsModels';

function Projects(props: PersonalProjectsDataModel): JSX.Element {
  const createProjects = () => {
    let components: JSX.Element[] = [];
    let id: number = 0;

    if(props.personalProjects) {
      for (let entry of props.personalProjects) {
        components.push(
          <ProjectsBlock 
            key={id++} 
            title={entry.title} 
            description={entry.description} 
            thumbnail={entry.thumbnail} 
            route={entry.route} 
            repo={entry.repo}
          />
        );
      }
    }

    return components;
  }
  
  return (
    <div className='projects'>
      <h2>Personal Projects</h2>
      <div className='project-block-layout'>{!props.personalProjects ? 'Loading...' : createProjects()}</div>
    </div>
  );
}

export default Projects;
