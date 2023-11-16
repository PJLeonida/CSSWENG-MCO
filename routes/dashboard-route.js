// Dashboard routing

const app = require('express')
const router = app.Router()

router.get('/dashboard', (req, res) => {
    // res.render('main', { 
    //     pageTitle: 'Dashboard',
    //     partial: 'dashboard'
    // });
    res.render('dashboard');
})


module.exports = router