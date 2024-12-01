import { DataTypes } from 'sequelize';
import { define } from '../db';

const Admin = define('Admin', {
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
