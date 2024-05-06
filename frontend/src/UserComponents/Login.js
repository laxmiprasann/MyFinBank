import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './Login.css'; // Import CSS file for styling

const Login = () => {
    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role is set to 'customer'
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || ''); // Retrieve token from localStorage or set it to an empty string
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle login
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password,
                role // Include selected role in the login request
            });
            const { token } = response.data;
            console.log(response.data.message);
            console.log(response);
            setToken(token);
            // Store the token securely in localStorage
            localStorage.setItem('token', token);

            // Redirect based on role
            if (role === 'customer') {
                navigate('/customerside'); // Redirect to customerside
            } else if (role === 'admin') {
                navigate('/adminside'); // Redirect to adminside
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            }
           else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className='login'>
            <div className="login-container">
                <h1>Login</h1>
                {/* Email input */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {/* Password input */}
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* Role selection */}
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                {/* Display error message if any */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {/* Login button */}
                <button className="login-button" onClick={handleLogin}>Login</button>
                <div>
            <p className="h6">Don't have an account!{" "}
            <span> {" "}<a href="/register" className="rg"> Register here !</a> </span> </p></div>
            </div>
        </div>
    );
};

export default Login;
