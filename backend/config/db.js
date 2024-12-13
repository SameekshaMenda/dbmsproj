require('dotenv').config();  // Load environment variables
const { Sequelize } = require('sequelize');

// Database connection using environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;