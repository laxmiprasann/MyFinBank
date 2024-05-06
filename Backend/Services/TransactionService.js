const Transaction = require('../models/Transaction');
const Account = require('../models/Accounts');
const User = require('../models/User');

async function canPerformTransaction(accountNumber) {
    const account = await Account.findOne({ accountNumber });
    if (!account) {
        throw new Error('Account not found');
    }
    if (account.accountType === 'investment') {
        throw new Error('Transactions are not allowed for investment accounts');
    }
    if (account.status !== 'active') {
        throw new Error('Account is inactive. Please visit the bank for further details.');
    }
    return true;
}

async function handleTechnicalIssue(sourceAccountNumber, amount) {
    const sourceAccount = await Account.findOne({ accountNumber: sourceAccountNumber });
    if (!sourceAccount) {
        throw new Error('Source account not found');
    }
    sourceAccount.balance += amount;
    await sourceAccount.save();
}

async function deposit(accountNumber, amount, transactionPin) {
    const account = await Account.findOne({ accountNumber });
    if (!account) {
        throw new Error('Account not found');
    }
    console.log('Provided PIN:', transactionPin);
    console.log('Stored PIN:', account.transactionPin);
    if (account.transactionPin !== transactionPin) {
        throw new Error('Invalid transaction PIN');
    }
    account.balance += amount;
    await account.save();

    const transaction = new Transaction({
        type: 'deposit',
        amount,
        sourceAccount: account._id
    });
    await transaction.save();

    const popupMessage = `${amount} was deposited to your account.`;

    return { Balance: account.balance, message: 'Deposit Successful', transaction, popupMessage };
}



async function withdraw(accountNumber, amount, transactionPin) {
    await canPerformTransaction(accountNumber);
    const account = await Account.findOne({ accountNumber });
    if (!account) {
        throw new Error('Account not found');
    }
    if (account.transactionPin !== transactionPin) {
        throw new Error('Invalid transaction PIN');
    }
    if (account.balance < amount) {
        throw new Error('Insufficient balance');
    }
    account.balance -= amount;
    await account.save();

    const transaction = new Transaction({
        type: 'withdraw',
        amount,
        sourceAccount: account._id
    });
    await transaction.save();

    const popupMessage = `${amount} was withdrawn from your account.`;

    return { Balance: account.balance, message: 'Withdraw Successful', transaction, popupMessage };
}


async function fundTransfer(sourceAccountNumber, destinationAccountNumber, amount, transactionPin) {
    try {
        // Find the source and destination accounts
        const sourceAccount = await Account.findOne({ accountNumber: sourceAccountNumber });
        const destinationAccount = await Account.findOne({ accountNumber: destinationAccountNumber });

        // Check if source and destination accounts exist
        if (!sourceAccount || !destinationAccount) {
            throw new Error('Source or destination account not found');
        }

        // Check if the transaction pin matches the source account
        if (sourceAccount.transactionPin !== transactionPin) {
            throw new Error('Invalid transaction PIN');
        }

        // Convert amount to a number (assuming it's a string from the frontend)
        amount = parseFloat(amount);

        // Check if the source account has enough balance
        if (sourceAccount.balance < amount) {
            throw new Error('Insufficient balance');
        }

        // Deduct the amount from the source account and add it to the destination account
        sourceAccount.balance -= amount;
        destinationAccount.balance += amount;

        // Save changes to both accounts
        await sourceAccount.save();
        await destinationAccount.save();

        // Create a new transaction record
        const transaction = new Transaction({
            type: 'fund transfer',
            amount,
            sourceAccount: sourceAccount._id,
            destinationAccount: destinationAccount._id
        });
        await transaction.save();

        // Prepare popup messages for both source and destination accounts
        const  popupMessage = `${amount} was transferred from your account to destination account.`;
    

        return {
            sourceBalance: sourceAccount.balance,
            message: 'Fund Transfer Successful',
            transaction,
            popupMessage
        };
    } catch (error) {
        // Handle any errors that occur during the fund transfer process
        await handleTechnicalIssue(sourceAccountNumber, amount);
        throw new Error('Technical issue occurred during fund transfer. Amount credited back to source account.');
    }
}

async function getAllTransactions() {
    try {
        const transactions = await Transaction.find();
        return transactions;
    } catch (error) {
        throw new Error('Error retrieving transactions');
    }
}


async function getTransactionsByUser(userEmail) {
    try {
        const user = await User.findOne({ email: userEmail }).populate('accounts');
        if (!user) {
            throw new Error('User not found');
        }
        const accountIds = user.accounts.map(account => account._id);
        const transactions = await Transaction.find({ sourceAccount: { $in: accountIds } }).populate('sourceAccount').populate('destinationAccount');
        return transactions;
    } catch (error) {
        throw new Error('Error retrieving user transactions: ' + error.message);
    }
}

module.exports = {
    deposit,
    withdraw,
    fundTransfer,
    getAllTransactions,
    getTransactionsByUser,
    canPerformTransaction
};
