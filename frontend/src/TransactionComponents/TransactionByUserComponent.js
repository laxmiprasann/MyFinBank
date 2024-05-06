import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerSidebar from '../UserComponents/CustomerDashboard'; // Import CustomerSidebar component
import './Transaction.css'; // Import CSS file for styling
import Spinner from 'react-bootstrap/Spinner';

const FetchTransactionsByUser = () => {
  // State variables
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // State for loading status


  // Fetch user transactions on component mount
  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/transactions', {
          headers: {
            authorization: `${token}`
          }
        }); // Update the URL to match your backend endpoint
        setTransactions(response.data.transactions);
        setLoading(false); // Set loading status to false
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false); // Set loading status to false
      }
    };
    fetchUserTransactions();
  }, []);

  // Function to handle search based on transaction ID
  const handleSearch = () => {
    // Filter transactions based on the search term
    const filteredTransactions = transactions.filter(transaction =>
      transaction._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTransactions(filteredTransactions);
  };
  
   // Render loading message while data is being fetched
   if (loading) return <Spinner animation="border" variant="primary" />;



  return (
    <div className='transac'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <CustomerSidebar /> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            <div>
              <h2>Transactions History</h2>
              {error && <p>{error}</p>}
              <div>
                {/* Search input field */}
                <input
                  type="text"
                  placeholder="Search by Transaction ID"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                {/* Search button */}
                <button onClick={handleSearch}>Search</button>
              </div>
              {/* Iterate over transactions and display each in a separate container */}
              {transactions.map(transaction => (
                <div key={transaction._id} className="transaction-container">
                  <h3>{transaction.type}</h3>
                  <p>Transaction ID: {transaction.transactionId}</p>
                  <p>Amount: {transaction.amount}</p>
                  <p>At: {transaction.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchTransactionsByUser;
