import { Router } from 'express';
import sequelize from '../db.js'; // Import Sequelize instance

const router = Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        // Raw SQL query to fetch all products
        const [products] = await sequelize.query('SELECT * FROM products');
        res.json(products); // Send the fetched products as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;