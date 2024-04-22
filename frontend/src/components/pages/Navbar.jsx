import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
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