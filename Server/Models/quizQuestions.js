// models/QuizQuestion.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: Buffer, required: true },
  imageContentType: { type: String, required: true }
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
  correctOptionId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const QuizQuestion = mongoose.model('QuizQuestion', questionSchema);

module.exports = QuizQuestion;
