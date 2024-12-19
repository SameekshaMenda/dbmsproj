const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary

const Student = sequelize.define('Student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cet_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensures no duplicate CET numbers
    },
    rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Store hashed passwords here
    },
}, {
    tableName: 'Student', // Explicitly define table name to match DB
    timestamps: true, // Enables createdAt and updatedAt fields
});

module.exports = Student;
