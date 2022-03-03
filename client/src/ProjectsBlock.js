import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

import getProject from "./external/ExternalProjectFactory";

function ProjectsBlock(props){
  return (
    <Router>
      <div className='project-block'>
        <h3>{props.entry.title}</h3>
        <p>{props.entry.description}</p>
        <a href={props.entry.route} target='_blank' rel='noreferrer'>View it here!</a>
        <br/>
        <Link to='/Pong' target='_blank' rel='noreferrer'>Click</Link>
        <br/>
        <a href={props.entry.repo} target='_blank' rel='noreferrer'>Github Repository</a>
      </div>

      <Routes>
        <Route path='/' element={<Outlet/>}/>
        <Route path='/Pong' element={getProject('test')}/>
      </Routes>
    </Router>
  );
}

export default ProjectsBlock;