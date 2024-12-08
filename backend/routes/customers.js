import { Router } from 'express';
import sequelize from '../db.js';

const router = Router();

// Get all customers
router.get('/', async (req, res) => {
    try {
        const [customers] = await sequelize.query('SELECT user_id, username, email, created_at FROM users');
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch customers.', error: err.message });
    }
});

export default router;
