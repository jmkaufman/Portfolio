// This is a component that just runs a function.
// Pass argument in here and return proper component.

import Game from './Pong/src/Game';
import {
  Outlet
} from "react-router-dom";

function ExternalProjectFactory (props) {
  props.setPage(getProjectComponent(props.projectName));
  
  return null;
}

const getProjectComponent = (projectName) =>
{
  if(projectName === 'PONG') 
  {
    return <Game/>;
  }
  else
  {
    return <Outlet/>;
  }
};

export default ExternalProjectFactory;