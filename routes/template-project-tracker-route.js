// Template of the project tracker route

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page', { 
        pageTitle: 'Project Tracker',
        partial: 'template-project-tracker',
        script: '/static/js/template-project-tracker.js',
    });
});

module.exports = router;