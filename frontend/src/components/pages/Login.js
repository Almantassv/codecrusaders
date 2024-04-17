import React, { useState } from 'react';

const Login = () => {
    // State to hold user's credentials
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false); // State to track password visibility

    //Function to handle changes in input fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    //Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        //authentication logic:
        console.log('Form submitted:', formData);
        //clearing the form fields
        setFormData({
            username: '',
            password: ''
        });
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div class="wrapper">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username </label>
                <div class="input-box">
                     <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='Enter your username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="password">Password </label>
                <div class="input-box">
                    
                <input
                        type={showPassword ? 'text' : 'password'} // Toggle between 'password' and 'text'
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" class="btn">Log In</button>

                <div class="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;