

//  // For password hashing
// // const mysql = require('mysql2/promise'); // Use mysql2 for async/await support
// import mysql from 'mysql2'

// // const app = express();

// // const JWT_SECRET = 'your_jwt_secret'; // Use environment variables in production



// const db = mysql.createPool({
//     host: 'localhost',       // Replace with your database host
//     user: 'root',            // Replace with your database user
//     password: '4SF22CD036', // Replace with your database password
//     database: 'kcet_seats'  // Replace with your database name
// }).promise;

// export async function getdata(){
//     const result=await db.query("Select * from kcet_seats");
//     const rows=result[0];
//     return rows;
// }


// // app.post('/login', async (req, res) => {
// //     const { cet_number, password } = req.body;

// //     try {
// //         // Validate inputs
// //         if (!cet_number || !password) {
// //             return res.status(400).send({ error: 'CET Number and Password are required' });
// //         }

// //         // Sanitize inputs
// //         const sanitizedCetNumber = cet_number.trim().replace(/['"]/g, '');

// //         // Debugging: Log the sanitized input
// //         console.log('Sanitized CET Number:', sanitizedCetNumber);

// //         // Query to find the student
// //         const [studentRows] = await db.query(
// //             'SELECT * FROM students WHERE cet_number = ?',
// //             [sanitizedCetNumber]
// //         );

// //         if (studentRows.length === 0) {
// //             return res.status(401).send({ error: 'Invalid credentials' });
// //         }

// //         const student = studentRows[0]; // Extract the student record

// //         // Debugging: Log the student record
// //         console.log('Student Found:', student);

// //         // Compare hashed password
// //         const isPasswordValid = await bcrypt.compare(password, student.password);
// //         if (!isPasswordValid) {
// //             return res.status(401).send({ error: 'Invalid credentials' });
// //         }

// //         // Generate JWT token
// //         const token = jwt.sign(
// //             { student_id: student.student_id, cet_number: student.cet_number },
// //             JWT_SECRET,
// //             { expiresIn: '1h' }
// //         );

// //         // Insert login log into the database
// //         await db.query(
// //             'INSERT INTO login_logs (student_id, cet_number, login_time) VALUES (?, ?, ?)',
// //             [student.student_id, sanitizedCetNumber, new Date()]
// //         );

// //         // Debugging: Log the successful login
// //         console.log('Login successful. Token generated.');

// //         // Send the token as a response
// //         res.send({ token });

// //     } catch (error) {
// //         console.error('Login Error:', error.message);
// //         res.status(500).send({ error: 'Error logging in. Please try again later.' });
// //     }
// // });

// // // Start the server
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}`);
// // });



//new code by aditi


// import mysql from 'mysql2';

// const db = mysql.createPool({
//     host: 'localhost',       // Replace with your database host
//     user: 'root',            // Replace with your database user
//     password: '4SF22CD036',  // Replace with your database password
//     database: 'kcet_seats'   // Replace with your database name
// }).promise();

// export async function getdata() {
//     try {
//         const [rows] = await db.query("SELECT * FROM students"); // Proper destructuring
//         return rows;
//     } catch (error) {
//         console.error('Database Query Error:', error.message);
//         throw new Error('Failed to retrieve data');
//     }
// }


//new code by sameeksha
import mysql from 'mysql2';
import mysql from 'mysql2/promise'; 
// Create a connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '4SF22CD036',
    database: 'kcet_seats'
    
}).promise();

export default db;
