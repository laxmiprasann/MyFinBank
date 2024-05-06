import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerSidebar from '../UserComponents/CustomerDashboard';
import Spinner from 'react-bootstrap/Spinner';


const UserFDandRD = () => {
  // Define state variables
  const [userFixedDeposits, setUserFixedDeposits] = useState([]);
  const [userRecurringDeposits, setUserRecurringDeposits] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading status

  // Fetch user fixed deposits and recurring deposits from the server
  useEffect(() => {
    fetchUserFixedDeposits();
    fetchUserRecurringDeposits();
  }, []);

  // Fetch user fixed deposits from the server
  const fetchUserFixedDeposits = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get('http://localhost:3000/accounts/FD/user', {
        headers: {
          authorization: `${token}` // Pass token in authorization header
        }
      });
      setUserFixedDeposits(response.data); // Update state with fetched user fixed deposits
      setLoading(false); // Set loading status to false
    } catch (error) {
      console.error('Error fetching user fixed deposits:', error);
      setLoading(false); // Set loading status to false
    }
  };

  // Fetch user recurring deposits from the server
  const fetchUserRecurringDeposits = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get('http://localhost:3000/accounts/RD/user', {
        headers: {
          authorization: `${token}` // Pass token in authorization header
        }
      });
      setUserRecurringDeposits(response.data); // Update state with fetched user recurring deposits
      setLoading(false); // Set loading status to false
    } catch (error) {
      console.error('Error fetching user recurring deposits:', error);
      setLoading(false); // Set loading status to false
    }
  };

   // Render loading message while data is being fetched
   if (loading) return <Spinner animation="border" variant="primary" />;


  // Render UI
  return (
    <div className='accounts'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <CustomerSidebar />
          </div>
          <div className="col-md-9">
            <div>
              {/* Display user fixed deposits */}
              <h2>User Fixed Deposits</h2>
              <ul>
                {userFixedDeposits.map((deposit, index) => (
                  <div key={index} className="deposit-container">
                    <li>
                      <p>Account Number: {deposit.accountNumber}</p>
                      <p>Name:{deposit.name}</p>
                      <p>Fixed Deposit:{deposit.fixedDepositAmount}</p>
                      <p>Duration: {deposit.fixedDepositDuration}</p>
                      <p>Interest: {deposit.fixedDepositInterestRate}</p>
                      <p>Maturity: {deposit.fixedDepositMaturity}</p>
                    </li>
                  </div>
                ))}
              </ul>

              {/* Display user recurring deposits */}
              <h2>User Recurring Deposits</h2>
              <ul>
                {userRecurringDeposits.map((deposit, index) => (
                  <div key={index} className="deposit-container">
                    <li>
                      <p>Account Number: {deposit.accountNumber}</p>
                      <p>Name:{deposit.name}</p>
                      <p>Recurring Deposit Amount: {deposit.recurringDepositAmount}</p>
                      <p>Frequency: {deposit.recurringDepositFrequency}</p>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFDandRD;
