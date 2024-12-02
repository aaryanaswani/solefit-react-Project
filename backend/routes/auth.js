const express = require('express');
const router = express.Router();
const sequelize = require('../db'); // Import Sequelize instance

// Login route
router.post('/login', async (req, res) => {
    const { username, password, panel } = req.body;

    try {
        const tableName = panel === 'admin' ? 'admins' : 'users';

        const [user] = await sequelize.query(
            `SELECT * FROM ${tableName} WHERE username = :username AND password = :password`,
            {
                replacements: { username, password },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials.' });
        }

        res.json({ id: user.id, username: user.username, email: user.email, panel });
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

module.exports = router; // Export the router instance
