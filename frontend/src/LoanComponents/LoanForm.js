import React, { useState } from 'react';
import axios from 'axios';
import CustomerSidebar from '../UserComponents/CustomerDashboard'; // Import CustomerSidebar component

const LoanForm = () => {
  // State to hold loan data, success message, and error message
  const [loanData, setLoanData] = useState({
    accountNumber: '',
    amount: 0,
    interestRate: 0,
    tenureMonths: 0
  });
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Send a POST request to apply for a loan
      const response = await axios.post('http://localhost:3000/loans/apply-loan', loanData, {
        headers: {
          authorization: `${token}`
        }
      }); // Update the URL to match your backend endpoint
      setSuccessMessage('Loan application submitted successfully!'); // Set success message
      setToastMessage(`Loan application of ${loanData.accountNumber}  for ${loanData.amount} proceessed successfully `);
      setShowToast(true);
      setErrorMessage(''); // Clear error message
      console.log(response.data); // Log success response
      setLoanData({
        accountNumber: '',
        amount: 0,
        interestRate: 0,
        tenureMonths: 0
      });
    } catch (error) {
      setErrorMessage('Error applying for loan: ' + error.response.data); // Set error message
      setSuccessMessage(''); // Clear success message
      console.error('Error applying for loan:', error.response.data); // Log error response
    }
  };

  return (
    <div className='loan'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <CustomerSidebar /> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            <div className="loan-form-container">
              <h2>Apply for Loan</h2>
              {/* Loan application form */}
              <form onSubmit={handleSubmit}>
                <label> Account Number:
                  <input type="text" name="accountNumber" value={loanData.accountNumber} onChange={handleChange}/>
                </label>
                <label>Amount:
                  <input type="number" name="amount" value={loanData.amount} onChange={handleChange}/>
                </label>
                <label>Interest Rate:
                  <input type="number" name="interestRate" value={loanData.interestRate} onChange={handleChange}/>
                </label>
                <label>Tenure (Months):
                  <input type="number" name="tenureMonths" value={loanData.tenureMonths} onChange={handleChange}/>
                </label>
                <button type="submit">Apply</button>
              </form>
              {/* Display success and error messages */}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                       {/* Toast notification */}
                       <div className={`toast ${showToast ? 'show' : ''}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div className="toast-header">
                 <strong className="me-auto">Loan Apllication:</strong>
                  <button type="button" className="btn-close" onClick={() => setShowToast(false)} />
                </div>
                <div className="toast-body">{toastMessage}</div>
              </div>
            
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanForm;
