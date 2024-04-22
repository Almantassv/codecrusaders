// App.jsx
import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Create from "./Create";
import ProjectDetails from "./ProjectDetails";
import NotFound from "./NotFound";
import HomeWelcome from './HomeWelcome';
import EditProject from "./EditProject";
import Login from "./Login";
import Register from "./Register";
import { getLoggedInUser } from './utils/auth/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/list" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/create" element={isLoggedIn ? <Create /> : <Navigate to="/login" />} />
            <Route path="/projects/:id" element={isLoggedIn ? <ProjectDetails /> : <Navigate to="/login" />} />
            <Route path="/projects/:id/edit" element={isLoggedIn ? <EditProject /> : <Navigate to="/login" />} />
            <Route path="/" element={<HomeWelcome />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;