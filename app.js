const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = []


function getTeamInfo() {
    console.log("Welcome to the team builder!");

    const addEmployee = () => {
        inquirer.prompt([
        {
            type: "list",
            name: "addingChoice",
            message: "Would you like to add an employee?",
            choices: ["Yes", "No"]
        }
        ]).then( async answer => {
            if (answer.addingChoice === "Yes") {
                await inquirer.prompt([
                    {
                        type: "list",
                        name: "employeeRole",
                        message: "What is the next employee's role?",
                        choices: ["Manager", "Engineer", "Intern"]
                    }
                ]).then( async answer => {
                    console.log(answer.employeeRole);
                    if (answer.employeeRole === "Manager") {
                        await inquirer.prompt([
                            {
                                type: "input",
                                name: "managerName",
                                message: "What is the Manager's name?"
                            },
                            {
                                type: "input",
                                name: "managerId",
                                message: "What is the Manager's ID?"
                            },
                            {
                                type: "input",
                                name: "managerEmail",
                                message: "What is the Manager's email address?"
                            },
                            {
                                type: "input",
                                name: "managerOfficeNumber",
                                message: "What is the Manager's office number?"
                            }
                        ]).then(answers => {
                            const manager = new Manager(
                                answers.managerName, 
                                answers.managerId, 
                                answers.managerEmail, 
                                answers.managerOfficeNumber
                            );

                            employees.push(manager);

                            addEmployee();

                        })
                    } 

                    else  if (answer.employeeRole === "Engineer") {
                        await inquirer.prompt([
                            {
                                type: "input",
                                name: "engineerName",
                                message: "What is the Engineer's name?"
                            },
                            {
                                type: "input",
                                name: "engineerId",
                                message: "What is the Engineer's ID?"
                            },
                            {
                                type: "input",
                                name: "engineerEmail",
                                message: "What is the Engineer's email address?"
                            },
                            {
                                type: "input",
                                name: "engineerGithub",
                                message: "What is the Engineer's GitHub username?"
                            }
                        ]).then(answers => {
                            const engineer = new Engineer(
                                answers.engineerName, 
                                answers.engineerId, 
                                answers.engineerEmail, 
                                answers.engineerGithub
                            );

                            employees.push(engineer);


                            addEmployee();

                        })                    
                    }

                    else  if (answer.employeeRole === "Intern") {
                        await inquirer.prompt([
                            {
                                type: "input",
                                name: "internName",
                                message: "What is the Intern's name?"
                            },
                            {
                                type: "input",
                                name: "internId",
                                message: "What is the Intern's ID?"
                            },
                            {
                                type: "input",
                                name: "internEmail",
                                message: "What is the Intern's email address?"
                            },
                            {
                                type: "input",
                                name: "internSchool",
                                message: "What is the Intern's school?"
                            }
                        ]).then(answers => {
                            const intern = new Intern(
                                answers.internName, 
                                answers.internId, 
                                answers.internEmail, 
                                answers.internSchool
                            );

                            employees.push(intern);

                            addEmployee();

                        })                    
                    }
                
                })

            } else if (answer.addingChoice === "No") {
                await buildTeam();
            }
        })

    }

    addEmployee();
    

};

getTeamInfo();

function buildTeam() {
    fs.writeFileSync(outputPath, render(employees), "utf-8");
}






