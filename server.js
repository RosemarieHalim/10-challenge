const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

console.table(
  "EMPLOYEE TRACKER"
);

const startupAction = async () => {
  try {
    let answer = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'Select your choice:',
      choices: [
        'View All Employees',
        'View All Departments',
        'View All Roles',
        'Add Employee',
        'Add Department',
        'Add Role',
        'Update Employee Role',
        'Exit'
      ]
    });
    switch (answer.action) {
      case 'View All Employees':
        viewEmployee();
        break;

      case 'View All Departments':
        viewDepartment();
        break;

      case 'View All Roles':
        viewRole();
        break;

      case 'Add Employee':
        addEmployee();
        break

      case 'Add Department':
        addDepartment();
        break

      case 'Add Role':
        addRole();
        break

      case 'Update Employee Role':
        updateEmployee();
        break

      case 'Exit':
        connection.end();
        break;
    };
  } catch (err) {
    console.log(err);
    startupAction();
  };
}