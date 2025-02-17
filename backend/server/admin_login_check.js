const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('./admin_signin_model.js'); // Adjust as needed
const router = express.Router();
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            console.log("User not found");
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", admin.password);
        console.log("Password Match Status:", isMatch);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;