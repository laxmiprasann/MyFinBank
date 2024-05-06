import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Accounts.css';
import CustomerSidebar from '../UserComponents/CustomerDashboard';
import Spinner from 'react-bootstrap/Spinner';

const UserAccounts = () => {
  // Define state variables
  const [userAccounts, setUserAccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountLoans, setAccountLoans] = useState([]);

  // Fetch user accounts from the server
  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.get('http://localhost:3000/accounts', {
          headers: {
            authorization: `${token}` // Pass token in authorization header
          }
        });
        setUserAccounts(response.data); // Update state with fetched user accounts
        setLoading(false); // Set loading state to false
      } catch (error) {
        console.error('Error fetching user accounts:', error);
        setLoading(false); // Set loading state to false even in case of error
      }
    };

    fetchUserAccounts(); // Call fetchUserAccounts function on component mount
  }, []);

  // Fetch loans for selected account
  const fetchAccountLoans = async (accountNumber) => {
    console.log('Fetching loans for account:', accountNumber);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/loans/user-loans/${accountNumber}`, {
        headers: {
          authorization: `${token}`
        }
      });
      console.log('Loans data:', response.data);
      setAccountLoans(response.data);
    } catch (error) {
      console.error('Error fetching account loans:', error);
      setErrorMessage('Error fetching account loans');
    }
  };

  // Handle view loans button click
  const handleViewLoans = async (accountNumber) => {
    console.log('View Loans button clicked for account:', accountNumber);
    setSelectedAccount(accountNumber);
    await fetchAccountLoans(accountNumber);
  };

  // Handle close loans view
  const handleCloseLoans = () => {
    setSelectedAccount(null);
    setAccountLoans([]);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter user accounts based on search term
  const filteredAccounts = userAccounts.filter(account =>
    account.accountNumber.includes(searchTerm)
  );

  // Handle logout action
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/logout');
      // Remove the token from localStorage and redirect to login page
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
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
            <CustomerSidebar /> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            {/* Logout button */}
            <button onClick={() => handleLogout()}>Logout</button>
            <h2>User Accounts</h2>
            {/* Search input */}
            <div className="search-container">
              <input type="text" placeholder="Search by Account Number" value={searchTerm} onChange={handleSearchChange} className="search-input" />
            </div>
            {/* Display user accounts */}
            <div className="account-container">
              {filteredAccounts.map(account => (
                <div key={account.id} className="account">
                  <h3>{account.accountType}</h3>
                  <p>Account ID: {account._id}</p>
                  <p>Name: {account.name}</p>
                  <p>Account Number: {account.accountNumber}</p>
                  <p>Balance: {account.balance}</p>
                  <p>Status: {account.status}</p>
                  <button onClick={() => handleViewLoans(account.accountNumber)}>View Loans</button>
                  {selectedAccount === account.accountNumber && (
        <div className="loan-containers">
          {accountLoans.length === 0 ? (
            <p>No loans found</p>
          ) : (
            <>
              <p>MY LOANs:</p>
              {accountLoans.map(loan => (
                <div key={loan._id} className="loans">
                  <p>Amount: {loan.amount}</p>
                  <p>Interest Rate: {loan.interestRate}</p>
                  <p>Tenure (Months): {loan.tenureMonths}</p>
                  <p>EMI: {loan.emi}</p>
                  <p>Status: {loan.status}</p>
                </div>
              ))}
            </>
             )}
             <button onClick={handleCloseLoans}>Close</button>
             </div>
              )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccounts;
