const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(bodyParser.json());

app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);

// Sync Database
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(5000, () => {
        console.log('Server running on http://localhost:5000');
    });
});
