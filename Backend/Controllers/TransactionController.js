const transactionService = require('../Services/TransactionService');
const User = require('../models/User');
const { authenticate } = require('../Middleware/authMiddleware');

async function deposit(req, res) {
    const { accountNumber, amount, transactionPin } = req.body;
    const currentUserEmail = req.user.email;

    try {
        const currentUser = await User.findOne({ email: currentUserEmail }).populate('accounts');

        const account = currentUser.accounts.find(acc => acc.accountNumber === accountNumber);
        if (!account) {
            throw new Error('Account not found or does not belong to the current user');
        }

        const canTransact = await transactionService.canPerformTransaction(accountNumber);
        if (!canTransact) {
            throw new Error('Cannot perform transaction');
        }

        const Deposit = await transactionService.deposit(accountNumber, amount, transactionPin);
        res.json({ Deposit, popupMessage: Deposit.popupMessage });
       
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function withdraw(req, res) {
    const { accountNumber, amount, transactionPin } = req.body;
    const currentUserEmail = req.user.email;

    try {
        const currentUser = await User.findOne({ email: currentUserEmail }).populate('accounts');

        const account = currentUser.accounts.find(acc => acc.accountNumber === accountNumber);
        if (!account) {
            throw new Error('Account not found or does not belong to the current user');
        }

        const canTransact = await transactionService.canPerformTransaction(accountNumber);
        if (!canTransact) {
            throw new Error('Cannot perform transaction');
        }

        const Withdraw = await transactionService.withdraw(accountNumber, amount, transactionPin);
        res.json({ Withdraw, popupMessage: Withdraw.popupMessage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function fundTransfer(req, res) {
    const { sourceAccountNumber, destinationAccountNumber, amount, transactionPin } = req.body;
    const currentUserEmail = req.user.email;

    try {
        const currentUser = await User.findOne({ email: currentUserEmail }).populate('accounts');

        const sourceAccount = currentUser.accounts.find(acc => acc.accountNumber === sourceAccountNumber);
        if (!sourceAccount) {
            throw new Error('Source account not found or does not belong to the current user');
        }

        const canTransact = await transactionService.canPerformTransaction(sourceAccountNumber);
        if (!canTransact) {
            throw new Error('Cannot perform transaction');
        }

        const FundTransfer = await transactionService.fundTransfer(sourceAccountNumber, destinationAccountNumber, amount, transactionPin);
        res.json({ FundTransfer, popupMessage: FundTransfer.popupMessage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllTransactions(req, res) {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.json({ transactions });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getTransactionsByUser(req, res) {
    const currentUserEmail = req.user.email;
    try {
        const transactions = await transactionService.getTransactionsByUser(currentUserEmail);
        res.json({ transactions });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    deposit,
    withdraw,
    fundTransfer,
    getAllTransactions,
    getTransactionsByUser,
    
};
