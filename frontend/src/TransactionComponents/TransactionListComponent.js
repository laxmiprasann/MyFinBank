import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../UserComponents/AdimDashboard'; // Import AdminSidebar component
import './Transaction.css'; // Import CSS file for styling
import Spinner from 'react-bootstrap/Spinner';

const TransactionListComponent = () => {
  // State variables
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // State for loading status


  // Fetch all transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/transactions/all', {
          headers: {
            authorization: `${token}`
          }
        });
        setTransactions(response.data.transactions);
        setFilteredTransactions(response.data.transactions);
        setLoading(false); // Set loading status to false
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false); // Set loading status to false
      }
    };
    fetchTransactions();
  }, []);

  // Function to handle search based on transaction ID
  const handleSearch = () => {
    const filtered = transactions.filter(transaction =>
      transaction._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };
  
   // Render loading message while data is being fetched
   if (loading) return <Spinner animation="border" variant="primary" />;



  return (
    <div className='transac'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar /> {/* Display the sidebar */}
          </div>
          <div className="col-md-9">
            <div>
              <h2>All Transactions</h2>
              <div className="search-container">
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
              {/* Iterate over filteredTransactions and display each in a list */}
              <ul>
                {filteredTransactions.map(transaction => (
                  <li key={transaction._id} className="transaction-container">
                    <p>Transaction Id: {transaction.transactionId}</p>
                    <p>Type: {transaction.type}</p>
                    <p>Amount: {transaction.amount}</p>
                    <p>Account:{transaction.sourceAccount}</p>
                    <p>At: {transaction.createdAt}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionListComponent;
