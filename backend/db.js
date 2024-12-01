// db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';  // Import dotenv to use environment variables

dotenv.config();  // Load environment variables from .env file

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
    }
);

// Authenticate connection to the database
sequelize
    .authenticate()
    .then(() => console.log('Connected to the database!'))
    .catch((err) => console.error('Unable to connect to the database:', err));

export default sequelize;  // Export the sequelize instance for use in other files
