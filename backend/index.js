const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Student = require('./models/Student'); // Your Student model
const Branch = require('./models/Branch');
const Choice = require('./models/Choice');

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON requests

// Add Branch
app.post('/branches', async (req, res) => {
    const { branch_name, college_name, total_seats } = req.body;
    try {
        const branch = await Branch.create({
            branch_name,
            college_name,
            total_seats,
            available_seats: total_seats,
        });
        res.send({ message: 'Branch added successfully', branch });
    } catch (error) {
        res.status(500).send({ error: 'Error adding branch' });
    }
});

// Login Route (for students)
app.post('/login', async (req, res) => {
    const { cet_number, password } = req.body;

    try {
        // Debugging: Log input data
        console.log('Login Request:', { cet_number, password });

        // Find student in the database
        const student = await Student.findOne({ where: { cet_number, password } });

        // Debugging: Log the result of the database query
        console.log('Student Found:', student);

        if (!student) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { student_id: student.id, cet_number: student.cet_number },
            'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.send({ token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send({ error: 'Error logging in' });
    }
});


// Student Choice Entry
app.post('/choices', async (req, res) => {
    const { student_id, branch_id, priority } = req.body;
    try {
        const existingChoice = await Choice.findOne({ where: { student_id, branch_id } });

        if (existingChoice) {
            // If the choice already exists, update it
            await existingChoice.update({ priority });
            return res.send({ message: 'Choice updated successfully' });
        }

        // Otherwise, create a new choice
        const choice = await Choice.create({
            student_id,
            branch_id,
            priority,
        });

        res.send({ message: 'Choice added successfully', choice });
    } catch (error) {
        res.status(500).send({ error: 'Error adding choice' });
    }
});

// Get Choices for a Student
app.get('/choices/:student_id', async (req, res) => {
    const student_id = req.params.student_id;
    try {
        const choices = await Choice.findAll({ where: { student_id } });
        res.send({ choices });
    } catch (error) {
        res.status(500).send({ error: 'Error fetching choices' });
    }
});

// Close Choice Entry (For Allotment Logic Later)
app.post('/close-entry', async (req, res) => {
    // Placeholder for allotment logic
    res.send({ message: 'Choice entry closed' });
});

// Start the server
app.listen(3100, () => {
    console.log('Server is running on http://localhost:3100');
});
