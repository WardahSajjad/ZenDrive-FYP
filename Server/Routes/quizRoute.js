const express = require('express');
const router = express.Router();
const {
    getQuestions
} = require('../Controllers/quizController.js');


router.get('/questions', getQuestions);

module.exports = router;  