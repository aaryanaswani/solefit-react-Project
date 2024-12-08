import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Cart = sequelize.define('Cart', {
    cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Add autoIncrement since it's a primary key
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER, // Corrected field name to match schema
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
}, {
    tableName: 'cart', // Explicitly set table name
    timestamps: false, // Disable timestamps if not needed
});

export default Cart;
