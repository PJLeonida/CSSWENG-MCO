// Template of the project tracker route

const app = require('express');
const projects = require('../server/schema/Projects');
const employees = require('../server/schema/Employees');
const deployments = require('../server/schema/EmpDeployment');
const router = app.Router()

async function getProjectEmployees(projectID){
    try{
        const deploymentList = await deployments.find({projectAssign:projectID})

        const employeeList = []
        for (let i = 0; i < deploymentList.length; i++) {
            let employee = employees.find({_id: deploymentList[i].employee})
            employeeList.push(employee)
        }
        return employeeList;
        
    } catch(error){
        console.error('Error getting project employees with:', error);
        throw error; // Handle the error as needed for your application
    }
}

async function getProjectTotalEmployees(projectID) {
    try {
        // Define your conditions in the query object
        const totalEmployees = await deployments.countDocuments({projectAssign:projectID});
        return totalEmployees;
    } catch (error) {
        console.error('Error counting documents with conditions:', error);
        throw error; // Handle the error as needed for your application
    }
}



/*
async function getProjectTotalProjectPositions(projectID){
    try {
        const totalEmployees = await employee.countDocuments();
        return totalEmployees;
    } catch (error) {
        console.error('Error counting documents with conditions:', error);
        throw error; // Handle the error as needed for your application
    }
}*/

async function getProjectTotalDeployments(projectID){
    try {
        const totalDeployments = await deployments.countDocuments({projectAssign:projectID});
        return totalDeployments;
    } catch (error) {
        console.error('Error counting documents with conditions:', error);
        throw error; // Handle the error as needed for your application
    }
}
/*
async function getProjectTotalRate(projectID) {
    try {
        const result = await employee.aggregate([
            {
                $group: {
                    _id: null,
                    totalRate: { $sum: '$totalRate' },
                },
            },
        ]);

        if (result.length > 0) {
            // The total cost is available in the result array
            const totalCost = result[0].totalRate;
            console.log('Total Rate:', totalCost);
            return totalCost;
        } else {
            console.log('No documents found.');
            return 0;
        }
    } catch (error) {
        console.error('Error calculating total cost:', error);
        throw error;
    }
}*/
router.get('/get-employee-list', async (req,res) => {
    console.log('get employee list triggered')
    const projectID = req.session.projectID;
    console.log(projectID);

    const employeeListData = await getProjectEmployees(projectID);

    res.json(employeeListData);
})

router.get('/:projectID', async (req, res) => {
    const projectID = req.params.projectID;
    req.session.projectID = projectID;
    const totalEmployees = await getProjectTotalEmployees(projectID);
    //const totalPositions = await getProjectTotalProjectPositions(projectID);
    const totalDeployments = await getProjectTotalDeployments(projectID);
    //const totalRate = await getProjectTotalRate(projectID);

    res.render('landing-page', { 
        pageTitle: 'Project Tracker',
        partial: 'template-project-tracker',
        activePage: 'template-project-tracker',
        totalEmployees: totalEmployees,
       // totalPositions: totalPositions,
       totalDeployments: totalDeployments,
        // totalRate: totalRate,
        script: '/static/js/template-project-tracker.js',
        projectID: projectID
    });
});

module.exports = router;