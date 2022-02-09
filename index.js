// import mysql2
const mysql = require('mysql2')
// import inquirer 
const { prompt } = require('inquirer');
// import console.table
require('console.table');
// import database
const db = require('./db');
const inquirer = require('inquirer');

const init = () => {
    console.log('hello what do you want to do?');
    promptUser();
}
// inquirer prompt for first action
const promptUser = () => {
    // console.log("===================================")
    // console.log("=        EMPLOYEE MANAGER         =")
    // console.log("===================================")
    inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    {
                        name: 'View all departments',
                        value: 'View all departments',
                    },
                    {
                        name: 'View all roles',
                        value: 'View all roles',
                    },
                    {
                        name: 'View all employees',
                        value: 'View all employees',
                    },
                    {
                        name: 'Add a department',
                        value: 'Add a department',
                    },
                    {
                        name: 'Add a role',
                        value: 'Add a role',
                    },
                    {
                        name: 'Add a employee',
                        value: 'Add a employee',
                    },
                    {
                        name: 'Update an employee role',
                        value: 'Update an employee role',
                    },
                    {
                        name: 'Update an employee manager',
                        value: 'Update an employee manager',
                    },
                    {
                        name: 'View employees by department',
                        value: 'View employees by department',
                    },
                    {
                        name: 'Delete a department',
                        value: 'Delete a department',
                    },
                    {
                        name: 'Delete a role',
                        value: 'Delete a role',
                    },
                    {
                        name: 'Delete an employee',
                        value: 'Delete an employee',
                    },
                    {
                        name: 'View all deparment budgets',
                        value: 'View all deparment budgets',
                    },
                    {
                        name: 'Quit',
                        value: 'Quit',
                    },
                ],
            },
    ]).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })

    //     .then((answers) => {
    //         const { choice } = answers;
    //         console.log(choice);
    //         switch (choice) {
    //             case 'View all departments':
    //                 showDepartments();
    //                 break;
    //             case 'View all roles':
    //                 showRoles();
    //                 break;
    //             default:
    //             // quitApp();
    //         }
    // });
};


// function to show all departments 
const showDepartments = () => {
    console.log('Showing all departments...\n');
    // const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    db.findAllDepartments()
        .then(([rows]) => {
            console.log(rows);
        })
};

// function to show all roles 
const showRoles = () => {
    console.log('Showing all roles...\n');

    const sql = `SELECT role.id, role.title, department.name AS department
                    FROM role
                    INNER JOIN department ON role.department_id = department.id`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    })
};

// function to show all employees 
const showEmployees = () => {
    console.log('Showing all employees...\n');
    const sql = `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        department.name AS department,
                        role.salary, 
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager
                    FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

// function to add a department 
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: "What department do you want to add?",
            validate: addDept => {
                if (addDept) {
                    return true;
                } else {
                    console.log('Please enter a department');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const sql = `INSERT INTO department (name)
                    VALUES (?)`;
            connection.query(sql, answer.addDept, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.addDept + " to departments!");

                showDepartments();
            });
        });
};

// function to add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What role do you want to add?",
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter a role');
                    return false;
                }
            }
        },
        // need to add in salary, department, etc?
    ])
};


// function to add an employee

// function to update an employee

// function to view employee by department

// function to delete department

// function to delete role

// function to delete employees

// view department budget 


init();