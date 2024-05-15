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
        if (formData.password.trim() === '') {
            setRegisterError({badPassword: 'Password cannot be empty'})
            return;
        }
        if (formData.email.trim() === '') {
            setRegisterError({badEmail: 'Email cannot be empty'})
            return;
        }
        if (formData.confirmPassword.trim() === '') {
            setRegisterError({badPassword: 'Confirm Password cannot be empty'})
            return;
        }
        
            try {
              await axios.post('http://localhost:8080/api/register', formData);
              navigate('/login');
            } catch (error) {
              console.error('Error:', error);
              const registerError = error.response.data.message.toLowerCase();
              if (registerError.includes("username")) {
                setRegisterError({badUsername: error.response.data.message})
              }
              else if (registerError.includes("password")) {
                setRegisterError({badPassword: error.response.data.message})
              }
              else if (registerError.includes("email")) {
                setRegisterError({badEmail: error.response.data.message})
              }
              else {
                setRegisterError({badUsername: error.response.data.message})
              }
            }
          };

          const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

    return (
        <div className="wrapper">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
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
                    <span className="error-message">{registerError.badUsername}</span>
                    {/* <p>{registerError.badUsername}</p> */}
                </div>

                <label htmlFor="email">Email</label>
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
                    <span className="error-message">{registerError.badEmail}</span>
                </div>
                <button className='show-hide' type='button' onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '50px', top: '56.5%', transform: 'translateY(-50%)', }}>{showPassword ? "Hide" : "Show"}</button>
                <label htmlFor="password">Password</label>
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
                    <span className="error-message">{registerError.badPassword}</span>
                </div>
                <button className='show-hide' type='button' onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '50px', top: '73%', transform: 'translateY(-50%)' }}>{showPassword ? "Hide" : "Show"}</button>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-box">
                    <input
                        className={registerError.badPassword ? "bad-input" : ""}
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