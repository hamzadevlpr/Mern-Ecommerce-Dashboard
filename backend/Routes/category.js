const express = require('express');
const router = express.Router();
const Category = require('../Models/category');

// fetch all category
router.get('/', async (req, res) => {
    try {
        const allCategory = await Category.find();
        res.json(allCategory);
    } catch (error) {
        console.error('Error fetching Category Data:', error);
        res.status(500).json({ error: 'An error occurred while fetching Category Data' });
    }
});
router.post('/add', async (req, res) => {

    try {
        const { title, image } = req.body;

        // Check if the email already exists in the database
        const exixtingCategory = await Category.findOne({ title });

        if (exixtingCategory) {
            return res.status(401).json({ error: 'Category already exists' });
        }
        const newCateg = new Category({ title, title, image: image });
        await newCateg.save();

        res.status(200).json({ message: 'Category Added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
