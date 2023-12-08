const rateLimit = require('express-rate-limit');

// Define the rate limit rule
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});


module.exports = loginLimiter;

