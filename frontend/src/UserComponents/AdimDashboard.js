// Sidebar.js

import React from 'react';

const AdminSidebar = () => {
    return (
        <div className="sidebar">
            <div className="d-flex flex-column p-3 text-white bg-dark">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Admin Panel</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                        <a href="/login" className="nav-link active" aria-current="page">
                          LOGOUT
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/acc" className="nav-link " aria-current="page">
                            Accounts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/acctype" className="nav-link">
                            AccountsByType
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/fixed-deposit" className="nav-link">
                            Fixed Deposit
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/recurring-deposit" className="nav-link">
                          Reccuring Deposit
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/allfdrd" className="nav-link">
                            All Deposits
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/transactions" className="nav-link">
                            All Transactions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/loans" className="nav-link">
                            All Loans
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/adminchats" className="nav-link">
                         Support Chat
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;
