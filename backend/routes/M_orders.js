import { Router } from 'express';
import sequelize from '../db.js';

const router = Router();

// Get all orders
router.get('/', async (req, res) => {
    try {
        const [orders] = await sequelize.query(`
            SELECT 
                o.order_id, 
                o.user_id, 
                o.total_price, 
                o.status, 
                o.address, 
                o.created_at,
                GROUP_CONCAT(CONCAT(oi.product_id, ':', oi.quantity)) AS items
            FROM orders o
            LEFT JOIN order_items oi ON o.order_id = oi.order_id
            GROUP BY o.order_id;
        `);

        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Failed to fetch orders.', error: err.message });
    }
});

// Update order status
router.put('/:order_id/status', async (req, res) => {
    const { order_id } = req.params;
    const { status } = req.body;

    try {
        await sequelize.query(`
            UPDATE orders SET status = :status WHERE order_id = :order_id
        `, {
            replacements: { status, order_id },
            type: sequelize.QueryTypes.UPDATE,
        });

        res.json({ message: 'Order status updated successfully.' });
    } catch (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({ message: 'Failed to update order status.', error: err.message });
    }
});

export default router;
