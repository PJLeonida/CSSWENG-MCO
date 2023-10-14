const mongoose = require('mongoose')

const user = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },

    firstName: {
        type: String, 
        require: true
    },

    lastName: {
        type: String, 
        require: true
    }

})

const User = mongoose.model("User", user)
module.exports = User