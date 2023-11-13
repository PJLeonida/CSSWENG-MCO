// Dashboard routing

const app = require('express')
const router = app.Router()

router.get('/', (req, res) => {
    res.render('dashboard');
})


module.exports = router