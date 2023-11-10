require('dotenv').config();
const mongoose = require('mongoose')
const exp = require('./express.js')
const port = 8080;

const { run_exp } = require('./express.js');

run_exp();

// Reference app and BrowserWindow from 'electron
const { app, BrowserWindow } = require('electron');

// Import mongoose database operations from db folder and also the collections
const db_ops = require('./db/connect.js');
const EmpDeployment = require('./db/EmpDeployment.js');
const Employees = require('./db/Employees.js');
const Projects = require('./db/Projects.js');
const Users = require('./db/user.js')


/*============================================Electron====================================================================*/ 

// Create a new window
function createWindow () {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024
    });

    // Load the file
    win.loadURL('http://localhost:' + port);

    // Maximize the window
    win.maximize();
}

// Check if App is ready
app.whenReady().then(createWindow);

// App listener when all the window is closed,
// clsed the app completely
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

db_ops.connect();

module.exports = port; // Export the port value


// const employee1 = new Employees({
//     firstName: "Sample",
//     lastName: "Document",
//     position: "Sampleposition",
//     rate: 50,
//     totalrate: 25000,
//     notes: "Sana gumana pls"
// })

// employee1.save()
//     .then(savedEmployee => {
//         console.log('New employee saved:', savedEmployee);
//     })
//     .catch(error => {
//         console.error('Error saving new employee:', error);
//     });
