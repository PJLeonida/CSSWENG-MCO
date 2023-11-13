const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('../server/schema/Users.js');


// Function to handle user login
router.post('/login', async (req, res) => {
    try {
        const compID = req.body['login-companyID'];
        const password = req.body['login-password'];

        // Check if company ID is 10 characters long
        if (compID.length !== 10 || isNaN(compID) || compID === '') {
            return res.status(400).json({ message: 'Invalid Company ID' });
        }

        // Check if all fields are filled
        const requiredFields = ['login-companyID', 'login-password'];
        if (requiredFields.some(field => !req.body[field])) {
            return res.status(400).json({ message: 'Please fill out all fields' });
        }

        // Check if the user exists
        const user = await users.register.findOne({ companyID: compID });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Company ID or Password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Company ID or Password' });
        }

        console.log('User logged in successfully!');
        res.json({ message: 'User logged in successfully' });

        res.redirect('/landing-page');
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Function to handle user registration
router.post('/register', async (req, res) => {
    try {
        const compID = req.body['register-companyID'];

        // Check if company ID is 10 characters long
        if (compID.length !== 10 || isNaN(compID) || compID === '') {
            return res.status(400).json({ message: 'Invalid Company ID' });
        }

        // Check if all fields are filled
        const requiredFields = ['register-firstName', 'register-lastName', 'register-companyID', 'register-password', 'register-confirmPassword'];
        if (requiredFields.some(field => !req.body[field])) {
            return res.status(400).json({ message: 'Please fill out all fields' });
        }

        // Check if the password and confirm password fields match
        if (req.body['register-password'] !== req.body['register-confirmPassword']) {
            return res.status(400).json({ message: 'Passwords do not match' });
        } else if (req.body['register-password'].length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body['register-password'], salt);

        // Create a new user
        const newUser = new users.register({
            firstName: req.body['register-firstName'],
            middleName: req.body['register-middleName'],
            lastName: req.body['register-lastName'],
            suffix: req.body['register-suffix'],
            companyID: req.body['register-companyID'],
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        console.log('User registered successfully!');
        res.json({ message: 'User registered successfully' });

        res.redirect('/landing-page');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;