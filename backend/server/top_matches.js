const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    const filePath = path.join(__dirname, 'top_three_matches.csv');
    
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error("File not found:", filePath);
            return res.status(404).json({ error: "Results file not found" });
        }
        
        // Read file content
        const results = fs.readFileSync(filePath, 'utf8');
        
        // Validate the content is not empty
        if (!results || results.trim().length === 0) {
            console.error("Empty results file");
            return res.status(500).json({ error: "Results file is empty" });
        }
        
        // Log part of the results for debugging
        console.log("Results content (first 100 chars):", results.substring(0, 100));
        
        // Ensure we're sending a string
        if (typeof results !== 'string') {
            console.warn("Results not a string, converting to string");
            return res.json({ results: String(results) });
        }
        
        // Send back the results
        res.json({ results });
    } catch (err) {
        console.error("Error reading results:", err);
        res.status(500).json({ error: "Couldn't read top 3 matches: " + err.message });
    }
});

module.exports = router;