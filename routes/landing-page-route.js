/*
    Lading page routing
*/

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('landing-page');
})


module.exports = router