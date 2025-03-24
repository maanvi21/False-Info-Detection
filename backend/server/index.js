const express = require('express');
const cors = require('cors');
const connectDB = require('./db.js');
const studentLoginRoutes = require('./login_check.js');
const registerStudentRoute = require('./register_student.js');
const addTextRoute = require("./dataset_req.js");
const adminSignInRoute = require('./admin_signin.js');
const adminLoginRoute = require('./admin_login_check.js');
const displayAnnouncementsRoute = require('./announcements_display.js');
const insertAnnouncementsRoute = require('./announcements_insert.js');
const deleteAnnouncementRoute = require('./announcements_delete.js');
const getStudentNewsRoute = require('./nlp_post.js');
const getTopMatchesRoute = require('./top_matches.js');
const fileDownloadRoute = require('./file_download.js');
const getFilesRoute = require('./get_file.js');

require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

// Middleware
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/stulogin', studentLoginRoutes);
app.use('/register', registerStudentRoute);
app.use('/post-news', addTextRoute);
app.use('/admin-signin', adminSignInRoute);
app.use('/adminlogin', adminLoginRoute);
app.use('/display-announcements', displayAnnouncementsRoute);
app.use('/insert-announcements', insertAnnouncementsRoute);
app.use('/delete-announcement', deleteAnnouncementRoute);
app.use('/get-student-news', getStudentNewsRoute);
app.use('/get-top-matches', getTopMatchesRoute);

// IMPORTANT: The file download route must be defined with specific path
app.use('/download-file', fileDownloadRoute);
app.use('/get-file', getFilesRoute);

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});