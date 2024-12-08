import { Router } from 'express';
import sequelize from '../db.js'; // Import Sequelize instance

const router = Router();

// Place an order
router.post('/place', async (req, res) => {
    const { user_id, address } = req.body;

    try {
        // Fetch user's cart items
        const [cartItems] = await sequelize.query(
            `SELECT c.product_id, c.quantity, p.price
             FROM cart c
             JOIN products p ON c.product_id = p.id
             WHERE c.user_id = :user_id`,
            {
                replacements: { user_id },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty.' });
        }

        // Calculate total price
        const totalAmount = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        // Create a new order
        const [orderResult] = await sequelize.query(
            `INSERT INTO orders (user_id, totalAmount, address, status) 
             VALUES (:user_id, :totalAmount, :address, 'Placed')`,
            {
                replacements: { user_id, totalAmount, address },
            }
        );

        const orderId = orderResult.insertId;

        // Add order items
        for (const item of cartItems) {
            await sequelize.query(
                `INSERT INTO order_items (orderId, product_id, quantity, price) 
                 VALUES (:orderId, :product_id, :quantity, :price)`,
                {
                    replacements: {
                        orderId,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        price: item.price,
                    },
                }
            );

            // Update product stock
            await sequelize.query(
                `UPDATE products SET stock = stock - :quantity WHERE id = :product_id`,
                {
                    replacements: { quantity: item.quantity, product_id: item.product_id },
                }
            );
        }

        // Clear user's cart
        await sequelize.query('DELETE FROM cart WHERE user_id = :user_id', {
            replacements: { user_id },
        });

        res.json({ message: 'Order placed successfully.', orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

// Get user's orders
router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const [orders] = await sequelize.query(
            `SELECT o.id AS orderId, o.totalAmount, o.address, o.status, o.createdAt
             FROM orders o
             WHERE o.user_id = :user_id`,
            {
                replacements: { user_id },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

export default router;
