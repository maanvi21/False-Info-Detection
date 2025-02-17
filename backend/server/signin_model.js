const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const signInSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
signInSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const SignIn = mongoose.model('sign_ins', signInSchema);

module.exports = SignIn;
