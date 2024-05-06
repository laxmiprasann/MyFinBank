import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../UserComponents/AdimDashboard';
import './Loan.css';
import Spinner from 'react-bootstrap/Spinner';


const AllLoans = ({ accountNumber }) => {
  // State variables
  const [allLoans, setAllLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [updateError, setUpdateError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // State for loading status

  // Fetch all loans from the server
  useEffect(() => {
    const fetchAllLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/loans`, {
          headers: {
            authorization: `${token}`
          }
        });
        setAllLoans(response.data);
        setLoading(false); // Set loading status to false
      } catch (error) {
        console.error('Error fetching all loans:', error.response.data);
        setLoading(false); // Set loading status to false
      }
    };

    fetchAllLoans();
  }, [accountNumber]); // Execute when accountNumber changes

  // Filter loans based on searchTerm
  useEffect(() => {
    const filtered = allLoans.filter(loan =>
      loan._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLoans(filtered);
  }, [searchTerm, allLoans]); // Execute when searchTerm or allLoans changes

  // Handle status change for a loan
  const handleStatusChange = async (loanId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/loans/update-status/${loanId}`, { newStatus }, {
        headers: {
          authorization: `${token}`
        }
      });
      // Update loan status locally
      const updatedLoans = allLoans.map(loan => {
        if (loan._id === loanId) {
          return { ...loan, status: newStatus };
        }
        return loan;
      });
      setAllLoans(updatedLoans);
      setNewStatus('');
      setUpdateError(null);
    } catch (error) {
      setUpdateError(error.response.data.error);
    }
  };
   
     // Render loading message while data is being fetched
   if (loading) return <Spinner animation="border" variant="primary" />;


  // Render UI
  return (
    <div className='loan'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <div>
              <h2>Your Loans</h2>
              <input
                type="text"
                placeholder="Search by Loan ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredLoans.map((loan) => (
                <div key={loan._id} className="loan-container">
                  <p>LOAN ID: {loan._id}</p>
                  <p>Amount: {loan.amount}</p>
                  <p>EMI: {loan.emi}</p>
                  <p>Status: {loan.status}</p>
                  <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button onClick={() => handleStatusChange(loan._id)}>Update Status</button>
                  {updateError && <p style={{ color: 'red' }}>{updateError}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLoans;
