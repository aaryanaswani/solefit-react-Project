import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin'),
        allowNull: false,
        defaultValue: 'admin',
    },
});

export default Admin;
