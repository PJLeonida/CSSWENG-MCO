// Dashboard routing

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page', { 
        pageTitle: 'Dashboard',
        partial: 'dashboard',
        activePage: 'dashboard',
    });
});


module.exports = router;