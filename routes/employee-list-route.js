// Employee list routing

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page', { 
        pageTitle: 'Employee List',
        partial: 'employee-list'
    });
})


module.exports = router