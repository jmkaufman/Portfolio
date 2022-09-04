import './stylesheets/App.css';

import {
  useState, 
  useEffect, 
  lazy, 
  Suspense,
} from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Home';

type ProjectModel = {
  projects: {
    title: string,
    description: string,
    thumbnail: string,
    route: string,
    repo: string
  }[]
}

function App () {
  // State variable declarations.
  const [projectsData, setProjectsData] = useState<ProjectModel>();
  const [paths, addToPaths] = useState<string[]>([]);

  // Get data from Projects.json on load.
  useEffect(() => {
    fetch('/data/Projects.json')
      .then((res) => res.json())
      .then((_data) => setProjectsData(_data))
      .catch((err) => console.log(err));
  }, []);

  // Fill the paths state variable after data has been successfully updated.
  useEffect(() => {
    if(projectsData){
      let listOfPaths: string[] = [];

      for(let entry of projectsData.projects)
      {
        listOfPaths.push(entry.route);
      }

      addToPaths(listOfPaths);
    }
  }, [projectsData]);

  // Creates a component using dynamic importing via React.lazy.
  const createGenericComponent = (path: string) => {
    const upperCasePath = path.charAt(0).toUpperCase() + path.slice(1);
    const NewComponent = lazy(() => import('./external/' + upperCasePath + '/src/App'));

    return <NewComponent/>;
  }

  // Creates a list of routes for the router based on the paths state variable.
  const createNewRoutes = () => {
    console.log('Projects loaded, creating routes');
    
    let components = [];
    let id = 0;

    for(let path of paths)
    {
      components.push(
        <Route path={'/' + path} 
               key={id++} 
               element={<Suspense fallback={<>...</>}>
                          {createGenericComponent(path)}
                        </Suspense>}
        />
      );
    }

    return components;
  }

  return (
    <Router>
      <Routes>
        <>
          <Route path='/' element={<Home projectsData={projectsData}/>}/>
          {!projectsData ? console.log('Projects not loaded, no additional routes created') : createNewRoutes()}
        </>
      </Routes>
    </Router>
  );
}

export default App;
