// Project list routing

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page', { 
        pageTitle: 'Project List',
        partial: 'project-list',
        script: '/static/js/landing-page.js',
        activePage: 'project-list',
    });
});

module.exports = router;