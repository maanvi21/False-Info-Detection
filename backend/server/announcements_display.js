const express = require('express');
const router = express.Router();
const displayAnnouncements= require('./announcements_model.js');
router.get('/', async (req, res) => {
    try{
        const announcements = await displayAnnouncements.find().sort({createdAt: -1});
        res.json(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ message: 'Error fetching announcements' });

    }

});
module.exports = router;