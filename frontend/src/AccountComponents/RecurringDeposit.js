import React, { useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../UserComponents/AdimDashboard';

const RecurringDeposit = () => {
  // Define state variables for form data and messages
  const [formData, setFormData] = useState({
    accountId: '',
    amount: 0,
    frequency: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post('http://localhost:3000/accounts/RD', formData,
      {
        headers: {
          authorization: `${token}` // Pass token in authorization header
        }
      });
      // Update state with success message
      setMessage(response.data.message);
      setToastMessage(`Reccuring Deposit of ${formData.amount} of ${formData.frequency} is successfully `);
      setShowToast(true);
        // Reset form data
    setFormData({
      accountId: '',
      amount: 0,
      frequency:''
    });
    setError('');
    } catch (error) {
      // Update state with error message
      setError(error.response ? error.response.data.message : 'Unknown error occurred');
    }
  };

  // Render UI
  return (
    <div className='accounts'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar /> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            <div className="deposit-container">
              <h2>Perform Recurring Deposit</h2>
              {/* Display success or error message */}
              {message && <p className="success-message">{message}</p>}
                {/* Toast notification */}
                <div className={`toast ${showToast ? 'show' : ''}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div className="toast-header">
                 <strong className="me-auto">Reccuring Deposit</strong>
                  <button type="button" className="btn-close" onClick={() => setShowToast(false)} />
                </div>
                <div className="toast-body">{toastMessage}</div>
              </div>
              {error && <p className="error-message">{error}</p>}
              {/* Recurring deposit form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="accountId">Account ID:</label>
                  <input type="text" id="accountId" name="accountId" className="form-control" value={formData.accountId} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount:</label>
                  <input type="number" id="amount" name="amount" className="form-control" value={formData.amount} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="frequency">Frequency:</label>
                  <select id="frequency" name="frequency" className="form-control" value={formData.frequency} onChange={handleChange}>
                    <option value="">Select Frequency</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Perform Recurring Deposit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringDeposit;
