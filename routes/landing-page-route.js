/*
    Lading page routing
*/

const app = require('express');
const router = app.Router();
const User = require('../server/schema/Users');

router.get('/', (req, res) => {
    res.render('landing-page');
})


module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../server/schema/Users');

// router.get('/', async (req, res) => {
//    // Fetch the user's data from the database
//    const user = await User.findOne(req.session.companyID);

//    // Render the landing page with the user's data
//    res.render('landing-page', {
//        user: user
//    });
// });

module.exports = router;