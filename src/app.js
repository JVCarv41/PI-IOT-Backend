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

app.use((req, res, next) => {
    console.log('Content-Length:', req.headers['content-length']);
    console.log('Request Body:', req.body);
    next();
});

app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid or missing JSON body' });
    }
    next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;