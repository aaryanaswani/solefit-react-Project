import { Router } from 'express';
import sequelize from '../db.js';

const router = Router();

// POST route to handle contact form submission
router.post('/', async (req, res) => {
    const { name, email, phone, message, userId } = req.body;

    console.log('Contact Form Submission:', req.body); // Debugging: Log incoming request

    if (!name || !email || !phone) {
        console.error('Validation Error: Missing required fields');
        return res.status(400).json({ message: 'Please fill all required fields' });
    }

    try {
        // Insert the contact request into the "requests" table
        await sequelize.query(
            `INSERT INTO requests (user_id, name, email, phone, message, created_at)
             VALUES (:userId, :name, :email, :phone, :message, NOW())`,
            { replacements: { userId, name, email, phone, message }, type: sequelize.QueryTypes.INSERT }
        );

        console.log('Contact request saved successfully:', { name, email, phone });

        res.status(200).json({ message: 'Your message has been submitted successfully!' });
    } catch (error) {
        console.error('Error saving contact request:', error);
        res.status(500).json({ message: 'An error occurred while saving your message. Please try again later.', error: error.message });
    }
});

export default router;
