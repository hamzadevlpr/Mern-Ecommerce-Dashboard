const express = require('express');
const router = express.Router();
const Product = require('../Models/product');

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "An error occurred while fetching products" });
    }
});

// Route to get product details by ID
router.get('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        // Find the product by its ID in the database
        const product = await Product.findById(productId);

        if (!product) {
            // If the product is not found, return a 404 status and message
            return res.status(404).json({ error: 'Product not found' });
        }

        // If the product is found, return it as a JSON response
        res.json(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'An error occurred while fetching product details' });
    }
});

// API endpoint for adding a product
router.post("/add", async (req, res) => {
    try {
        const { title, imageURL, price, percent, category, desc } = req.body;

        // Create a new product instance based on your Product model
        const newProduct = new Product({
            title,
            imageURL,
            price, 
            percent,
            category,
            desc
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct); // 201 status code for resource created
    } catch (error) {
        res.status(500).json({ error: "An error occurred while adding the product" });
    }
});
// Update a product by ID
router.put("/:productId", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error updating product" });
    }
});

// Delete a product by ID
router.delete("/:productId", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(
            req.params.productId
        );
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting product" });
    }
});
module.exports = router;
