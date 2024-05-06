import React, { useState } from 'react';
import axios from 'axios';
import './Loan.css'; // Import CSS file
import CustomerSidebar from '../UserComponents/CustomerDashboard'; // Import CustomerSidebar component


const CalculateEMI = () => {
  // State to hold loan data and EMI
  const [loanData, setLoanData] = useState({
    amount: '',
    interestRate: '',
    tenureMonths: '',
  });
  const [emi, setEmi] = useState(null); // State to hold calculated EMI
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  // Function to validate form data
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate each field
    if (!loanData.amount) {
      newErrors.amount = 'Amount is required';
      valid = false;
    }
    if (!loanData.interestRate) {
      newErrors.interestRate = 'Interest Rate is required';
      valid = false;
    }
    if (!loanData.tenureMonths) {
      newErrors.tenureMonths = 'Tenure is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Function to calculate EMI
  const handleCalculateEMI = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) return; // Validate form before submitting
      const token = localStorage.getItem('token');
      // Send a POST request to calculate EMI
      const response = await axios.post('http://localhost:3000/loans/calculate-emi', loanData, {
        headers: {
          authorization: `${token}`
        }
      }); // Update the URL to match your backend endpoint
      setEmi(response.data.emi); // Set the calculated EMI in state
      setToastMessage('Emi for the given data is calculated below');
      setShowToast(true);
      setLoanData({
        amount: '',
        interestRate: '',
        tenureMonths: '',
      });
      setErrors('');
    } catch (error) {
      console.error('Error calculating EMI:', error.response.data);
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
            <div className="calculate-emi-container">
              <h2>Calculate EMI</h2>
              {/* Form for loan data */}
              <form onSubmit={handleCalculateEMI} className="needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount:</label>
                  <input type="number" name="amount" value={loanData.amount} onChange={handleChange} className={`form-control ${errors.amount ? 'is-invalid' : ''}`} required />
                  {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="interestRate" className="form-label">Interest Rate:</label>
                  <input type="number" name="interestRate" value={loanData.interestRate} onChange={handleChange} className={`form-control ${errors.interestRate ? 'is-invalid' : ''}`} required />
                  {errors.interestRate && <div className="invalid-feedback">{errors.interestRate}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="tenureMonths" className="form-label">Tenure (Months):</label>
                  <input type="number" name="tenureMonths" value={loanData.tenureMonths} onChange={handleChange} className={`form-control ${errors.tenureMonths ? 'is-invalid' : ''}`} required />
                  {errors.tenureMonths && <div className="invalid-feedback">{errors.tenureMonths}</div>}
                </div>
                {/* Button to calculate EMI */}
                <button type="submit" className="btn btn-primary">Calculate EMI</button>
              </form>
              {/* Display calculated EMI if available */}
              {emi && <p className="emi-text">EMI: {emi}</p>}
               {/* Toast notification */}
               <div className={`toast ${showToast ? 'show' : ''}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div className="toast-header">
                 <strong className="me-auto">EMI</strong>
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

export default CalculateEMI;
