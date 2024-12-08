import { Router } from 'express';
import sequelize from '../db.js';

const router = Router();

// Fetch all products
router.get('/', async (req, res) => {
    try {
        const [products] = await sequelize.query('SELECT * FROM products');
        // Ensure price is parsed as a number if necessary
        const formattedProducts = products.map(product => ({
            ...product,
            price: parseFloat(product.price) || 0, // Default to 0 if price is invalid
        }));
        res.json(formattedProducts);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});


// Add a new product
router.post('/add', async (req, res) => {
    const { Product_name, description, price, Stock, image } = req.body;

    try {
        await sequelize.query(
            `INSERT INTO products (Product_name, description, price, Stock, image) 
             VALUES (:Product_name, :description, :price, :Stock, :image)`,
            {
                replacements: { Product_name, description,price: parseFloat(price) || 0, Stock, image },
            }
        );
        res.json({ message: 'Product added successfully.' });
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Update a product
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { Product_name, description, price, Stock, image } = req.body;

    try {
        await sequelize.query(
            `UPDATE products 
             SET Product_name = :Product_name, description = :description, price = :price, Stock = :Stock, image = :image 
             WHERE Product_id = :id`,
            {
                replacements: { id, Product_name, description,price: parseFloat(price) || 0, Stock, image },
            }
        );
        res.json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Delete a product
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await sequelize.query(
            `DELETE FROM products WHERE Product_id = :id`,
            { replacements: { id } }
        );
        res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

export default router;
