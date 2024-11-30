const express = require('express');
const cors = require('cors');
const sequelize = require('./db'); // Import Sequelize instance

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Routes
const authRoutes = require('./routes/auth'); // Ensure this is importing the correct router
app.use('/auth', authRoutes); // Use the router with the `/auth` prefix

// Start Server
sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch((err) => console.error('Database sync error:', err));
    