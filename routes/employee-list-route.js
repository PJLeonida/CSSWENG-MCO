// Employee list routing

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page', { 
        pageTitle: 'Employee List',
        partial: 'employee-list',
        // make the transition to the employee-list page
        // is smooth,not abrupt
    });
})


module.exports = router