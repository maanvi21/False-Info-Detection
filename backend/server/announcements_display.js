const express = require('express');
const router = express.Router();
const Announcements = require('./announcements_model.js');

router.get('/', async (req, res) => {
    try {
        const announcements = await Announcements
            .find({}, 'title description file createdAt') // Select necessary fields
            .sort({ createdAt: -1 })  // Sort latest first
            .lean();  // Convert Mongoose objects to plain JavaScript objects

        // Format response with proper file handling and date conversion
        const formattedAnnouncements = announcements.map(announcement => ({
            ...announcement,
            createdAt: announcement.createdAt 
                ? new Date(announcement.createdAt).toISOString() 
                : "No date available",  // Handles missing dates
            
            // If file exists, generate URL using /get-file/:id endpoint
            fileUrl: announcement.file && announcement.file._id 
                ? `http://localhost:5000/get-file/${announcement.file._id}` 
                : null  // If no file, set to null
        }));

        res.status(200).json(formattedAnnouncements);

    } catch (error) {
        console.error('❌ Error fetching announcements:', error);
        res.status(500).json({ message: 'Error fetching announcements' });
    }
});

module.exports = router;
