import express, { json } from 'express';
import cors from 'cors';
import sequelize from './db.js';

import authRoutes from './routes/auth.js'; // Import auth routes
import productRoutes from './routes/products.js'; // Import product routes
import cartRoutes from './routes/cart.js'; // Import product routes
import orderRoutes from './routes/orders.js';
import customersRoutes from './routes/customers.js'; // Import the route
import MordersRoute from './routes/M_orders.js';
import MproductsRoute from './routes/M_products.js';
import registerRoutes from './routes/register.js';
import contactRoutes from './routes/contact.js';

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customersRoutes);
app.use('/morders', MordersRoute);
app.use('/mproducts', MproductsRoute);
app.use('/api',registerRoutes); // Use the /register route
app.use('/contact',contactRoutes);

// Start Server
sequelize
    .sync() // Sync database models
    .then(() => {
        app.listen(5000, () => console.log('Server running on http://localhost:5000'));
    })
    .catch((err) => console.error('Database sync error:', err));
