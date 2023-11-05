// models/product.js
const mongoose = require("mongoose");
const categorySchema = require("../Models/category");
// Define the product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    percent: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
});

// Create the Product model
const Product = mongoose.model("products", productSchema); // Use 'Product' as the model name

module.exports = Product;
