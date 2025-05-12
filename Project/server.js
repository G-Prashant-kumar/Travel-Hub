const express = require('express'); // ← maybe this is line 4
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./backend/routes/auth');
const bookingRoutes = require('./backend/routes/booking');
const hotelBookingRoutes = require('./backend/routes/hotelBookings');  // Add this line
require('dotenv').config();

const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'travel-70idk5zdl-prashants-projects-cd12f6f8.vercel.app', // Replace with your frontend URL
    credentials: true
}));
app.use(express.json());

app.use(cookieParser());
app.use(express.static('public'));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET, // Add secret option
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/hotelBookings', hotelBookingRoutes);  // Add this line

const PORT = process.env.PORT || 3000;
app.listen(PORT)
