// download-file.js - Express route for file downloads
const express = require('express');
const Announcement = require('./announcements_model.js'); // Make sure path is correct
const router = express.Router();

// Route to handle file downloads
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📥 Attempting to download file for announcement ID: ${id}`);
    
    // Find the announcement by ID
    const announcement = await Announcement.findById(id);
    
    if (!announcement) {
      console.log(`❌ Announcement not found with ID: ${id}`);
      return res.status(404).json({ error: 'Announcement not found' });
    }
    
    console.log('📄 Announcement found:', {
      id: announcement._id,
      title: announcement.title,
      hasFile: !!announcement.file
    });
    
    if (!announcement.file) {
      console.log(`❌ No file found for announcement: ${id}`);
      return res.status(404).json({ error: 'No file attached to this announcement' });
    }
    
    // Check how the file is structured
    console.log('📄 File structure:', Object.keys(announcement.file));
    
    // Based on your MongoDB structure, handle appropriately
    if (announcement.file.data) {
      // If file is stored as buffer in MongoDB
      console.log(`📤 Serving file from database buffer`);
      
      // Set headers for file download
      res.setHeader('Content-Disposition', `attachment; filename="${announcement.file.filename || 'download'}"`);
      res.setHeader('Content-Type', announcement.file.contentType || 'application/octet-stream');
      
      // Send the buffer data directly
      return res.send(announcement.file.data);
    } else {
      console.log(`❌ File data not found in expected format`);
      return res.status(404).json({ error: 'File data not found' });
    }
    
  } catch (error) {
    console.error('❌ Error downloading file:', error);
    res.status(500).json({ error: 'Server error while downloading file' });
  }
});

module.exports = router;