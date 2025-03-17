const express= require("express");
const fs= require("fs");
const path= require("path");
const router= express.Router();
const FILE_PATH= path.join(__dirname, "newdataset.csv");
const checkNews= path.join(__dirname,"studentchecknews.json")


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

    }
     catch (error) {
        console.error("❌ Error adding announcement:", error);
        res.status(500).json({ error: "Server error while adding announcement" });
    }

    
}
);


module.exports= router;