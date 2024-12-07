import express, { json } from 'express';
import cors from 'cors';
import sequelize from './db.js';

import authRoutes from './routes/auth.js'; // Import auth routes
import productRoutes from './routes/products.js'; // Import product routes

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/auth', authRoutes); // Auth routes
app.use('/products', productRoutes); // Product routes

// Start Server
sequelize
    .sync() // Sync database models
    .then(() => {
        app.listen(5000, () => console.log('Server running on http://localhost:5000'));
    })
    .catch((err) => console.error('Database sync error:', err));
