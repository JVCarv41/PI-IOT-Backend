console.log('Debug App: Starting application');

// Load environment variables
require('dotenv').config();
console.log('Debug App: Loaded environment variables');

// Import libraries
const express = require('express');
const morgan = require('morgan');

// Import database connection and routes
const connectDB = require('./database/mongo');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

// Initialize Express server
const app = express();
console.log('Debug App: Initialized Express');

// Global middlewares
app.use(express.json()); // Parse JSON in request body
console.log('Debug App: Added JSON middleware');
app.use(morgan('dev'));  // Log requests to the console
console.log('Debug App: Added request logging middleware');

const timeout = require('connect-timeout');
app.use(timeout(5000));  // Set timeout to 5 seconds
console.log('Debug App: Added timeout middleware');

// Handle request timeout
app.use(function (req, res, next) {
    if (!req.timedout) {
        next();
    } else {
        console.log('Debug App: Request timed out');
        res.status(408).send('Request Timeout');
    }
});

// Connect to MongoDB
console.log('Debug App: Connecting to MongoDB...');
connectDB().catch((err) => {
    console.error('Debug App: Failed to connect to MongoDB:', err.message);
});

// Use authentication and protected routes
app.use('/api', authRoutes);
console.log('Debug App: Added auth routes');
app.use('/api', protectedRoutes);
console.log('Debug App: Added protected routes');

// Export the app for serverless use
module.exports = app;
console.log('Debug App: Application setup complete');
