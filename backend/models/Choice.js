const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./Student');
const Branch = require('./Branch');

const Choice = sequelize.define('Choice', {
    choice_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    priority: { type: DataTypes.INTEGER, allowNull: false },
});

Choice.belongsTo(Student, { foreignKey: 'student_id' });
Choice.belongsTo(Branch, { foreignKey: 'branch_id' });

module.exports = Choice;
