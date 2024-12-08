import express from 'express';
import sequelize from '../db.js'; // Your database connection

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    console.log('Register endpoint hit:', req.body); // Log incoming request

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        console.log('Missing fields:', { username, email, password }); // Debug missing fields
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const [existingUser] = await sequelize.query(
            'SELECT * FROM users WHERE email = :email',
            { replacements: { email } }
        );

        if (existingUser.length) {
            console.log('Duplicate email:', email); // Debug duplicate email
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        const [result] = await sequelize.query(
            'INSERT INTO users (username, email, password) VALUES (:username, :email, :password)',
            {
                replacements: { username, email, password },
            }
        );

        console.log('User registered successfully:', result); // Debug successful registration
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error.message); // Debug backend errors
        res.status(500).json({ message: 'Failed to register user.', error: error.message });
    }
});

export default router;
