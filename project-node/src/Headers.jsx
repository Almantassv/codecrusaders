import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Taskss from './Tasks';
import TaskApp from './Projects';
import Calenadr from './Calendar';
import './Css/Headers.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EmailShortener extends React.Component {
  shortenEmail = (email) => {
    const [username] = email.split(5); 
    if (username.length > 5) {
      return (
        <div>
          <i className="fas fa-user-alt" style={{ fontSize: '36px' }}></i> {`${username.slice(0, 5)}...`}
        </div>
      );
    } else {
      return email;
    }
  };

  render() {
    const { email } = this.props;
    const shortenedEmail = this.shortenEmail(email);
    return <span>{shortenedEmail}</span>;
  }
}
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
  return <TaskApp/> ;
};

const Tasks = () => {
  return <Taskss/>;
};

const Calendar = () => {
  return <Calenadr/>;
};

export default Headers;
