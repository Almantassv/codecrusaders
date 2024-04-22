import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Calenadr from './Calendar';
import './Css/Headers.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmailShortener = ({ email }) => {
  const [isShortened, setIsShortened] = useState(true);

  const toggleEmail = () => {
    setIsShortened(!isShortened);
  };

  const renderEmail = () => {
    if (isShortened) {
      const [username] = email.split('@');
      return `${username.slice(0, 5)}...`;
    } else {
      return email;
    }
  };

  return (
    <span onClick={toggleEmail}>{renderEmail()}</span>
  );
};

const Headers = () => {
  return (
    <Router>
      <div className="navbar">
        <div className='navlink'> 
        <img src="/assets/icon.png" alt="Icon_png" />
        <NavLink to="/home" activeClassName="active">Home</NavLink>
        <NavLink to="/projects" activeClassName="active">Projects</NavLink>
        <NavLink to="/tasks" activeClassName="active">Tasks</NavLink>
        <NavLink to="/calendar" activeClassName="active">Calendar</NavLink>
         </div>
      <div className='flexdiv'>
      <div className='emailcss'> <EmailShortener email="exampler@mail.com" /></div> 
      <div className='loginc'>Logout</div>
      </div>
      </div> 
      <Route path="/home" component={home} />
      <Route path="/projects" component={Projects} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/calendar" component={Calendar} />
    </Router>
  );
};

const home = () => {
  return <div>Home</div> ;
};
const Projects = () => {
  return <div>projects</div> ;
};

const Tasks = () => {
  return <div>task</div>;
};

const Calendar = () => {
  return <Calenadr/>;
};

export default Headers;