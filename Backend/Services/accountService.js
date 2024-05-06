const Account = require('../models/Accounts');
const User= require('../models/User');


// Service Layer (accountService.js)
const getAllAccounts = async () => {
    try {
        return await Account.find().populate('user');
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllUserAccounts = async (userEmail) => {
    try {
        if (userEmail) {
            const user = await User.findOne({ email: userEmail });
            if (!user) {
                throw new Error("User not found");
            }
            return await Account.find({ user: user._id }).populate('user');
        } else {
            return await Account.find().populate('user');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



const getAccountsByType = async (accountType) => {
    try {
        const accounts = await Account.find({ accountType: accountType });
        return accounts;
    } catch (error) {
        throw new Error('Failed to fetch accounts by type');
    }
};

const createAccount = async (email, accountNumber,name, accountType, balance, transactionPin) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        // Check if the user already has an account of the same type
        const existingAccount = await Account.findOne({ user: user._id, accountType });

        if (existingAccount) {
            throw new Error(`User already has a ${accountType} account`);
        }

        const newAccount = new Account({
            accountNumber,
            accountType,
            name,
            balance, // Include balance when creating the new account
            transactionPin,
            user: user._id
        });

        await newAccount.save();
        // Push the accountNumber to the user's accounts array
        user.accounts.push(newAccount._id);
        await user.save();

        return {
            message: "Account created successfully",
            account: newAccount // Return the created account
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateAccount = async (id, newData) => {
    try {
        const updatedAccount = await Account.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedAccount) {
            throw new Error("Account not found");
        }

        return updatedAccount;
    } catch (error) {
        throw new Error(error.message);
    }
};

const toggleAccountStatus = async (accountId) => {
    try {
        // Fetch the current account
        const account = await Account.findById(accountId);

        if (!account) {
            throw new Error("Account not found");
        }

        // Determine the new status by toggling the current status
        const newStatus = account.status === 'active' ? 'inactive' : 'active';

        // Update the account status
        const updatedAccount = await Account.findByIdAndUpdate(accountId, { status: newStatus }, { new: true });

        if (!updatedAccount) {
            throw new Error("Account not found");
        }

        return newStatus === 'active' ? "Account activated successfully" : "Account deactivated successfully";
    } catch (error) {
        throw new Error(error.message);
    }
};



const performFixedDeposit = async (accountId, amount, interestRate, duration, durationUnit) => {
    try {
        const account = await Account.findById(accountId);

        if (!account) {
            throw new Error("Account not found");
        }

        // Check if the account type is investment
        if (account.accountType !== 'investment') {
            throw new Error("Fixed deposit can only be performed on investment accounts");
        }

        // Validate duration unit
        if (durationUnit !== 'months' && durationUnit !== 'years') {
            throw new Error("Invalid duration unit. Please specify 'months' or 'years'.");
        }

        // Calculate maturity date based on the duration and unit
        const maturityDate = new Date();
        if (durationUnit === 'months') {
            maturityDate.setMonth(maturityDate.getMonth() + duration);
        } else if (durationUnit === 'years') {
            maturityDate.setFullYear(maturityDate.getFullYear() + duration);
        }

        // Additional logic for fixed deposit (FD)
        // Here, we'll just update the account balance and set maturity date for simplicity
        account.balance += amount;
        account.fixedDepositAmount = amount;
        account.fixedDepositInterestRate = interestRate;
        account.fixedDepositDuration = duration;
        account.fixedDepositDurationUnit = durationUnit; // Include duration unit
        account.fixedDepositMaturity = maturityDate;
        await account.save();

        return {
            message: "Fixed deposit successful",
            account
        };
    } catch (error) {
        throw new Error(error.message);
    }
};




const performRecurringDeposit = async (accountId, amount, frequency, duration, durationUnit) => {
    try {
        const account = await Account.findById(accountId);

        if (!account) {
            throw new Error("Account not found");
        }

        // Check if the account type is investment
        if (account.accountType !== 'investment') {
            throw new Error("Recurring deposit can only be performed on investment accounts");
        }

        // Additional logic for recurring deposit (RD)
        // Update the account balance based on the selected frequency
        let multiplier = 1; // Default to monthly
        if (frequency === 'quarterly') {
            multiplier = 3; // Quarterly deposits
        }

        // Calculate the updated balance
        account.balance += amount * multiplier;
        account.recurringDepositAmount = amount;
        account.recurringDepositFrequency = frequency; // Update frequency here
        account.recurringDepositDuration = duration;
        account.recurringDepositDurationUnit = durationUnit; // Include duration unit
        await account.save();

        return {
            message: `Recurring deposit (${frequency}) successful`,
            account
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllFixedDeposits = async () => {
    try {
        return await Account.find({ accountType: 'investment', fixedDepositAmount: { $gt: 0 } }).populate('user');
    } catch (error) {
        throw new Error('Failed to fetch fixed deposits');
    }
};

const getAllRecurringDeposits = async () => {
    try {
        return await Account.find({ accountType: 'investment', recurringDepositAmount: { $gt: 0 } }).populate('user');
    } catch (error) {
        throw new Error('Failed to fetch recurring deposits');
    }
};

const getUserFixedDeposits = async (userEmail) => {
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            throw new Error('User not found');
        }
        return await Account.find({ user: user._id, accountType: 'investment', fixedDepositAmount: { $gt: 0 } }).populate('user');
    } catch (error) {
        throw new Error('Failed to fetch user fixed deposits');
    }
};

const getUserRecurringDeposits = async (userEmail) => {
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            throw new Error('User not found');
        }
        return await Account.find({ user: user._id, accountType: 'investment', recurringDepositAmount: { $gt: 0 } }).populate('user');
    } catch (error) {
        throw new Error('Failed to fetch user recurring deposits');
    }
};

const getUserProfile = async (userEmail) => {
    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            throw new Error('User not found');
        }

        // Exclude sensitive information like password before returning the user profile
        const userProfile = {
            email: user.email,
            FullName: user.fullName,
            Role: user.role,
            // Add other necessary fields
        };

        return userProfile;
    } catch (error) {
        throw new Error('Failed to fetch user profile');
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
