const mongoose = require('mongoose');
const validator = require('validator'); // For email validation

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must not exceed 30 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 8 characters long'],
        
    },
    // Add these fields to your user schema
emailVerified: { type: Boolean, default: false },
emailVerificationToken: { type: String },

    // Confirm password should be handled at the application level but not stored in the database
});

module.exports = mongoose.model('User', userSchema);
