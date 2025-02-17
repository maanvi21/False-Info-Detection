const express = require("express");
const fs = require("fs");
const path = require("path");
const Announcements = require("./announcements_model.js"); // Importing Announcement model

const router = express.Router();
const FILE_PATH = path.join(__dirname, "newdataset.csv");

// POST route to add an announcement to both MongoDB and CSV
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // Insert into MongoDB
    const newAnnouncement = new Announcements({ title: text, description: "-" });
    await newAnnouncement.save();

    // Insert into CSV
    const csvLine = `"${text}"\n`;
    fs.appendFile(FILE_PATH, csvLine, (err) => {
      if (err) {
        console.error("❌ Error writing to CSV:", err);
        return res.status(500).json({ error: "Failed to write to CSV" });
      }

      res.json({ message: "✅ Announcement added to both MongoDB and CSV!" });
    });
  } catch (error) {
    console.error("❌ Error adding announcement:", error);
    res.status(500).json({ error: "Server error while adding announcement" });
  }
});

module.exports = router;
