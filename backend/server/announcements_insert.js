const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Announcement = require('./announcements_model'); // Adjust path if needed

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadsDir = path.join(__dirname, 'uploads');
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Helper function to append announcement title to CSV
const appendTitleToCSV = async (announcement) => {
  const csvFilePath = path.join(__dirname, 'data', 'announcement_titles.csv');
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
    console.log('Announcement title added to CSV successfully');
  } catch (error) {
    console.error('Error writing to CSV:', error);
  }
};

// POST route for adding announcements
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Create file object if file was uploaded
    const file = req.file ? {
      path: req.file.path,
      filename: req.file.originalname,
      contentType: req.file.mimetype
    } : null;

    // Create new announcement in database
    const newAnnouncement = new Announcement({
      title,
      description,
      file
    });

    // Save to database
    const savedAnnouncement = await newAnnouncement.save();
    
    // Append only the title to CSV file
    await appendTitleToCSV(savedAnnouncement);

    res.status(201).json({ 
      message: 'Announcement added successfully!',
      announcement: savedAnnouncement
    });
  } catch (error) {
    console.error('Error adding announcement:', error);
    res.status(500).json({ error: 'Failed to add announcement' });
  }
});

module.exports = router;