import React, { useState } from 'react';
import axios from 'axios';
import CustomerSidebar from '../UserComponents/CustomerDashboard'; // Import CustomerSidebar component

const DepositComponent = () => {
  // State variables
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionPin, setTransactionPin] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Function to handle deposit
  const handleDeposit = async () => {
    try {
      const token = localStorage.getItem('token');
      // Send a POST request to deposit
      const response = await axios.post('http://localhost:3000/transactions/deposit', {
        accountNumber,
        amount: parseFloat(amount),
        transactionPin
      }, {
        headers: {
          authorization: `${token}`
        }
      });
      // Reset form fields
    setAccountNumber('');
    setAmount('');
    setTransactionPin('');
    console.log('Deposit response:', response.data);
      // Set toast message and show toast
      setToastMessage(`${amount} was Deposited successfully to your account`);
      setShowToast(true);
      // Set popup message from response
      setPopupMessage(response.data.popupMessage);
    } catch (error) {
      console.error('Deposit error:', error);
      if (error.response && error.response.data && error.response.data.error === 'Invalid transaction PIN') {
        // Show alert for invalid transaction PIN
        alert('Invalid transaction PIN. Please try again.');
      } else {
        // Set popup message for other errors
        setPopupMessage('Error occurred during deposit. Please try again later.');
      }
    }
  };

  return (
    <div className='transac'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <CustomerSidebar /> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            <div className="transaction-container">
              <h2>Deposit</h2>
              {/* Form for deposit */}
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number:</label>
                <input type="text" id="accountNumber" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="transactionPin">Transaction PIN:</label>
                <input type="password" id="transactionPin" value={transactionPin} onChange={e => setTransactionPin(e.target.value)} />
              </div>
              {/* Button for deposit */}
              <button onClick={handleDeposit}>Deposit</button>
              {/* Display popup message */}
              {popupMessage && <p>{popupMessage}</p>}
              {/* Toast notification */}
              <div className={`toast ${showToast ? 'show' : ''}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div className="toast-header">
                 <strong className="me-auto">Deposit</strong>
                  <button type="button" className="btn-close" onClick={() => setShowToast(false)} />
                </div>
                <div className="toast-body">{toastMessage}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositComponent;


