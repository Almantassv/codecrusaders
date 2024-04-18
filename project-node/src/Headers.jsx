import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Taskss from './Tasks';
import TaskApp from './Projects';


const Headers = () => {
  return (
    <Router>
      <div className="navbar">
        <NavLink to="/projects" activeClassName="active">Projects</NavLink>
        <NavLink to="/tasks" activeClassName="active">Tasks</NavLink>
        <NavLink to="/calendar" activeClassName="active">Calendar</NavLink>
      </div>

      <Route path="/projects" component={Projects} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/calendar" component={Calendar} />
    </Router>
  );
};



const Projects = () => {
  return <TaskApp/> ;
};

const Tasks = () => {
  return <Taskss/>;
};

const Calendar = () => {
  return <h2>Calendar</h2>;
};

export default Headers;
