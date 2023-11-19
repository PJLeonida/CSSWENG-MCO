const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    
    //res.render('about-page');
    res.render('template-project-tracker');
})

module.exports = router;
