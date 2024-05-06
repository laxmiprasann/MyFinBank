import React, { useState } from 'react';
import axios from 'axios';
import CustomerSidebar from '../UserComponents/CustomerDashboard'; // Import CustomerSidebar component

const FundTransferComponent = () => {
  // State variables
  const [sourceAccountNumber, setSourceAccountNumber] = useState('');
  const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionPin, setTransactionPin] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Function to handle fund transfer
  const handleFundTransfer = async () => {
    try {
      console.log('Handling fund transfer...');
      console.log('Source Account Number:', sourceAccountNumber);
      console.log('Destination Account Number:', destinationAccountNumber);
      console.log('Amount:', amount);
      console.log('Transaction PIN:', transactionPin);

      const token = localStorage.getItem('token');
      console.log('Token:', token);
      // Send a POST request to fund transfer
      const response = await axios.post('http://localhost:3000/transactions/fund-transfer', {
        sourceAccountNumber,
        destinationAccountNumber,
        amount,
        transactionPin
      }, {
        headers: {
          authorization: `${token}`
        }
      });
    setSourceAccountNumber('');
     setDestinationAccountNumber('');
      setAmount('');
      setTransactionPin('');
      console.log('Fund transfer response:', response.data);
      // Set toast message and show toast
      setToastMessage(`${amount} was Transferred successfully from your account`);
      setShowToast(true);
      // Set popup message from response
      setPopupMessage(response.data.popupMessage);
    } catch (error) {
      const errorMessage = error.response.data.error;
      console.error('Fund transfer error:', error);
      if (error.response && error.response.data && error.response.data.error === 'Technical issue occurred during fund transfer. Amount credited back to source account.') {
        // Show alert for technical issue
        alert('Technical issue occurred during fund transfer. Amount credited back to source account.');
      } else if (errorMessage === 'Insufficient balance') {
        // Show alert for insufficient balance
        alert('Insufficient balance. Please try again with a lower amount.');
      } else if (errorMessage === 'Source or destination account not found') {
        // Show alert for account not found
        alert('Account not found. Please double-check your account number.');
      } else {
        // Set popup message for other errors
        setPopupMessage('Error occurred during fund transfer. Please try again later.');
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
              <h2>Fund Transfer</h2>
              {/* Form for fund transfer */}
              <div className="form-group">
                <label htmlFor="sourceAccountNumber">Source Account Number:</label>
                <input type="text" id="sourceAccountNumber" value={sourceAccountNumber} onChange={e => setSourceAccountNumber(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="destinationAccountNumber">Destination Account Number:</label>
                <input type="text" id="destinationAccountNumber" value={destinationAccountNumber} onChange={e => setDestinationAccountNumber(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="transactionPin">Transaction PIN:</label>
                <input type="password" id="transactionPin" value={transactionPin} onChange={e => setTransactionPin(e.target.value)} />
              </div>
              {/* Button for fund transfer */}
              <button onClick={handleFundTransfer}>Transfer</button>
              {/* Display popup message */}
              {popupMessage && <p>{popupMessage}</p>}
              {/* Toast notification */}
              <div className={`toast ${showToast ? 'show' : ''}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div className="toast-header">
                  <strong className="me-auto">Transfer</strong>
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

export default FundTransferComponent;
