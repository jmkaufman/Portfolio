import './stylesheets/TopBar.css';

import { BsLinkedin } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';

function TopBar() {
  return (
    <div>
      <header className="Home-header">
        <div className='contact-info'>
          <a className="email" href={"mailto:jkaufman217@gmail.com"}>
            <MdOutlineEmail alt='jkaufman217@gmail.com' size={35}/>
          </a>
          <a className="linkedin" href={"https://www.linkedin.com/in/jason-m-kaufman/"} target='_blank' rel='noreferrer'>
            <BsLinkedin alt='Linkedin' size={30}/>
          </a>
        </div>
      </header>
    </div>
  );
}

export default TopBar
