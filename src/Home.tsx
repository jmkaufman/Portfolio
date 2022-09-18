import './stylesheets/Home.css';

import TopBar from './TopBar';
import About from './About';
import WorkHistory from './WorkHistory';
import Projects from './Projects';

import { PersonalProjectsDataModel } from './PersonalProjectsModels';

function Home(props: PersonalProjectsDataModel) {
  return (
    <div className="Home">
      <TopBar/>
      <div className='page-content'>
        <About/>
        <WorkHistory/>
        <Projects personalProjects={props.personalProjects}/>
      </div>
    </div>
  );
}

export default Home;
