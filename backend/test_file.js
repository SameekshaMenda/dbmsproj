//to verify the database connection
require('dotenv').config(); // Load environment variables
const sequelize = require('./config/db'); // Adjust the path as necessary

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!');

        // Fetch data from the 'students' table
        const [results] = await sequelize.query('SELECT * FROM Students');
        console.log('Students:', results); // Log the fetched data
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();
