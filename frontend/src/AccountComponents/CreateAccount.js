import React, { useState } from 'react';
import axios from 'axios';
import './Accounts.css'; // Import CSS file for styling
import CustomerSidebar from '../UserComponents/CustomerDashboard'; // Import CustomerSidebar component

const CreateAccount = () => {
  // Define state variables for form inputs and messages
  const [accountNumber, setAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactionPin, setTransactionPin] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post('http://localhost:3000/accounts', {
        name,
        accountType,
        balance,
        transactionPin,
        status
      },
      {
        headers: {
          authorization: `${token}` // Pass token in authorization header
        }
      });
      // Update state with response data
      setAccountNumber(response.data.accountNumber);
      setMessage(response.data.message);
      setToastMessage(`${accountType} Account for ${name} created successfully `);
      setShowToast(true);
      // Reset form data
      setName('');
      setAccountType('');
      setBalance(0);
      setTransactionPin('');
      setStatus('');
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Unknown error occurred');
    }
  };

  // Render UI
  return (
    <div className='accounts'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <CustomerSidebar /> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <h2>Create Account</h2>
              {/* Display success or error message */}
              {message && <p className="success-message">{message}</p>}
                {/* Toast notification */}
                <div className={`toast ${showToast ? 'show' : ''}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div className="toast-header">
                 <strong className="me-auto">ACCOUNT CREATION</strong>
                  <button type="button" className="btn-close" onClick={() => setShowToast(false)} />
                </div>
                <div className="toast-body">{toastMessage}</div>
              </div>
              {error && <p className="error-message">{error}</p>}
              {/* Account creation form */}
              <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
              <div className="col-md-4">
              <label htmlFor="name" className="form-label">Name:</label>
             <input type="text" className={`form-control ${name ? 'is-valid' : 'is-invalid'}`} id="name" value={name} onChange={(e) => setName(e.target.value)} required />
    <div className="valid-feedback">Looks good!</div>
    <div className="invalid-feedback">Please provide a name.</div>
  </div>
  <div className="col-md-4">
    <label htmlFor="accountType" className="form-label">Account Type:</label>
    <select className={`form-select ${accountType ? 'is-valid' : 'is-invalid'}`} id="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)} required>
      <option value="">Select Account Type</option>
      <option value="savings">Savings</option>
      <option value="current">Current</option>
      <option value="investment">Investment</option>
    </select>
    <div className="valid-feedback">Looks good!</div>
    <div className="invalid-feedback">Please select an account type.</div>
  </div>
  <div className="col-md-4">
    <label htmlFor="balance" className="form-label">Balance:</label>
    <input type="number" className={`form-control ${balance ? 'is-valid' : 'is-invalid'}`} id="balance" value={balance} onChange={(e) => setBalance(e.target.value)} required />
    <div className="valid-feedback">Looks good!</div>
    <div className="invalid-feedback">Please provide a valid balance.</div>
  </div>
  <div className="col-md-4">
    <label htmlFor="transactionPin" className="form-label">Transaction Pin:</label>
    <input type="password" className={`form-control ${transactionPin ? 'is-valid' : 'is-invalid'}`} id="transactionPin" value={transactionPin} onChange={(e) => setTransactionPin(e.target.value)} required />
    <div className="valid-feedback">Looks good!</div>
    <div className="invalid-feedback">Please provide a transaction pin.</div>
  </div>
  <div className="col-md-4">
    <label htmlFor="status" className="form-label">Status:</label>
    <select className={`form-select ${status ? 'is-valid' : 'is-invalid'}`} id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
      <option value="">Select Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
    <div className="valid-feedback">Looks good!</div>
    <div className="invalid-feedback">Please select a status.</div>
  </div>
  <div className="col-12">
    <button className="btn btn-primary" type="submit">Create Account</button>
  </div>
</form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
