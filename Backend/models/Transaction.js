const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        unique: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdraw', 'fund transfer'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    sourceAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    destinationAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

transactionSchema.pre('save', function(next) {
    if (!this.transactionId) {
        this.transactionId = uuidv4();
    }
    next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
