// Loan.js

const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    tenureMonths: {
        type: Number,
        required: true
    },
    emi: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    approvedAt: {
        type: Date
    }
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;

