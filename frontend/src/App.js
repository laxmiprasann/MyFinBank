import './App.css'; // Import CSS file for styling
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import { Routes, Route } from "react-router-dom"; // Import Routes and Route for defining routes
// Importing Dashboard components
import NavBar from './DashboardComponents/NavBar';
import Footer from './DashboardComponents/Footer';
import About from './DashboardComponents/About';
import Home from "./DashboardComponents/Home";
import Features from './DashboardComponents/Features';
import Login from './UserComponents/Login';
import Register from './UserComponents/Register';
import AdminSidebar from './UserComponents/AdimDashboard';
import CustomerDashboard from './UserComponents/CustomerDashboard';
// Importing accounts components
import AccountList from './AccountComponents/AccountList';
import UserAccounts from './AccountComponents/UserAccounts';
import AccountsByType from './AccountComponents/AccountByType';
import CreateAccount from './AccountComponents/CreateAccount';
import FixedDeposit from './AccountComponents/FixedDeposit';
import RecurringDeposit from './AccountComponents/RecurringDeposit';
import UserFDandRD from './AccountComponents/UserFDandRD';
import AllDeposits from './AccountComponents/AllFDandRD';
// Importing transaction components
import DepositComponent from './TransactionComponents/DepositComponent';
import WithdrawComponent from './TransactionComponents/WithdrawComponent';
import FundTransferComponent from './TransactionComponents/FundTransferComponent';
import TransactionListComponent from './TransactionComponents/TransactionListComponent';
import FetchTransactionsByUser from './TransactionComponents/TransactionByUserComponent';
// Importing loan components
import LoanForm from './LoanComponents/LoanForm';
import CalculateEMI from './LoanComponents/CalculateEMI';
import AllLoans from './LoanComponents/AllLoans';

import AdminChatRoom from './ChatComponents/AdminChatRoom';
import CustomerChatRoom from './ChatComponents/CustomerChatRoom';

function App() {
  return (
    <div>
      {/* BrowserRouter to wrap all routes */}
      <BrowserRouter>
        {/* Navbar component */}
        <NavBar/>
        {/* Footer component */}
        <Footer/>
        {/* Define routes using Routes component */}
        <Routes>
          <Route path="/" element={<Home/>}/> {/* Home route */}
          <Route path="/about" element={<About/>}/> {/* About route */}
          <Route path="/features" element={<Features/>}/> {/* Features route */}
          {/* User authentication routes */}
          <Route path="/login" element={<Login/>}/> {/* Login route */}
          <Route path="/register" element={<Register/>}/> {/* Register route */}
          {/* User role-specific routes */}
          <Route path="/adminside" element={<AdminSidebar/>}/> {/* Admin dashboard route */}
          <Route path="/customerside" element={<CustomerDashboard/>}/> {/* Customer dashboard route */}
          {/* Account-related routes */}
          <Route path="/acc" element={<AccountList/>}/> {/* Account list route */}
          <Route path="/useracc" element={<UserAccounts/>}/> {/* User accounts route */}
          <Route path="/acctype" element={<AccountsByType/>}/> {/* Account by type route */}
          <Route path="/create-account" element={<CreateAccount/>}/> {/* Create account route */}
          <Route path="/fixed-deposit" element={<FixedDeposit/>}/> {/* Fixed deposit route */}
          <Route path="/recurring-deposit" element={<RecurringDeposit/>}/> {/* Recurring deposit route */}
          <Route path="/allfdrd" element={<AllDeposits/>}/> {/* All deposits route */}
          <Route path="/fdrd" element={<UserFDandRD/>}/> {/* User FD and RD route */}
          {/* Transaction-related routes */}
          <Route path="/deposit" element={<DepositComponent/>}/> {/* Deposit route */}
          <Route path="/withdraw" element={<WithdrawComponent/>}/> {/* Withdraw route */}
          <Route path="/fund-transfer" element={<FundTransferComponent/>}/> {/* Fund transfer route */}
          <Route path="/transactions" element={<TransactionListComponent/>}/> {/* Transaction list route */}
          <Route path="/transaction" element={<FetchTransactionsByUser/>}/> {/* Transactions by user route */}
          {/* Loan-related routes */}
          <Route path="/loanform" element={<LoanForm/>}/> {/* Loan form route */}
          <Route path="/emi" element={<CalculateEMI/>}/> {/* Calculate EMI route */}
          <Route path="/loans" element={<AllLoans/>}/> {/* All loans route */}

          <Route path="/adminchats" element={<AdminChatRoom/>}/> {/* admin chat room */}
          <Route path="/customerchats" element={<CustomerChatRoom/>}/> {/* customer chat room */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
