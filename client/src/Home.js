import './stylesheets/Home.css';
import About from './About';
import WorkHistory from './WorkHistory';
import Projects from './Projects';

function Home(props) {
  return (
    <div className="Home">
      <header className="Home-header"/>
      <About/>
      <WorkHistory/>
      <Projects projectsData={props.projectsData}/>
    </div>
  );
}

export default Home;
