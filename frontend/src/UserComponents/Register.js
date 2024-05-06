import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import CSS file for styling

const Register = () => {
    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState(''); // State variable to store the response message
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    // Function to handle registration
    const handleRegister = async () => {
        try {
            // Send registration data to the server
            const response = await axios.post('http://localhost:3000/auth/register', {
                email,
                password,
                role,
                fullName,
                address,
                phone
            });
            setResponseMessage(response.data.message); // Set response message
            console.log(response.data.message);
             // Set toast message and show toast
      setToastMessage(`User with ${email} Registered successfully `);
      setShowToast(true);
            setEmail('');
            setPassword('');
            setFullName('');
            setRole('');
            setAddress('');
            setPhone('');
            setErrorMessage('');
            // Redirect to login page after successful registration
            window.location.href = '/login';
        } catch (error) {
            // Handle error response
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className='register'>
            <div className="register-container">
                <div className="col-md-9">
                    <h1>Register</h1>
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
                            <option value="">Select Role</option>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    {/* Full name input */}
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input type="text" id="fullName" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    {/* Address input */}
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    {/* Phone input */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" id="phone" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    {/* Display error message if any */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {/* Display response message */}
                {responseMessage && <p className="response-message">{responseMessage}</p>}
                       {/* Toast notification */}
              <div className={`toast ${showToast ? 'show' : ''}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div className="toast-header">
                 <strong className="me-auto">Registartion</strong>
                  <button type="button" className="btn-close" onClick={() => setShowToast(false)} />
                </div>
                <div className="toast-body">{toastMessage}</div>
              </div>
            
                {/* Register button */}
                <button className="register-button" onClick={handleRegister}>Register</button>
                <div>
                 <p className="h6">Already have an account! <span><a href="/login" className="lh">Login here!</a></span></p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
