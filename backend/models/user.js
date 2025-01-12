import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Ensure you're importing the correct sequelize instance

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure the username is unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure the email is unique
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false, // Make sure created_at is required
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true, // Allow null until updated
    },
}, {
    tableName: 'users', // Explicitly set the table name
    timestamps: true, // Enable timestamps for createdAt and updatedAt
});

export default User;
