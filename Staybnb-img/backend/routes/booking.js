const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ msg: "Unauthorized" });
    }
}

// GET endpoint to fetch all bookings for the logged-in user
router.get('/', isLoggedIn, async (req, res) => {
    const userId = req.session.userId;

    try {
        const bookings = await Booking.find({ userId }).sort({ bookingDate: -1 }); // Sort by bookingDate descending
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ msg: "Server error" });
    }
});

// POST endpoint to add a new booking
router.post('/add', isLoggedIn, async (req, res) => {
    const { flightDetails } = req.body;
    const userId = req.session.userId;

    try {
        const booking = new Booking({ userId, flightDetails });
        await booking.save();
        res.status(201).json({ msg: "Booking saved successfully" });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
