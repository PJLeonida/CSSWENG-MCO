//create new tracker

const app = require('express')
const router = app.Router()

router.post('/', (req, res) => {
/*
Theres a create new project and a create new employee

In project, just insert it with default values.

When an employee is created with an assigned project:
1. Create Employee
FirstName: input

    lastName: input

    position: input

    rate: input(same as role in EmpDeploy)

    totalrate: input

2. create deployment
     employee: employeeID,

    firstName: input ,

    lastName: input ,

    projectassign: input project's name id (projectID).,
    projectID = projects.find(ProjectName).getProjectID

    role: input

    deploymenthrs: input

3. Update Project

    totalmanpower: will be changed by +1

    employees: not sure how to display this, but if ever to get the list of employees of a project:
    empDeployment: findAll(projectassign = inputted projectName's id)

})
*/
})

router.get('/', (req, res) => {


    res.render('placeholder')
})


module.exports = router