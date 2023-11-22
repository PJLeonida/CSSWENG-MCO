const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page', { 
        pageTitle: 'Account Settings',
        partial: 'account-settings',
        activePage: 'account-settings',
    });
});


module.exports = router;