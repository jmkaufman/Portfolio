import './stylesheets/Home.css';

import TopBar from './TopBar';
import About from './About';
import WorkHistory from './WorkHistory';
import Projects from './Projects';

function Home() {
  return (
    <div className="Home">
      <TopBar/>
      <div className='page-content'>
        <About/>
        <WorkHistory/>
        <Projects/>
      </div>
    </div>
  );
}

export default Home;
