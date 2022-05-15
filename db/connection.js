const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'fEv?tXW-E3#m^Xap-c',
      database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;