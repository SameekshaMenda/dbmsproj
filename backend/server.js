// // const app = require('express')
// import express from 'express';
// const app=express()
// import {getdata} from './dbcode.js'

// app.use(express.json())
// app.get('/getdata',async (req,res)=>{
//    const result= await getdata();
//    res.send(result);
// })
// app.get('/case',(req,res)=>{
//     res.send("hello");
// })

// app.listen(1234,()=>{
//     console.log('Server Started');
// })



//new code by aditi

// import express from 'express';
// import { getdata } from './dbcode.js';

// const app = express();
// app.use(express.json());

// // Endpoint to fetch data
// app.get('/getdata', async (req, res) => {
//     try {
//         const result = await getdata();
//         res.status(200).send(result);
//     } catch (error) {
//         console.error('Error in /getdata:', error.message);
//         res.status(500).send({ error: 'Failed to fetch data' });
//     }
// });

// // Test endpoint
// app.get('/case', (req, res) => {
//     res.send('hello');
// });

// // Start server
// const PORT = 1234;
// app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`);
// });


//new code by me

import express from 'express';
import cors from 'cors';  // Import CORS middleware
import mysql from 'mysql2/promise';  // Import the mysql2 promise-based client

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
}));
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',  // Use your MySQL host here
    user: 'root',       // Use your MySQL user here
    password: 'Sinchana@26',  // Use your MySQL password here
    database: 'kcet_seats',  // Use your MySQL database name here
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { cet_number, password } = req.body;
    console.log(req.body);

    if (!cet_number || !password) {
        return res.status(400).send({ error: 'CET Number and Password are required' });
    }

    try {
        // Query the database for the student
        const [rows] = await pool.query('SELECT * FROM students WHERE cet_number = ? AND password = ?', [cet_number, password]);

        if (rows.length === 0) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        // Successful login
        const student = rows[0];
        res.send({ message: 'Login successful', student });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).send({ error: 'Server error. Please try again later.' });
    }
});

// Dashboard endpoint to retrieve CET number, rank, and name details
app.post('/dashboard', async (req, res) => {
    const { cet_number, rank_number, name } = req.body;

    // Validate the inputs
    if (!cet_number || !rank_number || !name) {
        return res.status(400).send({ error: 'CET Number, Rank Number, and Name are required' });
    }

    try {
        // Check if the student already exists
        const checkQuery = 'SELECT * FROM students WHERE cet_number = ?';
        const [results] = await pool.query(checkQuery, [cet_number]);

        if (results.length > 0) {
            // Student already exists
            return res.status(200).send({ 
                message: 'Student already exists in the database',
                existingStudent: results[0]
            });
        }

        // If student does not exist, send the input data back as response
        res.status(200).send({
            message: 'Student not found in the database',
            newStudentDetails: {
                cet_number,
                rank_number,
                name
            }
        });

    } catch (error) {
        console.error('Dashboard Error:', error.message);
        res.status(500).send({ error: 'Failed to fetch student data. Please try again later.' });
    }
});

// API to fetch all branch details
app.get('/api/branches', async (req, res) => {
    try {
        
        const [results] = await pool.query('SELECT * FROM branches');
        res.json(results);
    } catch (err) {
        console.error('Error fetching branch data:', err);
        res.status(500).json({ error: 'Failed to fetch branch data' });
    }
});

// Route to fetch branch data with applied_count
app.get('/api/branches/withCount', async (req, res) => {
    try {
        const [results] = await pool.query(`
            SELECT 
                branches.*, 
                (SELECT COUNT(*) 
                 FROM student_choices 
                 WHERE student_choices.branch_name = branches.branch_name
                ) AS applied_count 
            FROM branches
        `);
        res.json(results);
    } catch (err) {
        console.error('Error fetching branch data with applied count:', err);
        res.status(500).json({ error: 'Failed to fetch branch data with applied count' });
    }
});

// API to update selected seats count
// app.post('/api/select-branch', async (req, res) => {
//     const { branch_id } = req.body; // Use branch_id to identify the branch

//     try {
//         // Update selected_seats and decrement available_seats
//         const [result] = await pool.query(
//             `UPDATE branches 
//              SET selected_seats = selected_seats + 1, 
//                  available_seats = available_seats - 1 
//              WHERE branch_id = ? AND available_seats > 0`,
//             [branch_id]
//         );

//         if (result.affectedRows > 0) {
//             res.json({ message: 'Branch selected successfully' });
//         } else {
//             res.status(400).json({ error: 'No available seats for this branch.' });
//         }
//     } catch (err) {
//         console.error('Error updating seat count:', err);
//         res.status(500).json({ error: 'Failed to update seat count' });
//     }
// });
// Store student choices in the database
  app.post('/api/submitChoices', async (req, res) => {
    try {
      // Extract data from the frontend
      const { choices } = req.body;
  
      // Validate the incoming data
      if (!Array.isArray(choices) || choices.length === 0) {
        return res.status(400).json({ error: 'Invalid or missing choices' });
      }
  
      // Insert data into the database
      const query = 'INSERT INTO student_choices (college_name, branch_name) VALUES (?, ?)';
      for (const choice of choices) {
        const { college, branch } = choice;
  
        // Ensure individual data is valid
        if (!college || !branch) {
          return res.status(400).json({ error: 'College and branch are required for each choice' });
        }
  
        // Execute the database query
        await pool.query(query, [college, branch]);
      }
  
      // Respond with success
      res.status(200).json({ message: 'Choices submitted successfully!' });
    } catch (err) {
      console.error('Error saving choices:', err);
      res.status(500).json({ error: 'Failed to save choices' });
    }
  });
  
  

// Start server
const PORT = 1234;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


/*app.post('/api/submitChoices', async (req, res) => {
    try {
        const { choices } = req.body;

        if (!Array.isArray(choices) || choices.length === 0) {
            return res.status(400).json({ error: 'Invalid or missing choices' });
        }

        // Insert each choice with a default "Pending" status
        const query = 'INSERT INTO student_choices (college_name, branch_name, status) VALUES (?, ?, "Pending")';
        for (const choice of choices) {
            const { college, branch } = choice;

            if (!college || !branch) {
                return res.status(400).json({ error: 'College and branch are required for each choice' });
            }

            await pool.query(query, [college, branch]);
        }

        res.status(200).json({ message: 'Choices saved temporarily! Confirm your selection to finalize.' });
    } catch (err) {
        console.error('Error saving choices:', err);
        res.status(500).json({ error: 'Failed to save choices' });
    }
});
*/
