// Project list routing

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page', { 
        pageTitle: 'Project List',
        partial: 'project-list',
        activePage: 'project-list',
    });
});

module.exports = router;