const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./Models/user');
// Middleware
app.use(cors());
app.use(express.json());

// API routes setup
const userRoutes = require('./Routes/user');
const productRoutes = require('./Routes/products');
app.use('/api/users', userRoutes);
app.use(productRoutes);

// Fetch all users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        console.error('Error fetching User Data:', error);
        res.status(500).json({ error: 'An error occurred while fetching User Data' });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});



// Start the server
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
