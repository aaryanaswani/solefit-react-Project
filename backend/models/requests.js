
const Request = sequelize.define('Request', {
    request_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming this is optional
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {  // Updated to match your column name
        type: DataTypes.STRING,  // Assuming it's a string for phone numbers
        allowNull: false,
    },
    messages: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'requests', // Explicitly set table name
    timestamps: true, // Enable timestamps
});

export default Request;
