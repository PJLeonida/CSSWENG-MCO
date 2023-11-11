const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String, 
        require: true
    },
    middleName: {
        type: String, 
        require: false
    },
    lastName: {
        type: String, 
        require: true
    },
    suffix: {
        type: String, 
        require: false
    },
    // userPosition: {
    //     type: String, 
    //     require: true
    // },
    companyID: {
        type: Number, 
        require: true,
        unique: true,   // This is to make sure that the userID is unique
        max: 10,        // This is to make sure that the userID is only 10 characters long
        index: true     // This is to make sure that the userID is indexed
    },
    password: {
        type: String, 
        require: true,
        min: 8,         // This is to make sure that the password is at least 8 characters long
        max: 100        // This is to make sure that the password is only 100 characters long
    },
    userProfilePic: {
        type: String,
        default: "img/default-user-profile-pic.jpg" // This is to make sure that the user has a default profile picture
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;
