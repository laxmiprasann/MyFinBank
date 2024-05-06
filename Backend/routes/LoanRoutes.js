const express = require('express');
const router = express.Router();
const LoanController = require('../Controllers/LoanController');


const {authorize} = require('../Middleware/authMiddleware');
router.post('/calculate-emi', LoanController.calculateLoanEMI);

// Route for applying for a loan
router.post('/apply-loan', LoanController.applyLoan);

// Route for getting user's loan details
router.get('/user-loans/:accountNumber', LoanController.getUserLoans);

// Route for updating loan status
router.put('/update-status/:id',authorize('admin'), LoanController.updateLoanStatus);

// Route for getting user's loan details
router.get('/',authorize('admin'), LoanController.getAllLoans);


module.exports = router;
