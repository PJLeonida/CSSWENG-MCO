const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const EmpDeployment = mongoose.Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },

    firstName: {
        type: String,
        require: true
    },

    lastName: {
        type: String,
        require: true
    },

    projectAssign: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },

    role: {
        type: String,
        require: true
    },

    deploymenthrs: {
        type: Number,
        require: true
    }

})

const empDeployment = mongoose.model("EmpDeployment", EmpDeployment)

module.exports = empDeployment