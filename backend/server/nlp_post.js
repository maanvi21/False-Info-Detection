const express = require("express");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process"); // Add this import
const router = express.Router();
const FILE_PATH = path.join(__dirname, "newdataset.csv");
const checkNews = path.join(__dirname, "studentchecknews.json");

// Post route
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }
    
    const newsStudent = `"${text}"\n`;
    console.log(newsStudent);
    
    // Create a JSON object with the latest text
    const newData = { news: text };
    
    // Overwrite the file with the new JSON data
    fs.writeFileSync(checkNews, JSON.stringify(newData, null, 2), "utf8");
    
    // Execute the Python script
    const pythonProcess = spawn('python', ['nlp_model.py']);
    
    // Optional: Handle Python script output
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python output: ${data}`);
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
    });
    
    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      
      // You can read the results file here if needed
      try {
        const results = fs.readFileSync(path.join(__dirname, 'top_three_matches.csv'), 'utf8');
        // Do something with the results
        res.status(200).json({ 
          message: "News processed successfully",
          // Optional: Include results in the response
          // results: results
        });
      } catch (err) {
        console.error("Error reading results:", err);
        res.status(200).json({ message: "News processed, but couldn't read results" });
      }
    });
  } catch (error) {
    console.error("❌ Error processing news:", error);
    res.status(500).json({ error: "Server error while processing news" });
  }
});

module.exports = router;