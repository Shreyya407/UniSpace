require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('./models/Booking'); 

const MONGO_URI = process.env.MONGO_URI;

const resetBookings = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Clear all existing bookings
    await Booking.deleteMany({});
    
    console.log('Successfully deleted all bookings! Your dashboard is clean.');

    process.exit();
  } catch (error) {
    console.error('Error resetting bookings:', error);
    process.exit(1);
  }
};

resetBookings();