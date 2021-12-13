import {useState, useEffect} from 'react';
import ProjectsBlock from './ProjectsBlock';

function Projects() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('Projects.json')
      .then((res) => res.json())
      .then((_data) => setData(_data))
      .catch((err) => console.log(err));
  }, []);

  const createProjects = () => {
    let components = [];
    let id = 0;

    for (let entry of data.projects) {
      components.push(<ProjectsBlock key={id++} entry={entry}/>);
    }

    return components;
  }
  
  return (
    <div>
      <h2>PersonalProjects</h2>
      <div className='project-block-layout'>{!data ? 'Loading...' : createProjects()}</div>
    </div>
  );
}

export default Projects;