const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
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
    position: {
        type: String, 
        require: true
    },

    rate: {
        type: Number,
        require: true
    },

    totalRate: {
        type: Number,
        require: true
    },

    deployment: {
        type: Number,
        require: true
    },

    notes: {
        type: String
    }
})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
