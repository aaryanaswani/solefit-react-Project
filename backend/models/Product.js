import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Product = sequelize.define('product', {
    Product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, // Use TEXT for longer descriptions
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING, // Assuming the image field stores image URLs
        allowNull: false,
    },
});

export default Product;
