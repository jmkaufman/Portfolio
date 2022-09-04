import './stylesheets/Projects.css';

import ProjectsBlock from './ProjectsBlock';

type ProjectsProps = {
  projectsData: {
    projects: Project[]
  }
}

type Project = {
  title: string;
  description: string;
  thumbnail: string;
  route: string;
  repo: string;
}

function Projects(props: ProjectsProps) {
  const createProjects = () => {
    let components = [];
    let id = 0;

    for (let entry of props.projectsData.projects) {
      components.push(<ProjectsBlock key={id++} entry={entry}/>);
    }

    return components;
  }
  
  return (
    <div className='projects'>
      <h2>Personal Projects</h2>
      <div className='project-block-layout'>{!props.projectsData ? 'Loading...' : createProjects()}</div>
    </div>
  );
}

export default Projects;
