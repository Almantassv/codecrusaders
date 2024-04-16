import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Sectionprj from './Sectionprj';


const Headers = () => {
  return (
    <Router>
      <div className="navbar">
        <NavLink to="/" exact activeClassName="active">Home</NavLink>
        <NavLink to="/projects" activeClassName="active">Projects</NavLink>
        <NavLink to="/tasks" activeClassName="active">Tasks</NavLink>
        <NavLink to="/calendar" activeClassName="active">Calendar</NavLink>
      </div>

      <Route exact path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/calendar" component={Calendar} />
    </Router>
  );
};

const Home = () => {
  return <h2>Home</h2>;
};

const Projects = () => {
  return <Sectionprj/>;
};

const Tasks = () => {
  return <h2>Tasks</h2>;
};

const Calendar = () => {
  return <h2>Calendar</h2>;
};

export default Headers;
