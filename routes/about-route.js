const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    
    //res.render('about-page');
    res.render('landing-page', { 
        pageTitle: 'About',
        partial: 'about-page',
        activePage: 'About page',
    });

})

module.exports = router;
