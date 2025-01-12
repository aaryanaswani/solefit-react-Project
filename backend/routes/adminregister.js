import express from 'express';
import bcrypt from 'bcryptjs'; // For hashing passwords
import sequelize from '../db.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Register a new admin
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if admin with the provided email already exists
        const [existingAdmin] = await sequelize.query(
            'SELECT * FROM admins WHERE email = :email',
            { replacements: { email } }
        );

        if (existingAdmin.length) {
            return res.status(400).json({ message: 'Admin with this email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new admin into the database
        const [result] = await sequelize.query(
            'INSERT INTO admins (username, email, password) VALUES (:username, :email, :password)',
            {
                replacements: { username, email, password: hashedPassword },
            }
        );

        // Send a welcome email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Welcome to Cartsy!',
            text: `Hi ${username},\n\nThank you for registering as an Admin on Cartsy! We're excited to have you on board and help manage the platform.\n\nBest regards,\nThe Cartsy Team`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending welcome email:', err.message);
                return res.status(500).json({ message: 'Failed to send welcome email.' });
            }
            console.log('Welcome email sent:', info.response);
        });

        res.status(201).json({ message: 'Admin registered successfully.' });
    } catch (error) {
        console.error('Error registering admin:', error.message);
        res.status(500).json({ message: 'Failed to register admin.', error: error.message });
    }
});

export default router;
