const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a 'User' model for user authentication
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizQuestion', // Assuming you have a 'QuizQuestion' model for questions
        required: true
    },
    selectedOptionIndex: {
        type: Number,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);

module.exports = UserAnswer;
