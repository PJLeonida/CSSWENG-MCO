const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Projects = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        require: false
    },

    location: {
        type: String,
        require: true
    },

    status:{
        type: String,
        require: true
    },

    totalEmployees:{
        type: Number
    },

    totalDeployment:{
        type: Number
    },

    totalRate:{
        type: Number
    },
    
    startDate:{
        type: Date,
        require: true
    },

    dueDate:{
        type: Date,
        require: true
    },
    
    /*
    totalmanpower: {
        type: Number
    },
    employees: {
        type: Schema.Types.ObjectId,
        ref: 'EmpDeployment'
    },
    utilization: {
        type: Number,

    }*/
})

const projects = mongoose.model("Project", Projects);
module.exports = projects;