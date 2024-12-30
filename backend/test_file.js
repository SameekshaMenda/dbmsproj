// test_file.js
import express from 'express'; // Import Express
const app = express(); // Initialize the Express app

// Your route definition
app.get('/test-db', async (req, res) => {
    res.send('Database connection test successful');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
