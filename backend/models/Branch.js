const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Branch = sequelize.define('Branch', {
    branch_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    branch_name: { type: DataTypes.STRING, allowNull: false },
    college_name: { type: DataTypes.STRING, allowNull: false },
    total_seats: { type: DataTypes.INTEGER, allowNull: false },
    available_seats: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Branch;
