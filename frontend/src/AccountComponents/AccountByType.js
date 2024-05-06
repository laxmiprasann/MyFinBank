import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Accounts.css'; // Import CSS file for styling
import AdminSidebar from '../UserComponents/AdimDashboard'; // Import AdminSidebar component
import Spinner from 'react-bootstrap/Spinner';

const AccountsByType = () => {
  // Define state variables
  const [accountType, setAccountType] = useState(''); // State for selected account type
  const [accounts, setAccounts] = useState([]); // State for fetched accounts
  const [loading, setLoading] = useState(false); // State for loading status

  useEffect(() => {
    // Fetch accounts when accountType changes
    const fetchAccountsByType = async () => {
      if (!accountType) return; // Skip fetching if accountType is empty

      setLoading(true); // Set loading status to true
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.get(`http://localhost:3000/accounts/type/${accountType}`, {
          headers: {
            authorization: `${token}` // Pass token in authorization header
          }
        });
        setAccounts(response.data); // Update accounts state with fetched data
        setLoading(false); // Set loading status to false
      } catch (error) {
        console.error('Error fetching accounts by type:', error); // Log error if fetching fails
        setLoading(false); // Set loading status to false
      }
    };

    fetchAccountsByType(); // Call fetchAccountsByType function
  }, [accountType]); // Run effect when accountType changes

  // Handle change in selected account type
  const handleAccountTypeChange = async (e) => {
    setAccountType(e.target.value); // Update accountType state with selected value
  };
  
   // Render loading message while data is being fetched
   if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <div className='accounts'>
      <div className="container-fluid"> {/* Container for layout */}
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar /> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            <div className="accounts-by-type">
              <h2>Filter Accounts By Type</h2>
              {/* Dropdown to select account type */}
              <select value={accountType} onChange={handleAccountTypeChange} className="select-account-type">
                <option value="">Select Account Type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="investment">Investment</option>
              </select>
              {/* Loading indicator */}
              {loading && <div>Loading accounts...</div>}
              {/* Display message if no accounts found */}
              {!loading && accounts.length === 0 && <p>No accounts found for this type.</p>}
              {/* Render list of accounts */}
              {!loading && accounts.length > 0 && (
                <div className="account-container">
                  {accounts.map(account => (
                    <div key={account.id} className="account">
                      <p>Account ID:{account._id}</p>
                      <p>Name:{account.name}</p>
                      <p>Account Number: {account.accountNumber}</p>
                      <p>Balance: {account.balance}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsByType;
