const express = require('express');
const jwt = require('jsonwebtoken');
const { Student } = require('./models'); // Adjust the path based on your project structure
const bcrypt = require('bcrypt'); // For password hashing
const JWT_SECRET = 'your_jwt_secret'; // Use environment variables in production
const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
    const { cet_number, password } = req.body;

    try {
        // Validate inputs
        if (!cet_number || !password) {
            return res.status(400).send({ error: 'CET Number and Password are required' });
        }

        // Sanitize the `cet_number` input
        const sanitizedCetNumber = cet_number.trim().replace(/['"]/g, '');

        // Debugging: Log the sanitized input
        console.log('Sanitized CET Number:', sanitizedCetNumber);

        // Find the student in the database by CET Number
        const student = await Student.findOne({
            where: { cet_number: sanitizedCetNumber }
        });

        // Debugging: Log the result of the database query
        console.log('Student Found:', student);

        if (!student) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        // Compare the hashed password with the provided password
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { student_id: student.student_id, cet_number: student.cet_number },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token as a response
        res.send({ token });

    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).send({ error: 'Error logging in. Please try again later.' });
    }
});

// Make sure your app listens on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
