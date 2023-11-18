const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true 
    },

    lastName: {
        type: String,
        require: true
    },

    position: {
        type: String, 
        require: true
    },

    rate: {
        type: Number,
        require: true
    },

    totalrate: {
        type: Number,
        require: true
    },

    /*deployment: {
        type: Schema.Types.ObjectId,
        ref: 'EmpDeployment',
    },*/

    notes: {
        type: String
    }
})

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee
