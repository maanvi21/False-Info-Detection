// a route which send the csv file to frontend to display the top 3 matches
const e = require("express");
const express=require("express");
const fs=require("fs");
const path=require("path");
const router= express.Router();

router.get("/", async (req, res) => {       
    try {
        const results = fs.readFileSync(path.join(__dirname, 'top_three_matches.csv'), 'utf8');
        res.status(200).json({ 
            message: "Top 3 matches fetched successfully",
            results: results
        });
    } catch (err) {
        console.error("Error reading results:", err);
        res.status(200).json({ message: "Couldn't read top 3 matches" });
    }
});

module.exports = router;