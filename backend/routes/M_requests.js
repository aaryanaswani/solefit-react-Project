import { Router } from 'express';
import sequelize from '../db.js';
import nodemailer from 'nodemailer'; // To send emails
import dotenv from 'dotenv'; // For environment variables (email configuration)

dotenv.config(); // Load environment variables

const router = Router();

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your preferred email service
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
});

// Get all requests
router.get('/', async (req, res) => {
    try {
        const [requests] = await sequelize.query(
            `SELECT 
                request_id,
                user_id, 
                name,
                email, 
                phone, 
                message,
                response,
                status,
                created_at,
                updated_at
             FROM requests`
        );
        res.json(requests);
    } catch (err) {
        console.error('Error fetching requests:', err.message);
        res.status(500).json({ message: 'Failed to fetch requests.', error: err.message });
    }
});

// Update a request (admin response and status change)
router.put('/:request_id', async (req, res) => {
    const { request_id } = req.params;
    const { response } = req.body;

    try {

        // Update the request in the database
        await sequelize.query(
            `UPDATE requests
             SET response = ?, status = ?, updated_at = NOW()
             WHERE request_id = ?`,
            {
                replacements: [response,'Resolved',request_id],
            }
        );

        // Get the user's email to send the response
        const [[user]] = await sequelize.query(
            `SELECT email, name FROM requests WHERE request_id = ?`,
            {
                replacements: [request_id],
            }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found for the given request.' });
        }

        // Send email to the user with the response
        const mailOptions = {
            from: process.env.EMAIL, // Sender address
            to: user.email, // Recipient address
            subject: 'Your Request Response', // Email subject
            text: `Hi ${user.name},\n\nWe have reviewed your request. Here is our response:\n\nResponse: ${response}\n\nThank you for reaching out to us.`, // Email body
        };

        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending response email:', err.message);
                return res.status(500).json({ message: 'Failed to send response email.' });
            }
            console.log('Response email sent:', info.response);
        });

        res.status(200).json({ message: 'Request updated successfully and response email sent.' });
    } catch (err) {
        console.error('Error updating request:', err.message);
        res.status(500).json({ message: 'Failed to update request.', error: err.message });
    }
});

export default router;
