import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState({ badUsername: '', badEmail: '', badPassword: '' });
    const navigate = useNavigate(); // Use useNavigate hook to navigate

    // Function to handle changes in input fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setRegisterError({badPassword: 'Passwords do not match'})
            return;
        }
        if (formData.username.trim() === '') {
            setRegisterError({badUsername: 'Username cannot be empty'})
            return;
        }
        
            try {
              await axios.post('http://localhost:8080/api/register', formData);
              navigate('/login');
            } catch (error) {
              console.error('Error:', error);
              setRegisterError({badUsername: error.response.data.message})
            }
          };
    

    return (
        <div className="wrapper">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username <span className="error-message">{registerError.badUsername}</span></label>
                <div className="input-box">
                    <input
                        className={registerError.badUsername ? "bad-input" : ""}
                        type="text"
                        id="username"
                        name="username"
                        placeholder='Enter your username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <label htmlFor="email">Email <span className="error-message">{registerError.badEmail}</span></label>
                <div className="input-box">
                    <input
                        className={registerError.badEmail ? "bad-input" : ""}
                        type="text"
                        id="email"
                        name="email"
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <label htmlFor="password">Password <span className="error-message">{registerError.badPassword}</span></label>
                <div className="input-box">
                    <input
                        className={registerError.badPassword ? "bad-input" : ""}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <label htmlFor="confirmPassword">Confirm Password </label>
                <div className="input-box">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>


                <button type="submit" className="btn" onClick={handleSubmit}>Register</button>

                <div className="login-link">
                    <p>Already have an account? <a href="../Login">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Registration;
