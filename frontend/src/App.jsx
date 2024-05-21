import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './services/privateRoutes';
import { AuthProvider } from './services/AuthContext';
import Navbar from "./components/pages/Navbar";
import Login from './components/pages/Login';
import Registration from "./components/pages/Registration";
import Create from "./components/pages/projectsDashboard/Create";
import ProjectDetails from "./components/pages/projectsDashboard/ProjectDetails";
import EditProject from "./components/pages/projectsDashboard/EditProject";
import HomeWelcome from './components/pages/projectsDashboard/HomeWelcome';
import ProjectList from './components/pages/projectsDashboard/ProjectList';
import Home from "./components/pages/projectsDashboard/Home";
import './styles/ProjectList.css';
import './styles/Navbar.css';
import './styles/Login.css';
import './styles/Create.css';
import './styles/TaskBoard.css';
import CreateTask from './components/pages/tasksDashboard/CreateTask';
import Admin from './components/pages/Admin/AdminBoard';

import DeleteProjectPage from './components/pages/projectsDashboard/DeleteProjectPage';

import TaskBoard from './components/pages/tasksDashboard/TaskBoard';

function App() {

  return (
    <Router>
      <AuthProvider>
        <div className='App'>
          <Navbar />
          <div className='content'>

            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            {/* <Route path="/admin" element={<PrivateRoute roles={['Admin']}>{<Admin />}</PrivateRoute>} /> */}
            <Route path="/" element={<PrivateRoute roles={['User', 'Admin']}><Home /></PrivateRoute>} />
            <Route path="/list" element={<PrivateRoute roles={['User', 'Admin']}><Home /></PrivateRoute>} />
            <Route path="/projects/:projectId/delete" element={<PrivateRoute roles={['Admin']}><DeleteProjectPage /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute roles={['User', 'Admin']}><Create /></PrivateRoute>} />
            <Route path="/projects/:id" element={<PrivateRoute roles={['User', 'Admin']}><ProjectDetails /></PrivateRoute>} />
            <Route path="/projects/:id/edit" element={<PrivateRoute roles={['User', 'Admin']}><EditProject /></PrivateRoute>} />
            <Route path="/projects/:id/create-task" element={<PrivateRoute roles={['User', 'Admin']}><CreateTask /></PrivateRoute>} />
            <Route path="/projects/:id/taskboard" element={<PrivateRoute roles={['User', 'Admin']}><TaskBoard /></PrivateRoute>} />
          </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;