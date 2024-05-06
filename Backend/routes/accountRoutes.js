const express = require('express');
const router = express.Router();

const{
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
}=require('../Controllers/accountController');

const {authorize} = require('../Middleware/authMiddleware');
router.get('/all', authorize('admin'), getAllAccounts);
router.get('/', getAllUserAccounts);
router.get('/type/:accountType',authorize('admin'),getAccountsByType);
router.post('/', createAccount);
router.put('/:id',authorize('admin'), updateAccount);
router.put('/status/:id',authorize('admin'),toggleAccountStatus);
router.post('/FD',authorize('admin'), performFixedDeposit);
router.post('/RD',authorize('admin'), performRecurringDeposit);
router.get('/FD/all', authorize('admin'), getAllFixedDeposits);
router.get('/RD/all', authorize('admin'), getAllRecurringDeposits);
router.get('/FD/user', getUserFixedDeposits);
router.get('/RD/user', getUserRecurringDeposits);
router.get('/profile', getUserProfile);

module.exports = router;
