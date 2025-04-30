console.log('Debug log')

const express = require('express');
const serverless = require('serverless-http');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('../database/mongo');
const authRoutes = require('../routes/authRoutes');
const protectedRoutes = require('../routes/protectedRoutes');

// Create express app
const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Log when the app starts
console.log('Starting Express server...');

// Connect DB once when cold start
connectDB()
  .then(() => {
    // Log when serverless handler is invoked
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Routes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

// Export serverless handler
module.exports = app;
module.exports.handler = serverless(app);