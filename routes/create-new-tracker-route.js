// Desc: This file contains the routes for the create-new-tracker page

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page', {
        pageTitle: 'Create New Tracker',
        partial: 'create-new-tracker',
        script: '/static/js/landing-page.js',
        activePage: 'create-new-tracker',
    });
});

module.exports = router;