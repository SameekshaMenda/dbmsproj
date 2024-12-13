const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Branch = require('../models/Branch');
const Choice = require('../models/Choice');
require('dotenv').config();

const router = express.Router();

// Register Student
router.post('/register', async (req, res) => {
    const { cet_number, rank, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const student = await Student.create({ cet_number, rank, password: hashedPassword });
        res.status(201).send({ message: 'Student registered', student });
    } catch (error) {
        res.status(500).send({ error: 'Error registering student' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { cet_number, password } = req.body;

    try {
        const student = await Student.findOne({ where: { cet_number } });
        if (!student || !(await bcrypt.compare(password, student.password))) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ student_id: student.student_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send({ error: 'Error logging in' });
    }
});

// View Branches
router.get('/branches', async (req, res) => {
    try {
        const branches = await Branch.findAll();
        res.send(branches);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching branches' });
    }
});

// Make Choice Entry
router.post('/choices', async (req, res) => {
    const { student_id, choices } = req.body;

    try {
        await Promise.all(
            choices.map(async (choice) => {
                await Choice.create({
                    student_id,
                    branch_id: choice.branch_id,
                    priority: choice.priority,
                });
            })
        );
        res.send({ message: 'Choices saved successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error saving choices' });
    }
});

module.exports = router;
