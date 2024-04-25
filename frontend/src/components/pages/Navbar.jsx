import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import "../../styles/Navbar.css";

const Navbar = () => {
  const { token, logoutUser } = useAuth(); // Access token and logoutUser method from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Call logoutUser method from AuthContext
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>Project Management</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {token && (
          <>
            <Link to="/list">All Projects</Link>
            <Link to="/create">New Project</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;