const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./Models/user');
const Category = require('./Models/category');
// Middleware
app.use(cors());
app.use(express.json());

// API routes setup
const userRoutes = require('./Routes/user');
const productRoutes = require('./Routes/products');
const categoryRoutes = require('./Routes/category');


app.use('/api/users', userRoutes);
app.use('/api', productRoutes);
app.use('/api/category', categoryRoutes);

// Fetch all users
app.get('/`users`', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        console.error('Error fetching User Data:', error);
        res.status(500).json({ error: 'An error occurred while fetching User Data' });
    }
});
// fetch all category
app.get('/category', async (req, res) => {
    try {
        const allCategory = await Category.find();
        res.json(allCategory);
    } catch (error) {
        console.error('Error fetching Category Data:', error);
        res.status(500).json({ error: 'An error occurred while fetching Category Data' });
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
const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
