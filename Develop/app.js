const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const employeeArray = []

const promptTeamInfo = () => {

    const promptInternInfo = (name, id, email) => {
        inquirer.prompt({
            type: "input",
            message: "Entern the intern's school",
            name: "school"
        }).then(({ school }) => {
            employeeArray.push(new Intern(name, id, email, school));
        })
    }

    const promptEngineerInfo = (name, id, email) => {
        inquirer.prompt({
            type: "input",
            message: "Entern the engineer's github",
            name: "github"
        }).then(({ github }) => {
            employeeArray.push(new Engineer(name, id, email, github));
        })
    }

    const promptManagerInfo = (name, id, email) => {
        inquirer.prompt({
            type: "number",
            message: "Entern the manager's office number",
            name: "officeNumber"
        }).then(({ officeNumber }) => {
            employeeArray.push(new Manager(name, id, email, officeNumber));
        })
    }

    const promptEmployeeInfo = () => {
        console.log("Tell me about an employee:");
        inquirer.prompt([{
            type: "input",
            message: "What is this Employee's name?",
            name: "name"
        }, {
            type: "number",
            message: "What is this employee's ID number?",
            name: "id"
        }, {
            type: "input",
            message: "What is this employee's email address?",
            name: "email"
        }, {
            type: "list",
            message: "What is this employee's role?",
            choices: ["Intern", "Engineer", "Manager"],
            name: "role"
        }]).then(({ name, id, email, role }, error) => {
            switch (role) {
                case "Intern":
                    promptInternInfo(name, id, email);
                    break;
                case "Engineer":
                    promptEngineerInfo(name, id, email);
                    break;
                case "Manager":
                    promptManagerInfo(name, id, email);
                    break;
                default:
                    throw error;
            }
            inquirer.prompt({
                type: "confirm",
                message: "Add another employee?",
                name: "nextEmployee"
            }).then(({ nextEmployee }) => {
                if (nextEmployee) {
                    promptEmployeeInfo();
                } else {
                    render(employeeArray);
                }
            })
        })
    }
    promptEmployeeInfo();
}

console.log("To help you generate a team page I will need some information about your team members.");
promptTeamInfo();