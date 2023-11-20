// Desc: This file contains the routes for the create-new-tracker page

const app = require('express')
const router = app.Router()
const Projects = require('../server/schema/Projects')

router.get('/', (req, res) => {
    res.render('landing-page', {
        pageTitle: 'Create New Tracker',
        partial: 'create-new-tracker',
        script: '/static/js/create-new-tracker.js',
        activePage: 'create-new-tracker',
    });
});



// Function to handle creation of new tracker
router.post('/', async (req, res) => {
    try {

        // Check what type of action the user is trying to do
        const { action } = req.body;
        console.log('Type of action:', action);
        console.log(req.body);

        if (req.body && typeof req.body === 'object') {

            // Destructure form data
            // const { trackerName, trackerDescription, trackerDueDate, trackerPriority, trackerStatus } = req.body
        
            const {
                new_project_name,
                new_project_descr, 
                employeeListData
            } = req.body

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
                employees: employeeListData
            });

            // Save new project
            await newProject.save();

            console.log('New project created');

            // display the details of the new project in the console
            console.log(newProject);

            res.redirect('/template-project-tracker');
        }
    
    } catch (error) {
        console.error('Error creating new tracker:', error);
    }
});




module.exports = router;