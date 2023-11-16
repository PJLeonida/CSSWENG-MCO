// Dashboard Requests handling

const app = require('express')
const router = app.Router()

// Require databases
const Users = require('../server/schema/Users');
const Projects = require('../server/schema/Projects')
const Employees = require('../server/schema/Employees')

router.get('/', (req, res) => {
    res.render('dashboard');

    // Do function calls to aid in data presentation

})


// Grabs all the Employee Credentials <Or Specific Credentials>
function getEmployees () {
    const employees = Users.find();

    return employees;
}


// Grabs all the Projects 
function getProjects() {
    const projects = Projects.find();

    return projects;
}

// Grabs the sum from all the employees' rates
function getCosts() {

    // Get the sum of all employee rates using mongoose
    const costs = Employees.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: 'rate'}
            }
        }
    ]).exec().then( (err, result ) => {
        if (err) {
            console.log(err)
            return;
        }
    })

    return costs[0].total;
}

module.exports = router