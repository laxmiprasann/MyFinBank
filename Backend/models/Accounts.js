//accountschema
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        default: uuidv4,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type:String,
        required:true
    },
    balance: {
        type: Number,
        default:0,
        min: 0
    },
    accountType: {
        type: String,
        required: true,
        enum: ['current', 'savings', 'investment']
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    transactionPin: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 6  // adjust the length as needed
    },
    
    // Fields for fixed deposit (FD)
    fixedDepositAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    fixedDepositInterestRate: {
        type: Number, // Interest rate as a percentage
        default: 0,
        min: 0
    },
    fixedDepositDuration: {
        type: Number, // Duration in months
        default: 0,
        min: 0
    },
    fixedDepositMaturity: {
        type: Date, // Maturity date
        default: null
    },
    // Fields for recurring deposit (RD)
    recurringDepositAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    recurringDepositFrequency: {
        type: String, // Frequency (e.g., monthly, quarterly)
        enum: ['monthly', 'quarterly']
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* Add a static method to find the account number by user details
accountSchema.statics.findAccountNumberByUser = async function(userId) {
    const account = await this.findOne({ user: userId });
    return account ? account.accountNumber : null;
};
*/

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;