const express = require('express');
const router = express.Router();

const passport = require('passport')

// initialize passport and make it deal with session
router.use(passport.initialize());
router.use(passport.session());

router.post('/', async(req, res) => {
    const { companyID, password } = req.body;
    
    // Check if all fields are filled
    const requiredFields = [companyID, password];
    if (requiredFields.some(value => value === '' || value.trim() === '')) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }
    
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.render('/', { errorMessage: info.message }); // Handle unexpected errors
        }
        if (!user) {
            // User not found or incorrect credentials
            res.render('/', { errorMessage: info.message });
        }
        // Successful login, perform any additional actions as needed
        req.login(user, (err) => {
            if (err) {
            res.render('/', { errorMessage: info.message });
            }
            // Redirect to a success page or do something else
            res.redirect('/landing-page');
        });
    });
            
});