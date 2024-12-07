import { Router } from 'express';
import sequelize from '../db.js'; // Import Sequelize instance

const router = Router();

// Login route
router.post('/login', async (req, res) => {
    const { username, password, panel } = req.body;

    try {
        const tableName = panel === 'admin' ? 'Admins' : 'Users';

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

        res.json({ id: user.id, username: user.username, panel });
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

export default router;
