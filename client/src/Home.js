import './stylesheets/Home.css';
import TopBar from './TopBar';
import About from './About';
import WorkHistory from './WorkHistory';
import Projects from './Projects';

function Home(props) {
  return (
    <div className="Home">
      <TopBar/>
      <div className='page-content'>
        <About/>
        <WorkHistory/>
        <Projects projectsData={props.projectsData}/>
      </div>
    </div>
  );
}

export default Home;
