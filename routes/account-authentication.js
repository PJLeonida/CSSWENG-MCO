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
router.post('/', async (req, res) => {
    console.log(req.body);
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
    const hashedPassword =  async () => {
        try {
            return await bcrypt.hash(password, salt);
        }
        catch (e) {
            console.log(e);
            res.render('index');
        }
    }
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
        res.render('dashboard');
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