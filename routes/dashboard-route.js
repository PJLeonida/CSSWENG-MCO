// Dashboard routing

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page', { 
        pageTitle: 'Dashboard',
        partial: 'dashboard',
        script: '/static/js/landing-page.js',
        activePage: 'dashboard',
    });
});


module.exports = router;