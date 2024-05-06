import React, { useState } from 'react';
import axios from 'axios';
import CustomerSidebar from '../UserComponents/CustomerDashboard'; // Import CustomerSidebar component
import './Transaction.css'; // Import CSS file for styling

const WithdrawComponent = () => {
  // State variables
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionPin, setTransactionPin] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Function to handle the withdraw operation
  const handleWithdraw = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/transactions/withdraw', {
        accountNumber,
        amount,
        transactionPin
      }, {
        headers: {
          authorization: `${token}`
        }
      });
      setAccountNumber('');
    setAmount('');
    setTransactionPin('');
    console.log('Withdraw response:', response.data);
      // Display success toast
      setToastMessage(`${amount} was withdrawn successfully from your account`);
      setShowToast(true);
      setPopupMessage(response.data.popupMessage);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        if (errorMessage === 'Insufficient balance') {
          alert('Insufficient balance. Please try again with a lower amount.');
        } else if (errorMessage === 'Account not found') {
          alert('Account not found. Please double-check your account number.');
        } else {
          console.error(errorMessage);
        }
      } else {
        console.error('An error occurred:', error.message);
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
              <h2>Withdraw</h2>
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
              <button onClick={handleWithdraw}>Withdraw</button>
              {/* Display popup message */}
              {popupMessage && <p>{popupMessage}</p>}
              {/* Toast for success message */}
              <div className={`toast ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="me-auto">Withdraw</strong>
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

export default WithdrawComponent;
