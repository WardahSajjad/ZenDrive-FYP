const express = require('express');
const router = express.Router();
const {
    login,
    createAccount,
    emailVerification
} = require('../Controllers/userController.js');
const verifyToken = require('../Middlewares/authMidlleware.js');
const loginLimiter= require('../Middlewares/rateLimitMiddleware.js')


router.post('/create', createAccount);
router.post('/login', loginLimiter, login);
router.get('/verify-email/:token', emailVerification);


module.exports = router;  