import { Router } from 'express';
import sequelize from '../db.js'; // Replace with your Sequelize database connection file

const router = Router();

// POST route to handle contact form submission
router.post('/', async (req, res) => {
    const { name, email, phone, message } = req.body;

    console.log('Contact Form Submission:', req.body); // Debugging: Log incoming request

    if (!name || !email || !phone) {
        console.error('Validation Error: Missing required fields');
        return res.status(400).json({ message: 'Please fill all required fields' });
    }

    try {
        // Insert the contact request into the "request" table
        await sequelize.query(
            `INSERT INTO request (name, email, phone, message, created_at)
             VALUES (:name, :email, :phone, :message, NOW())`,
            { replacements: { name, email, phone, message }, type: sequelize.QueryTypes.INSERT }
        );

        console.log('Contact request saved successfully:', { name, email, phone });

        res.status(200).json({ message: 'Your message has been submitted successfully!' });
    } catch (error) {
        console.error('Error saving contact request:', error);
        res.status(500).json({ message: 'An error occurred while saving your message. Please try again later.', error: error.message });
    }
});

export default router;
