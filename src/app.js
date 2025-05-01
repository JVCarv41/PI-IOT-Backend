const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/mongo');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

dotenv.config();
connectDB();

const app = express();

// JSON parsing
app.use(express.json({ limit: '1mb' }));

// Middleware to log requests
app.use((req, res, next) => {
    const originalUrl =
      req.apiGateway?.event?.url || req.originalUrl || req.url;
    req.url = originalUrl
    console.log(`Request: ${req.method} ${originalUrl}`);
    next();
});

// Test route
app.get('/api/test', (req, res) => {
    console.log('Test route handler reached');
    res.json({ message: 'Test route is working!' });
});

// Routes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

module.exports = app;