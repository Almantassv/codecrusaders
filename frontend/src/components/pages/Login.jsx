import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../services/AuthContext';


const Login = () => {
    const authContext = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState({ badUsername: '', badPassword: '' });

    const colors = ['rgba(27, 110, 48, 0.2)', '#1b6e3060', '#5EA2E265', '#F6E17090']; // Array of colors
  const [colorIndex, setColorIndex] = useState(0); // State to keep track of the current color index


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, password } = formData;
            const response = await axios.post('http://localhost:8080/api/login', { username, password });
            console.log("Response: " + response.data.token);
            const { token } = response.data;
            authContext.loginUser(token);
            navigate('/');
        } catch (error) {
            console.log('Error:' + error);
            setLoginError({badUsername: 'Invalid username or password', badPassword: ''})
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const changeColor = () => {
        const nextIndex = (colorIndex + 1) % colors.length; // Calculate next color index
        setColorIndex(nextIndex); // Update the color index state
      };

    return (
        <div className="wrapper" style={{ backgroundColor: colors[colorIndex] }}>
            <h2>Login</h2>
            {/* onClick={changeColor} */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <div className="input-box">
                    <input
                        className={loginError.badUsername ? "bad-input" : ""}
                        type="text"
                        spellCheck="false"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <span className="error-message">{loginError.badUsername}</span>
                </div>
                <label htmlFor="password">Password</label>
                <div className="input-box">
                    <input
                        className={loginError.badUsername ? "bad-input" : ""}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        
                    />
                    <button className="show-hide" type="button" onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '50px', top: '60%', transform: 'translateY(-50%)' }}>
                {showPassword ? "Hide" : "Show"}
                </button>
                    <span className="error-message">{loginError.badPassword}</span>
                </div>
                <button type="submit" className="btn">Log In</button>
                <div className="register-link">
                    <p>Don't have an account? <Link to="../register">Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;