const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// JWT token generation
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
router.post('/signup', async (req, res) => {
    console.log(req.body); // Log the incoming request to see if data is being sent correctly

    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: "Password does not meet requirements" });
    }

    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error(error); // Log the error for further debugging
        res.status(500).json({ msg: "Server error" });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set session for user (optional)
        req.session.userId = user._id;

        res.status(200).json({ msg: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ msg: "Logout failed" });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ msg: "Logout successful" });
    });
});

// Check session status route
router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ loggedIn: true });
    } else {
        res.status(200).json({ loggedIn: false });
    }
});

module.exports = router;
