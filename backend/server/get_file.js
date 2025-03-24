const express = require('express');
const Announcements = require('./announcements_model.js');
const router = express.Router(); 


    router.get('/:id', async (req, res) => {
        try {
            const announcement = await Announcements.findById(req.params.id);
    
            if (!announcement || !announcement.file) {
                return res.status(404).json({ error: "File not found" });
            }
    
            // Convert file buffer to Base64
            const base64File = announcement.file.data.toString("base64");
    
            res.json({
                filename: announcement.file.filename || "file",
                contentType: announcement.file.contentType,
                fileData: base64File
            });
        } catch (error) {
            console.error("❌ Error fetching file:", error);
            res.status(500).json({ error: "Error retrieving file" });
        }
    });

module.exports = router;
