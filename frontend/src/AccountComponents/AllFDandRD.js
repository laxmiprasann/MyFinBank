import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../UserComponents/AdimDashboard'; // Import AdminSidebar component
import './Accounts.css'; // Import CSS file for styling
import Spinner from 'react-bootstrap/Spinner';

const AllDeposits = () => {
  // Define state variables for fixed and recurring deposits
  const [allFixedDeposits, setAllFixedDeposits] = useState([]);
  const [allRecurringDeposits, setAllRecurringDeposits] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading status

  // Fetch all fixed and recurring deposits when component mounts
  useEffect(() => {
    fetchAllFixedDeposits();
    fetchAllRecurringDeposits();
  }, []);

  // Function to fetch all fixed deposits
  const fetchAllFixedDeposits = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get('http://localhost:3000/accounts/FD/all', {
        headers: {
          authorization: `${token}`
        }
      });
      // Set fetched fixed deposits
      setAllFixedDeposits(response.data);
      setLoading(false); // Set loading status to false
    } catch (error) {
      console.error('Error fetching all fixed deposits:', error);
      setLoading(false); // Set loading status to false
    }
  };

  // Function to fetch all recurring deposits
  const fetchAllRecurringDeposits = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get('http://localhost:3000/accounts/RD/all', {
        headers: {
          authorization: `${token}`
        }
      });
      // Set fetched recurring deposits
      setAllRecurringDeposits(response.data);
      setLoading(false); // Set loading status to false
    } catch (error) {
      console.error('Error fetching all recurring deposits:', error);
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
            <AdminSidebar /> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            <div>
              {/* Render all fixed deposits */}
              <h2>All Fixed Deposits</h2>
              {allFixedDeposits.map((deposit, index) => (
                <div key={index} className="deposit-container">
                  <p>Account Number: {deposit.accountNumber}</p>
                  <p>Name:{deposit.name}</p>
                  <p>Fixed Deposit: {deposit.fixedDepositAmount}</p>
                  <p>Duration: {deposit.fixedDepositDuration}</p>
                  <p>Interest: {deposit.fixedDepositInterestRate}</p>
                  <p>Maturity: {deposit.fixedDepositMaturity}</p>
                </div>
              ))}

              {/* Render all recurring deposits */}
              <h2>All Recurring Deposits</h2>
              {allRecurringDeposits.map((deposit, index) => (
                <div key={index} className="deposit-container">
                  <p>Account Number: {deposit.accountNumber}</p>
                  <p>Name:{deposit.name}</p>
                  <p>Recurring Deposit Amount: {deposit.recurringDepositAmount}</p>
                  <p>Frequency: {deposit.recurringDepositFrequency}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDeposits;
