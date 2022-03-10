import './stylesheets/Home.css';
import About from './About';
import WorkHistory from './WorkHistory';
import Projects from './Projects';

function Home(props) {
  return (
    <div className="Home">
      <header className="Home-header">
        Jason Text
      </header>
      <About/>
      <WorkHistory/>
      <Projects/>
    </div>
  );
}

export default Home;
// Rename to Home, make a new file for App. App will determine which page we are looking at (home or a single project) via props to the Projects component.