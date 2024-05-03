import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider} from './services/AuthContext';
import PrivateRoute from './services/privateRoutes';
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
            <Route path="/projects" element={<PrivateRoute roles={['User']}><Home /></PrivateRoute>} />
            <Route path="/list" element={<PrivateRoute roles={['User']}><Home /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute roles={['User']}><Create /></PrivateRoute>} />
            <Route path="/projects/:id" element={<PrivateRoute roles={['User']}><ProjectDetails /></PrivateRoute>} />
            <Route path="/projects/:id/edit" element={<PrivateRoute roles={['User']}><EditProject /></PrivateRoute>} />
          </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;