//Student Model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
    student_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cet_number: { type: DataTypes.STRING, unique: true, allowNull: false },
    rank: { type: DataTypes.INTEGER, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Student;
