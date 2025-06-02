const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./database/mongo');

const measureRoutes = require('./routes/measureRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Request logging
app.use(morgan('dev'));

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

// Sensor data routes
app.use('/api/measure', measureRoutes);

module.exports = app;