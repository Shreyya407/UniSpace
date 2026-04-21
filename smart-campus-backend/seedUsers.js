require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path if your model is named differently

const MONGO_URI = process.env.MONGO_URI;

const usersToSeed = [
  // --- YOUR ORIGINAL USERS ---
  {
    userId: 'RA2311028010141', 
    password: 'password123',
    name: 'Shreya Tiwari',
    role: 'student',
    department: 'NWC'
  },
  {
    userId: '103503', 
    password: 'password123',
    name: 'Dr. K Rajesh Kumar',
    role: 'faculty',
    department: 'NWC'
  },
  {
    userId: 'ADM-2024-001',
    password: 'password123',
    name: 'System Admin',
    role: 'admin',
    department: 'Common'
  },

  // --- NEW STUDENTS ---
  {
    userId: 'RA2311028010155',
    password: 'password123',
    name: 'Bhargavi Singh',
    role: 'student',
    department: 'CTECH'
  },
  {
    userId: 'RA2311028010149',
    password: 'password123',
    name: 'Rachit Chandna',
    role: 'student',
    department: 'CINTEL'
  },
  {
    userId: 'RA2311028010055',
    password: 'password123',
    name: 'Vikram Singh',
    role: 'student',
    department: 'Electronics'
  },

  // --- NEW FACULTY ---
  {
    userId: '104205',
    password: 'password123',
    name: 'Dr. Anita Desai',
    role: 'faculty',
    department: 'CTECH'
  },
  {
    userId: '102944',
    password: 'password123',
    name: 'Prof. S. Ramesh',
    role: 'faculty',
    department: 'Electronics'
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Clear any existing users
    await User.deleteMany({});
    
    // Insert your custom users
    await User.insertMany(usersToSeed);
    console.log('Successfully added 8 demo users (Admin, Faculty, and Students)!');

    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();