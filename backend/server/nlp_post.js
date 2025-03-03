const express= require("express");
const fs= require("fs");
const path= require("path");
const router= express.Router();
const FILE_PATH= path.join(__dirname, "newdataset.csv");
const JSON_PATH = path.join(__dirname, "data.json");
// Post route

router.post("/", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "No text provided" });
        }
              // Create a JSON object
              const jsonData = { text };
              // Write JSON data to a file
              fs.writeFileSync(JSON_PATH, JSON.stringify(jsonData, null, 2));
        const newsStudent = `"${text}"\n`;
   console.log(newsStudent);
    }
     catch (error) {
        console.error("❌ Error adding announcement:", error);
        res.status(500).json({ error: "Server error while adding announcement" });
    }

    
}
);


module.exports= router;