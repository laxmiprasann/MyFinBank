import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Accounts.css'; // Import CSS file for styling
import AdminSidebar from '../UserComponents/AdimDashboard'; // Import AdminSidebar component
import Spinner from 'react-bootstrap/Spinner';

const AccountList = () => {
  // Define state variables
  const [accounts, setAccounts] = useState([]); // State for fetched accounts
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message details
  const [selectedAccount, setSelectedAccount] = useState(null); // State for selected account
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [updateFormData, setUpdateFormData] = useState({ // State for update form data
    balance: '',
    accountType: '',
    transactionPin: ''
  });
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Function to fetch accounts from the server
  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get('http://localhost:3000/accounts/all', {
        headers: {
          authorization: `${token}`
        }
      });
      let filteredAccounts = response.data;
      // Filter accounts based on search query
      if (searchQuery) {
        filteredAccounts = filteredAccounts.filter(account =>
          account.accountNumber.includes(searchQuery)
        );
      }
      // Set fetched accounts and update loading status
      setAccounts(filteredAccounts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setError(error.response ? error.response.data.message : 'Unknown error occurred');
      setLoading(false);
    }
  };

  
  //  Email sending functionality
  const sendEmail = async (subject, message) => {
   
    const serviceId = "service_r3z83oj";
    const templateId = "template_we7us6m";
    const publicKey = "5O9FR1zIz6wKdkMlb";
    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: "MyFinBank",
        to_name: "Admin",
        subject: subject,
        message: message,
      }
    };
    try {
      console.log("before post method");
      const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
      console.log("after post method");
      if (response.status !== 200) {
        console.log("post not working");
      }
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    fetchAccounts();
    const accountsWithZeroBalance = accounts.filter(account => account.balance === 0);
    accountsWithZeroBalance.forEach(account => {
      const message = `AccountNumber: ${account.accountNumber},
      AccountHolderName: ${account.name},
      AccountType: ${account.accountType},
      AccountStatus: ${account.status}`;
      sendEmail('Account Balance Alert', message);
    });
  }, []);

  
  // Effect to fetch accounts when searchQuery changes
  useEffect(() => {
    fetchAccounts();
  }, [searchQuery]);

  // Function to handle opening the update form for an account
  const handleUpdateFormOpen = (account) => {
    setSelectedAccount(account);
    // Populate the update form with the selected account's data
    setUpdateFormData({
      balance: account.balance.toString(),
      accountType: account.accountType,
      transactionPin: account.transactionPin.toString()
    });
  };

  // Function to handle closing the update form
  const handleUpdateFormClose = () => {
    setSelectedAccount(null);
    // Reset update form data
    setUpdateFormData({ balance: '', accountType: '', transactionPin: '' });
  };

  // Function to handle input change in the update form
  const handleInputChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  // Function to handle updating an account
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.put(
        `http://localhost:3000/accounts/${selectedAccount._id}`,
        {
          balance: parseFloat(updateFormData.balance),
          accountType: updateFormData.accountType,
          transactionPin: parseInt(updateFormData.transactionPin)
        },
        {
          headers: {
            authorization: `${token}`
          }
        }
      );
      console.log('Account updated successfully:', response.data);
      setToastMessage('Account Updated Sucessfully');
      setShowToast(true);
      // Update the UI to reflect the changes
      const updatedAccount = response.data;
      const updatedAccounts = accounts.map((account) => {
        if (account._id === updatedAccount._id) {
          return updatedAccount;
        }
        return account;
      });
      setAccounts(updatedAccounts);
      handleUpdateFormClose(); // Close the update form
    } catch (error) {
      console.error('Error updating account:', error);
      setError(error.response ? error.response.data.message : 'Unknown error occurred');
    }
  };

  // Function to handle toggling the status of an account
  const handleToggleStatus = async (accountId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.put(
        `http://localhost:3000/accounts/status/${accountId}`,
        {},
        {
          headers: {
            authorization: `${token}`
          }
        }
      );
      console.log(response.data.message);
      setToastMessage('Status of the account changed sucessfully');
      setShowToast(true);
      // Reload accounts after toggling status
      fetchAccounts();
    } catch (error) {
      console.error('Error toggling account status:', error);
      setError(error.response ? error.response.data.message : 'Unknown error occurred');
    }
  };
  // Function to handle input change in the search input field
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Function to handle logout
  const handleLogout = async() => {
    try {
      // Send logout request
      const response = await axios.post('http://localhost:3000/auth/logout');
      // Redirect to login page after successful logout
      window.location.href = '/login';
    }
    catch (error) {
      // Handle error in case of failure
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  }; 

  // Render loading message while data is being fetched
  if (loading) return <Spinner animation="border" variant="primary" />;

  // Render error message if an error occurs
  if (error) return <p>Error: {error}</p>;

  // Render the UI
  return (
    <div className='accounts'>
      <div className="container-fluid"> {/* Adjust the class based on your layout */}
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar/> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            <div>
              <button onClick={() => handleLogout()}>Logout</button>
              {selectedAccount && (
                <div className="update-form">
                  <h3>Update Account</h3>
                  <form onSubmit={handleUpdate}>
                    <label htmlFor="accountType">New Account Type:</label>
                    <input
                      type="text"
                      name="accountType"
                      value={updateFormData.accountType}
                      placeholder="New Account Type"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="transactionPin">New Transaction Pin:</label>
                    <input
                      type="text"
                      name="transactionPin"
                      value={updateFormData.transactionPin}
                      placeholder="New Transaction Pin"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="balance">New Balance:</label>
                    <input
                      type="number"
                      name="balance"
                      value={updateFormData.balance}
                      placeholder="New Balance"
                      onChange={handleInputChange}
                    />
                    <button type="submit">Update</button>
                    <span style={{ marginRight: '10px' }}></span>
                    <button type="button" onClick={handleUpdateFormClose}>
                      Cancel
                    </button>
                  </form>
                </div>
              )}
              <h2>Accounts</h2>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by Account Number"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="account-container">
                {/* Render each account */}
                {accounts.map((account) => (
                  <div key={account._id} className="account">
                    <h3>{account.accountType}</h3>
                    <p>Account ID: {account._id}</p>
                    <p>Account Number: {account.accountNumber}</p>
                    <p>Name: {account.name}</p>
                    <p>Balance: {account.balance}</p>
                    <p>Status: {account.status}</p>
                    {/* Button to open update form */}
                    <button onClick={() => handleUpdateFormOpen(account)}>Update</button>
                    <span style={{ marginRight: '10px' }}></span>
                    {/* Button to toggle account status */}
                    <button onClick={() => handleToggleStatus(account._id)}>
                      {account.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                      {/* Toast notification */}
              <div className={`toast ${showToast ? 'show' : ''}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div className="toast-header">
                 <strong className="me-auto">Status</strong>
                  <button type="button" className="btn-close" onClick={() => setShowToast(false)} />
                </div>
                <div className="toast-body">{toastMessage}</div>
              </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountList;


