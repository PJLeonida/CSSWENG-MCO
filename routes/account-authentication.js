/* 
    acccount-authentication.js
    This file handles the registration and login of users.
*/

// Third party imports.
const express = require('express');
const router = express.Router();
const User = require('../server/schema/Users');
const passport = require('passport')


// Function to handle user login and registration
router.post('/', async (req, res, next) => {
    try {

        // Check what type of action the user is trying to do
        const { action } = req.body;
        console.log('Type of action:', action);

        // If the user is trying to register
        if (action === 'register') {
            // Destructure form data
            const { 
                reg_firstName, 
                reg_middleName, 
                reg_lastName, 
                reg_suffix, 
                companyID, 
                password, 
                reg_confirm } = req.body

            // Check if company ID is 10 characters long, it not, sent an error pop up message
            if (companyID.length !== 10 || isNaN(companyID) || companyID === '') {
                console.log('Invalid Company ID');
            }

            // Check if the company ID is already in use
            if (await User.findOne({ companyID: companyID })) {
                console.log('Company ID already in use');
            }
        

            // Check if all fields are filled
            const requiredFields = [reg_firstName, reg_confirm, reg_lastName, password, companyID];
            if (requiredFields.some(value => value === '' || value.trim() === '')) {
                return res.status(400).json({ message: 'Please fill out all fields' });
            }

            // Set the unrequired fields to empty string if they are empty
            const unrequiredFields = [reg_middleName, reg_suffix];
            if (unrequiredFields.some(value => value === '' || value.trim() === '')) {
                unrequiredFields.forEach(value => value = '');
            }

            // Check if the password and confirm password fields match
            if (password !== reg_confirm) {
                return res.status(400).json({ message: 'Passwords do not match' });
            } else if (password.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters long' });
            }

            // Create a new user
            const newUser = new User({
                firstName: reg_firstName,
                middleName: reg_middleName,
                lastName: reg_lastName,
                suffix: reg_suffix,
                companyID: companyID,
                password: password, // REMOVE IN FINAL BUILD BECAUSE OF PASSPORT
            });

            User.register(newUser, password, (err, user) => {
                if (err) {
                    console.error('Error registering user: ', err);
                    return res.redirect('/');
                } 

                passport.authenticate('local')(req, res, () => {
                    res.redirect('/landing-page'); // Redirect to dashboard or any other page on successful registration
                });
            })

        } else if(action === 'login') { // If the user is trying to login
            const { companyID, password } = req.body;
            
            // Check if all fields are filled
            const requiredFields = [companyID, password];
            if (requiredFields.some(value => value === '' || value.trim() === '')) {
                return res.status(400).json({ message: 'Please fill out all fields' });
            }
         
            // Check if the company ID exists in the database
            if (!await User.findOne({ companyID: log_companyID })) {
                return res.status(400).json({ message: 'Invalid Company ID' });
            }

            // Check if the password is correct
            if (!await bcrypt.compare(log_password, (await User.findOne({ companyID: log_companyID })).password)) {
                return res.status(400).json({ message: 'Invalid Password' });
            }

            // If all checks are passed, log the user in
            console.log('User logged in successfully!');
            res.redirect('/landing-page');
            
            passport.authenticate('local',  {
                successRedirect: '/landing-page',
                failureRedirect: '/',
            })(req,res,next);
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Function to handle user logout
router.get('/', (req, res) => {   
    req.logout(() => {console.log('User logged out successfully!');});
    res.redirect('/');
});

module.exports = router;