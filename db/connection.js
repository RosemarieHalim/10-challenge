const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'fEv?tXW-E3#m^Xap-c',
      database: 'employee_tracker'
    },
    console.log('Connected to the employee database.')
);

module.exports = db;