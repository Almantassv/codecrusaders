import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import "../../styles/Navbar.css";

const Navbar = () => {
  const { token, user, logoutUser } = useAuth(); // Access token and logoutUser method from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Call logoutUser method from AuthContext
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/list");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src="/frankenstein.png" alt="Frankenstein Icon" style={{ width: "30px", height: "30px", marginRight: "10px", cursor: "pointer" }} />  
        <h1>FRANKie</h1>
      </div>

      <div className="links">
        {token ? (
          <div className="dafak">
            <Link to="/list">Projects</Link>
            <Link to="/create">New Project</Link>
            
             
            <span className="user-name"><h4>{user.name}</h4></span>
            <button onClick={handleLogout}>Logout</button>
            
          </div>
        ) : (
          <div className="fakfak">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;