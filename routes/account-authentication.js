const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../server/schema/Users');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        suffix,
        companyID,
        password,
        confirmPassword,
    } = req.body;

    // Check if all fields are filled
    // if (!firstName || !lastName || !companyID || !password || !confirmPassword) {
    //     return res.status(400).json({
    //         message: 'Please fill out all fields!',
    //     });
    // }

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: 'Passwords do not match!',
        });
    }

    // Check if the companyID already exists
    const companyIDExists = await User.findOne({
        companyID,
    });

    if (companyIDExists) {
        return res.status(400).json({
            message: 'Company ID already exists!',
        });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
        firstName,
        middleName,
        lastName,
        suffix,
        companyID,
        password: hashedPassword,
    });

    // Save the user to the database
    try {
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully!',
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: 'Company ID already exists!',
            });
        }
        res.status(400).json({
            message: err.message || 'User creation failed!',
        });
    }
});

module.exports = router;