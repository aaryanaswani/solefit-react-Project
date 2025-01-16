import { Router } from 'express';
import sequelize from '../db.js'; // Import Sequelize instance

const router = Router();

// Place an order
router.post('/place', async (req, res) => {
    const { user_id, address, total_price, cartProducts, payment_method } = req.body;

    try {
        // Validate cartProducts is not empty
        if (!cartProducts || cartProducts.length === 0) {
            return res.status(400).json({ message: 'Cart is empty.' });
        }

        // Create a new order
        const [orderResult] = await sequelize.query(
            `INSERT INTO orders (user_id, total_price, address, payment_method, status) 
             VALUES (:user_id, :total_price, :address, :payment_method, 'Pending')`,
            {
                replacements: { 
                    user_id, 
                    total_price, 
                    address, 
                    payment_method
                },
                type: sequelize.QueryTypes.INSERT,
            }
        );

            // Fetch the last inserted order ID
        const [orderIdResult] = await sequelize.query(
        `SELECT LAST_INSERT_ID() AS order_id`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
        );

        const order_id = orderIdResult.order_id;

        // Add order items from cartProducts
        for (const item of cartProducts) {
            await sequelize.query(
                `INSERT INTO order_items (order_id, product_id, quantity, price) 
                 VALUES (:order_id, :product_id, :quantity, :price)`,
                {
                    replacements: {
                        order_id: order_id,  // Corrected here
                        product_id: item.product_id, // Ensure correct product_id is used
                        quantity: item.quantity,
                        price: item.price,
                    },
                    type: sequelize.QueryTypes.INSERT,
                }
            );
        }
         // Clear the user's cart after the order is placed
         await sequelize.query('DELETE FROM cart WHERE user_id = :user_id', {
            replacements: { user_id },
            type: sequelize.QueryTypes.DELETE,
        });
        // Return a success response with the orderId
        res.json({ message: 'Order placed successfully.', order_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

// Get order details by order_id
router.get('/:order_id', async (req, res) => {
    const { order_id } = req.params;
  
    try {
      // Get order details
      const orderQuery = `
        SELECT o.order_id AS orderId, o.total_price, o.address, o.payment_method, o.status, o.created_at, u.user_id, u.email,u.username FROM orders o 
        JOIN users u ON o.user_id = u.user_id WHERE o.order_id = :order_id
      `;
    
      const [order] = await sequelize.query(orderQuery, {
        replacements: { order_id },
        type: sequelize.QueryTypes.SELECT,
      });
    
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
    
      // Get order items for this order
      const orderItemsQuery = `
        SELECT oi.product_id, oi.quantity, oi.price, p.Product_name AS product_name, p.image 
        FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = :order_id`;
    
      const orderItems = await sequelize.query(orderItemsQuery, {
        replacements: { order_id },
        type: sequelize.QueryTypes.SELECT,
      });
    
      // Combine order and order items into one response object
      const orderDetails = {
        ...order,
        items: orderItems,
      };
    
      // Send the combined data as a response
      res.json(orderDetails);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
    
  });
  

export default router;
