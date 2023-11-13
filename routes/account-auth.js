const express = require('express');
const router = express.Router();
const users = require('../server/schema/Users.js');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    console.log('Inside router post');
    try {
        const { action } = req.body;
        console.log('Request Body:', req.body);

        if(action === 'register'){
            const { firstName, middleName, lastName, suffix, companyID, password, confirmPassword } = req.body;

            // Check if company ID is 10 characters long
            if (companyID.length !== 10 || isNaN(companyID) || companyID === '') {
                return res.status(400).json({ message: 'Invalid Company ID' });
            }

            // Check if the company ID already exists
            const user = await users.register.findOne({ companyID: companyID });
            if (user) {
                return res.status(400).json({ message: 'Company ID already exists' });
            }

            // Check if all required fields are filled
            const requiredFields = ['firstName', 'lastName', 'companyID', 'password', 'confirmPassword'];
            if (requiredFields.some(field => !req.body[field])) {
                return res.status(400).json({ message: 'Please fill out all fields' });
            }

            // Check if the password and confirm password fields match
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            } else if (password.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters long' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user document
            const newUser = new users.register({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                suffix: suffix,
                companyID: companyID,
                password: hashedPassword,
            });

            // Save the user to the database
            await newUser.save()
            .then(savedAccount => {
                console.log('New User Registered:', savedAccount);
                res.json({ message: 'User registered successfully! You will be redirected shortly.', firstName: firstName.toLowerCase() });
                
                res.redirect('/landing-page');
            })
            .catch(error => {
                console.error('Error registering user:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        } else if(action === 'login'){
            const { companyID, password } = req.body;

            const user = await users.register.findOne({ companyID: companyID });

            if (!user) {
                console.log('user');
                console.log(user);
                return res.status(400).json({ message: 'Invalid Company ID or Password' });
            }

            const passwordComp = await bcrypt.compare(password, user.password);

            if (!passwordComp) {
                console.log('passwordComp');
                return res.status(400).json({ message: 'Invalid Company ID or Password' });
            }

            req.session.firstName = user.firstName.toLowerCase();
        }

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;