console.log('Debug');

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/mongo');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json({ limit: '1mb' }));

app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid or missing JSON body' });
    }
    next(err);
});

module.exports = app;
