const mongoose = require('mongoose');

const AnnouncementsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { 
      data: Buffer, 
      contentType: String,
      filename: String  // Add filename field
    },
    createdAt: { type: Date, default: Date.now }
});

// Create and export the model
const Announcements = mongoose.model('announcements', AnnouncementsSchema);
module.exports = Announcements;