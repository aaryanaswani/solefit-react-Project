// routes/products.js
import { Router } from 'express';
import Product from '../models/Product'; // Correctly import the Product model

const router = Router();

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll(); // Fetch all products from the database
        console.log('Fetched products:', products);  // Log the products to the console
        res.json(products); // Send the products as a JSON response
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

export default router;
