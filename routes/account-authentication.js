/* 
    acccount-authentication.js
    This file handles the registration and login of users.
*/

// Third party imports.
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../server/schema/Users');
// const passport = 




// router.get('/', (req,res) => {
//     res.send('SAMPLE');
//     res.render('dashboard');
// })

// router.post('/', (req,res) => {

// })


// Function to handle user login and registration
router.post('/', async (req, res) => {
    try {

        // Check what type of action the user is trying to do
        const { action } = req.body;
        console.log('Type of action:', action);
        console.log(req.body);

        // If the user is trying to register
        if (action === 'register') {
            // Destructure form data
            const { 
                reg_firstName, 
                reg_middleName, 
                reg_lastName, 
                reg_suffix, 
                reg_companyID, 
                reg_password, 
                reg_confirm } = req.body

            // Check if company ID is 10 characters long, it not, sent an error pop up message
            if (reg_companyID.length !== 10 || isNaN(reg_companyID) || reg_companyID === '') {
                console.log('Invalid Company ID');
            }

            // Check if the company ID is already in use
            if (await User.findOne({ companyID: reg_companyID })) {
                console.log('Company ID already in use');
            }
        

            // Check if all fields are filled
            const requiredFields = [reg_firstName, reg_confirm, reg_lastName, reg_password, reg_companyID];
            if (requiredFields.some(value => value === '' || value.trim() === '')) {
                return res.status(400).json({ message: 'Please fill out all fields' });
            }

            // Set the unrequired fields to empty string if they are empty
            const unrequiredFields = [reg_middleName, reg_suffix];
            if (unrequiredFields.some(value => value === '' || value.trim() === '')) {
                unrequiredFields.forEach(value => value = '');
            }

            // Check if the password and confirm password fields match
            if (reg_password !== reg_confirm) {
                return res.status(400).json({ message: 'Passwords do not match' });
            } else if (reg_password.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters long' });
            }

            // Hash the password
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(reg_password, salt);

            // Create a new user
            const newUser = new User({
                firstName: reg_firstName,
                middleName: reg_middleName,
                lastName: reg_lastName,
                suffix: reg_suffix,
                companyID: reg_companyID,
                password: hashedPassword,
            });

            // Save the user to the database
            await newUser.save();

            console.log('User registered successfully!');

            res.redirect('/landing-page');

        } else if(action === 'login') { // If the user is trying to login
            const { log_companyID, log_password } = req.body;

            // Check if all fields are filled
            const requiredFields = [log_companyID, log_password];
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
            
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Function to handle user logout
router.get('/logout', (req, res) => {
    console.log('User logged out successfully!');
    req.logout();
    res.redirect('/');
});

module.exports = router;