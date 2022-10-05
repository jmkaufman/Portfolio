import './stylesheets/Projects.css';

import { useEffect, useState } from 'react';

import ProjectsBlock from './ProjectsBlock';

import { PersonalProject, PersonalProjectsDataModel } from './PersonalProjectsModels';

function Projects(): JSX.Element {
  // State variable.
  const [personalProjectsData, setPersonalProjectsData] = useState<PersonalProjectsDataModel>();
  
  // Get personal projects data on page load using an IIFE.
  useEffect(() => {
    (async function loadPersonalProjects() {
      try {
        let data = await fetch('/data/PersonalProjects.json');
        let json = await data.json();
        setPersonalProjectsData(json);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function createProjectBlocks(personalProjects: PersonalProject[]): JSX.Element[] {
    let components: JSX.Element[] = [];
    let id: number = 0;

    if (personalProjects)
    {
      for (let project of personalProjects) {
        let { title, description, thumbnail, site, repo } = project;

        components.push(
          <ProjectsBlock 
            key={id++} 
            title={title} 
            description={description} 
            thumbnail={thumbnail} 
            site={site} 
            repo={repo}
          />
        );
      }
    }

    return components;
  }
  
  return (
    <div className='projects'>
      <h2>Personal Projects</h2>
      <div className='project-block-layout'>{!personalProjectsData ? 'Loading...' : createProjectBlocks(personalProjectsData.personalProjects)}</div>
    </div>
  );
}

export default Projects;
