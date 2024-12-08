import { Router } from 'express';
import sequelize from '../db.js';

const router = Router();

// Add product to cart
router.post('/add', async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    console.log('Request Body:', req.body); // Debugging: Log incoming request

    try {
        // Step 1: Check if the product exists
        const [product] = await sequelize.query(
            `SELECT * FROM products WHERE Product_id = :product_id`, // Use consistent key
            { replacements: { product_id }, type: sequelize.QueryTypes.SELECT } // Ensure key matches here
        );

        if (!product) {
            console.error('Product not found for ID:', product_id);
            return res.status(404).json({ code: 'PRODUCT_NOT_FOUND', message: 'Product not found.' });
        }

        // Step 2: Check if there is enough stock
        if (product.Stock < quantity) { // Adjusted column name to match `Stock`
            console.error('Insufficient stock for Product ID:', product_id);
            return res.status(400).json({ code: 'INSUFFICIENT_STOCK', message: 'Insufficient stock.' });
        }

        // Step 3: Add product to the cart or update if it already exists
        await sequelize.query(
            `INSERT INTO cart (user_id, product_id, quantity)
             VALUES (:user_id, :product_id, :quantity)
             ON DUPLICATE KEY UPDATE quantity = quantity + :quantity`,
            { replacements: { user_id, product_id, quantity } } // Corrected replacements map
        );

        // Step 4: Update product stock
        await sequelize.query(
            `UPDATE products SET Stock = Stock - :quantity WHERE Product_id = :product_id`, // Use consistent key
            { replacements: { quantity, product_id }, type: sequelize.QueryTypes.UPDATE }
        );

        res.json({ message: 'Product added to cart.' });
    } catch (err) {
        console.error('Backend Error:', err);
        res.status(500).json({ code: 'SERVER_ERROR', message: 'Server error.', error: err.message });
    }
});

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const cartItems = await sequelize.query(
            `SELECT c.cart_id, p.Product_name AS productName, p.price, c.quantity, p.image
             FROM cart c
             JOIN products p ON c.product_id = p.Product_id
             WHERE c.user_id = :user_id`,
            { replacements: { user_id }, type: sequelize.QueryTypes.SELECT }
        );

        console.log("Cart items fetched from database:", cartItems);

        res.json(cartItems); // Ensure this returns an array, not an object
    } catch (err) {
        console.error(err);
        res.status(500).json({ code: 'SERVER_ERROR', message: 'Server error.', error: err.message });
    }
});




// Remove item from cart
router.delete('/:user_id/:product_id', async (req, res) => {
    const { user_id, product_id } = req.params;

    try {
        // Fetch the cart item to calculate stock rollback
        const [cartItem] = await sequelize.query(
            `SELECT quantity FROM cart WHERE user_id = :user_id AND product_id = :product_id`,
            { replacements: { user_id, product_id }, type: sequelize.QueryTypes.SELECT }
        );

        if (!cartItem) {
            return res.status(404).json({
                code: 'CART_ITEM_NOT_FOUND',
                message: 'Cart item not found. Cannot perform delete operation.',
            });
        }

        const rollbackQuantity = cartItem.quantity;

        // Delete the cart item
        await sequelize.query(
            `DELETE FROM cart WHERE user_id = :user_id AND product_id = :product_id`,
            { replacements: { user_id, product_id } }
        );

        // Update product stock
        await sequelize.query(
            `UPDATE products SET Stock = Stock + :rollbackQuantity WHERE Product_id = :product_id`,
            { replacements: { rollbackQuantity, product_id }, type: sequelize.QueryTypes.UPDATE }
        );

        res.json({
            message: 'Product removed from cart and stock updated successfully.',
        });
    } catch (err) {
        console.error('Error removing item from cart:', err);
        res.status(500).json({ code: 'SERVER_ERROR', message: 'Server error.', error: err.message });
    }
});

export default router;
