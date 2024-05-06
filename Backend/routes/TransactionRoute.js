// routes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../Controllers/TransactionController');


const {authorize} = require('../Middleware/authMiddleware');
router.post('/deposit', transactionController.deposit);
router.post('/withdraw', transactionController.withdraw);
router.post('/fund-transfer', transactionController.fundTransfer);
router.get('/all',authorize('admin'),transactionController.getAllTransactions);
router.get('/',transactionController.getTransactionsByUser);


module.exports = router;
