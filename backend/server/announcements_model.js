require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AnnouncementsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
    });

    AnnouncementsSchema.pre('save', async function (next) {
        if (!this.isModified('description')) return next();
        const salt = await bcrypt.genSalt(10);
        this.description = await bcrypt.hash(this.description, salt);
        next();
    });

    // table called announcements will be created in the database
    const Announcements = mongoose.model('announcements', AnnouncementsSchema);

// insert 8 announcements

// async function insertAnnouncements(){
//     try {
//         const announcements = [
//             { title: 'Announcement 1', description: 'This is the first announcement' },
//             { title: 'Announcement 2', description: 'This is the second announcement' },
//             { title: 'Announcement 3', description: 'This is the third announcement' },
//             { title: 'Announcement 4', description: 'This is the fourth announcement' },
//             { title: 'Announcement 5', description: 'This is the fifth announcement' },
//             { title: 'Announcement 6', description: 'This is the sixth announcement' },
//             { title: 'Announcement 7', description: 'This is the seventh announcement' },
//             { title: 'Announcement 8', description: 'This is the eighth announcement' }
//         ];
//         await Announcements.insertMany(announcements);
//         console.log("✅ Announcements inserted successfully!");
//     } catch (error) {
//         console.error("❌ Error inserting announcements:", error);
//     } finally {
//         mongoose.connection.close(); // Close DB connection after insertion
//     }

// }

    async function connectDB() {
        try {
          await mongoose.connect(process.env.MONGO_URI);
          console.log("✅ MongoDB Connected Successfully!");
// insertAnnouncements();
        } catch (err) {
          console.error("❌ MongoDB Connection Error:", err);
          process.exit(1);
        }
      }
    
    module.exports = mongoose;
    connectDB();
    module.exports = Announcements;