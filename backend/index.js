// index.js
import express, { json } from 'express';
import cors from 'cors';
import sequelize from './db'; // Import Sequelize instance
import productRoutes from './routes/products'; // Import the products route

const app = express();

// Middleware
app.use(cors());
app.use(json()); // Parse JSON request bodies

// Routes
import authRoutes from './routes/auth'; // Ensure this is importing the correct router
app.use('/auth', authRoutes); // Use the router with the `/auth` prefix

app.use('/products', productRoutes); // Use product routes for '/products' endpoint

// Start Server
sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch((err) => console.error('Database sync error:', err));
