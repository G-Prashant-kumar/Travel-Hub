const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotelDetails: { type: Object, required: true },
    bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HotelBooking', hotelBookingSchema);
