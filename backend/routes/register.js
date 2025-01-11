import express from 'express';
import sequelize from '../db.js'; // Your database connection
import nodemailer from 'nodemailer'; // For sending emails

const router = express.Router();

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail or any other email service
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
    },
});

// Register a new user
router.post('/register', async (req, res) => {
    console.log('Register endpoint hit:', req.body); // Log incoming request

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        console.log('Missing fields:', { username, email, password }); // Debug missing fields
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if email already exists
        const [existingUser] = await sequelize.query(
            'SELECT * FROM users WHERE email = :email',
            { replacements: { email } }
        );

        if (existingUser.length) {
            console.log('Duplicate email:', email); // Debug duplicate email
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Insert new user into the database
        const [result] = await sequelize.query(
            'INSERT INTO users (username, email, password) VALUES (:username, :email, :password)',
            {
                replacements: { username, email, password },
            }
        );

        console.log('User registered successfully:', result); // Debug successful registration

        // Send a welcome email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Welcome to Cartsy!',
            text: `Hi ${username},\n\nThank you for registering on Cartsy! We're excited to have you on board.\n\nBest regards,\nThe Cartsy Team`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending welcome email:', err.message);
            } else {
                console.log('Welcome email sent:', info.response);
            }
        });

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error.message); // Debug backend errors
        res.status(500).json({ message: 'Failed to register user.', error: error.message });
    }
});

export default router;
