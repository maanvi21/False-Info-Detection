const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Announcement = require('./announcements_model'); // Adjust path if needed

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to append announcement title to CSV
const appendTitleToCSV = async (announcement) => {
  const csvFilePath = path.join(__dirname, 'newdataset.csv');
  const dirPath = path.dirname(csvFilePath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Check if file exists to determine if we need to write headers
  const fileExists = fs.existsSync(csvFilePath);
  
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
      { id: 'title', title: 'Title' }
    ],
    append: fileExists
  });

  // Format the data for CSV - only include title
  const csvData = [{
    title: announcement.title
  }];

  try {
    await csvWriter.writeRecords(csvData);
    console.log('✅ Announcement title added to CSV successfully');
  } catch (error) {
    console.error('❌ Error writing to CSV:', error);
  }
};

// POST route for adding announcements with file upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Create new announcement with file buffer
    const newAnnouncement = new Announcement({
      title: req.body.title,
      description: req.body.description,
      file: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname
      }
    });
    
    await newAnnouncement.save();
    await appendTitleToCSV(newAnnouncement);
    res.status(201).json({ message: '✅ Announcement with file uploaded successfully' });
    
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

module.exports = router;
