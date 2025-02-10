const express = require('express');
const router = express.Router();
const SignIn = require('../models/signInModel');

// Register Student Route
router.post('/', async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;

        // Input validation
        if (!username || !password || !email || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new user
        const newUser = new SignIn({ username, password, email, phone });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error in registration:', error);

        // Handle duplicate key error for unique fields
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `${duplicateField} already exists` });
        }

        res.status(500).json({ message: 'Error registering user', error });
    }
});

module.exports = router;
