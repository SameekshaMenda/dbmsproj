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
    const { cet_number, password, role } = req.body;

    if (!cet_number || !password || !role) {
        return res.status(400).send({ error: 'CET Number, Password, and Role are required' });
    }

    try {
        let query = '';
        let params = [];

        // Select query based on role
        if (role === 'student') {
            query = 'SELECT * FROM students WHERE cet_number = ? AND password = ? LIMIT 1';
            params = [cet_number, password];
        } else if (role === 'admin') {
            query = 'SELECT * FROM admins WHERE admin_id = ? AND password = ? LIMIT 1';
            params = [cet_number, password];
        } else {
            return res.status(400).send({ error: 'Invalid role' });
        }

        console.log('Executing query:', query, 'with params:', params);

        const [rows] = await pool.query(query, params);

        // Check if no rows are returned
        if (rows.length === 0) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const user = rows[0]; // The first matching row
        res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).send({ error: 'Server error. Please try again later.' });
    }
});



// Dashboard endpoint to retrieve CET number, rank, and name details
app.post('/dashboard', async (req, res) => { 
    const { cet_number } = req.body;

    // Check if cet_number is provided
    if (!cet_number) {
      return res.status(400).send({ error: 'CET Number is required' });
    }

    try {
      // Query to fetch student details
      const query = 'SELECT cet_number, rank_number, name FROM students WHERE cet_number = ?';
      const [results] = await pool.query(query, [cet_number]);

      // If student is found, return the details
      if (results.length > 0) {
        return res.status(200).send({
          message: 'Student details retrieved successfully',
          student: results[0], // Ensure it returns the correct data for this cet_number
        });
      }

      // If no student is found, send a 404 response
      res.status(404).send({ message: 'Student not found' });
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
<<<<<<< HEAD
  app.post('/api/submitChoices', async (req, res) => {
=======
// POST: Submit choices
app.post('/api/submitChoices', async (req, res) => {
    const { cet_number, choices } = req.body;
  
>>>>>>> 36a286a27df53dd25e8fd9e156ef05f74da767d7
    try {
      // Step 1: Validate CET number
      const [student] = await pool.query('SELECT * FROM students WHERE cet_number = ?', [cet_number]);
      if (student.length === 0) {
        return res.status(400).send({ error: 'Invalid CET number' });
      }
  
      // Step 2: Check if choices are already submitted
      const [existingChoices] = await pool.query('SELECT * FROM student_choices WHERE cet_number = ?', [cet_number]);
      if (existingChoices.length > 0) {
        return res.status(400).send({ error: 'Choices already submitted for this CET number' });
      }
  
      // Step 3: Insert choices into the database
      const insertChoices = choices.map((choice, index) => [
        cet_number,
        choice.college_name,
        choice.branch_name,
        index + 1 // Priority is based on array index (1-based)
      ]);
  
      await pool.query(
        'INSERT INTO student_choices (cet_number, college_name, branch_name, priority) VALUES ?',
        [insertChoices]
      );
  
      // Step 4: Send success response
      res.send({ message: 'Choices submitted successfully!' });
    } catch (err) {
      console.error('Error submitting choices:', err);
      res.status(500).send({ error: 'Error submitting choices. Please try again later.' });
    }
  });
  
  // GET: Fetch choices for a CET number
  app.get('/api/getChoices/:cet_number', async (req, res) => {
    const { cet_number } = req.params;
  
    try {
      // Fetch choices from the database
      const [choices] = await pool.query(
        'SELECT college_name, branch_name, priority FROM student_choices WHERE cet_number = ? ORDER BY priority ASC',
        [cet_number]
      );
  
      if (choices.length === 0) {
        return res.status(404).send({ error: 'No choices found for this CET number' });
      }
  
      // Return the fetched choices
      res.send(choices);
    } catch (err) {
      console.error('Error fetching choices:', err);
      res.status(500).send({ error: 'Error fetching choices. Please try again later.' });
    }
  });
  
  

  
//---------------------------------------------admin---------------------------------
app.get('/api/admin_dashboard',async(req,res) =>{
    
})

app.post('/admin/close-choice-entry', async (req, res) => {
    try {
        // Update all students who have submitted their choices
        const updateQuery = 'UPDATE students SET choice_submitted = 1 WHERE choice_submitted = 0';
        await pool.query(updateQuery);
        
        res.send({ message: 'Choice entry has been closed for all students' });
    } catch (error) {
        console.error('Error closing choice entry:', error.message);
        res.status(500).send({ error: 'Server error. Please try again later.' });
    }
});


app.post('/admin/process-seat-allotment', async (req, res) => {
    try {
        // Fetch students who have submitted their choices
        const studentsQuery = `
            SELECT s.student_id, s.name, s.rank_number
            FROM students s
            WHERE s.choice_submitted = 1
            ORDER BY s.rank_number ASC`; // Students ordered by rank (1st rank first)

        const [students] = await pool.query(studentsQuery);

        if (students.length === 0) {
            return res.status(400).send({ error: 'No students with submitted choices' });
        }

        const seatAllotmentResults = [];

        for (const student of students) {
            // Fetch the student's choices
            const choicesQuery = `
                SELECT c.branch_id, c.priority
                FROM student_choices c
                WHERE c.cet_number = ?
                ORDER BY c.priority ASC`; // Fetch choices based on priority

            const [choices] = await pool.query(choicesQuery, [student.student_id]);

            if (choices.length === 0) {
                seatAllotmentResults.push({
                    student_id: student.student_id,
                    student_name: student.name,
                    status: 'No choices submitted',
                });
                continue;
            }

            let seatAllocated = false;

            for (const choice of choices) {
                // Check if the branch has available seats
                const seatCheckQuery = `
                    SELECT available_seats
                    FROM branches
                    WHERE branch_id = ? AND available_seats > 0`;

                const [branch] = await pool.query(seatCheckQuery, [choice.branch_id]);

                if (branch.length > 0) {
                    // Allocate seat and update the branch table
                    const allocateSeatQuery = `
                        UPDATE branches
                        SET available_seats = available_seats - 1, selected_seats = selected_seats + 1
                        WHERE branch_id = ?`;

                    await pool.query(allocateSeatQuery, [choice.branch_id]);

                    seatAllotmentResults.push({
                        student_id: student.student_id,
                        student_name: student.name,
                        branch_id: choice.branch_id,
                        status: 'Seat allocated',
                    });

                    seatAllocated = true;
                    break; // Break loop once a seat is allocated
                }
            }

            if (!seatAllocated) {
                seatAllotmentResults.push({
                    student_id: student.student_id,
                    student_name: student.name,
                    status: 'No seats available for preferred choices',
                });
            }
        }

        res.send({
            message: 'Seat allotment processed successfully',
            seat_allotments: seatAllotmentResults,
        });
    } catch (error) {
        console.error('Error processing seat allotment:', error.message);
        res.status(500).send({ error: 'Failed to process seat allotment. Please try again later.' });
    }
});


app.get('/choiceentry/collegeSeatTable', async (req, res) => {
    try {
        const query = 'SELECT * FROM seat_allocation WHERE round = 1'; // Get seat allocation for 1st round
        const [seatAllocations] = await pool.query(query);

        res.render('collegeSeatTable', { seatAllocations });
    } catch (error) {
        console.error('Error fetching seat allocation:', error.message);
        res.status(500).send({ error: 'Failed to load college seat table' });
    }
});

//============================
// Assume you have a MySQL database and pool setup

// POST /api/remove-choice - Removes a branch from the selected list
app.post('/api/remove-choice', async (req, res) => {
    const { cet_number, branch_id } = req.body; // Expect cet_number and branch_id in the body

    if (!cet_number || !branch_id) {
        return res.status(400).send({ error: 'CET Number and Branch ID are required' });
    }

    try {
        // Fetch the branch details for the cet_number
        const selectQuery = 'SELECT branch_name FROM selected_branches WHERE cet_number = ? AND branch_id = ?';
        const [selectedBranch] = await pool.query(selectQuery, [cet_number, branch_id]);

        if (selectedBranch.length === 0) {
            return res.status(404).send({ message: 'Branch not found in the selected list' });
        }

        const branch_name = selectedBranch[0].branch_name;

        // Delete the branch from the cet_number's selected list
        const deleteQuery = 'DELETE FROM selected_branches WHERE cet_number = ? AND branch_id = ?';
        await pool.query(deleteQuery, [cet_number, branch_id]);

        // Update the available and selected seats in the branches table
        const updateQuery = `
            UPDATE branches
            SET available_seats = available_seats + 1, selected_seats = selected_seats - 1
            WHERE branch_id = ?
        `;
        await pool.query(updateQuery, [branch_id]);

        res.status(200).send({ message: 'Branch removed successfully' });
    } catch (error) {
        console.error('Error removing branch:', error.message);
        res.status(500).send({ error: 'Failed to remove branch. Please try again later.' });
    }
});



// POST /api/select-branch - Adds a branch to the selected list
app.post('/api/select-branch', async (req, res) => {
    const { cet_number, branch_id } = req.body; // Expect cet_number and branch_id in the body

    if (!cet_number || !branch_id) {
        return res.status(400).send({ error: 'CET Number and Branch ID are required' });
    }

    try {
        // Check if the branch is available
        const checkBranchQuery = 'SELECT available_seats, branch_name FROM branches WHERE branch_id = ?';
        const [branchResult] = await pool.query(checkBranchQuery, [branch_id]);

        if (branchResult.length === 0) {
            return res.status(404).send({ error: 'Branch not found' });
        }

        const { available_seats, branch_name } = branchResult[0];

        // If there are available seats, proceed to select the branch
        if (available_seats > 0) {
            // Insert into the selected_branches table
            const insertQuery = 'INSERT INTO selected_branches (cet_number, branch_id, branch_name) VALUES (?, ?, ?)';
            await pool.query(insertQuery, [cet_number, branch_id, branch_name]);

            // Update the available and selected seats in the branches table
            const updateQuery = `
                UPDATE branches
                SET available_seats = available_seats - 1, selected_seats = selected_seats + 1
                WHERE branch_id = ?
            `;
            await pool.query(updateQuery, [branch_id]);

            res.status(200).send({ message: 'Branch added successfully' });
        } else {
            res.status(400).send({ message: 'No available seats for this branch' });
        }
    } catch (error) {
        console.error('Error selecting branch:', error.message);
        res.status(500).send({ error: 'Failed to select branch. Please try again later.' });
    }
});


// GET /api/get-selected-choices - Fetches all branches in the user's selected list
app.get('/api/get-selected-choices', async (req, res) => {
    const { cet_number } = req.query; // Expect cet_number as a query parameter

    if (!cet_number) {
        return res.status(400).send({ error: 'CET Number is required' });
    }

    try {
        // Fetch all branches selected by the cet_number with additional seat details
        const query = `
            SELECT sb.branch_name, b.total_seats, b.available_seats, b.selected_seats
            FROM selected_branches sb
            JOIN branches b ON sb.branch_id = b.branch_id
            WHERE sb.cet_number = ?
        `;
        const [results] = await pool.query(query, [cet_number]);

        if (results.length === 0) {
            return res.status(404).send({ message: 'No branches found in the selected list' });
        }

        res.status(200).send({
            message: 'Selected branches retrieved successfully',
            selected_branches: results,
        });
    } catch (error) {
        console.error('Error fetching selected branches:', error.message);
        res.status(500).send({ error: 'Failed to fetch selected branches. Please try again later.' });
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
