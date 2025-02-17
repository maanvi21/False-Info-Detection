const express = require('express');
const router = express.Router();
const insertAnnouncements = require('./announcements_model.js');
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        // Input validation
        if (!title || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new announcement
        const newAnnouncement = new insertAnnouncements({ title, description });
        await newAnnouncement.save();

        res.status(201).json({ message: 'Announcement added successfully!' });
    } catch (error) {
        console.error('Error adding announcement:', error);
        res.status(500).json({ message: 'Error adding announcement' });
    }
});
module.exports = router;