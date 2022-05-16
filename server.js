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

const viewEmployee = async () => {
  console.log('Employee View');
  try {
    let query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
      if (err) throw err;
      let employeeArray = [];
      res.forEach(employee => employeeArray.push(employee));
      console.table(employeeArray);
      startupAction();
      });
  } catch (err) {
      console.log(err);
      startupAction();
  };
}

const viewDepartment = async () => {
  console.log('Department View');
  try {
    let query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
      if (err) throw err;
      let departmentArray = [];
      res.forEach(department => departmentArray.push(department));
      console.table(departmentArray);
      startupAction();
    });
  } catch (err) {
    console.log(err);
    startupAction();
  };
}

const viewRole = async () => {
  console.log('Role View');
  try {
    let query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
      if (err) throw err;
      let roleArray = [];
      res.forEach(role => roleArray.push(role));
      console.table(roleArray);
      startupAction();
    });
  } catch (err) {
    console.log(err);
    startupAction();
  };
}

const addEmployee = async () => {
  try {
    console.log('Employee Add');

    let roles = await connection.query("SELECT * FROM role");

    let managers = await connection.query("SELECT * FROM employee");

    let answer = await inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Please type the first name of the Employee.'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Please type the last name of the Employee.'
      },
      {
        name: 'employeeRoleId',
        type: 'list',
        choices: roles.map((role) => {
          return {
            name: role.title,
            value: role.id
          }
        }),
        message: "What is this Employee's role id?"
      },
      {
        name: 'managerId',
        type: 'list',
        choices: managers.map((manager) => {
          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id
          }
        }),
        message: "What is this Employee's Manager's Id?"
      }
    ])

    let result = await connection.query("INSERT INTO employee SET ?", {
      first_name: answer.firstName,
      last_name: answer.lastName,
      role_id: (answer.employeeRoleId),
      manager_id: (answer.employeeManagerId)
    });

    console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
    startupAction();

  } catch (err) {
    console.log(err);
    startupAction();
  };
}

const addDepartment = async () => {
  try {
    console.log('Department Add');

    let answer = await inquirer.prompt([
      {
        name: 'deptName',
        type: 'input',
        message: 'What is the name of your new department?'
      }
    ]);

    let result = await connection.query("INSERT INTO department SET ?", {
      department_name: answer.deptName
    });

    console.log(`${answer.deptName} added successfully to departments.\n`)
    startupAction();

  } catch (err) {
      console.log(err);
      startupAction();
  };
}

const addRole = async () => {
  try {
    console.log('Role Add');

    let departments = await connection.query("SELECT * FROM department")

    let answer = await inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the name of the new role?'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What salary will this role provide?'
        },
        {
          name: 'departmentId',
          type: 'list',
          choices: departments.map((departmentId) => {
            return {
              name: departmentId.department_name,
              value: departmentId.id
            }
          }),
          message: 'What department ID is this role associated with?',
        }
    ]);
    
    let chosenDepartment;
    for (i = 0; i < departments.length; i++) {
      if(departments[i].department_id === answer.choice) {
        chosenDepartment = departments[i];
      };
    }
    let result = await connection.query("INSERT INTO role SET ?", {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentId
    })

    console.log(`${answer.title} role added successfully.\n`)
    startupAction();

  } catch (err) {
    console.log(err);
    startupAction();
  };
}

const updateEmployee = async () => {
  try {
    console.log('Employee Update');
    
    let employees = await connection.query("SELECT * FROM employee");

    let employeeSelection = await inquirer.prompt([
      {
        name: 'employee',
        type: 'list',
        choices: employees.map((employeeName) => {
          return {
            name: employeeName.first_name + " " + employeeName.last_name,
            value: employeeName.id
          }
        }),
        message: 'Please choose an employee to update.'
      }
    ]);

    let roles = await connection.query("SELECT * FROM role");

    let roleSelection = await inquirer.prompt([
        {
          name: 'role',
          type: 'list',
          choices: roles.map((roleName) => {
            return {
              name: roleName.title,
              value: roleName.id
            }
          }),
          message: 'Please select the role to update the employee with.'
        }
    ]);

    let result = await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);

    console.log(`The role was successfully updated.\n`);
    startupAction();

  } catch (err) {
    console.log(err);
    startupAction();
  };
}