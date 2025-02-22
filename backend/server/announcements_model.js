require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Define the schema
const AnnouncementsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: Buffer, required:false },
    createdAt: { type: Date, default: Date.now }
});

// Hash the description only if it's modified
AnnouncementsSchema.pre('save', async function(next) {
    if (!this.isModified('description')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.description = await bcrypt.hash(this.description, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Create the model
const Announcements = mongoose.model('announcements', AnnouncementsSchema);

// Function to insert announcements
// async function insertAnnouncements() {
//     try {
//         // Safely load the file with proper error handling
//         const filePath = path.join(__dirname, "./SPIT_Problem_Statement.pdf");
//         let fileData;
        
//         try {
//             fileData = fs.readFileSync(filePath);
//             console.log(`File loaded successfully, size: ${fileData.length} bytes`);
//         } catch (fileError) {
//             console.error(`❌ Error loading file: ${fileError.message}`);
//             return;
//         }
        
        // const announcements = [
        //     { title: 'Announcement 1', description: 'This is the first announcement', file: fileData },
        //     { title: 'Announcement 2', description: 'This is the second announcement', file: fileData },
        //     { title: 'Announcement 3', description: 'This is the third announcement', file: fileData },
        //     { title: 'Announcement 4', description: 'This is the fourth announcement', file: fileData },
        //     { title: 'Announcement 5', description: 'This is the fifth announcement', file: fileData },
        //     { title: 'Announcement 6', description: 'This is the sixth announcement', file: fileData },
        //     { title: 'Announcement 7', description: 'This is the seventh announcement', file: fileData },
        //     { title: 'Announcement 8', description: 'This is the eighth announcement', file: fileData }
        // ];
        
//         await Announcements.insertMany(announcements);
//         console.log("✅ Announcements inserted successfully!");
//     } catch (error) {
//         console.error("❌ Error inserting announcements:", error);
//     }
// }

// Connect to DB and run operations
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully!");
        // await insertAnnouncements();
        console.log("Operations completed.");
        // await mongoose.connection.close();
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
}

// Start the process
connectDB();

// Export the model if needed in other files
module.exports = Announcements;