// Dashboard routing

const app = require('express')
const router = app.Router()

router.get('/employee-list', (req, res) => {
    res.render('main', { 
        pageTitle: 'Employee List',
        partial: 'employee-list'
    });
})


module.exports = router