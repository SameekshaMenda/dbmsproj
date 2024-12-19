const bcrypt = require('bcrypt');
const Student = require('./models/Student');

(async () => {
    try {
        const students = await Student.findAll();
        for (const student of students) {
            const hashedPassword = await bcrypt.hash(student.password, 10);
            await student.update({ password: hashedPassword });
        }
        console.log('Passwords hashed successfully');
    } catch (error) {
        console.error('Error hashing passwords:', error.message);
    }
})();
