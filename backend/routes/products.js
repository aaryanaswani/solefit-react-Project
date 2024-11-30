const express = require('express');
const Product = require('../models/Product'); // Assuming you have a Product model

const router = express.Router();

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll(); // Replace with your query to fetch products
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
