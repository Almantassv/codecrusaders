import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import { login, authenticate } from "./utils/auth/auth";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedIn = await login({ username, password }); // Get the login response
      if (loggedIn) {
        authenticate(); // Authenticate the user after successful login
        onLogin(); // Call the onLogin function to update the authentication state
        navigate('/list');
      } else {
        console.error('Login failed');
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="create">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          value={username}
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          value={password}
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;