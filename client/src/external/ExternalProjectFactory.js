// Pass argument in here and return proper component.
import Test from './Test/Test';

const getProject = (projectName) =>
{
  if(projectName === 'test') 
  {
    return <Test/>;
  }
  else
  {
    return null;
  }
};

export default getProject;