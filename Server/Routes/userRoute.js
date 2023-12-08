const express = require('express');
const router = express.Router();
const {
    login,
    createAccount
} = require('../Controllers/userController.js');
const verifyToken = require('../Middlewares/authMidlleware.js');
const loginLimiter= require('../Middlewares/rateLimitMiddleware.js')


router.post('/create', createAccount);
router.post('/login', loginLimiter, login);


module.exports = router;  