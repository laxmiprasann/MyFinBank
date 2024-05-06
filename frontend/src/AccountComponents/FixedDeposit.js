import React, { useState } from 'react';
import axios from 'axios';
import './Accounts.css'; // Import CSS file for styling
import AdminSidebar from '../UserComponents/AdimDashboard'; // Import AdminSidebar component

const FixedDeposit = () => {
  // Define state variables for form data and messages
  const [formData, setFormData] = useState({
    accountId: '',
    amount: 0,
    interestRate: 0,
    durationValue: 0,
    durationUnit: 'months' // Default duration unit
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Function to handle form input changes
  const handleChange = (e) => {
    if (e.target.name === 'durationUnit') {
      // Set the duration unit
      setFormData({ ...formData, durationUnit: e.target.value });
    } else {
      // Set other form data
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    // Clear error message when user interacts with form
    setError('');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post('http://localhost:3000/accounts/FD',{ ...formData,
      amount: parseFloat(formData.amount), // Parse amount to number
    },
      {
        headers: {
          authorization: `${token}`
        }
      });
      // Update state with success message
      setMessage(response.data.message);
      setToastMessage(`Fixed Deposit of ${formData.amount} is successfully `);
      setShowToast(true);
      // Reset form data
    setFormData({
      accountId: '',
      amount: 0,
      interestRate: 0,
      durationValue: 0,
      durationUnit: 'months' // Default duration unit
    });
    setError('');
    } catch (error) {
      if (error.response && error.response.data.message === "Invalid duration unit. Please specify 'months' or 'years'.") {
        // Display specific error message for invalid duration unit
        setError(error.response.data.message);
      } else {
        // Display general error message
        setError(error.response ? error.response.data.message : 'Unknown error occurred');
      }
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
              <h2>Perform Fixed Deposit</h2>
              {/* Display success or error message */}
              {message && <p>{message}</p>}
               {/* Toast notification */}
               <div className={`toast ${showToast ? 'show' : ''}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div className="toast-header">
                 <strong className="me-auto">Fixed Deposit</strong>
                  <button type="button" className="btn-close" onClick={() => setShowToast(false)} />
                </div>
                <div className="toast-body">{toastMessage}</div>
              </div>
              {error && <p className="error-message">{error}</p>}
              {/* Fixed deposit form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="accountId">Account ID</label>
                  <input type="text" name="accountId" id="accountId" placeholder="Account ID" value={formData.accountId} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input type="number" name="amount" id="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="interestRate">Interest Rate</label>
                  <input type="number" name="interestRate" id="interestRate" placeholder="Interest Rate" value={formData.interestRate} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <div className="duration-group">
                    {/* Radio buttons for selecting duration unit */}
                    <div className="radio-group">
                      <input type="radio" id="months" name="durationUnit" value="months" checked={formData.durationUnit === 'months'} onChange={handleChange} />
                      <label htmlFor="months">Months</label>
                      <input type="radio" id="years" name="durationUnit" value="years" checked={formData.durationUnit === 'years'} onChange={handleChange} />
                      <label htmlFor="years">Years</label>
                    </div>
                    {/* Input for duration value */}
                    <input type="number" name="durationValue" id="durationValue" placeholder="Duration" value={formData.durationValue} onChange={handleChange} />
                  </div>
                </div>
                <button type="submit">Perform Fixed Deposit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedDeposit;
