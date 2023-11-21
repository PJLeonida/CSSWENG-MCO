//create new tracker

const app = require('express');
const router = app.Router()
const projects = require('../server/schema/Projects');
const deployments = require('../server/schema/EmpDeployment');
const employees = require('../server/schema/Employees');

router.post('/', async (req, res) => {
    
  
})
            

router.get('/', async (req, res) => {
    res.render('landing-page', {
        pageTitle: 'Create New Tracker',
        partial: 'create-new-tracker',
        activePage: 'create-new-tracker',
    });
})


module.exports = router