// LoanController.js

const LoanService = require('../Services/LoanService');

const calculateLoanEMI = (req, res) => {
    const { amount, interestRate, tenureMonths } = req.body;

    try {
        // Call the calculateEMI function with the loan amount and other parameters
        const emi = LoanService.calculateEMI(amount, interestRate, tenureMonths);

        res.json({ emi });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const applyLoan = async (req, res) => {
    try {
        const { accountNumber } = req.body;
        const { amount, interestRate, tenureMonths } = req.body;
        const emi = LoanService.calculateEMI(amount, interestRate, tenureMonths);

        await LoanService.applyLoan({ accountNumber, amount, interestRate, tenureMonths, emi });
        res.status(201).json({ message: 'Loan application submitted successfully' });
       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserLoans = async (req, res) => {
    try {
        const accountNumber = req.params.accountNumber;
        const loans = await LoanService.getUserLoans(accountNumber);
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateLoanStatus = async (req, res) => {
    try {
        const { id } = req.params; // Extract loanId from URL parameters
        const { newStatus } = req.body;

        if (!id || !newStatus) {
            throw new Error('Missing loanId or newStatus');
        }

        await LoanService.updateLoanStatus(id, newStatus);

        res.json({ message: 'Loan status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllLoans = async (req, res) => {
    try {
        const loans = await LoanService.getAllLoans();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    calculateLoanEMI,
    applyLoan,
    getUserLoans,
    updateLoanStatus,
    getAllLoans
};
