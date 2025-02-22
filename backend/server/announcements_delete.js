const express = require('express');
const router = express.Router();
const Announcement = require('./announcements_model.js');

// Delete announcement route
router.delete('/:id', async (req, res) => {    // Removed 'delete-announcement' from here
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: 'Announcement ID is required' });
        }

        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        
        if (!announcement) {
            return res.status(404).json({ error: 'Announcement not found' });
        }

        res.status(200).json({ 
            message: 'Announcement deleted successfully',
            deletedAnnouncement: announcement 
        });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid announcement ID format' });
        }
        
        res.status(500).json({ error: 'Error deleting announcement' });
    }
});

module.exports = router;