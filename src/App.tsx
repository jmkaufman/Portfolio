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

import { PersonalProjectsDataModel } from './PersonalProjectsModels';

function App (): JSX.Element {
  // State variables.
  const [personalProjectsData, setPersonalProjectsData] = useState<PersonalProjectsDataModel>();
  const [paths, setPaths] = useState<string[]>([]);

  // Get data from PersonalProjects.json on page load using an IIFE.
  useEffect(() => {
      (async () => {
        try {
          const data = await fetch('/data/PersonalProjects.json');
          const json = await data.json();
          setPersonalProjectsData(json);
        } catch (err) {
          console.log(err);
        }
      })();
  }, []);

  // Fills the paths state variable when personalProjectsData is updated.
  useEffect(() => {
    if(personalProjectsData){
      let listOfPaths: string[] = [];

      for(let entry of personalProjectsData.personalProjects)
      {
        listOfPaths.push(entry.route);
      }

      setPaths(listOfPaths);
    }
  }, [personalProjectsData]);

  // Dynamically import a project and tie it to a new component.
  const createGenericComponent = (path: string) => {
    const upperCasePath: string = path.charAt(0).toUpperCase() + path.slice(1);
    // @ts-ignore
    const NewComponent = lazy(() => import('./external/' + upperCasePath + '/src/App'));

    return <NewComponent/>;
  }

  // Create a list of routes.
  const createNewRoutes = () => {
    console.log('Projects loaded, creating routes');
    
    let components: JSX.Element[] = [];
    let id: number = 0;

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
          {!personalProjectsData ?
          console.log('Projects not loaded, Home not created') :
          <Route path='/' element={<Home personalProjects={personalProjectsData.personalProjects}/>}/>}
          
          {!personalProjectsData ?
          console.log('Projects not loaded, no routes created') :
          createNewRoutes()}
        </>
      </Routes>
    </Router>
  );
}

export default App;
