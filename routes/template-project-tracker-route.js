// Template of the project tracker route

const app = require('express');
const projects = require('../server/schema/Projects');
const employees = require('../server/schema/Employees');
const deployments = require('../server/schema/EmpDeployment');
const router = app.Router()

async function getProject(projectID){
    try{
        const project = await projects.findOne({_id:projectID})

        return project;
    } catch(error){
        console.error('Error getting project  with:', error);
        throw error; // Handle the error as needed for your application
    }
}

async function getProjectEmployees(projectName){
    try{
        const employeeList = await deployments.find({project:projectName})
        return employeeList;
        
    } catch(error){
        console.error('Error getting project employees with:', error);
        throw error; // Handle the error as needed for your application
    }
}

async function getProjectTotalProjectPositions(employeeListData){
    try {
        const positions = employeeListData.map(employee => employee.position);
        const totalPositions = new Set(positions);
        return totalPositions.size;
    } catch (error) {
        console.error('Error getting project total project positions:', error);
        throw error;
    }
}

async function getProjectTotalDeployments(employeeListData){
    try {
        return employeeListData.reduce((total, current) => total + current['deploymentHrs'], 0);
    } catch (error) {
        console.error('Error counting deployments with conditions:', error);
        throw error; 
    }
}

async function getProjectTotalRate(employeeListData) {
    try {
        return employeeListData.reduce((total, current) => total + current['totalRate'], 0);
    } catch (error) {
        console.error('Error counting totalCost with conditions:', error);
        throw error; 
    }
}

async function getProjectTotalEmployees(employeeListData) {
    return employeeListData.length;
}

router.get('/get-employee-list', async (req,res) => {
    console.log('get employee list triggered')
    const projectID = req.session.projectID;
    const project = await getProject(projectID)
    console.log(project)
    console.log(project.name)
    const employeeListData = await getProjectEmployees(project.name);
    console.log(employeeListData)
    res.json(employeeListData);
})

router.get('/:projectID', async (req, res) => {
    const projectID = req.params.projectID;
    req.session.projectID = projectID;
    const project = await projects.findById(projectID);
    const employeeListData = await getProjectEmployees(projectID)
    const totalEmployees = await getProjectTotalEmployees(employeeListData);
    const totalPositions = await getProjectTotalProjectPositions(employeeListData);
    const totalDeployments = await getProjectTotalDeployments(employeeListData);
    const totalRate = await getProjectTotalRate(employeeListData);

    res.render('landing-page', { 
        pageTitle: project.name.toUpperCase(),
        partial: 'template-project-tracker',
        activePage: 'template-project-tracker',
        totalEmployees: totalEmployees,
        totalPositions: totalPositions,
        totalDeployments: totalDeployments,
        totalRate: totalRate,
        script: '/static/js/template-project-tracker.js',
        name: req.user.firstName
    });
});


// Use for design purposes only
// router.get('/', (req, res) => {
//     res.render('landing-page', { 
//         pageTitle: 'Project Tracker',
//         partial: 'template-project-tracker',
//         activePage: 'account-settings',
//         script: '/static/js/template-project-tracker.js'
//     });
// });

module.exports = router;