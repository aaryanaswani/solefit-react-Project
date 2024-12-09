import { DataTypes } from 'sequelize';
import { define } from '../db.js';

const Order = define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Delivered'),
        defaultValue: 'Pending',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Order;
