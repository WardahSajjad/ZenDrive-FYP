require('dotenv').config(); 

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require('./Routes/userRoute.js')
const quizRoute = require('./Routes/quizRoute.js')
const verifyToken = require('./Middlewares/authMidlleware');

const app = express();
const port = process.env.PORT || 3000; 

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); 

// Define routes here
app.use("/account", userRoutes);
app.use("/quiz", quizRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
