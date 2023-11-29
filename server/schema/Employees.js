const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },

    suffix:{
        type: String,
    },

    deployments: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Deployements' }],
        default: []
    },

    notes: {
        type: String
    }
})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
