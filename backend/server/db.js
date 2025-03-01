require('dotenv').config();
const mongoose = require('mongoose');

// Define the connection function
const connectDB = async () => {
  try {
    // Use process.env to access the environment variable
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
