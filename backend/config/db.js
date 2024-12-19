const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,    // Database name
    process.env.DB_USER,    // Database user
    process.env.DB_PASSWORD, // Database password
    {
        host: process.env.DB_HOST, // Database host
        dialect: 'mysql',         // Change to your database type if necessary
        logging: false,           // Disable SQL query logging (optional)
    }
);

module.exports = sequelize;
