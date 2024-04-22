// Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./utils/auth/auth";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1>Project Management</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/list">All Projects</Link>
            <Link to="/create">New Project</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {!isLoggedIn && (
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