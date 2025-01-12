import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sequelize from '../db.js'; // Use your Sequelize connection
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Use the secret from .env

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query to find user by username
        const [user] = await sequelize.query(
            'SELECT * FROM users WHERE username = :username',
            {
                replacements: { username },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { user_id: user.user_id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with user data and token
        return res.status(200).json({
            message: 'Login successful',
            user: { user_id: user.user_id, username: user.username },
            token,
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
