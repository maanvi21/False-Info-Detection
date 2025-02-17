// login_check.js (login route example)
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('./signin_model.js'); // Adjust as needed

const router = express.Router();

// Define POST route for login
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await Student.findOne({ username });

    if (!student) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
console.log("Entered Password:", password);
console.log("Stored Hashed Password:", student.password);
console.log("Password Match Status:", isMatch);

    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student._id, username: student.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;