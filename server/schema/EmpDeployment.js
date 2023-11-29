const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const EmpDeployment = new mongoose.Schema({
    employeeRef: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },

    employee: {
        type: String,
        required: true
    },

    firstName:{
        type: String,
        required: true 
    },

    middleName:{
        type: String,
    },

    lastName:{
        type: String,
        required: true 
    },

    suffix:{
        type: String,
        
    },

    position: {
        type: String,
        require: true
    },

    deploymentHrs: {
        type: Number,
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

    project: {
        type: String,
        required: true
    },

    projectRef: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }

})

const empDeployment = mongoose.model("EmpDeployment", EmpDeployment);

module.exports = empDeployment;