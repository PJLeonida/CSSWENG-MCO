const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../server/schema/Users');
// const passport = 


const router = express.Router();

router.get('/', (req,res) => {
    res.send('SAMPLE');
    res.render('dashboard');
})

// router.post('/', (req,res) => {

// })


// Register User
// Function to handle user registration
router.post('/', async (req, res) => {
    try {
        console.log(req.body);

        // Destructure form data
        const { 
            reg_firstName, 
            reg_middleName, 
            reg_lastName, 
            reg_suffix, 
            reg_companyID, 
            reg_password, 
            reg_confirm } = req.body

        // Check if company ID is 10 characters long
        if (reg_companyID.length !== 10 || isNaN(reg_companyID) || reg_companyID === '') {
            return res.status(400).json({ message: 'Invalid Company ID' });
        }

        // Check if all fields are filled
        const requiredFields = [reg_firstName, reg_confirm, reg_lastName, reg_password, reg_companyID];
        if (requiredFields.some(value => value === '' || value.trim() === '')) {
            return res.status(400).json({ message: 'Please fill out all fields' });
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
        // res.json({ message: 'User registered successfully' });

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;