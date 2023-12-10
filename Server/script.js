require('dotenv').config(); 
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const QuizQuestion = require('./Models/quizQuestions.js'); // Adjust path as needed

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const readImageFile = (filePath) => {
  return fs.readFileSync(filePath);
};

const quizData = [
    {
      questionText: "Which sign means 'No Overtaking'?",
      options: [
        {
          text: "No Left Turn",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/noLeftTurn.png'),
          imageContentType: 'image/png'
        },
        {
          text: "No Overtaking",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/noovertaking.png'),
          imageContentType: 'image/png'
        },
        {
          text: "Sarak Dayn Traf Say Tang Horai Hai",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/sarakDaynTrafSayTangHoraihay.PNG'),
          imageContentType: 'image/png'
        },
        {
          text: "No Right Turn",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/noRightTurn.png'),
          imageContentType: 'image/png'
        }
      ],
      correctAnswerText: "No Overtaking"
    },
    {
      questionText: "Identify the 'No Right Turn' sign.",
      options: [
        {
          text: "No Left Turn",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/noLeftTurn.png'),
          imageContentType: 'image/png'
        },
        {
          text: "Keep Left",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/baynChalyn.PNG'),
          imageContentType: 'image/png'
        },
        {
          text: "No U-Turn",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/noU-turn.png'),
          imageContentType: 'image/png'
        },
        {
          text: "No Right Turn",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/noRightTurn.png'),
          imageContentType: 'image/png'
        }
      ],
      correctAnswerText: "No Right Turn"
    },
    {
      questionText: "Which sign indicates that 'U-Turns' are not allowed?",
      options: [
        {
          text: "No U-Turn",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/noU-turn.png'),
          imageContentType: 'image/png'
        },
        {
          text: "No Left Turn",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/noLeftTurn.png'),
          imageContentType: 'image/png'
        },
        {
          text: "Keep Left",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/baynChalyn.PNG'),
          imageContentType: 'image/png'
        },
        {
          text: "No Right Turn",
          image: readImageFile('C:/Users/samad/Desktop/ZendriveAPIs/Server/resources/images/noRightTurn.png'),
          imageContentType: 'image/png'
        }
      ],
      correctAnswerText: "No U-Turn"
    },
    // Add more questions in a similar manner
  ];

  const insertQuestions = async () => {
    for (const data of quizData) {
      console.log(`Processing question: ${data.questionText}`);
  
      try {
        // Insert options into the database
        const question = new QuizQuestion({
          questionText: data.questionText,
          options: data.options
        });
  
        // Find the correct option based on the text and assign its _id
        const correctOption = question.options.find(option => option.text === data.correctAnswerText);
        if (!correctOption) {
          console.error(`Correct option not found for question: ${data.questionText}`);
          continue; // Skip this question
        }
        question.correctOptionId = correctOption._id;
  
        await question.save();
        console.log(`Question saved: ${data.questionText}`);
      } catch (error) {
        console.error(`Error processing question: ${data.questionText}`, error);
      }
    }
  
    console.log('Quiz data inserted successfully');
    db.close();
  };
  
  
  
  
  db.once('open', async () => {
    console.log('Database connection open.');
    await insertQuestions();
  });