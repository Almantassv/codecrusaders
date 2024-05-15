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

    return (
        <div className="wrapper">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <div className="input-box">
                    <input
                        className={loginError.badUsername ? "bad-input" : ""}
                        type="text"
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