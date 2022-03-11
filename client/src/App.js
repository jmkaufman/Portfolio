import {
  React, 
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

function App () {
  // State variable declarations.
  const [data, setData] = useState(null);
  const [paths, addToPaths] = useState([]);

  // Get data from Projects.json on load.
  useEffect(() => {
    fetch('Projects.json')
      .then((res) => res.json())
      .then((_data) => setData(_data))
      .catch((err) => console.log(err));
  }, []);

  // Fill the paths state variable after data has been successfully updated.
  useEffect(() => {
    if(data){
      let listOfPaths = [];

      for(let entry of data.projects)
      {
        listOfPaths.push(entry.route);
      }

      addToPaths(listOfPaths);
    }
  }, [data]);

  // Creates a component using dynamic importing via React.lazy.
  const createGenericComponent = (path) => {
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
        <Route exact path='/' element={<Home projectsData={data}/>}/>
        {!data ? console.log('Projects not loaded, no additional routes created') : createNewRoutes()}
      </Routes>
    </Router>
  );
}

export default App;
