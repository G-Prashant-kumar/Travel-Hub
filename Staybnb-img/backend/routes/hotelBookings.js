const express = require('express');
const router = express.Router();
const HotelBooking = require('../models/HotelBooking');

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ msg: "Unauthorized" });
    }
}

// POST request to add a new hotel booking
router.post('/add', isLoggedIn, async (req, res) => {
    const { hotelDetails } = req.body;
    const userId = req.session.userId;

    console.log("Received booking request", { hotelDetails, userId });

    if (!hotelDetails || !userId) {
        console.error("Missing hotel details or user ID");
        return res.status(400).json({ msg: "Bad request" });
    }

    try {
        const booking = new HotelBooking({ userId, hotelDetails });
        await booking.save();
        res.status(201).json({ msg: "Booking saved successfully" });
    } catch (error) {
        console.error("Error saving booking:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// GET request to fetch all hotel bookings
router.get('/', isLoggedIn, async (req, res) => {
    const userId = req.session.userId;

    try {
        const bookings = await HotelBooking.find({ userId });
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching hotel bookings:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
