const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Projects = new mongoose.Schema({
    projectName: {
        type: String,
        require: true 
    },
    projectDescription: {
        type: String,
        require: false
    },
    totalmanpower: {
        type: Number
    },
    employees: {
        type: Schema.Types.ObjectId,
        ref: 'EmpDeployment'
    },
    utilization: {
        type: Number,

    }
})

const projects = mongoose.model("Project", Projects);
module.exports = projects;