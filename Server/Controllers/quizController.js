const jwt = require('jsonwebtoken');
const User = require('../Models/user.js');
const QuizQuestion = require('../Models/quizQuestions.js');
const UserAnswer = require('../Models/userAnswer.js'); // Import the UserAnswer model


const getQuestions = async (req, res) => {
    try {
        const questions = await QuizQuestion.find();
        if (!questions || questions.length === 0) {
            return res.status(404).send({ message: 'No questions available.' });
        }

        // Convert the image Buffer to a base64 string for each question
        const processedQuestions = questions.map(question => {
            const processedOptions = question.options.map(option => {
                if (option.image && option.imageContentType) {
                    return {
                        ...option.toObject(), // Convert Mongoose document to plain object
                        image: `data:${option.imageContentType};base64,${option.image.toString('base64')}`
                    };
                }
                return option;
            });

            return {
                ...question.toObject(),
                options: processedOptions
            };
        });

        res.json(processedQuestions);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving questions', error: error });
    }
};




module.exports = {
    getQuestions
};