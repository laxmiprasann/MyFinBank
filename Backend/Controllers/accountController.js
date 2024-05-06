const accountService = require('../Services/accountService');

// Controller Layer (accountController.js)

const getAllAccounts = async (req, res) => {
    try {
        console.log(req);
        const accounts = await accountService.getAllAccounts();
        
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch accounts', error: error.message });
    }
};

const getAccountsByType = async (req, res) => {
    const accountType = req.params.accountType;

    try {
        const accounts = await accountService.getAccountsByType(accountType);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch accounts by type', error: error.message });
    }
};


const getAllUserAccounts = async (req, res) => {
    try {
        let userEmail = null;
        if (!req.isAdmin) {
            userEmail = req.user.email;
        }
        const accounts = await accountService.getAllUserAccounts(userEmail);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch accounts', error: error.message });
    }
};


const createAccount = async (req, res) => {
    const { accountNumber, accountType,name, balance,transactionPin} = req.body;
    const email = req.user.email; 
    try {
        const { message, account } = await accountService.createAccount(email, accountNumber,name, accountType, balance,transactionPin);
        res.status(201).json({ message, account });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        const newData = req.body;

        const updatedAccount = await accountService.updateAccount(accountId, newData);

        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const toggleAccountStatus = async (req, res) => {
    const accountId = req.params.id;
    const isActive = req.body.isActive;
    try {
        const result = await accountService.toggleAccountStatus(accountId, isActive);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const performFixedDeposit = async (req, res) => {
    const { accountId, amount, interestRate, durationValue, durationUnit } = req.body;

    try {
        const result = await accountService.performFixedDeposit(accountId, amount, interestRate, durationValue, durationUnit);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Invalid duration unit. Please specify 'months' or 'years'.") {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};



const performRecurringDeposit = async (req, res) => {
    const { accountId, amount, frequency, duration, durationUnit } = req.body;

    try {
        const result = await accountService.performRecurringDeposit(accountId, amount, frequency, duration, durationUnit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllFixedDeposits = async (req, res) => {
    try {
        const fixedDeposits = await accountService.getAllFixedDeposits();
        res.json(fixedDeposits);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch fixed deposits', error: error.message });
    }
};

const getAllRecurringDeposits = async (req, res) => {
    try {
        const recurringDeposits = await accountService.getAllRecurringDeposits();
        res.json(recurringDeposits);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recurring deposits', error: error.message });
    }
};

const getUserFixedDeposits = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const userFixedDeposits = await accountService.getUserFixedDeposits(userEmail);
        res.json(userFixedDeposits);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user fixed deposits', error: error.message });
    }
};

const getUserRecurringDeposits = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const userRecurringDeposits = await accountService.getUserRecurringDeposits(userEmail);
        res.json(userRecurringDeposits);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user recurring deposits', error: error.message });
    }
};

// Function to get user profile
const getUserProfile = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const userProfile = await accountService.getUserProfile(userEmail);
        res.json(userProfile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
    }
};

module.exports = {
    getAllAccounts,
    getAllUserAccounts,
    getAccountsByType,
    createAccount,
    updateAccount,
    toggleAccountStatus,
    performFixedDeposit,
    performRecurringDeposit,
    getAllFixedDeposits,
    getAllRecurringDeposits,
    getUserFixedDeposits,
    getUserRecurringDeposits,
    getUserProfile
};
