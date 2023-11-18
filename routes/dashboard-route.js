// Dashboard routing

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    // res.render('main', { 
    //     pageTitle: 'Dashboard',
    //     partial: 'dashboard'
    // });
    res.render('landing-page', {
        
    });
})


module.exports = router