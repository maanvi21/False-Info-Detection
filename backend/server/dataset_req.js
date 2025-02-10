const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const FILE_PATH = path.join(__dirname, "newdataset.csv");

// Defines an HTTP POST route at /add-text
router.post("/add-text", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  const csvLine = `"${text}"\n`;

  fs.appendFile(FILE_PATH, csvLine, (err) => {
    if (err) {
      console.error("Error writing to CSV:", err);
      return res.status(500).json({ error: "Failed to write to CSV" });
    }
    res.json({ message: "Text added to CSV" });
  });
});

module.exports = router;
