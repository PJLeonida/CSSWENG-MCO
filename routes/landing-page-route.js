/*
    Lading page routing
*/

const app = require('express');
const router = app.Router();
const User = require('../server/schema/Users');

router.get('/', (req, res) => {
    res.render('landing-page', { 
        pageTitle: 'Dashboard',
        partial: 'dashboard',
        script: '/static/js/landing-page.js',
        style: '/static/css/style.css',
        activePage: 'dashboard',
    });
});


// router.get('/:firstName', async (req, res) => {
//    // Fetch the user's data from the database
//     const user = await User.findOne({ firstName: req.params.firstName });
//    res.render('landing-page', {
//     //    title: "Landing Page",
//     //    script: "static/js/landing-page.js",
//     //    image: user.image,
//     user: user
//    }); 
// });

module.exports = router;