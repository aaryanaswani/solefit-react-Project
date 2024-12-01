import { DataTypes } from 'sequelize';
import { define } from '../db';

const User = define('User', {
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
        type: DataTypes.ENUM('customer'),
        allowNull: false,
        defaultValue: 'customer',
    },
});

export default User;
