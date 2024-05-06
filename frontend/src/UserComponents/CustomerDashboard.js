// Sidebar.js

import React from 'react';

const CustomerSidebar = () => {
    return (
        <div className="sidebar">
            <div className="d-flex flex-column p-3 text-white bg-dark">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Customer Panel</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                        <a href="/login" className="nav-link active" aria-current="page">
                          LOGOUT
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/useracc" className="nav-link" aria-current="page">
                           My Accounts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/create-account" className="nav-link">
                           Create New Account
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/fdrd" className="nav-link">
                             Fixed Deposit And Recurring Deposit
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/emi" className="nav-link">
                           Calculate EMI
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/loanform" className="nav-link">
                         Apply Loan
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href='/deposit' className="nav-link">
                           Deposit Money
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href='/withdraw' className="nav-link">
                          Withdraw Money
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href='/fund-transfer' className="nav-link">
                          Transfer Money
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href='/transaction' className="nav-link">
                          Transaction History
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/customerchats" className="nav-link">
                          Support chat
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CustomerSidebar;
