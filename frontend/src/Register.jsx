import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/register', { username, email, password, confirmPassword });
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please check your input and try again.');
    }
  };

  return (
    <div className="create">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          value={username}
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          value={email}
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          value={password}
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          value={confirmPassword}
          type="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;