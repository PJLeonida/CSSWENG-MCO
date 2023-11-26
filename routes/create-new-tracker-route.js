// Desc: This file contains the routes for the create-new-tracker page

const app = require('express')
const router = app.Router()
const Projects = require('../server/schema/Projects')
const Deployments = require('../server/schema/EmpDeployment');
const Employees = require('../server/schema/Employees');
const bodyParser = require('body-parser');

app().use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('landing-page', {
        pageTitle: 'Create New Tracker',
        partial: 'create-new-tracker',
        script: '/static/js/create-new-tracker.js',
        activePage: 'create-new-tracker',
        script:'/static/js/create-new-tracker.js',
        name: req.user.firstName
    });
});



// Function to handle creation of new tracker
router.post('/', async (req, res) => {
    try {

        // Check what type of action the user is trying to do
        const { action, 
            new_project_name,
            new_project_descr, 
            employeeListData } = req.body;
        console.log('Type of action:', action);
        console.log(req.body);

        /*=========CREATE PROJECT PHASE===================*/
        if (req.body && typeof req.body === 'object') {

            // Destructure form data
            // const { trackerName, trackerDescription, trackerDueDate, trackerPriority, trackerStatus } = req.body
        
            console.log("the employees")
            console.log(employeeListData)
            console.log(typeof employeeListData)

            // Check if all fields are filled
            const requiredFields = [new_project_name, new_project_descr];
            if (requiredFields.some(value => value === '' || (typeof value === 'string' && value.trim() === ''))) {
                console.log('Please fill in all fields');
            }

            // Check if the project name is already in use
            if (await Projects.findOne({ projectName: new_project_name })) {
                console.log('Project name already in use');
            }

            // Create new project
            const newProject = new Projects({
                projectName: new_project_name,
                projectDescription: new_project_descr,
                // projectDueDate: new Date(),
                // projectPriority: 'Low',
                // projectStatus: 'To Do',
                // projectMembers: [],
                // projectTasks: []
                //employees: employeeListData
            });

            // Save new project
            await newProject.save();
            
            //console.log('New project created');
            console.log(newProject);
            console.log("======")
            console.log(employeeListData.length);

            /*=========CREATE EMPLOYEE PHASE===================*/
            for (let i = 0; i < employeeListData.length; i++) {
                console.log(employeeListData[i]);
                employee = employeeListData[i];
                console.log('---------------------------------');
                const newEmployee = new Employees({
                    //no: employee.no,
                    firstName: employee.firstName,
                    middleName: employee.middleName,
                    lastName:  employee.lastName,
                    suffix:  employee.suffix,
                    position:  employee.position,
                    deployment: employee.deployment,
                    rate:  employee.rate,
                    totalRate:  employee.deployment * employee.rate
                });
                await newEmployee.save();

                const newDeployment = new Deployments({
                    employee: newEmployee._id,
                    projectAssign: newProject._id,
                    firstName: newEmployee.firstName,
                    middleName: newEmployee.middleName,
                    lastName:  newEmployee.lastName,
                    position:  newEmployee.position,
                })
                await newDeployment.save();
            }
           
            res.status(200).json({ redirect: '/template-project-tracker/' + newProject._id});
        }
    } catch (error) {
        console.error('Error creating new tracker:', error);
    }
});




module.exports = router;