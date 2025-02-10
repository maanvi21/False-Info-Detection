const express = require('express');

const cors = require('cors');

const connectDB = require('./db'); // Assuming your db.js exists

const loginRoutes = require('./login_check.js'); // Assuming this exists
const registerStudentRoute = require('./register_student.js');
const addTextRoute = require("./dataset_req");


require('dotenv').config();



const app = express();



// Enable CORS for specific origins (localhost:3000 in this case)

app.use(cors({

  origin: 'http://localhost:3000',  // Allow requests from frontend

  methods: 'GET,POST',  // Allow methods

  allowedHeaders: 'Content-Type,Authorization', // Allow headers

}));



// Middleware

app.use(express.json());  // To parse JSON bodies



// Connect to Database

connectDB();



// Routes

app.use('/stulogin', loginRoutes);
app.use('/register', registerStudentRoute);
app.use('/post-news', addTextRoute);


// Start Server

const port = process.env.PORT || 5000;

app.listen(port, () => {

  console.log(`🚀 Server running on port ${port}`);

});