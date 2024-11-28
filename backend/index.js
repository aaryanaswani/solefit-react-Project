const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));

// Test Route
app.get('/', (req, res) => {
    res.send('Welcome to the Cartsy API!');
});

// Sync Database and Start Server
sequelize
    .sync()
    .then(() => {
        console.log('Database connected and synced');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
