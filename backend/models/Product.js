// models/Product.js
import { Sequelize, DataTypes } from 'sequelize'; 
import sequelize from '../db';  // Import Sequelize instance

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,  // Assuming the image field stores image URLs or paths
        allowNull: false,
    }
});

// Export the Product model using ES module export
export default Product;
